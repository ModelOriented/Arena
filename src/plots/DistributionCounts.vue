<template>
  <div class="distribution-counts-plot" v-resize:throttle.100="onResize">
    <Plotly v-bind="{ traces, config, layout, layoutPatches }" ref="plot"/>
    <div class="axis-type-input">
      <span v-for="t in axisTypes" :key="t" :class="{ active: axisType === t }" @click="setAxisType(t)">{{ t | firstUpper }}</span>
    </div>
  </div>
</template>
<script>
import OptionsMixin from '@/utils/OptionsMixin.js'
import Resize from '@/utils/Resize.js'
import format from '@/utils/format.js'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'DistributionCounts',
  mixins: [Resize, OptionsMixin],
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data () {
    return {
      axisType: ''
    }
  },
  watch: {
    axisTypes: {
      handler () {
        if (this.customData && this.axisTypes.includes(this.customData.axisType)) {
          this.axisType = this.customData.axisType
        } else {
          this.setAxisType(this.axisTypes[0])
        }
      },
      immediate: true
    },
    customData: {
      handler (newValue) {
        if (!newValue) return
        if (this.axisTypes.includes(newValue.axisType)) this.axisType = newValue.axisType
      },
      immediate: true
    }
  },
  filters: {
    firstUpper: format.firstCharUpper
  },
  computed: {
    customData () {
      return this.slotv.customData
    },
    axisTypes () {
      return ['count', 'density']
    },
    colors () {
      return this.$store.getters.scopesColors['dataset']
    },
    traces () {
      if (!this.axisType) return []
      return this.data.map((d, i) => {
        return {
          name: d.params.dataset,
          type: 'bar',
          orientation: 'h',
          y: d.plotData.names.map(y => format.addNewLines(y, this.leftMargin)),
          x: d.plotData[this.axisType],
          text: d.plotData[this.axisType].map(x => format.formatValue(x, false, ' ')),
          textposition: 'outside',
          hoverinfo: 'template',
          hovertemplate: d.plotData[this.axisType].map(x => format.formatValue(x, false)),
          hoverlabel: {
            bgcolor: this.colors[d.params.dataset],
            font: { family: 'FiraSansBold', size: 16, color: 'white' }
          },
          marker: {
            color: this.colors[d.params.dataset]
          },
          insidetextanchor: 'start'
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
            text: '',
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
      return 0
    },
    maximalValue () {
      return Math.max(...this.data.map(d => {
        return Math.max(...d.plotData[this.axisType])
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
    leftMargin () { return this.getOption('left_margin_values') }
  },
  methods: {
    setAxisType (v) {
      this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...this.customData, axisType: v } })
    }
  },
  components: {
    Plotly
  }
}
</script>
<style>
div.distribution-counts-plot > div.axis-type-input {
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-family: 'FiraSansBold';
}
div.distribution-counts-plot > div.axis-type-input > span {
  padding: 0 5px;
  color: #777;
  cursor: pointer;
}
div.distribution-counts-plot > div.axis-type-input > span.active {
  color: #371ea3;
}
</style>
