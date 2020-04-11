<template>
  <div class="settings-tab-options settings-tab">
    <div class="option-row" v-for="option in schemas" :key="option.name">
      {{ option.displayName }}
      <div class="option-input" v-if="option.type === 'integer'">
        <input type="text" @change="save(option.name, $event.target.value)" :class="{ error: errors.includes(option.name) }" :value="getOption(option.name)">
      </div>
      <div class="option-input" v-if="option.type === 'boolean'">
        <span @click="save(option.name, false)" class="check-symbol"><span v-if="getOption(option.name)"><font-awesome-icon :icon="['far', 'check-square']"/></span></span>
        <span @click="save(option.name, true)" class="check-symbol"><span v-if="!getOption(option.name)"><font-awesome-icon :icon="['far', 'square']"/></span></span>
      </div>
    </div>
  </div>
</template>
<script>
import OptionsSchemas from '@/configuration/OptionsSchemas.js'
import { mapGetters } from 'vuex'

export default {
  name: 'SettingsTabOptions',
  data () {
    return {
      schemas: OptionsSchemas,
      errors: []
    }
  },
  methods: {
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
  computed: mapGetters(['getOption'])
}
</script>
<style>
.settings-tab-options > div.option-row {
  width: 100%;
  padding: 20px 0;
  position: relative;
}
.settings-tab-options > div.option-row > div.option-input {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
}
.settings-tab-options > div.option-row > div.option-input > input[type="text"] {
  height: calc(100% - 20px);
  margin-top: 10px;
}
.settings-tab-options > div.option-row > div.option-input > input[type="text"].error {
  border: 1px solid #f05a71;
}
.settings-tab-options > div.option-row > div.option-input > span.check-symbol {
  font-size: 20px;
  display: block;
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translate(-50%, -50%);
}
</style>
