<template>
  <div class="numerical-cateris-paribus-plot">
    <Plotly v-bind="{ traces, config, layout }" @plotly_click="onPlotlyClick" ref="plot"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import format from '@/utils/format.js'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'NumericalCaterisParibus',
  props: {
    data: Array,
    plotType: String
  },
  computed: {
    traces () {
      return this.data.map((d, i) => {
        return [{
          name: d.params.model + ' - ' + d.params.variable,
          type: 'scatter',
          mode: 'lines',
          x: d.plotData.x,
          y: d.plotData.y,
          hoverinfo: 'none',
          line: { shape: 'spline' },
          marker: {
            color: this.mainParamColors[d.params.model]
          }
        }, {
          name: d.params.model + ' - ' + d.params.variable,
          type: 'scatter',
          mode: 'marker',
          x: [d.plotData.observation[d.plotData.variable]],
          y: [d.plotData.observation['_yhat_']],
          text: '<b>Prediction: ' + d.plotData.observation['_yhat_'] + '</b><br><br>' +
            Object.keys(d.plotData.observation)
              .filter(o => o.length > 0 && o.charAt(0) !== '_')
              .map(o => o + ': ' + d.plotData.observation[o])
              .join('<br>'),
          hoverinfo: 'text',
          marker: {
            color: '#371ea3',
            size: 8
          },
          hoverlabel: {
            bgcolor: 'rgba(0,0,0,0.5)',
            font: { family: 'FiraSansBold', size: 16, color: 'white' }
          }
        }]
      }).flat()
    },
    layout () {
      return {
        xaxis: {
          type: 'linear',
          gridwidth: 2,
          fixedrange: true,
          showspikes: true,
          zeroline: false,
          title: {
            text: this.data.length > 0 ? format.formatTitle(this.data[0].params.variable) : '',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          title: {
            text: 'prediction',
            standoff: 10
          },
          showspikes: true,
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
        dragmode: 'pan',
        hovermode: 'closest'
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
