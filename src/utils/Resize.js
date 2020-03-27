import resize from 'vue-resize-directive'

export default {
  data () {
    return { width: 0 }
  },
  updated () {
    this.onResize()
  },
  mounted () {
    this.onResize()
  },
  methods: {
    onResize () {
      if (this.$refs.plot) this.width = this.$refs.plot.$el.offsetWidth
    }
  },
  directives: {
    resize
  }
}
