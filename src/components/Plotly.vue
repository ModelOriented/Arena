<template>
  <div class="plotly-outer-container" v-resize:throttle.100="onResize" ref="plot_outer">
    <div class="plotly-inner-container" ref="plot">
    </div>
  </div>
</template>
<script>
import Plotly from 'plotly.js'
import resize from 'vue-resize-directive'
import clone from 'clone-deep'

export default {
  name: 'Plotly',
  directives: { resize },
  props: {
    config: Object,
    traces: Array,
    layout: Object,
    layoutPatches: Object
  },
  watch: {
    config: { handler: 'requestRedraw', immediate: true },
    traces: { handler: 'requestRedraw', immediate: true },
    layout: { handler: 'requestRelayout', immediate: true },
    layoutPatches: { handler: 'requestRelayout', immediate: true },
    request: {
      handler (newValue, oldValue) {
        if (newValue && !oldValue) setTimeout(() => this.doRequest(), 20)
      },
      immediate: true
    }
  },
  data () {
    return {
      needRedrawing: false,
      request: null
    }
  },
  methods: {
    doRequest () {
      let request = this.request
      this.request = null
      this[request]()
    },
    requestRedraw () {
      this.request = 'redraw'
    },
    requestRelayout () {
      if (this.request !== 'redraw') this.request = 'relayout'
    },
    relayout () {
      let plt = this.$refs.plot
      if (!plt || !this.layout) return
      if (this.needRedrawing === true) return this.redraw()
      if (plt.layout) Plotly.relayout(plt, Object.assign({}, plt.layout, plt.layout))
      else Plotly.relayout(plt, clone(this.layout))
      this.applyLayoutPatchs()
    },
    applyLayoutPatchs () {
      let plt = this.$refs.plot
      this.onResize()
      if (!plt || !this.layoutPatches) return
      Object.keys(this.layoutPatches).forEach(path => {
        Plotly.relayout(plt, path, clone(this.layoutPatches[path]))
      })
    },
    redraw () {
      let plt = this.$refs.plot
      if (!this.traces || !this.layout || !plt) {
        this.needRedrawing = true
        return
      }
      Plotly.newPlot(plt, this.traces, clone(this.layout), this.config || {})
      this.applyLayoutPatchs()
      this.needRedrawing = false
      let events = ['plotly_click', 'plotly_legendclick', 'plotly_hover', 'plotly_unhover', 'plotly_selected', 'plotly_webglcontextlost',
        'plotly_afterplot', 'plotly_autosize', 'plotly_deselect', 'plotly_doubleclick', 'plotly_redraw', 'plotly_animated']
      events.forEach(eventName => {
        plt.on(eventName, data => this.$emit(eventName, { plot: plt, data, plotly: Plotly }))
      })
    },
    onResize () {
      let plt = this.$refs.plot
      let outer = this.$refs.plot_outer
      if (!plt || !plt.layout || !outer) return
      Plotly.relayout(plt, 'width', outer.offsetWidth)
      Plotly.relayout(plt, 'height', outer.offsetHeight)
    }
  },
  mounted () {
    if (this.needRedrawing) this.redraw()
  }
}
</script>
<style>
div.plotly-outer-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
div.plotly-inner-container {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
