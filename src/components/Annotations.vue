<template>
  <div class="annotations" :class="{ active: annotationsActive }" v-resize:throttle.100="onResize">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import resize from 'vue-resize-directive'

export default {
  name: 'Annotations',
  data () {
    return {
      context: null,
      lineWidth: 5,
      width: 0,
      height: 0,
      cursor: null,
      paths: []
    }
  },
  watch: {
    annotations () {
      this.paths = this.annotations.paths
      this.refresh()
    }
  },
  computed: {
    effectiveLineWidth () {
      return this.lineWidth + (this.annotationsColor === 'erase' ? 15 : 0)
    },
    annotations () {
      return this.getAnnotations(this.pageNumber)
    },
    ...mapGetters(['annotationsActive', 'annotationsColor', 'getAnnotations', 'pageNumber'])
  },
  mounted () {
    if (this.$refs.canvas.getContext) this.context = this.$refs.canvas.getContext('2d')
    this.onResize()
    this.$refs.canvas.addEventListener('pointermove', e => {
      this.cursor = { x: e.clientX, y: e.clientY }
      if (e.buttons === 1 && this.annotationsColor !== 'erase') { // left click
        this.addPath({
          from: { x: e.clientX - e.movementX, y: e.clientY - e.movementY },
          to: { x: e.clientX, y: e.clientY },
          color: this.annotationsColor,
          width: Math.round(this.lineWidth)
        })
      } else if (e.buttons === 1) {
        let dist = (point) => Math.sqrt(Math.pow(point.x - e.clientX, 2) + Math.pow(point.y - e.clientY, 2))
        this.paths = this.paths
          .filter(p => dist(p.from) > this.effectiveLineWidth / 2)
          .filter(p => dist(p.to) > this.effectiveLineWidth / 2)
      }
      this.refresh()
    })
    this.$refs.canvas.addEventListener('wheel', e => {
      this.lineWidth *= 1 + (e.deltaY / 100)
      this.lineWidth = Math.min(Math.max(this.lineWidth, 1), 30)
      this.refresh()
    })
    this.$refs.canvas.addEventListener('pointerleave', e => {
      this.cursor = null
      this.updateStore()
      this.refresh()
    })
    this.$refs.canvas.addEventListener('pointercancel', e => {
      this.cursor = null
      this.updateStore()
      this.refresh()
    })
    this.$refs.canvas.addEventListener('pointerup', e => {
      this.updateStore()
    })
  },
  methods: {
    onResize () {
      // canvas size can be only increased
      this.width = Math.max(this.$el.offsetWidth, this.width)
      this.height = Math.max(this.$el.offsetHeight, this.height)
      if (this.$refs.canvas) {
        this.$refs.canvas.width = this.width
        this.$refs.canvas.height = this.height
      }
      this.refresh()
    },
    plotPath (path) {
      this.context.beginPath()
      this.context.moveTo(path.from.x, path.from.y)
      this.context.lineTo(path.to.x, path.to.y)
      this.context.lineWidth = path.width
      this.context.strokeStyle = path.color
      this.context.stroke()
      // ends
      if (path.width > 2) {
        this.context.beginPath()
        this.context.fillStyle = path.color
        this.context.arc(path.from.x, path.from.y, Math.floor(path.width / 2), 0, 2 * Math.PI)
        this.context.arc(path.to.x, path.to.y, Math.floor(path.width / 2), 0, 2 * Math.PI)
        this.context.fill()
      }
    },
    plotCursor () {
      if (!this.cursor || !this.annotationsActive) return
      this.context.beginPath()
      this.context.fillStyle = this.annotationsColor === 'erase' ? 'white' : this.annotationsColor
      this.context.arc(this.cursor.x, this.cursor.y, this.effectiveLineWidth / 2, 0, 2 * Math.PI)
      this.context.fill()
      if (this.annotationsColor === 'erase') {
        this.context.lineWidth = 2
        this.context.strokeStyle = 'black'
        this.context.stroke()
      }
    },
    refresh () {
      this.context.clearRect(0, 0, this.width, this.height)
      this.paths.forEach(this.plotPath)
      this.plotCursor()
    },
    splitPath (path) {
      let dist = Math.sqrt(Math.pow(path.from.x - path.to.x, 2) + Math.pow(path.from.y - path.to.y, 2))
      let k = Math.ceil(dist / 10) // div by max size for a one segment in px
      if (k <= 1) return [path]
      let diff = { x: (path.to.x - path.from.x) / k, y: (path.to.y - path.from.y) / k }
      let paths = []
      for (let i = 0; i < k; i++) {
        paths.push({
          from: { x: path.from.x + (diff.x * i), y: path.from.y + (diff.y * i) },
          to: { x: path.from.x + (diff.x * (i + 1)), y: path.from.y + (diff.y * (i + 1)) },
          color: path.color,
          width: path.width
        })
      }
      return paths
    },
    addPath (path) {
      this.paths = [...this.paths, ...this.splitPath(path)]
    },
    updateStore () {
      this.$store.commit('setAnnotations', Object.assign({}, this.annotations, { paths: this.paths }))
    }
  },
  directives: {
    resize
  }
}
</script>
<style>
div.annotations {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}
div.annotations.active {
  pointer-events: initial;
  cursor: none;
}
</style>
