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
          name: d.params.model + ' - ' + d.params.variable,
          type: 'scatter',
          mode: this.plotType === 'ShapleyValuesDependence' ? 'markers' : (d.plotData.x.length > 20 ? 'lines' : 'lines+markers'),
          x: d.plotData.x,
          y: d.plotData.y,
          hoverinfo: 'none',
          line: { shape: 'linear' },
          marker: {
            color: this.scopesColors.model[d.params.model]
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
          showspikes: true,
          title: {
            text: this.data.length > 0 ? format.formatTitle(this.data[0].params.variable) : '',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          showspikes: true,
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
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      }
    },
    ...mapGetters(['scopesColors'])
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
