<template>
  <div class="sidepanel-options">
    <div class="option-row" v-for="option in schemas.filter(s => s.type === 'integer')" :key="option.name">
      <span class="label">{{ option.displayName }}</span>
      <Slider :min="option.min" :max="option.max" :start="getOption(option.name)" :values="getPoints(option.min, option.max)"
      @update="save(option.name, $event + '')"/>
    </div>
    <div class="option-row" v-for="option in schemas.filter(s => s.type === 'boolean')" :key="option.name">
      <span class="label">{{ option.displayName }}</span>
      <PlotDropdown :values="['true', 'false']" :start="getOption(option.name) + ''" listDown @update="save(option.name, $event === 'true')"/>
    </div>
  </div>
</template>
<script>
import format from '@/utils/format.js'
import Slider from '@/components/Slider.vue'
import PlotDropdown from '@/components/PlotDropdown.vue'
import { mapGetters } from 'vuex'
import OptionsSchemas from '@/configuration/OptionsSchemas.js'

export default {
  name: 'SidepanelOptions',
  filters: {
    formatTitle: format.formatTitle,
    firstCharUpper: format.firstCharUpper
  },
  data () {
    return {
      schemas: OptionsSchemas,
      errors: []
    }
  },
  methods: {
    getPoints (min, max) {
      return [...Array(max - min + 1).keys()].map(x => x + min)
    },
    save (name, value) {
      let schema = this.schemas.find(s => s.name === name)
      if (!schema) return
      let error = false
      let v = null
      if (schema.type === 'integer') {
        v = parseInt(Number(value))
        if (isNaN(value) || v + '' !== value || isNaN(parseInt(value, 10))) error = true
        if (schema.min && schema.min > v) error = true
        if (schema.max && schema.max < v) error = true
      }
      if (schema.type === 'boolean') v = !!value
      this.errors = this.errors.filter(e => e !== name)
      if (error) this.errors.push(name)
      else this.$store.commit('setOption', { name, value: v })
    }
  },
  computed: mapGetters(['getOption']),
  components: { Slider, PlotDropdown }
}

</script>
<style>
div.sidepanel-options > div.option-row {
  margin: 30px 0;
  padding-left: 30px;
  padding-right: 15px;
}
div.sidepanel-options > div.option-row > span.label {
  padding-right: 15px;
}
div.sidepanel-options > div.option-row > div.plot-dropdown {
  max-width: 240px !important;
  cursor: pointer;
}
</style>
