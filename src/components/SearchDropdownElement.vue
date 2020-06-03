<template>
  <div class="search-dropdown-element" :class="{ active: isActive }">
    {{ paramValue | formatTitle }}
  </div>
</template>
<script>
import format from '@/utils/format.js'
import interact from 'interactjs'
import { mapGetters } from 'vuex'
import config from '@/configuration/config.js'

export default {
  name: 'SearchDropdownElement',
  props: {
    paramName: String,
    paramValue: String
  },
  data () {
    return {
      initInfo: null
    }
  },
  computed: {
    isActive () {
      return this.paramValue && this.getGlobalParam(this.paramName) === this.paramValue
    },
    ...mapGetters(['getGlobalParam'])
  },
  methods: {},
  mounted () {
    interact(this.$el).pointerEvents({
      holdDuration: 250
    }).on('hold', event => {
      event.preventDefault()

      let mainParamValue = this.getGlobalParam(config.mainParam)
      let slot = { ...config.searchDropdownPlots[this.paramName] }
      if (!mainParamValue || !slot) return
      slot.localParams = [{ [this.paramName]: this.paramValue, [config.mainParam]: mainParamValue }]

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
