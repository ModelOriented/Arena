<template>
  <div class="fairness-plot" v-resize:throttle.100="onResize">
    <div class="options-container">
      <span class="label">Choose privileged variable and set cutoffs</span>
      <div class="cutoff-input" v-for="s in cutoffs" :key="s.subgroup">
        <span class="label">{{ s.subgroup }}</span>
        <div class="checkboxes">
          <font-awesome-icon v-if="privileged === s.subgroup" :icon="['fas', 'check-circle']"/>
          <font-awesome-icon v-else :icon="['far', 'circle']" @click="privileged = s.subgroup"/>
        </div>
        <Slider v-if="selectedCutoffs" :min="0" :max="1" :start="selectedCutoffs[s.subgroup]" :values="s.cutoffs" @update="setCutoff(s.subgroup, $event)"/>
      </div>
    </div>
    <Plotly v-if="traces.length > 0" v-bind="{ traces, config, layout }" ref="plot" class="plotly-container" @plotly_hover="onHover"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Slider from '@/components/Slider.vue'
import streams from '@/utils/streams.js'
import format from '@/utils/format.js'
import Resize from '@/utils/Resize.js'
import LolipopAxis from '@/utils/lolipopAxis.js'
const Plotly = () => import('@/components/Plotly.vue')
const epsilon = 0.1
const scoring = [
  { name: 'Statistical parity difference  (TP + FP)/(TP + FP + TN + FN)', key: 'STP' },
  { name: 'Equal opportynity difference    TP/(TP + FN)', key: 'TPR' },
  { name: 'Predictive equality difference  FP/(FP + TN)', key: 'FPR' },
  { name: 'Predictive parity difference    TP/(TP + FP)', key: 'PPV' },
  { name: 'Accuracy equality difference   (TP + TN)/(TP + FP + TN + FN)', key: 'ACC' }
]

export default {
  name: 'Fairness',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String
  },
  data () {
    return {
      privileged: null,
      selectedCutoffs: null
    }
  },
  watch: {
    cutoffs: {
      handler () {
        if (!this.cutoffs) this.selectedCutoffs = {}
        this.selectedCutoffs = this.cutoffs.reduce((acu, s) => {
          let diffs = s.cutoffs.map(cutoff => Math.abs(cutoff - 0.5))
          acu[s.subgroup] = s.cutoffs[diffs.indexOf(Math.min(...diffs))]
          return acu
        }, {})
        this.privileged = null
      },
      immediate: true
    }
  },
  computed: {
    subgroupsNames () {
      return [...new Set(this.data.map(d => Object.keys(d.plotData.subgroups)).flat())]
    },
    error () {
      return false
    },
    cutoffs () {
      return this.subgroupsNames.map(subgroup => {
        return {
          cutoffs: this.data.map(d => Object.keys(d.plotData.subgroups[subgroup])).reduce((acu, x) => acu.filter(y => x.includes(y))).map(x => Number.parseFloat(x)).sort(),
          subgroup
        }
      })
    },
    lolipopAxis () {
      return new LolipopAxis(scoring.map(s => s.name), this.data.map(d => d.params.model), this.subgroupsNames.filter(s => s !== this.privileged), 0.03, 0.03, 1)
    },
    metrics () {
      if (!this.privileged || !this.selectedCutoffs) return null
      return this.data.map(d => streams.runOnChildren(d.plotData.subgroups, (arr, key) => arr[this.selectedCutoffs[key]]))
    },
    scaledMetrics () {
      if (!this.metrics) return null
      return this.metrics.map(m => {
        return Object.entries(m).reduce((acu, [subgroup, metrics]) => {
          acu[subgroup] = streams.runOnChildren(metrics, (value, metricName) => value - m[this.privileged][metricName])
          return acu
        }, {})
      })
    },
    reformated () {
      if (!this.scaledMetrics) return []
      return scoring.map((scoring, i) => {
        return this.subgroupsNames.filter(subgroup => subgroup !== this.privileged).map(subgroup => {
          return this.scaledMetrics.map((x, k) => {
            return {
              scoring: scoring.name,
              value: x[subgroup][scoring.key],
              subgroup,
              model: this.data[k].params.model
            }
          })
        }).flat()
      }).flat()
    },
    lolipopLines () {
      return this.reformated.map(d => {
        return {
          type: 'line',
          x0: 0,
          x1: d.value,
          xref: 'x',
          y0: this.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid,
          y1: this.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid,
          yref: 'y',
          line: {
            color: this.mainParamColors[d.model],
            width: 1,
            dash: 'line'
          },
          layer: 'below'
        }
      })
    },
    traces () {
      return this.reformated.map(d => {
        return {
          name: d.model,
          type: 'scatter',
          orientation: 'h',
          hovertemplate: '%{x:+.2f}',
          y: [this.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid],
          x: [d.value],
          marker: {
            color: this.mainParamColors[d.model],
            size: 8
          }
        }
      })
    },
    layout () {
      let layout = {
        xaxis: {
          type: 'linear',
          title: {
            text: 'score',
            standoff: 10
          },
          range: [-1, 1],
          fixedrange: true,
          gridwidth: 2,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        hovermode: 'closest',
        showlegend: false,
        margin: { l: 80, t: 0, b: 45, r: 5, pad: 10 },
        dragmode: 'pan',
        shapes: scoring.map((s, i) => {
          return [
            /* Score name line */
            {
              type: 'line',
              x0: 0,
              x1: 1,
              xref: 'paper',
              y0: this.lolipopAxis.getFacetTitleRange(s.name).mid,
              y1: this.lolipopAxis.getFacetTitleRange(s.name).mid,
              yref: 'y',
              line: {
                color: '#371ea3',
                width: 1,
                dash: 'dash'
              }
            },
            /* Unfair space */
            {
              type: 'rect',
              xref: 'x',
              yref: 'y',
              x0: -1,
              y0: this.lolipopAxis.getFacetTitleRange(s.name).end,
              x1: -1 * epsilon,
              y1: this.lolipopAxis.getFacetRange(s.name).end,
              fillcolor: '#f05a71',
              opacity: 0.03,
              layer: 'below',
              line: { width: 0 }
            },
            {
              type: 'rect',
              xref: 'x',
              yref: 'y',
              x0: epsilon,
              y0: this.lolipopAxis.getFacetTitleRange(s.name).end,
              x1: 1,
              y1: this.lolipopAxis.getFacetRange(s.name).end,
              fillcolor: '#f05a71',
              opacity: 0.03,
              layer: 'below',
              line: { width: 0 }
            },
            /* Unfair space border */
            {
              type: 'line',
              xref: 'x',
              yref: 'y',
              x0: epsilon,
              y0: this.lolipopAxis.getFacetTitleRange(s.name).end,
              x1: epsilon,
              y1: this.lolipopAxis.getFacetRange(s.name).end,
              layer: 'below',
              line: {
                color: '#f05a71',
                width: 1,
                dash: 'dash'
              }
            },
            {
              type: 'line',
              xref: 'x',
              yref: 'y',
              x0: -1 * epsilon,
              y0: this.lolipopAxis.getFacetTitleRange(s.name).end,
              x1: -1 * epsilon,
              y1: this.lolipopAxis.getFacetRange(s.name).end,
              layer: 'below',
              line: {
                color: '#f05a71',
                width: 1,
                dash: 'dash'
              }
            }
          ]
        }).flat().concat(this.lolipopLines),
        annotations: scoring.map((s, i) => {
          return {
            x: 0.05,
            y: this.lolipopAxis.getFacetTitleRange(s.name).getRelativePoint(0.6),
            bgcolor: 'white',
            text: ' ' + format.formatTitle(s.name) + ' ',
            xref: 'paper',
            yref: 'y',
            showarrow: false
          }
        }),
        yaxis: {
          type: 'linear',
          range: this.lolipopAxis.getAxisRange(0.01).reverse(),
          showgrid: false,
          tickvals: this.lolipopAxis.getAxisTicks().ticks,
          ticktext: this.lolipopAxis.getAxisTicks().labels,
          fixedrange: true,
          showspikes: false,
          zeroline: false,
          visible: true
        }
      }
      return layout
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
  methods: {
    setCutoff (subgroup, value) {
      this.$set(this.selectedCutoffs, subgroup, value)
    },
    setPrivileged (subgroup) {
      this.privileged = subgroup
    },
    onHover (event) {
      if (!event || !event.data || !event.data.points || event.data.points.length === 0) return
      let curveNumber = event.data.points[0].curveNumber
      let model = this.reformated[curveNumber].model
      let subgroup = this.reformated[curveNumber].subgroup
      let toHover = this.reformated.map(r => r.model === model && r.subgroup === subgroup).map((x, i) => x ? i : null).filter(x => x !== null).map(curveNumber => {
        return {
          curveNumber,
          pointNumber: 0
        }
      })
      event.plotly.Fx.hover(event.plot, toHover)
    }
  },
  components: {
    Plotly, Slider
  }
}
</script>
<style>
div.fairness-plot > div.options-container {
  position: absolute;
  width: 220px;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  overflow-y: auto;
}
div.fairness-plot > div.options-container > span.label {
  font-size: 16px;
  color: #371ea3;
  width: 100%;
  display: inline-block;
  font-weight: 600;
  margin-bottom: 7px;
}
div.fairness-plot > div.options-container > div.cutoff-input {
  position: relative;
  padding-left: 15px;
}
div.fairness-plot > div.options-container > div.cutoff-input > div.checkboxes {
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  color: #371ea3;
}
div.fairness-plot > div.options-container > div.cutoff-input > span.label {
  font-size: 14px;
}
div.fairness-plot > div.plotly-container {
  position: absolute;
  left: 230px;
  width: calc(100% - 230px);
  height: 100%;
}
</style>
