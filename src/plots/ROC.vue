<template>
  <div class="roc-plot">
    <Plotly v-bind="{ traces, config, layout }" @plotly_click="onPlotlyClick" ref="plot"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'ROC',
  props: {
    data: Array,
    plotType: String
  },
  computed: {
    traces () {
      return this.data.map((d, i) => {
        return {
          name: d.params.model,
          type: 'scatter',
          mode: 'lines',
          x: d.plotData.specifity,
          y: d.plotData.sensivity,
          text: d.plotData.cutoff,
          hovertemplate: '<b>Specifity:</b> %{x:.3f}<br><b>Sensivity:</b> %{y:.3f}<br><b>Cutoff:</b> %{text:.3f}',
          marker: {
            color: this.mainParamColors[d.params.model]
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
          range: [1.01, -0.01],
          title: {
            text: 'Specifity',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          title: {
            text: 'Sensivity',
            standoff: 10
          },
          range: [-0.01, 1.01],
          gridwidth: 2,
          fixedrange: true,
          showspikes: true,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        showlegend: false,
        margin: { l: 60, t: 10, b: 45, r: 5 },
        dragmode: 'pan',
        hovermode: 'closest',
        shapes: [{
          type: 'line',
          x0: 1,
          x1: 1,
          y0: 0,
          y1: 1,
          yref: 'y',
          xref: 'x',
          line: {
            color: 'black',
            width: 2,
            dash: 'dot'
          }
        }, {
          type: 'line',
          x0: 0,
          x1: 1,
          y0: 1,
          y1: 1,
          yref: 'y',
          xref: 'x',
          line: {
            color: 'black',
            width: 2,
            dash: 'dot'
          }
        }]
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
  components: {
    Plotly
  }
}
</script>
<style>
</style>
