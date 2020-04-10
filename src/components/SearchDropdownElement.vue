<template>
  <div class="search-dropdown-element" :class="{ active: isActive }">
    {{ paramValue.name | formatTitle }}
  </div>
</template>
<script>
import format from '@/utils/format.js'
import interact from 'interactjs'
import { mapGetters } from 'vuex'

export default {
  name: 'SearchDropdownElement',
  props: {
    paramName: String,
    paramValue: Object
  },
  data () {
    return {
      initInfo: null
    }
  },
  computed: {
    isActive () {
      return this.paramValue && (this.getGlobalParam(this.paramName) || {}).uuid === this.paramValue.uuid
    },
    ...mapGetters(['getGlobalParam'])
  },
  methods: {},
  mounted () {
    interact(this.$el).pointerEvents({
      holdDuration: 250
    }).on('hold', event => {
      event.preventDefault()
      let slot = null
      if (this.paramName === 'observation' && this.getGlobalParam('model')) {
        slot = {
          name: 'Break Down',
          plotType: 'Breakdown',
          localParams: [ { observation: this.paramValue, model: this.getGlobalParam('model') } ]
        }
      } else if (this.paramName === 'variable' && this.getGlobalParam('model')) {
        slot = {
          name: 'Partial Dependence',
          plotType: 'PartialDependence',
          localParams: [ { variable: this.paramValue, model: this.getGlobalParam('model') } ]
        }
      }
      if (this.initInfo && slot) {
        this.$store.dispatch('addSlotToPlayground', { slot, ...this.initInfo })
      }
    }).on('up', event => {
      if (!this.initInfo) return
      let timeDiff = event.timeStamp - this.initInfo.timeStamp
      if (timeDiff < 250) this.$emit('setParam') // when timeDiff < holdDuration it is click
      this.initInfo = null
    }).on('down', event => {
      this.initInfo = { timeStamp: event.timeStamp, interaction: event.interaction, x: event.pageX, y: event.pageY }
    })
  },
  filters: {
    formatTitle: format.formatTitle
  }
}
</script>
<style>
div.search-dropdown-element {
  width: calc(100% - 40px);
  padding: 15px 20px;
  font-size: 16px;
  line-height: 16px;
  background: white;
}
div.search-dropdown-element.active {
  font-family: "FiraSansBold";
}
div.search-dropdown-element:hover {
  background: #eee;
  color: #371ea8;
}
</style>
