<template>
  <div class="sidepanel-options">
    <div class="category" v-for="cat in categories" :key="cat.name">
      <span class="label">{{ cat.name }}</span>
      <div class="option-row" v-for="option in cat.options.filter(s => s.type === 'integer')" :key="option.name">
        <span class="label">{{ option.displayName }}</span>
        <Slider :min="option.min" :max="option.max" :start="getOption(option.name)" :values="getPoints(option.min, option.max)"
        @update="save(option.name, $event + '')"/>
      </div>
      <div class="option-row" v-for="option in cat.options.filter(s => s.type === 'boolean')" :key="option.name">
        <span class="label">{{ option.displayName }}</span>
        <font-awesome-icon class="checkbox" :icon="['far', getOption(option.name) ? 'check-square' : 'square']" @click="save(option.name, !getOption(option.name))" />
      </div>
    </div>
  </div>
</template>
<script>
import format from '@/utils/format.js'
import Slider from '@/components/Slider.vue'
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
  computed: {
    categories () {
      return Object.entries(this.schemas.reduce((acu, x) => {
        if (!acu[x.category]) acu[x.category] = []
        acu[x.category].push(x)
        return acu
      }, {})).map(([category, options]) => ({ name: category, options }))
    },
    ...mapGetters(['getOption'])
  },
  components: { Slider }
}

</script>
<style>
div.sidepanel-options > div.category {
  padding-left: 30px;
  padding-right: 15px;
  border-bottom: 1px solid #ccc;
  padding-top: 20px;
}
div.sidepanel-options > div.category > span.label {
  font-size: 17px;
}
div.sidepanel-options div.option-row {
  margin: 30px 0;
  position: relative;
}
div.sidepanel-options div.option-row > span.label {
  padding-right: 15px;
}
div.sidepanel-options div.option-row > .checkbox {
  position: absolute;
  right: 15px;
  top: 50%;
  font-size: 20px;
  transform: translateY(-50%);
}
</style>
