<template>
  <div class="shapley-values-variable-importance-plot" v-resize:throttle.100="onResize">
    <Plotly v-bind="{ traces, config, layout, layoutPatches }" ref="plot"/>
    <div class="axis-type-input">
      <span v-for="t in axisTypes" :key="t" :class="{ active: axisType === t }" @click="setAxisType(t)">{{ t }}</span>
    </div>
  </div>
</template>
<script>
import Resize from '@/utils/Resize.js'
import OptionsMixin from '@/utils/OptionsMixin.js'
import format from '@/utils/format.js'
import { mapGetters } from 'vuex'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'ShapleyValuesVariableImportance',
  mixins: [Resize, OptionsMixin],
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data () {
    return {
      axisType: null
    }
  },
  watch: {
    axisTypes: {
      handler () {
        if (this.customData && this.axisTypes.includes(this.customData.axisType)) {
          this.axisType = this.customData.axisType
        } else {
          this.setAxisType(this.axisTypes[0])
        }
      },
      immediate: true
    },
    customData: {
      handler (newValue) {
        if (!newValue) return
        if (this.axisTypes.includes(newValue.axisType)) this.axisType = newValue.axisType
      },
      immediate: true
    }
  },
  methods: {
    setAxisType (v) {
      this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...this.customData, axisType: v } })
    }
  },
  filters: {
    firstUpper: format.firstCharUpper
  },
  computed: {
    customData () {
      return this.slotv.customData
    },
    axisTypes () {
      return ['|Contribution|', 'Scaled |Contribution|']
    },
    trimmed () {
      let variables = new Set(this.data.map(d => d.plotData.variables.slice(0, this.maxVariables)).flat())
      return this.data.map(d => {
        if (d.plotData.variables.length <= this.maxVariables) return d
        let filter = (v, i) => variables.has(d.plotData.variables[i])
        return Object.assign({}, d, {
          plotData: {
            ...['variables', 'mean', 'median', 'min', 'max', 'q1', 'q3', 'lf', 'uf'].reduce((acu, key) => ({ ...acu, [key]: d.plotData[key].filter(filter) }), {}),
            outliers: d.plotData.outliers,
            intercept: d.plotData.intercept
          }
        })
      })
    },
    transformed () {
      return this.trimmed.map(d => {
        let div = this.axisType === 'Scaled |Contribution|' ? Math.max(...d.plotData.mean) : 1
        let mapping = (x) => x / div
        return {
          ...d,
          plotData: {
            ...d.plotData,
            ...['mean', 'median', 'min', 'max', 'q1', 'q3', 'lf', 'uf'].reduce((acu, key) => ({ ...acu, [key]: d.plotData[key].map(mapping) }), {}),
            outliers: Object.entries(d.plotData.outliers).map(([v, outliers]) => ([v, outliers.map(mapping)])).reduce((acu, x) => ({ ...acu, [x[0]]: x[1] }), {}),
            intercept: this.axisType !== '|Contribution|' ? 0 : d.plotData.intercept
          }
        }
      })
    },
    variables () {
      return [...new Set(this.transformed.map(d => d.plotData.variables).flat())]
    },
    traces () {
      return this.transformed.map((d, i) => {
        return {
          name: d.params.model,
          type: 'bar',
          orientation: 'h',
          y: d.plotData.variables.map(y => format.addNewLines(y, this.leftMargin)),
          x: d.plotData.mean,
          base: d.plotData.intercept,
          text: this.displayBoxplots ? '' : d.plotData.mean.map(x => format.formatValue(x, true, '  ')),
          textposition: 'outside',
          hovertext: d.plotData.variables,
          textfont: {
            color: this.displayBoxplots ? 'white' : '#371ea3'
          },
          hoverinfo: 'template',
          hovertemplate: d.plotData.mean.map((x, i) => format.formatValue(x)),
          hoverlabel: {
            bgcolor: this.scopesColors.model[d.params.model],
            font: { family: 'FiraSansBold', size: 16, color: 'white' }
          },
          marker: {
            color: this.scopesColors.model[d.params.model]
          },
          insidetextanchor: 'start'
        }
      }).concat(!this.displayBoxplots ? [] : this.transformed.map((d, i) => {
        const addIntercept = x => x === null ? null : x + d.plotData.intercept
        return {
          name: d.params.model,
          type: 'box',
          orientation: 'h',
          y: d.plotData.variables.map(y => format.addNewLines(y, this.leftMargin)),
          x: d.plotData.variables.map(v => (d.plotData.outliers[v] || [null]).map(addIntercept)),
          q1: d.plotData.q1.map(addIntercept),
          median: d.plotData.median.map(addIntercept),
          q3: d.plotData.q3.map(addIntercept),
          marker: {
            color: '#371ea3'
          },
          line: {
            width: 1
          },
          fillcolor: '#371ea3',
          lowerfence: d.plotData.lf.map(addIntercept),
          upperfence: d.plotData.uf.map(addIntercept),
          showlegend: false,
          pointpos: 0,
          hoverinfo: 'none',
          whiskerwidth: 0.5
        }
      }))
    },
    layout () {
      return {
        yaxis: {
          type: 'category',
          autorange: 'reversed',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false
        },
        xaxis: {
          type: 'linear',
          title: {
            text: '',
            standoff: 10
          },
          gridwidth: 2,
          range: this.range,
          fixedrange: true,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        hovermode: 'closest',
        boxgap: 0.2,
        boxgroupgap: 0.6,
        bargap: 0.2,
        boxmode: 'group',
        showlegend: false,
        margin: { l: this.leftMargin, t: 0, b: 45, r: 5 },
        dragmode: 'pan',
        shapes: this.transformed.map(d => {
          return {
            type: 'line',
            x0: d.plotData.intercept,
            x1: d.plotData.intercept,
            y0: 0,
            y1: 1,
            yref: 'paper',
            xref: 'x',
            line: {
              color: 'black',
              width: 2,
              dash: 'dot'
            }
          }
        }),
        annotations: this.displayBoxplots ? this.variables.map((v, vi) => {
          return this.transformed.map((d, di) => {
            if (!d.plotData.variables.includes(v)) return
            const bargap = 0.2
            const margin = 0.5 * bargap / this.variables.length
            const barWidth = (1 - bargap) / (this.variables.length * this.transformed.length)
            const groupWidth = 1 / this.variables.length
            const mean = d.plotData.mean[d.plotData.variables.indexOf(v)]
            return {
              x: d.plotData.intercept,
              y: 1 - (margin + (vi * groupWidth) + ((di + 0.5) * barWidth)),
              yanchor: 'middle',
              xanchor: mean >= 0 ? 'right' : 'left',
              text: '   ' + format.formatValue(mean, 'true') + '   ',
              yref: 'paper',
              xref: 'x',
              showarrow: false
            }
          })
        }).flat().filter(x => x) : []
      }
    },
    config () {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d2', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      }
    },
    minimalValue () {
      return Math.min(...this.transformed.map(d => {
        return Math.min(...d.plotData[this.displayBoxplots ? 'min' : 'mean'], 0) + d.plotData.intercept
      }))
    },
    maximalValue () {
      return Math.max(...this.transformed.map(d => {
        return Math.max(...d.plotData[this.displayBoxplots ? 'max' : 'mean'], 0) + d.plotData.intercept
      }))
    },
    range () {
      let len = this.maximalValue - this.minimalValue
      // margin = 0.5 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )
      let totalMarginInPixels = this.displayBoxplots ? 180 : 100
      let margin = 0.5 * totalMarginInPixels * len / (this.width - totalMarginInPixels - this.leftMargin - 5)
      return [this.minimalValue - margin, this.maximalValue + margin]
    },
    layoutPatches () {
      return { 'xaxis.range': this.range, 'margin.l': this.leftMargin }
    },
    maxVariables () { return this.getOption('featureimportance_max_variables') },
    leftMargin () { return this.getOption('left_margin') },
    displayBoxplots () { return this.getOption('featureimportance_boxplots') },
    ...mapGetters(['scopesColors'])
  },
  components: {
    Plotly
  }
}
</script>
<style>
div.shapley-values-variable-importance-plot > div.axis-type-input {
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-family: 'FiraSansBold';
  white-space: nowrap;
}
div.shapley-values-variable-importance-plot > div.axis-type-input > span {
  padding: 0 5px;
  color: #777;
  cursor: pointer;
}
div.shapley-values-variable-importance-plot > div.axis-type-input > span.active {
  color: #371ea3;
}
</style>
