<template>
  <div class="observation-details">
    <span class="label">{{ label | formatTitle }}</span>
    <div class="variable-containter" v-for="v in variablesNames" :key="v">
      <span class="label">{{ v | formatTitle | firstCharUpper }}</span>
      <Slider v-if="variables[v] && variables[v].type === 'numeric'" :min="variables[v].min" :max="variables[v].max" :start="attributes[v]" :values="getPoints(v, 100)" :key="attributes[v]" @update="update(v, $event)" updateWhenDrop/>
      <PlotDropdown v-else-if="variables[v] && variables[v].type === 'categorical'" :values="variables[v].levels" :start="attributes[v]" :key="attributes[v]" listDown @update="update(v, $event)"/>
      <PlotDropdown v-else-if="variables[v] && variables[v].type === 'logical'" :values="['true', 'false']" :start="attributes[v] + ''" :key="attributes[v]" listDown @update="update(v, $event === 'true')"/>
      <span v-else>
        :
        <span style="font-weight: 800;float: right;margin-right: 15px;">{{ attributes[v] }}</span>
      </span>
    </div>
    <span v-if="!attributes" class="msg">To show observation info, you need to enable attributes in your connector.</span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import format from '@/utils/format.js'
import Slider from '@/components/Slider.vue'
import PlotDropdown from '@/components/PlotDropdown.vue'

/* eslint-disable arena/no-hardcode-param-types */

export default {
  name: 'ObservationDetails',
  data () {
    return {
      attributes: null,
      variables: null
    }
  },
  filters: {
    formatTitle: format.formatTitle,
    firstCharUpper: format.firstCharUpper
  },
  watch: {
    label: {
      handler: 'loadAttributes',
      immediate: true
    },
    pageNumber (n) {
      // -1 is set only when refreshing
      if (n === -1) this.loadAttributes()
    },
    attributes () {
      if (!this.attributes) {
        this.variables = null
        return
      }
      let attributes = this.attributes
      let promises = Object.keys(this.attributes).map(v => this.$store.dispatch('getAttributes', { paramType: 'variable', paramValue: v }))
      Promise.all(promises).then(results => {
        if (attributes !== this.attributes) return
        this.variables = results.map((attr, index) => ([Object.keys(attributes)[index], attr])).filter(r => r[1]).reduce((acu, [v, attr]) => ({ ...acu, [v]: attr }), {})
      }).catch(this.clear)
    }
  },
  computed: {
    label () {
      return this.getGlobalParam('observation')
    },
    variablesNames () {
      if (!this.attributes || !this.variables) return []
      let order = ['numeric', 'categorical', 'logical']
      let getOrder = (v) => this.variables[v] ? order.indexOf(this.variables[v].type) : order.length
      return Object.keys(this.attributes).sort((a, b) => getOrder(a) - getOrder(b))
    },
    ...mapGetters(['getGlobalParam', 'pageNumber'])
  },
  methods: {
    loadAttributes () {
      let attributes = this.attributes
      if (!this.label) return
      if (format.isCustomParam(this.label)) {
        this.$nextTick(() => {
          this.attributes = JSON.parse(this.label)
        })
      } else {
        this.$store.dispatch('getAttributes', { paramType: 'observation', paramValue: this.label }).then(x => {
          if (!x || this.attributes !== attributes) return
          this.attributes = x
        }).catch(this.clear)
      }
    },
    clear () {
      this.attributes = null
      this.variables = null
    },
    getPoints (variable, n) {
      let v = this.variables[variable]
      if (v.levels) return v.levels
      return [...Array(n).keys()].map(x => x / (n - 1)).map(x => v.min + (x * (v.max - v.min)))
    },
    update (variable, value) {
      if (this.attributes[variable] !== value) {
        this.$store.commit('setGlobalParam', { name: 'observation', value: JSON.stringify({ ...this.attributes, [variable]: value }) })
      }
    }
  },
  components: { Slider, PlotDropdown }
}
/* eslint-enable arena/no-hardcode-param-types */

</script>
<style>
div.observation-details > span.label {
  text-align: center;
  font-size: 16px;
  display: block;
  width: 100%;
  font-family: 'FiraSansBold'
}
div.observation-details > div.variable-containter {
  margin: 20px 0;
  padding-left: 30px;
  padding-right: 15px;
}
div.observation-details > div.variable-containter > span.label {
}
div.observation-details > div.variable-containter > div.plot-dropdown {
  max-width: 240px !important;
  cursor: pointer;
}
div.observation-details > span.msg {
  text-align: center;
  font-size: 16px;
  display: block;
  width: 100%;
  margin-top: 20px;
}
</style>
