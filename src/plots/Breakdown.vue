<template>
  <div class="breakdown-plot" v-resize:throttle.100="onResize">
    <Plotly v-bind="{ traces, config, layout, layoutPatches }" @plotly_click="onPlotlyClick" ref="plot"/>
    <SelectMenu :options="selectOptions" :style="selectStyle" v-if="selectVisible" v-model="selectVisible"/>
  </div>
</template>
<script>
import Resize from '@/utils/Resize.js'
import format from '@/utils/format.js'
import SelectMenu from '@/components/SelectMenu.vue'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'Breakdown',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String
  },
  data () {
    return {
      selectOptions: [
        {
          name: 'Set variable',
          handler: () => {
            this.$store.commit('setGlobalParam', { name: 'variable', value: this.selectedVariable })
          }
        },
        {
          name: 'Open Ceteris Paribus',
          handler: () => {
            if (!this.selectedVariable || !this.selectedModel) return
            this.$store.commit('addSlot', {
              name: 'Ceteris Paribus',
              plotType: 'CeterisParibus',
              localParams: [{ model: this.selectedModel, variable: this.selectedVariable, observation: this.selectedObservation }]
            })
          }
        }
      ],
      selectedVariable: null,
      selectedModel: null,
      selectedObservation: undefined,
      selectStyle: null,
      selectVisible: false
    }
  },
  computed: {
    trimmed () {
      return this.data.map(d => {
        if (d.plotData.contribution.length <= this.maxVariables) return d
        return Object.assign({}, d, {
          plotData: {
            contribution: [...d.plotData.contribution.slice(0, this.maxVariables), d.plotData.contribution.slice(this.maxVariables).reduce((a, b) => a + b, 0)],
            variables: [...d.plotData.variables.slice(0, this.maxVariables), '+ All other variables'],
            variables_value: [...d.plotData.variables_value.slice(0, this.maxVariables), undefined],
            intercept: d.plotData.intercept,
            prediction: d.plotData.prediction
          }
        })
      })
    },
    traces () {
      return this.trimmed.map(d => {
        return {
          name: d.params.model.name,
          type: 'waterfall',
          orientation: 'h',
          measure: ['relative', ...d.plotData.variables.map(y => 'relative'), 'total'],
          y: ['Intercept', ...d.plotData.variables.map((y, i) => {
            let value = d.plotData.variables_value[i]
            return value === undefined ? y : format.addNewLines(format.formatTitle(y) + ' = ' + value, this.leftMargin)
          }), 'Prediction'],
          base: d.plotData.intercept,
          x: [0, ...d.plotData.contribution, d.plotData.prediction],
          text: [format.formatValue(d.plotData.intercept, false, ' '), ...d.plotData.contribution.map(x => format.formatValue(x, true, ' ')), format.formatValue(d.plotData.prediction, false, ' ')],
          textposition: 'outside',
          hovertext: ['Intercept', ...d.plotData.variables, 'Prediction'],
          hoverinfo: 'text+delta',
          hoverlabel: {
            bgcolor: 'rgba(0,0,0,0.5)',
            font: { family: 'FiraSansBold', size: 16, color: 'white' }
          },
          connector: {
            mode: 'spanning',
            line: { width: 2, color: 'black', dash: 0 }
          },
          increasing: { marker: { color: '#8bdcbe' } },
          decreasing: { marker: { color: '#f05a71' } },
          totals: { marker: { color: '#371ea3' } }
        }
      })
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
            text: 'contribution',
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
        showlegend: false,
        margin: { l: this.leftMargin, t: 0, b: 45, r: 5 },
        shapes: this.data.map(d => {
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
              width: 1,
              dash: 'dot'
            }
          }
        }),
        dragmode: 'pan'
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
    minimalValue () {
      return Math.min(...this.trimmed.map(d => {
        // eslint-disable-next-line no-return-assign
        let cumSum = (sum => value => sum += value)(d.plotData.intercept)
        return Math.min(...d.plotData.contribution.map(cumSum), d.plotData.intercept)
      }))
    },
    maximalValue () {
      return Math.max(...this.trimmed.map(d => {
        // eslint-disable-next-line no-return-assign
        let cumSum = (sum => value => sum += value)(d.plotData.intercept)
        return Math.max(...d.plotData.contribution.map(cumSum), d.plotData.intercept)
      }))
    },
    range () {
      let len = this.maximalValue - this.minimalValue
      // margin = 1/2 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )
      let margin = 0.5 * 120 * len / (this.width - 120 - this.leftMargin - 5)
      return [this.minimalValue - margin, this.maximalValue + margin]
    },
    layoutPatches () {
      return { 'xaxis.range': this.range, 'margin.l': this.leftMargin }
    },
    maxVariables () { return this.$store.getters.getOption('breakdown_max_variables') },
    leftMargin () { return this.$store.getters.getOption('left_margin') }
  },
  methods: {
    onPlotlyClick (e) {
      let event = e.data.event
      if (e.data.points.length !== 1) return
      let curve = e.data.points[0].curveNumber
      let variable = e.data.points[0].pointNumber - 1 // first is intercept
      if (variable < 0 || variable >= this.trimmed[curve].plotData.variables.length) return // prediction
      if (this.trimmed[curve].plotData.variables_value[variable] === undefined) return // All other variables
      this.selectStyle = { left: event.pointerX + 'px', top: event.pointerY + 'px' }
      let variableName = this.data[curve].plotData.variables[variable]
      this.selectedVariable = this.$store.getters.availableParams.variable.find(v => v.name === variableName)
      this.selectedModel = this.data[curve].params.model
      this.selectedObservation = this.data[curve].params.observation
      this.selectVisible = true
    }
  },
  components: {
    Plotly, SelectMenu
  }
}
</script>
<style>
div.breakdown-plot {
  position: relative;
}
</style>
