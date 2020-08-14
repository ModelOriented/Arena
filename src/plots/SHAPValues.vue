<template>
  <div class="shap-values-plot" v-resize:throttle.100="onResize">
    <Plotly v-bind="{ traces, config, layout, layoutPatches }" @plotly_click="onPlotlyClick" ref="plot"/>
  </div>
</template>
<script>
import Resize from '@/utils/Resize.js'
import format from '@/utils/format.js'
import { mapGetters } from 'vuex'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'SHAPValues',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String
  },
  data () {
    return {
      selectedModel: null
    }
  },
  computed: {
    trimmed () {
      let variables = new Set(this.data.map(d => d.plotData.variables.slice(0, this.maxVariables)).flat())
      return this.data.map(d => {
        if (d.plotData.variables.length <= this.maxVariables) return d
        let filter = (v, i) => variables.has(d.plotData.variables[i])
        return Object.assign({}, d, {
          plotData: {
            variables_value: d.plotData.variables_value.filter(filter),
            variables: d.plotData.variables.filter(filter),
            mean: d.plotData.mean.filter(filter),
            min: d.plotData.min.filter(filter),
            max: d.plotData.max.filter(filter),
            q1: d.plotData.q1.filter(filter),
            q3: d.plotData.q3.filter(filter),
            intercept: d.plotData.intercept
          }
        })
      })
    },
    traces () {
      return this.trimmed.map((d, i) => {
        return {
          name: d.params.model,
          type: 'bar',
          orientation: 'h',
          y: d.plotData.variables.map((y, i) => format.addNewLines(format.formatTitle(y) + ' = ' + d.plotData.variables_value[i], this.leftMargin)),
          base: d.plotData.intercept,
          x: d.plotData.mean,
          text: d.plotData.mean.map(x => format.formatValue(x, true, '  ')),
          textposition: this.displayBoxplots ? 'inside' : 'outside',
          hovertext: d.plotData.variables,
          textfont: {
            color: this.displayBoxplots ? 'white' : '#371ea3'
          },
          hoverinfo: 'template',
          hovertemplate: d.plotData.mean.map((x, i) => format.formatValue(d.plotData.intercept) + ' => ' + format.formatValue(x + d.plotData.intercept)),
          hoverlabel: {
            bgcolor: this.scopesColors.model[d.params.model],
            font: { family: 'FiraSansBold', size: 16, color: 'white' }
          },
          marker: {
            color: this.scopesColors.model[d.params.model]
          },
          insidetextanchor: 'start',
          selectedpoints: (this.selectedModel === d.params.model || this.selectedModel === null) ? undefined : [] // undefined - all selected, [] - all unselected
        }
      }).concat(!this.displayBoxplots ? [] : this.trimmed.map((d, i) => {
        return {
          name: d.params.model,
          type: 'box',
          orientation: 'h',
          y: d.plotData.variables.map((y, i) => format.addNewLines(format.formatTitle(y) + ' = ' + d.plotData.variables_value[i], this.leftMargin)),
          q1: d.plotData.q1.map(v => v + d.plotData.intercept),
          median: d.plotData.q1.map(v => v + d.plotData.intercept), // median is invisible, but need to be between q1 and q3
          q3: d.plotData.q3.map(v => v + d.plotData.intercept),
          marker: {
            color: (this.selectedModel === d.params.model || this.selectedModel === null) ? '#371ea3' : 'transparent'
          },
          line: {
            width: 1
          },
          fillcolor: (this.selectedModel === d.params.model || this.selectedModel === null) ? '#371ea3' : 'transparent',
          lowerfence: d.plotData.min.map(v => v + d.plotData.intercept),
          upperfence: d.plotData.max.map(v => v + d.plotData.intercept),
          showlegend: false,
          hoverinfo: 'none',
          whiskerwidth: 0
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
        hovermode: 'closest',
        boxmode: 'group',
        boxgap: 0.2,
        boxgroupgap: 0.6,
        bargap: 0.2,
        showlegend: false,
        margin: { l: this.leftMargin, t: 0, b: 45, r: 5 },
        dragmode: 'pan',
        shapes: this.trimmed.map(d => {
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
        })
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
      return Math.min(...this.trimmed.map(d => {
        return Math.min(...d.plotData.min, 0) + d.plotData.intercept
      }))
    },
    maximalValue () {
      return Math.max(...this.trimmed.map(d => {
        return Math.max(...d.plotData.max, 0) + d.plotData.intercept
      }))
    },
    range () {
      let len = this.maximalValue - this.minimalValue
      // margin = 0.5 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )
      let margin = 0.5 * 120 * len / (this.width - 120 - this.leftMargin - 5)
      return [this.minimalValue - margin, this.maximalValue + margin]
    },
    layoutPatches () {
      return { 'xaxis.range': this.range, 'margin.l': this.leftMargin }
    },
    maxVariables () { return this.$store.getters.getOption('shapvalues_max_variables') },
    leftMargin () { return this.$store.getters.getOption('left_margin') },
    displayBoxplots () { return this.$store.getters.getOption('shapvalues_boxplots') },
    ...mapGetters(['scopesColors'])
  },
  methods: {
    onPlotlyClick (e) {
      let points = e.data.points.filter(p => p.curveNumber < this.trimmed.length) // Boxplots are after all bars
      if (points.length === 0) return
      let yaxis = points[0].yaxis // All points have the same
      // I do not know why it works, I just found this by experiments
      let barWidth = (yaxis._length - yaxis._m - yaxis._b) / (this.trimmed.length * yaxis._categories.length)
      let barsTop = yaxis.d2p(points[0].y) - (0.5 * barWidth * this.trimmed.length) // Center - half of widths sum
      let curveNum = Math.floor((e.data.event.pointerY - barsTop) / barWidth) // Assuming plot is at top:0
      if (curveNum >= this.trimmed.length || curveNum < 0) return
      let model = this.trimmed[curveNum].params.model
      // If this model is already selected, then unselect
      this.selectedModel = this.selectedModel === model ? null : model
    }
  },
  components: {
    Plotly
  }
}
</script>
<style>
</style>
