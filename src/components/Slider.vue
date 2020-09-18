<template>
  <div class="slider" :class="{ active }" v-resize:throttle.100="onResize">
    <div class="range-line" ref="rangeline"></div>
    <div class="dot" :style="dotStyle" ref="dot"></div>
    <span class="value">{{ this.position | formatValue }}</span>
  </div>
</template>
<script>
import format from '@/utils/format.js'
import resize from 'vue-resize-directive'

export default {
  name: 'Slider',
  props: {
    min: Number,
    max: Number,
    start: Number,
    values: Array,
    updateWhenDrop: Boolean
  },
  data () {
    return {
      position: 0,
      range: [0, 1],
      sliderWidth: 0,
      points: [],
      active: false,
      startClientX: 0
    }
  },
  watch: {
    position () {
      if (!this.updateWhenDrop) this.$emit('update', this.position)
    },
    active (newValue, oldValue) {
      if (this.updateWhenDrop && oldValue && !newValue) this.$emit('update', this.position)
    }
  },
  created () {
    this.range = this.min > this.max ? [0, 1] : [this.min, this.max]
    this.position = this.start >= this.min && this.start <= this.max ? this.start : this.min
    this.points = this.values ? this.values : this.range
  },
  filters: {
    formatValue: format.formatValue
  },
  mounted () {
    this.sliderWidth = this.$refs.rangeline.offsetWidth
    this.$refs.dot.addEventListener('pointerdown', this.handlePointerDown)
    document.addEventListener('pointerup', this.handlePointerUp)
    document.addEventListener('pointercancel', this.handlePointerUp)
    document.addEventListener('pointermove', this.handlePointerMove)
  },
  computed: {
    rangeLength () { return this.range[1] - this.range[0] },
    dotStyle () {
      let size = this.active ? 15 : 10
      return {
        left: Math.round(((this.position - this.range[0]) / this.rangeLength) * this.sliderWidth) + 'px',
        width: size + 'px',
        height: size + 'px'
      }
    }
  },
  methods: {
    handlePointerDown (event) {
      this.active = true
      this.startClientX = event.clientX - Number.parseInt(this.dotStyle.left)
      event.stopPropagation()
    },
    handlePointerUp (event) {
      if (!this.active) return
      this.active = false
    },
    handlePointerMove (event) {
      if (!this.active) return
      let scaled = (this.rangeLength * (event.clientX - this.startClientX) / this.sliderWidth) + this.range[0]
      let dist = this.points.map(p => Math.abs(p - scaled))
      let index = dist.indexOf(Math.min(...dist))
      if (index !== -1) this.position = this.points[index]
    },
    onResize () {
      if (this._isMounted) this.sliderWidth = this.$refs.rangeline.offsetWidth
    }
  },
  directives: {
    resize
  }
}
</script>
<style>
div.slider {
  height: 25px;
  position: relative;
  width: 100%;
  min-width: 100px;
}
div.slider > div.range-line {
  height: 4px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: calc(100% - 50px);
  background: #ccc;
}
div.slider > span.value {
  position: absolute;
  right: 0;
  height: 100%;
  width: 50px;
  text-align: center;
  line-height: 25px;
  vertical-align: middle;
}
div.slider > div.dot {
  width: 10px;
  height: 10px;
  background: #371ea3;
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  cursor: ew-resize;
}
div.slider > div.dot:hover, div.slider.active > div.dot {
  box-shadow: 0 0 2px 0 #371ea3;
}
</style>
