<template>
  <div class="metrics-plot">
    <div class="plot-area" ref="plot" v-resize:throttle.100="onResize">
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import resize from '@/utils/Resize.js'
import format from '@/utils/format.js'
const Plotly = () => import('plotly.js')

const margin = { l: 70, r: 40, t: 30, b: 40 }

export default {
  name: 'Metrics',
  mixins: [resize],
  props: {
    data: Array,
    plotType: String
  },
  watch: {
    width: 'refresh',
    height: 'refresh',
    data: 'refresh',
    mainParamColors: 'refresh'
  },
  created () {
    Plotly().then(x => {
      this.d3 = x.d3
      if (this._isMounted) this.plotChart()
    })
  },
  mounted () {
    this.onResize()
    if (this.d3) this.plotChart()
  },
  computed: {
    measures () {
      return [...new Set(this.data.map(d => Object.keys(d.plotData)).flat())]
    },
    measureRange () {
      return this.measures.reduce((acu, m) => {
        acu[m] = this.getRange(m, this.data.map(d => d.plotData[m]))
        return acu
      }, {})
    },
    axes () {
      return this.measures.reduce((acu, m) => {
        acu[m] = this.d3.scale.linear().domain([...this.measureRange[m]].reverse()).range([margin.t, this.height - margin.b])
        return acu
      }, {})
    },
    linesData () {
      return this.data.map(d => {
        return {
          name: d.params.model,
          ...d.plotData
        }
      })
    },
    axisSpace () {
      return (this.width - margin.l - margin.r) / (this.measures.length - 1)
    },
    ...mapGetters(['mainParamColors'])
  },
  methods: {
    updateLines () {
      this.lines.attr('d', d => {
        return this.line(this.measures.map((m, i) => {
          return { x: margin.l + (this.axisSpace * i), y: this.axes[m](d[m]) }
        }))
      })
    },
    refresh () {
      if (!this.chart) return
      this.plotChart()
    },
    customFormat (v) {
      if (v > 10 ** 10 || v < 1 / (10 ** 10)) return this.d3.format('.2g')(v)
      else return format.formatValue(v)
    },
    plotChart () {
      let d3 = this.d3
      this.line = d3.svg.line().x(d => d.x).y(d => d.y)
      let axis = this.axis = this.d3.svg.axis().orient('left').tickFormat(this.customFormat)
      let width = this.width
      let height = this.height
      d3.select(this.$refs.plot).selectAll('svg').remove()
      let chart = this.chart = d3.select(this.$refs.plot).append('svg').attr('width', width).attr('height', height)
      let lines = this.lines = chart.selectAll('path.node')
        .data(this.linesData, d => d.name)
        .enter().append('path')
        .attr('class', 'node')
        .style('stroke', (d, i) => this.mainParamColors[this.data[i].params.model])
      let g = this.g = chart.selectAll('g.trait')
        .data(this.measures)
        .enter().append('svg:g')
        .attr('class', 'trait')
        .attr('transform', (d, i) => 'translate(' + (margin.l + (this.axisSpace * i)) + ')')
      let axes = this.axes
      g.append('svg:g')
        .attr('class', 'axis')
        .each(function (d) { d3.select(this).call(axis.scale(axes[d])) })
        .append('svg:text')
        .attr('class', 'title')
        .attr('fill', d => '#371ea8')
        .attr('text-anchor', 'middle')
        .attr('y', 12)
        .text(String)
      this.updateLines()
      let self = this
      lines.on('mouseover', function (d) {
        d3.select(this).style('stroke-width', 6)
        chart.selectAll('g.axis')
          .append('svg:text')
          .attr('class', 'values')
          .attr('y', self.height - margin.b + 25)
          .attr('fill', d3.select(this).style('stroke'))
          .attr('text-anchor', 'middle')
          .text(m => self.customFormat(d[m]))
      })
      lines.on('mouseout', function (d) {
        chart.selectAll('.values').remove()
        d3.select(this).style('stroke-width', null)
      })
    },
    getRange (measure, values) {
      if (['f1', 'auc', 'accuracy', 'recall', 'precision'].includes(measure)) return [0, 1]
      else if (['r2'].includes(measure)) return [1, Math.min(0, ...values)]
      else return [0, Math.max(...values) * 1.05]
    }
  }
}
</script>
<style>
div.metrics-plot > .plot-area {
  width: 100%;
  height: 100%;
}

div.metrics-plot .axis line, .axis path {
  fill: none;
  stroke: #666;
  shape-rendering: crispEdges;
}

div.metrics-plot .axis text {
  text-shadow: 0 1px 0 #fff;
  font-family: 'Fira Sans';
}

div.metrics-plot text.title {
  font-family: 'FiraSansBold';
}

div.metrics-plot text.values {
  font-family: 'FiraSansBold';
}

div.metrics-plot path.node {
  fill: none;
  stroke-width: 3;
}
</style>
