<template>
  <div class="funnel-measure-plot">
    <div class="page-left page-button" :class="{ invisible: page <= 0}" @click="page -= 1">
      <font-awesome-icon icon="angle-left"/> Previous
    </div>
    <div class="page-right page-button" :class="{ invisible: page >= pagesCount - 1 }" @click="page += 1">
      Next <font-awesome-icon icon="angle-right"/>
    </div>
    <span class="error" v-if="error">{{ error }}</span>
    <Plotly v-else v-bind="{ traces, config, layout }" ref="plot"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import format from '@/utils/format.js'
import LolipopAxis from '@/utils/lolipopAxis.js'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'FunnelMeasure',
  props: {
    data: Array,
    plotType: String
  },
  data () {
    return { page: 0 }
  },
  watch: {
    data () { this.page = 0 }
  },
  computed: {
    pageSize () { return this.$store.getters.getOption('funnelmeasure_page_size') },
    pagesCount () { return Math.ceil(this.variables.length / this.pageSize) },
    pageRange () {
      let first = this.page * this.pageSize
      return [first, first + this.pageSize]
    },
    variables () {
      return [...new Set(this.data.map(x => Object.keys(x.plotData.lossValues)).flat())]
    },
    subsets () {
      return this.variables.reduce((acu, variable) => {
        acu[variable] = [...new Set(this.data.map(x => Object.keys(x.plotData.lossValues[variable])).flat())]
        return acu
      }, {})
    },
    lolipopAxis () {
      return new LolipopAxis(this.variables.slice(...this.pageRange), this.data.slice(1).map(d => d.params.model), this.variables.slice(...this.pageRange).map(v => this.subsets[v]), 0.03, 0.03, 1000)
    },
    error () {
      if (new Set(this.data.map(x => x.plotData.lossFunction)).size > 1) return 'To plot Funnel Measure all models must use the same loss function'
      if (this.data.length < 2) return 'To plot Funnel Measure you need at least two models'
      if (this.data.filter(x => Object.keys(x.plotData.lossValues).length !== this.variables.length).length > 0) return 'Selected models use incompatible variables'
      let testVariableSubsets = (x, variable) => Object.keys(x.plotData.lossValues[variable]).length !== this.subsets[variable].length
      if (this.data.filter(x => this.variables.filter(v => testVariableSubsets(x, v)) > 0) > 0) return 'Selected models have incompatible variables\' subsets'
      return null
    },
    transformed () {
      if (this.error) return []
      let ref = this.data[0].plotData.lossValues
      return this.data.slice(1).map(x => {
        let variables = Object.entries(x.plotData.lossValues).slice(...this.pageRange)
        let points = variables.map(([variable, subsets]) => {
          return Object.entries(subsets).map(([subset, loss]) => {
            let point = { y: this.lolipopAxis.getPointRange(variable, subset, x.params.model).mid, x: loss - ref[variable][subset], label: subset }
            point.xref = point.x / ref[variable][subset]
            return point
          })
        }).flat()
        return { data: x, x: points.map(p => p.x), y: points.map(p => p.y), label: points.map(p => p.label), xref: points.map(p => p.xref) }
      })
    },
    traces () {
      return this.transformed.map(d => {
        return {
          name: d.data.params.model,
          type: 'scatter',
          mode: 'markers',
          x: d.x,
          y: d.y,
          customdata: d.xref,
          text: d.label,
          hovertemplate: '<b>%{text}</b><br>' + d.data.plotData.lossFunction + ': %{x:+.2f} (%{customdata:+.0%})',
          hoverlabel: {
            bgcolor: this.mainParamColors[d.data.params.model],
            font: { family: 'FiraSansBold', size: 16, color: 'white' }
          },
          marker: {
            color: this.mainParamColors[d.data.params.model],
            size: 8
          }
        }
      })
    },
    lolipopLines () {
      return this.transformed.map(d => {
        return d.x.map((x, i) => {
          return {
            type: 'line',
            x0: 0,
            x1: x,
            xref: 'x',
            y0: d.y[i],
            y1: d.y[i],
            yref: 'y',
            line: {
              color: this.mainParamColors[d.data.params.model],
              width: 1,
              dash: 'line'
            },
            layer: 'below'
          }
        })
      }).flat()
    },
    layout () {
      return {
        xaxis: {
          type: 'linear',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          showspikes: true,
          title: {
            text: 'Loss difference',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          range: this.lolipopAxis.getAxisRange(0.01).reverse(),
          gridwidth: 2,
          fixedrange: true,
          showspikes: false,
          zeroline: false,
          visible: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        showlegend: false,
        margin: { l: 5, t: 10, b: 45, r: 5 },
        dragmode: 'pan',
        hovermode: 'closest',
        shapes: Object.values(this.variables).slice(...this.pageRange).map(v => this.lolipopAxis.getFacetTitleRange(v)).map(range => {
          return {
            type: 'line',
            x0: 0,
            x1: 1,
            xref: 'paper',
            y0: range.mid,
            y1: range.mid,
            yref: 'y',
            line: {
              color: '#371ea3',
              width: 1,
              dash: 'dash'
            }
          }
        }).concat([
          {
            type: 'line',
            x0: 0,
            x1: 0,
            xref: 'x',
            y0: this.lolipopAxis.getHeaderRange().end,
            y1: this.lolipopAxis.axisLength,
            yref: 'y',
            line: {
              color: this.mainParamColors[this.data[0].params.model],
              width: 2,
              dash: 'line'
            }
          }
        ]).concat(this.lolipopLines),
        annotations: this.variables.slice(...this.pageRange).map(v => {
          return {
            x: 0.05,
            y: this.lolipopAxis.getFacetTitleRange(v).getRelativePoint(0.6),
            yanchor: 'middle',
            bgcolor: 'white',
            text: ' ' + format.formatTitle(v) + ' ',
            yref: 'y',
            xref: 'paper',
            showarrow: false
          }
        }).concat([
          {
            x: 0,
            y: this.lolipopAxis.getHeaderRange().mid,
            ay: 0,
            ax: 0,
            xanchor: 'middle',
            yanchor: 'middle',
            xref: 'x',
            yref: 'y',
            text: this.data[0].params.model,
            font: { color: this.mainParamColors[this.data[0].params.model] }
          }
        ])
      }
    },
    config () {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      }
    },
    ...mapGetters(['mainParamColors'])
  },
  components: {
    Plotly
  }
}
</script>
<style>
div.funnel-measure-plot > span.error {
  position: absolute;
  display: inline-block;
  top: 40%;
  left: 10%;
  width: 80%;
  text-align: center;
  z-index: 10;
  font-size: 20px;
  color: #371ea3;
}
div.funnel-measure-plot > div.page-button {
  position: absolute;
  top: 0;
  cursor: pointer;
  z-index: 10;
}
div.funnel-measure-plot > div.page-button:hover {
  color: #371ea8;
}
div.funnel-measure-plot > div.page-button.invisible {
  display: none;
}
div.funnel-measure-plot > div.page-left {
  left: 0;
}
div.funnel-measure-plot > div.page-right {
  right: 0;
}
</style>
