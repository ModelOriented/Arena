<template>
  <div class="funnel-measure-plot">
    <span class="error" v-if="error">{{ error }}</span>
    <Plotly v-else v-bind="{ traces, config, layout }" ref="plot"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'FunnelMeasure',
  props: {
    data: Array,
    plotType: String
  },
  computed: {
    variables () {
      return [...new Set(this.data.map(x => Object.keys(x.plotData.lossValues)).flat())]
    },
    subsets () {
      return this.variables.reduce((acu, variable) => {
        acu[variable] = [...new Set(this.data.map(x => Object.keys(x.plotData.lossValues[variable])).flat())]
        return acu
      }, {})
    },
    axisUnit () {
      return 1 / (this.variables.reduce((acu, v) => acu + this.subsets[v].length + 2, 0) + 2)
    },
    variableOffset () {
      let lengths = this.variables.map(v => this.subsets[v].length + 2)
      let cumsum = lengths.reduce((acu, len) => [...acu, acu[acu.length - 1] + len], [2])
      return this.variables.reduce((acu, v, i) => {
        acu[v] = cumsum[i] * this.axisUnit
        return acu
      }, {})
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
        let variables = Object.entries(x.plotData.lossValues)
        let points = variables.map(entry => {
          return Object.entries(entry[1]).map(e => {
            let offset = this.variableOffset[entry[0]] + ((this.subsets[entry[0]].indexOf(e[0]) + 2) * this.axisUnit)
            let point = { y: offset, x: e[1] - ref[entry[0]][e[0]], label: e[0] }
            point.xref = point.x / ref[entry[0]][e[0]]
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
          title: {
            standoff: 10
          },
          range: [1.01, -0.01],
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
        margin: { l: 60, t: 10, b: 45, r: 5 },
        dragmode: 'pan',
        hovermode: 'closest',
        shapes: Object.values(this.variableOffset).map(off => {
          return {
            type: 'line',
            x0: 0,
            x1: 1,
            xref: 'paper',
            y0: off,
            y1: off,
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
            y0: 0,
            y1: 1,
            yref: 'paper',
            line: {
              color: this.mainParamColors[this.data[0].params.model],
              width: 2,
              dash: 'line'
            }
          }
        ]).concat(this.lolipopLines),
        annotations: Object.entries(this.variableOffset).map(x => {
          return {
            x: 0,
            y: x[1] + this.axisUnit,
            text: x[0],
            xref: 'paper',
            yref: 'y',
            showarrow: false
          }
        }).concat([
          {
            x: 0,
            y: this.axisUnit,
            ay: -10,
            ax: 50,
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
</style>
