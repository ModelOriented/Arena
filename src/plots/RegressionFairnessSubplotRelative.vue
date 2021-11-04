<template>
  <div class="fairness-subplot-relative" v-resize:throttle.100="onResize">
    <Plotly v-if="traces.length > 0" v-bind="{ traces, config, layout, layoutPatches }" ref="plot" @plotly_hover="onHover"/>
  </div>
</template>
<script>
import Resize from '@/utils/Resize.js'
import LolipopAxis from '@/utils/lolipopAxis.js'
import format from '@/utils/format.js'
import { mapGetters } from 'vuex'
const Plotly = () => import('@/components/Plotly.vue')
const epsilon = 0.8
const MAX_VALUE = 100000
const scoring = [
  { name: 'Independence', key: 'independence' },
  { name: 'Separation', key: 'separation' },
  { name: 'Sufficiency', key: 'sufficiency' }
]

export default {
  name: 'RegressionFairnessSubplotRelative',
  mixins: [Resize],
  props: {
    data: Array,
    privileged: String
  },
  computed: {
    subgroupsNames () {
      return [...new Set(this.data.map(d => Object.keys(d.plotData)).flat())]
    },
    lolipopAxis () {
      return new LolipopAxis(scoring.map(s => s.name), this.data.map(d => d.params.model), this.subgroupsNames.filter(s => s !== this.privileged), 0.03, 0.03, 1)
    },
    reformated () {
      if (!this.data) return []
      return scoring.map((scoring, i) => {
        return this.subgroupsNames.filter(subgroup => subgroup !== this.privileged).map(subgroup => {
          return this.data.map(d => {
            return {
              scoring: scoring.name,
              value: d.plotData[this.privileged][scoring.key][subgroup],
              subgroup,
              model: d.params.model
            }
          })
        }).flat()
      }).flat()
    },
    lolipopLines () {
      return this.reformated.map(d => {
        return {
          type: 'line',
          x0: 1,
          x1: d.value,
          xref: 'x',
          y0: this.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid,
          y1: this.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid,
          yref: 'y',
          line: {
            color: this.scopesColors.model[d.model],
            width: 1,
            dash: 'line'
          },
          layer: 'below'
        }
      }).filter(l => !isNaN(l.x1) && l.x1 < MAX_VALUE && l.x1 > 1 / MAX_VALUE)
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
            color: this.scopesColors.model[d.model],
            size: 8
          }
        }
      }).filter(d => !isNaN(d.x[0]) && d.x[0] > 1 / MAX_VALUE && d.x[0] < MAX_VALUE)
    },
    layout () {
      let layout = {
        xaxis: {
          type: 'log',
          title: {
            text: 'score',
            standoff: 10
          },
          range: this.range,
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
            },
            /* Unfair space */
            {
              type: 'rect',
              xref: 'x',
              yref: 'y',
              x0: 1 / MAX_VALUE,
              y0: this.lolipopAxis.getFacetTitleRange(s.name).end,
              x1: epsilon,
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
              x0: 1 / epsilon,
              y0: this.lolipopAxis.getFacetTitleRange(s.name).end,
              x1: MAX_VALUE,
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
              layer: 'above',
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
              x0: 1 / epsilon,
              y0: this.lolipopAxis.getFacetTitleRange(s.name).end,
              x1: 1 / epsilon,
              y1: this.lolipopAxis.getFacetRange(s.name).end,
              layer: 'above',
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
          ticktext: this.lolipopAxis.getAxisTicks().labels.map(x => format.addNewLines(format.formatTitle(x), 90)),
          fixedrange: true,
          showspikes: false,
          zeroline: false,
          visible: true
        }
      }
      return layout
    },
    layoutPatches () {
      return { 'xaxis.range': this.range }
    },
    minimalValue () {
      return Math.min(...this.reformated.map(d => {
        return Math.min(d.value, epsilon)
      }).filter(x => x > 1 / MAX_VALUE), epsilon)
    },
    maximalValue () {
      return Math.max(...this.reformated.map(d => {
        return Math.max(d.value, 1 / epsilon)
      }).filter(x => x < MAX_VALUE), 1 / epsilon)
    },
    dist () {
      let dist = Math.max(Math.abs(Math.log10(this.maximalValue)), Math.abs(Math.log10(this.minimalValue)))
      return dist
    },
    range () {
      let dist = Math.max(Math.abs(Math.log10(this.maximalValue)), Math.abs(Math.log10(this.minimalValue)))
      if (dist < 0.48) return [-0.49, 0.49]
      else if (dist < 1) return [-1.1, 1.1]
      else if (dist < 2) return [-2.1, 2.1]
      else if (dist < 3) return [-3.1, 3.1]
      else return [-4.1, 4.1]
    },
    config () {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      }
    },
    ...mapGetters(['scopesColors'])
  },
  methods: {
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
    Plotly
  }
}
</script>
<style>
</style>
