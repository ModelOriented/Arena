<template>
  <div class="feature-importance-plot" v-resize:throttle.100="onResize">
    <Plotly v-bind="{ traces, config, layout, layoutPatches }" @plotly_click="onPlotlyClick" ref="plot"/>
    <div class="axis-type-input">
      <span v-for="t in axisTypes" :key="t" :class="{ active: axisType === t }" @click="setAxisType(t)">{{ t | firstUpper }}</span>
    </div>
  </div>
</template>
<script>
import Resize from '@/utils/Resize.js'
import OptionsMixin from '@/utils/OptionsMixin.js'
import format from '@/utils/format.js'
import { mapGetters } from 'vuex'
const Plotly = () => import('@/components/Plotly.vue')

export default {
  name: 'FeatureImportance',
  mixins: [Resize, OptionsMixin],
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data () {
    return {
      selectedModel: null,
      axisType: null
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
      return ['dropout loss', 'difference', 'scaled']
    },
    trimmed () {
      let variables = new Set(this.data.map(d => d.plotData.variables.slice(0, this.maxVariables)).flat())
      return this.data.map(d => {
        if (d.plotData.variables.length <= this.maxVariables) return d
        let filter = (v, i) => variables.has(d.plotData.variables[i])
        return Object.assign({}, d, {
          plotData: {
            variables: d.plotData.variables.filter(filter),
            dropout_loss: d.plotData.dropout_loss.filter(filter),
            min: d.plotData.min.filter(filter),
            max: d.plotData.max.filter(filter),
            q1: d.plotData.q1.filter(filter),
            q3: d.plotData.q3.filter(filter),
            base: d.plotData.base
          }
        })
      })
    },
    transformed () {
      return this.trimmed.map(d => {
        let minus = this.axisType !== 'dropout loss' ? d.plotData.base : 0
        let div = this.axisType === 'scaled' ? (Math.max(...d.plotData.dropout_loss) - minus) : 1
        let mapping = (x) => (x - minus) / div
        return {
          ...d,
          plotData: {
            ...d.plotData,
            dropout_loss: d.plotData.dropout_loss.map(mapping),
            min: d.plotData.min.map(mapping),
            max: d.plotData.max.map(mapping),
            q1: d.plotData.q1.map(mapping),
            q3: d.plotData.q3.map(mapping),
            base: d.plotData.base - minus
          }
        }
      })
    },
    traces () {
      return this.transformed.map((d, i) => {
        return {
          name: d.params.model,
          type: 'bar',
          orientation: 'h',
          y: d.plotData.variables.map(y => format.addNewLines(y, this.leftMargin)),
          base: d.plotData.base,
          x: d.plotData.dropout_loss.map(x => x - d.plotData.base),
          text: d.plotData.dropout_loss.map(x => format.formatValue(x - d.plotData.base, true, '  ')),
          textposition: this.displayBoxplots ? 'inside' : 'outside',
          hovertext: d.plotData.variables,
          textfont: {
            color: this.displayBoxplots ? 'white' : '#371ea3'
          },
          hoverinfo: 'template',
          hovertemplate: d.plotData.dropout_loss.map((x, i) => format.formatValue(d.plotData.base) + ' => ' + format.formatValue(x)),
          hoverlabel: {
            bgcolor: this.scopesColors.model[d.params.model],
            font: { family: 'FiraSansBold', size: 16, color: 'white' }
          },
          marker: {
            color: this.scopesColors.model[d.params.model]
          },
          insidetextanchor: 'start',
          selectedpoints: (this.selectedModel === d.params.model || this.selectedModel === null) ? undefined : [] // undefined - all selected, [] - all unselected
        }
      }).concat(!this.displayBoxplots ? [] : this.transformed.map((d, i) => {
        let iqr = d.plotData.q3.map((x, k) => x - d.plotData.q1[k])
        return {
          name: d.params.model,
          type: 'box',
          orientation: 'h',
          y: d.plotData.variables.map(y => format.addNewLines(y, this.leftMargin)),
          q1: d.plotData.q1,
          median: d.plotData.q1, // median is invisible, but need to be between q1 and q3
          q3: d.plotData.q3,
          marker: {
            color: (this.selectedModel === d.params.model || this.selectedModel === null) ? '#371ea3' : 'transparent'
          },
          line: {
            width: 1
          },
          fillcolor: (this.selectedModel === d.params.model || this.selectedModel === null) ? '#371ea3' : 'transparent',
          lowerfence: d.plotData.q1.map((x, k) => Math.max(x - (1.5 * iqr[k]), d.plotData.min[k])),
          upperfence: d.plotData.q3.map((x, k) => Math.min(x + (1.5 * iqr[k]), d.plotData.max[k])),
          showlegend: false,
          hoverinfo: 'none',
          whiskerwidth: 0.5
        }
      }))
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
        boxgap: 0.2,
        boxgroupgap: 0.6,
        bargap: 0.2,
        boxmode: 'group',
        showlegend: false,
        margin: { l: this.leftMargin, t: 0, b: 45, r: 5 },
        dragmode: 'pan',
        shapes: this.transformed.map(d => {
          return {
            type: 'line',
            x0: d.plotData.base,
            x1: d.plotData.base,
            y0: 0,
            y1: 1,
            yref: 'paper',
            xref: 'x',
            line: {
              color: 'black',
              width: 2,
              dash: 'dot'
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
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d2', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      }
    },
    minimalValue () {
      return Math.min(...this.transformed.map(d => {
        return Math.min(...d.plotData[this.displayBoxplots ? 'min' : 'dropout_loss'], d.plotData.base)
      }))
    },
    maximalValue () {
      return Math.max(...this.transformed.map(d => {
        return Math.max(...d.plotData[this.displayBoxplots ? 'max' : 'dropout_loss'], d.plotData.base)
      }))
    },
    range () {
      let len = this.maximalValue - this.minimalValue
      // margin = 0.5 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )
      let margin = 0.5 * 100 * len / (this.width - 100 - this.leftMargin - 5)
      return [this.minimalValue - margin, this.maximalValue + margin]
    },
    layoutPatches () {
      return { 'xaxis.range': this.range, 'margin.l': this.leftMargin }
    },
    maxVariables () { return this.getOption('featureimportance_max_variables') },
    leftMargin () { return this.getOption('left_margin') },
    displayBoxplots () { return this.getOption('featureimportance_boxplots') },
    ...mapGetters(['scopesColors'])
  },
  methods: {
    setAxisType (v) {
      this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...this.customData, axisType: v } })
    },
    onPlotlyClick (e) {
      let points = e.data.points.filter(p => p.curveNumber < this.transformed.length) // Boxplots are after all bars
      if (points.length === 0) return
      let yaxis = points[0].yaxis // All points have the same
      let barWidth = yaxis._length * (1 - this.layout.bargap) / (this.transformed.length * yaxis._categories.length)
      let barsTop = yaxis.d2p(points[0].y) - (0.5 * barWidth * this.transformed.length) // Center - half of widths sum
      let curveNum = Math.floor((e.data.event.pointerY - barsTop) / barWidth) // Assuming plot is at top:0
      if (isNaN(curveNum) || curveNum >= this.transformed.length || curveNum < 0) return
      let model = this.transformed[curveNum].params.model
      // If this model is already selected, then unselect
      this.selectedModel = this.selectedModel === model ? null : model
    }
  },
  components: {
    Plotly
  }
}
</script>
<style>
div.feature-importance-plot > div.axis-type-input {
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-family: 'FiraSansBold';
  white-space: nowrap;
}
div.feature-importance-plot > div.axis-type-input > span {
  padding: 0 5px;
  color: #777;
  cursor: pointer;
}
div.feature-importance-plot > div.axis-type-input > span.active {
  color: #371ea3;
}
</style>
