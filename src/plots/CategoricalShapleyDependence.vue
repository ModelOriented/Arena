<template>
  <div class="categorical-shapley-dependence-plot" v-resize:throttle.100="onResize">
    <Plotly v-bind="{ traces, config, layout, layoutPatches }" ref="plot"/>
  </div>
</template>
<script>
import Resize from '@/utils/Resize.js'
import format from '@/utils/format.js'
import OptionsMixin from '@/utils/OptionsMixin.js'
import { mapGetters } from 'vuex'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'CategoricalDependence',
  mixins: [Resize, OptionsMixin],
  props: {
    data: Array,
    plotType: String
  },
  computed: {
    traces () {
      return this.data.map((d, i) => {
        return {
          name: d.params.model,
          type: 'box',
          orientation: 'h',
          y: d.plotData.x.map(y => format.addNewLines(y, this.leftMargin)),
          x: d.plotData.mean,
          marker: {
            color: this.scopesColors.model[d.params.model]
          }
        }
      })
    },
    layout () {
      return {
        yaxis: {
          type: 'category',
          autorange: 'reversed',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false
        },
        xaxis: {
          type: 'linear',
          title: {
            text: 'Contribution',
            standoff: 10
          },
          gridwidth: 2,
          range: this.range,
          fixedrange: true,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        hovermode: 'closest',
        boxmode: 'group',
        boxgap: 0.1,
        boxgroupgap: 0.1,
        showlegend: false,
        margin: { l: this.leftMargin, t: 0, b: 45, r: 5 },
        dragmode: 'pan',
        shapes: this.data.map(d => {
          return {
            type: 'line',
            x0: 0,
            x1: 0,
            y0: 0,
            y1: 1,
            yref: 'paper',
            xref: 'x',
            line: {
              color: 'black',
              dash: 'dot',
              width: 2
            }
          }
        })
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
    minimalValue () {
      return Math.min(...this.data.map(d => {
        return Math.min(...d.plotData.mean)
      }))
    },
    maximalValue () {
      return Math.max(...this.data.map(d => {
        return Math.max(...d.plotData.mean)
      }))
    },
    range () {
      let len = this.maximalValue - this.minimalValue
      // margin = 0.5 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )
      let margin = 0.5 * 120 * len / (this.width - 120 - this.leftMargin - 5)
      return [this.minimalValue - margin, this.maximalValue + margin]
    },
    layoutPatches () {
      return { 'xaxis.range': this.range, 'margin.l': this.leftMargin }
    },
    leftMargin () { return this.getOption('left_margin_values') },
    ...mapGetters(['scopesColors'])
  },
  components: {
    Plotly
  }
}
</script>
<style>
</style>
