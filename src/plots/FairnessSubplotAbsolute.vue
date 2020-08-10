<template>
  <div class="fairness-subplot-absolute" v-resize:throttle.100="onResize">
    <Plotly v-if="traces.length > 0" v-bind="{ traces, config, layout }" ref="plot" @plotly_hover="onHover"/>
  </div>
</template>
<script>
import Resize from '@/utils/Resize.js'
import LolipopAxis from '@/utils/lolipopAxis.js'
import format from '@/utils/format.js'
import { mapGetters } from 'vuex'
const Plotly = () => import('@/components/Plotly.vue')
const scoring = [
  { name: 'STP   (TP + FP)/(TP + FP + TN + FN)', key: 'STP' },
  { name: 'TPR   TP/(TP + FN)', key: 'TPR' },
  { name: 'Accuracy    (TP + TN)/(TP + FP + TN + FN)', key: 'ACC' }
]

export default {
  name: 'FairnessSubplotAbsolute',
  mixins: [Resize],
  props: {
    data: Array,
    metrics: Array,
    privileged: String
  },
  computed: {
    subgroupsNames () {
      return [...new Set(this.data.map(d => Object.keys(d.plotData.subgroups)).flat())]
    },
    lolipopAxis () {
      return new LolipopAxis(scoring.map(s => s.name), this.data.map(d => d.params.model), this.subgroupsNames.filter(s => s !== this.privileged), 0.03, 0.03, 1)
    },
    reformated () {
      if (!this.metrics) return []
      return scoring.map((scoring, i) => {
        return this.subgroupsNames.filter(subgroup => subgroup !== this.privileged).map(subgroup => {
          return this.metrics.map((x, k) => {
            return {
              scoring: scoring.name,
              value: x[subgroup][scoring.key],
              privilegedValue: x[this.privileged][scoring.key],
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
          x0: d.privilegedValue,
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
    pointAnnotations () {
      return this.reformated.map(d => {
        return {
          x: d.value + 0.01 * Math.sign(d.value - d.privilegedValue),
          y: this.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid,
          text: format.formatTitle(d.subgroup),
          xref: 'x',
          yref: 'y',
          showarrow: false,
          xanchor: d.value > d.privilegedValue ? 'left' : 'right',
          font: {
            size: 10
          }
        }
      })
    },
    traces () {
      return this.reformated.map((d, i) => {
        return {
          name: d.subgroup,
          type: 'scatter',
          orientation: 'h',
          hovertemplate: '%{x:.2f}',
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
          range: [0, 1],
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
        margin: { l: 90, t: 0, b: 45, r: 5, pad: 10 },
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
            }
          ].concat(this.data.map((d, k) => {
            return {
              type: 'line',
              x0: this.metrics[k][this.privileged][s.key],
              x1: this.metrics[k][this.privileged][s.key],
              xref: 'x',
              y0: this.lolipopAxis.getFacetTitleRange(s.name).end,
              y1: this.lolipopAxis.getFacetRange(s.name).end,
              yref: 'y',
              layer: 'below',
              line: {
                color: this.mainParamColors[d.params.model],
                width: 2
              }
            }
          }))
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
          tickvals: this.lolipopAxis.getAxisTicks().ticks,
          ticktext: this.lolipopAxis.getAxisTicks().labels.map(x => format.addNewLines(format.formatTitle(x), 90)),
          showgrid: false,
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
    onHover (event) {
      if (!event || !event.data || !event.data.points || event.data.points.length === 0) return
      let curveNumber = event.data.points[0].curveNumber
      let model = this.reformated[curveNumber].model
      let subgroup = this.reformated[curveNumber].subgroup
      let toHover = this.reformated.map(r => r.subgroup === subgroup && r.model === model).map((x, i) => x ? i : null).filter(x => x !== null).map(curveNumber => {
        return {
          curveNumber,
          pointNumber: 0
        }
      })
      event.plotly.Fx.hover(event.plot, toHover)
    }
  },
  components: {
    Plotly
  }
}
</script>
<style>
</style>
