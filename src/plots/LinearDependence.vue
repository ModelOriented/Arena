<template>
  <div class="linear-dependence-plot">
    <Plotly v-bind="{ traces, config, layout }" @plotly_click="onPlotlyClick" ref="plot"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import format from '@/utils/format.js'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'LinearDependence',
  props: {
    data: Array,
    plotType: String
  },
  computed: {
    traces () {
      return this.data.map((d, i) => {
        return {
          name: d.params.model.name + ' - ' + d.params.variable.name,
          type: 'scatter',
          mode: 'lines',
          x: d.plotData.x,
          y: d.plotData.y,
          hoverinfo: 'none',
          line: { shape: 'spline' },
          marker: {
            color: this.mainParamColors[d.params.model.uuid]
          }
        }
      })
    },
    layout () {
      return {
        xaxis: {
          type: 'linear',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          title: {
            text: this.data.length > 0 ? format.formatTitle(this.data[0].params.variable.name) : '',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          title: {
            text: this.plotType === 'AccumulatedDependence' ? 'Accumulated prediction' : 'Average prediction',
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
    ...mapGetters(['mainParamColors'])
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
