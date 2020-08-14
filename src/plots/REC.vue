<template>
  <div class="rec-plot">
    <Plotly v-bind="{ traces, config, layout }" ref="plot"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'REC',
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
          x: d.plotData.tolerance,
          y: d.plotData.quantity,
          hovertemplate: '<b>Error tolerance:</b> %{x:.2f}<br><b>Observations:</b> %{y:,.1%}',
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
            text: 'Error tolerance',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          title: {
            text: 'Observations percentage',
            standoff: 10
          },
          range: [0, 1],
          gridwidth: 2,
          fixedrange: true,
          showspikes: true,
          zeroline: false,
          tickformat: ',.0%'
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        showlegend: false,
        margin: { l: 60, t: 10, b: 45, r: 5 },
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
    ...mapGetters(['scopesColors'])
  },
  components: {
    Plotly
  }
}
</script>
<style>
</style>
