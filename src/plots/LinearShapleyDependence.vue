<template>
  <div class="linear-shapley-dependence-plot">
    <Plotly v-bind="{ traces, config, layout }" @plotly_click="onPlotlyClick" ref="plot"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import format from '@/utils/format.js'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'LinearShapleyDependence',
  props: {
    data: Array,
    plotType: String
  },
  computed: {
    traces () {
      return this.data.map((d, i) => {
        return {
          name: d.params.model + ' - ' + d.params.variable,
          type: 'scatter',
          mode: 'markers',
          x: d.plotData.x.map(x => x + 0.001 * this.getOption('shapley_dependence_jitter') * (this.range[1] - this.range[0]) * (Math.random() - 0.5)),
          y: d.plotData.mean,
          hoverinfo: 'none',
          marker: {
            color: this.scopesColors.model[d.params.model]
          },
          error_y: this.getOption('shapley_dependence_error_bar') ? {
            type: 'data',
            symmetric: false,
            array: d.plotData.max.map((y, j) => y - d.plotData.mean[j]),
            arrayminus: d.plotData.min.map((y, j) => d.plotData.mean[j] - y),
            thickness: 0.4
          } : undefined
        }
      })
    },
    range () {
      let x = this.data.map(d => d.plotData.x).flat()
      return [Math.min(...x), Math.max(...x)]
    },
    layout () {
      return {
        xaxis: {
          type: 'linear',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          title: {
            text: this.data.length > 0 ? format.formatTitle(this.data[0].params.variable) : '',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          title: {
            text: 'Contribution',
            standoff: 10
          },
          gridwidth: 2,
          fixedrange: true,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        showlegend: false,
        margin: { l: 60, t: 0, b: 45, r: 5 },
        dragmode: 'pan'
      }
    },
    config () {
      return {
        displaylogo: false,
        displayModeBar: true,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      }
    },
    ...mapGetters(['scopesColors', 'getOption'])
  },
  methods: {
    onPlotlyClick () {

    }
  },
  components: {
    Plotly
  }
}
</script>
<style>
</style>
