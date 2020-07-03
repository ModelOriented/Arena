import resize from 'vue-resize-directive'

export default {
  data () {
    return { width: 0, height: 0 }
  },
  updated () {
    this.onResize()
  },
  mounted () {
    this.onResize()
  },
  methods: {
    onResize () {
      let el = this.$refs.plot
      if (el.$el) el = el.$el
      if (this.$refs.plot) this.width = el.offsetWidth
      if (this.$refs.plot) this.height = el.offsetHeight
    }
  },
  directives: {
    resize
  }
}
