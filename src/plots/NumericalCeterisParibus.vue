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
          x: [...d.plotData.x, d.plotData.observation[d.plotData.variable]],
          y: [...d.plotData.y, d.plotData.observation['_yhat_']],
          hoverinfo: 'none',
          line: { shape: 'spline' },
          marker: {
            color: this.scopesColors.model[d.params.model]
          },
          transforms: [{
            type: 'sort',
            target: 'x',
            order: 'ascending'
          }]
        }, {
          name: d.params.model,
          type: 'scatter',
          mode: 'marker',
          x: [d.plotData.observation[d.plotData.variable]],
          y: [d.plotData.observation['_yhat_']],
          text: format.formatTitle(d.params.observation) + ': ' + format.formatValue(d.plotData.observation['_yhat_'], false, '', 3),
          hoverinfo: 'text',
          hoverlabel: {
            bgcolor: this.scopesColors.model[d.params.model],
            font: { family: 'FiraSansBold', size: 16, color: 'white' }
          },
          marker: {
            color: '#371ea3',
            size: 8
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
