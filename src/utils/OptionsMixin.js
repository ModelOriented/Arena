export default {
  props: {
    slotv: Object
  },
  computed: {
    getOption () {
      return (name) => {
        return (((this.slotv || {}).customData || {}).options || {})[name] || this.$store.getters.getOption(name)
      }
    }
  }
}
