<template>
  <div class="plot-options">
    <span class="title">Options</span>
    <font-awesome-icon icon="times" class="close" @click="$emit('close')"/>
    <div class="list">
      <div class="option-row" v-for="option in options.filter(s => s.type === 'integer')" :key="option.name">
        <span class="label">{{ option.displayName }}</span>
        <Slider :min="option.min" :max="option.max" :start="getOption(option.name)" :values="getPoints(option.min, option.max)" :key="globalOptions[option.name]"
        @update="save(option.name, $event + '')"/>
      </div>
      <div class="option-row" v-for="option in options.filter(s => s.type === 'boolean')" :key="option.name">
        <span class="label">{{ option.displayName }}</span>
        <font-awesome-icon class="checkbox" :icon="['far', getOption(option.name) ? 'check-square' : 'square']" @click="save(option.name, !getOption(option.name))" />
      </div>
      <span v-if="options.length === 0" class="info">There is no option for this chart</span>
    </div>
  </div>
</template>
<script>
import PlotsInfo from '@/configuration/PlotsInfo.js'
import OptionsSchemas from '@/configuration/OptionsSchemas.js'
import Slider from '@/components/Slider.vue'

export default {
  name: 'PlotOptions',
  props: {
    slotv: Object,
    plotComponent: String
  },
  computed: {
    options () {
      if (!this.plotComponent) return []
      let list = PlotsInfo.optionsCategories[this.plotComponent]
      return list.map(x => Array.isArray(x) ? OptionsSchemas.find(o => o.name === x[1] && o.category === x[0]) : OptionsSchemas.filter(o => o.category === x)).flat()
    },
    getOption () {
      return (name) => {
        return (((this.slotv || {}).customData || {}).options || {})[name] || this.$store.getters.getOption(name)
      }
    },
    globalOptions () {
      return this.options.reduce((acu, opt) => {
        return { ...acu, [opt.name]: this.$store.getters.getOption(opt.name) }
      }, {})
    }
  },
  data () {
    return {
      errors: []
    }
  },
  methods: {
    getPoints (min, max) {
      return [...Array(max - min + 1).keys()].map(x => x + min)
    },
    save (name, value) {
      let schema = OptionsSchemas.find(s => s.name === name)
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
      else {
        if (v === this.getOption(name)) return
        let customData = this.slotv.customData || {}
        let options = customData.options || {}
        this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...customData, options: { ...options, [name]: v } } })
      }
    }
  },
  components: { Slider }
}
</script>
<style>
.plot-options {
  background: rgba(255, 255, 255, 0.80);
  padding: 20px 10px;
  box-sizing: border-box;
}
.plot-options > .title {
  font-size: 18px;
  margin-bottom: 10px;
  display: inline-block;
}
.plot-options > .close {
  position: absolute;
  right: 15px;
  transform: translateY(6px);
  color: #371ea3;
  cursor: pointer;
}
.plot-options > .list {
  overflow-y: auto;
  height: calc(100% - 40px);
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  box-sizing: border-box;
}
.plot-options > .list > div.option-row {
  margin: 30px 0;
  position: relative;
}
.plot-options > .list > div.option-row:first-child {
  margin-top: 10px;
}
.plot-options > .list > div.option-row > span.label {
  padding-right: 15px;
}
.plot-options > .list > div.option-row > .checkbox {
  position: absolute;
  right: 15px;
  top: 50%;
  font-size: 20px;
  transform: translateY(-50%);
}
.plot-options > .list > span.info {
  width: 100%;
  display: block;
  text-align: center;
}
</style>
