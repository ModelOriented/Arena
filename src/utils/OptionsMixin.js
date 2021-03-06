export default {
  props: {
    slotv: Object
  },
  computed: {
    getOption () {
      return (name) => {
        let local = (((this.slotv || {}).customData || {}).options || {})[name]
        return local === undefined || local === null ? this.$store.getters.getOption(name) : local
      }
    }
  }
}
