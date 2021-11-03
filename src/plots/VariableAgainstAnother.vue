<template>
  <div class="variable-against-another-plot" v-resize:throttle.100="onResize">
    <Plotly v-bind="{ traces, config, layout }" ref="plot"/>
    <PlotDropdown v-if="axisVariable" :start="axisVariable" :values="variables" class="axis-dropdown" @update="setSecondaryVariable($event)"/>
  </div>
</template>
<script>
import Resize from '@/utils/Resize.js'
import PlotDropdown from '@/components/PlotDropdown.vue'
import format from '@/utils/format.js'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'VariableAgainstAnother',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data () {
    return {
      axisVariable: null
    }
  },
  watch: {
    variables: {
      handler () {
        if (!this.variables.includes(this.axisVariable)) this.axisVariable = this.variables[0]
      },
      immediate: true
    },
    customData: {
      handler (newValue) {
        if (!newValue) return
        if (this.variables.includes(newValue.secondaryVariable)) this.axisVariable = newValue.secondaryVariable
      },
      immediate: true
    }
  },
  computed: {
    variables () {
      if (this.data.length === 0) return []
      return Object.keys(this.data[0].plotData)
    },
    firstVariable () {
      if (this.data.length === 0) return ''
      return this.data[0].params.variable
    },
    subdata () {
      if (this.data.length === 0 || !this.axisVariable) return null
      return this.data[0].plotData[this.axisVariable]
    },
    colors () {
      return this.$store.getters.scopesColors['dataset']
    },
    axisTypes () {
      if (!this.subdata) return ['linear', 'linear']
      if (this.subdata.type === 'boxplots') {
        if (this.subdata.numerical === 'first') return ['linear', 'category']
        else return ['category', 'linear']
      } else if (this.subdata.type === 'table') {
        return ['category', 'category']
      }
      return ['linear', 'linear']
    },
    xAxisMargin () {
      if (this.axisTypes[0] === 'linear') return 40
      return 40 + Math.max(...this.traces[0].x.map(x => x.split('<br>').length)) * 16
    },
    traces () {
      if (!this.subdata) return []
      let d = this.data[0]
      let trace = {}
      if (this.subdata.type === 'boxplots') {
        let firstNumerical = this.subdata.numerical === 'first'
        let numerical = this.subdata[firstNumerical ? 'first' : 'secondary']
        let categorical = this.subdata[firstNumerical ? 'secondary' : 'first']
        trace = {
          name: d.params.dataset,
          type: 'box',
          orientation: firstNumerical ? 'h' : 'v',
          q1: numerical.map(x => x.q1),
          q3: numerical.map(x => x.q3),
          median: numerical.map(x => x.median),
          pointpos: 0,
          jitter: 1,
          line: {
            width: 1,
            color: this.colors[d.params.dataset]
          },
          lowerfence: numerical.map(x => x.lf),
          upperfence: numerical.map(x => x.uf),
          showlegend: false
        }
        if (!firstNumerical) {
          trace['x'] = categorical.map(x => format.addNewLines(x, 0.7 * this.width / this.subdata.first.length))
        } else {
          trace['y'] = categorical.map(x => format.addNewLines(x, 100))
        }
        trace[firstNumerical ? 'x' : 'y'] = numerical.map(x => Array.isArray(x.outliers) ? x.outliers : [x.outliers]).map(x => x.length === 0 ? [Math.inf] : x)
      } else if (this.subdata.type === 'table') {
        const transpose = m => m[0].map((x, i) => m.map(x => x[i]))
        trace = {
          name: d.params.dataset,
          z: transpose(this.subdata.counts),
          x: this.subdata.first.map(x => format.addNewLines(x, 0.7 * this.width / this.subdata.first.length)),
          y: this.subdata.secondary.map(x => format.addNewLines(x, 100)),
          type: 'heatmap',
          hovertemplate: format.formatTitle(this.axisVariable) + ': %{y}<br>' + format.formatTitle(this.firstVariable) + ': %{x}<br>Count: <b>%{z}</b><extra></extra>',
          hoverongaps: false,
          colorscale: [[0, '#c7f5bf'], [0.25, '#8bdcbe'], [0.5, '#46bac2'], [0.75, '#4378bf'], [1, '#371ea3']]
        }
      } else if (this.subdata.type === 'scatter') {
        trace = {
          y: this.subdata.secondary,
          x: this.subdata.first,
          type: 'scatter',
          mode: 'markers',
          hovertemplate: format.formatTitle(this.axisVariable) + ': %{y}<br>' + format.formatTitle(this.firstVariable) + ': %{x}<extra></extra>',
          marker: {
            width: 1,
            color: this.colors[d.params.dataset]
          }
        }
      }
      return [trace]
    },
    heatmapAnnotations () {
      if (!this.subdata || this.subdata.type !== 'table') return []
      let max = Math.max(...this.subdata.counts.flat())
      return this.subdata.secondary.map((y, yi) => {
        return this.subdata.first.map((x, xi) => {
          return {
            xref: 'x',
            yref: 'y',
            x: format.addNewLines(x, 0.7 * this.width / this.subdata.first.length),
            y: format.addNewLines(y, 100),
            text: this.subdata.counts[xi][yi],
            showarrow: false,
            font: {
              color: this.subdata.counts[xi][yi] > (0.7 * max) ? '#8bdcbe' : '#371ea8'
            }
          }
        })
      }).flat()
    },
    layout () {
      return {
        yaxis: {
          type: this.axisTypes[1],
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          title: {
            text: format.formatTitle(this.axisVariable),
            standoff: 10
          }
        },
        xaxis: {
          type: this.axisTypes[0],
          title: {
            text: format.formatTitle(this.firstVariable),
            standoff: 10
          },
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          tickangle: 0
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        hovermode: 'closest',
        showlegend: false,
        margin: {
          l: this.axisTypes[1] === 'linear' ? 60 : 130,
          t: 15,
          b: this.xAxisMargin,
          r: 5
        },
        dragmode: 'pan',
        annotations: this.heatmapAnnotations
      }
    },
    customData () {
      return this.slotv.customData
    },
    config () {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      }
    }
  },
  methods: {
    setSecondaryVariable (v) {
      this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...this.customData, secondaryVariable: v } })
    }
  },
  components: {
    Plotly, PlotDropdown
  }
}
</script>
<style>
div.variable-against-another-plot > .axis-dropdown {
  position: absolute;
  right: 0px;
  top: -10px;
}
</style>
