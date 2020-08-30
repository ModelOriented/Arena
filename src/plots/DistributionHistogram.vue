<template>
  <div class="distribution-histogram-plot" v-resize:throttle.100="onResize">
    <div class="slider">
      <Slider :min="availableBinsNumber[0]" :max="availableBinsNumber[availableBinsNumber.length - 1]" :start="nbins" :values="availableBinsNumber" @update="setBinsNumber($event)"/>
    </div>
    <div class="axis-type-input">
      <span v-for="t in axisTypes" :key="t" :class="{ active: axisType === t }" @click="setAxisType(t)">{{ t | firstUpper }}</span>
    </div>
    <Plotly v-bind="{ traces, config, layout, layoutPatches }" ref="plot" @plotly_hover="onHover" @plotly_unhover="onUnhover"/>
  </div>
</template>
<script>
import Resize from '@/utils/Resize.js'
import format from '@/utils/format.js'
import Slider from '@/components/Slider.vue'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'DistributionHistogram',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data () {
    return {
      nbins: 3,
      axisType: ''
    }
  },
  watch: {
    availableBinsNumber () {
      if (this.customData && this.availableBinsNumber.includes(this.customData.bins)) {
        this.nbins = this.customData.bins
      } else {
        this.setBinsNumber(this.availableBinsNumber[0])
      }
    },
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
        if (this.availableBinsNumber.includes(newValue.bins)) this.nbins = newValue.bins
        if (this.axisTypes.includes(newValue.axisType)) this.axisType = newValue.axisType
      },
      immediate: true
    }
  },
  filters: {
    firstUpper: format.firstCharUpper
  },
  computed: {
    colors () {
      return this.$store.getters.scopesColors['dataset']
    },
    axisTypes () {
      return ['count', 'density']
    },
    availableBinsNumber () {
      return this.data.map(d => Object.keys(d.plotData)).reduce((acu, x) => acu.filter(y => x.includes(y))).map(x => Number.parseFloat(x)).sort((a, b) => a - b)
    },
    transformed () {
      return this.data.map(d => {
        let tmp = d.plotData[this.nbins + '']
        return { params: d.params, breaks: tmp.breaks, mids: tmp.mids, count: tmp.counts, density: tmp.density }
      })
    },
    breaks () {
      if (this.transformed.length === 0) return []
      return this.transformed[0].breaks
    },
    traces () {
      if (!this.axisType) return []
      if (this.transformed.length > 1) {
        return this.transformed.map((d, i) => {
          let start = { x: d.breaks[0], y: 0 }
          let end = { x: d.breaks[d.breaks.length - 1], y: 0 }
          return {
            name: d.params.dataset,
            type: 'lines',
            x: [start.x, ...d.mids.map((m, j) => [d.breaks[j], d.breaks[j + 1]]).flat(), end.x],
            y: [start.y, ...d[this.axisType].map(y => [y, y]).flat(), end.y],
            hoverinfo: 'template',
            hovertemplate: ['', ...d[this.axisType].map(x => format.formatValue(x, false)).map(x => [x, x]).flat(), ''],
            hoverlabel: {
              bgcolor: this.colors[d.params.dataset],
              font: { family: 'FiraSansBold', size: 16, color: 'white' }
            },
            marker: {
              color: this.colors[d.params.dataset],
              opacity: 1
            }
          }
        })
      } else {
        return this.transformed.map((d, i) => {
          return {
            name: d.params.dataset,
            type: 'bar',
            orientation: 'v',
            x: d.mids,
            y: d[this.axisType],
            hoverinfo: 'template',
            hovertemplate: d[this.axisType].map(x => format.formatValue(x, false)),
            hoverlabel: {
              bgcolor: this.colors[d.params.dataset],
              font: { family: 'FiraSansBold', size: 16, color: 'white' }
            },
            marker: {
              color: this.colors[d.params.dataset],
              opacity: 1
            }
          }
        })
      }
    },
    layout () {
      return {
        xaxis: {
          type: 'linear',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          range: this.range,
          tickvals: this.breaks,
          ticktext: this.breaks.map(v => format.formatValue(v, false))
        },
        yaxis: {
          type: 'linear',
          title: {
            text: '',
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
        bargap: 0,
        barmode: 'overlay',
        hovermode: 'closest',
        showlegend: false,
        margin: { l: 60, t: 0, b: 45, r: 5 },
        dragmode: 'pan',
        shapes: this.data.map(d => {
          return {
            type: 'line',
            x0: 0,
            x1: 1,
            y0: 0,
            y1: 0,
            xref: 'paper',
            yref: 'x',
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
      return Math.min(...this.breaks)
    },
    maximalValue () {
      return Math.max(...this.breaks)
    },
    range () {
      let len = this.maximalValue - this.minimalValue
      // margin = 0.5 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )
      let margin = 0.5 * 80 * len / (this.width - 80 - 60 - 5)
      return [this.minimalValue - margin, this.maximalValue + margin]
    },
    layoutPatches () {
      return { 'xaxis.range': this.range }
    },
    customData () {
      return this.slotv.customData
    }
  },
  methods: {
    setBinsNumber (v) {
      this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...this.customData, bins: v } })
    },
    setAxisType (v) {
      this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...this.customData, axisType: v } })
    },
    onHover (event) {
      if (!event || !event.data || !event.data.points || event.data.points.length === 0) return
      let point = event.data.points[0].pointNumber
      let curve = event.data.points[0].curveNumber
      let update = { marker: { opacity: this.breaks.slice(1).map((x, i) => i === point ? 1 : 0.5), color: this.colors[this.transformed[curve].params.dataset] } }
      event.plotly.restyle(event.plot, update, curve)
    },
    onUnhover (event) {
      let curve = event.data.points[0].curveNumber
      let update = { marker: { opacity: 1, color: this.colors[this.transformed[curve].params.dataset] } }
      event.plotly.restyle(event.plot, update, curve)
    }
  },
  components: {
    Plotly, Slider
  }
}
</script>
<style>
div.distribution-histogram-plot > .slider {
  width: 200px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
}
div.distribution-histogram-plot > div.axis-type-input {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-20px) translate(-50%, -50%) rotate(-90deg);
  z-index: 10;
  font-family: 'FiraSansBold';
}
div.distribution-histogram-plot > div.axis-type-input > span {
  padding: 0 5px;
  color: #777;
  cursor: pointer;
}
div.distribution-histogram-plot > div.axis-type-input > span.active {
  color: #371ea3;
}
</style>
