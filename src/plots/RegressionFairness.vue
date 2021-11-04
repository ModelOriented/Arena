<template>
  <div class="regression-fairness-plot">
    <div class="options-container">
      <span class="label">Choose privileged variable</span>
      <div class="cutoff-input" v-for="s in subgroupsNames" :key="s">
        <span class="label">{{ s }}</span>
        <div class="checkboxes">
          <font-awesome-icon v-if="privileged === s" :icon="['fas', 'check-circle']"/>
          <font-awesome-icon v-else :icon="['far', 'circle']" @click="setPrivileged(s)"/>
        </div>
      </div>
    </div>
    <component :is="subplot.component" v-bind="{ data, privileged }" class="plotly-container"/>
  </div>
</template>
<script>
import RegressionFairnessSubplotRelative from '@/plots/RegressionFairnessSubplotRelative.vue'
const subplots = [
  { name: 'Fairness Check', component: 'RegressionFairnessSubplotRelative' }
]

export default {
  name: 'RegressionFairness',
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data () {
    return {
      privileged: null
    }
  },
  watch: {
    subgroupsNames: {
      handler () {
        if (this.customData && this.subgroupsNames.includes(this.customData.privileged)) {
          this.privileged = this.customData.privileged
        } else {
          this.setPrivileged(this.subgroupsNames[0])
        }
      },
      immediate: true
    },
    subplots: {
      handler () {
        if (this.customData && this.subplots.includes(this.customData.subplot)) {
          this.subplot = this.customData.subplot
        } else {
          this.setSubplot(this.subplots[0])
        }
      },
      immediate: true
    },
    customData: {
      handler (newValue) {
        if (!newValue) return
        if (this.subplots.includes(newValue.subplot)) this.subplot = newValue.subplot
        if (this.subgroupsNames.includes(newValue.privileged)) this.privileged = newValue.privileged
      },
      immediate: true
    }
  },
  computed: {
    subplots () { return subplots },
    customData () {
      return this.slotv.customData
    },
    subgroupsNames () {
      return [...new Set(this.data.map(d => Object.keys(d.plotData)).flat())]
    },
    error () {
      return false
    }
  },
  methods: {
    setPrivileged (v) {
      this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...this.customData, privileged: v } })
    },
    setSubplot (v) {
      this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...this.customData, subplot: v } })
    }
  },
  components: {
    RegressionFairnessSubplotRelative
  }
}
</script>
<style>
div.regression-fairness-plot > div.options-container {
  position: absolute;
  width: 220px;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  overflow-y: auto;
}
div.regression-fairness-plot > div.options-container > span.label {
  font-size: 16px;
  color: #371ea3;
  width: 100%;
  display: inline-block;
  font-weight: 600;
  margin: 7px 0;
}
div.regression-fairness-plot > div.options-container > div.cutoff-input {
  position: relative;
  padding-left: 15px;
}
div.regression-fairness-plot > div.options-container > div.cutoff-input > div.checkboxes {
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  color: #371ea3;
}
div.regression-fairness-plot > div.options-container > div.cutoff-input > span.label {
  font-size: 14px;
}
div.regression-fairness-plot > div.options-container > div.subplot-input {
  position: relative;
  padding: 3px 0 3px 15px;
}
div.regression-fairness-plot > div.options-container > div.subplot-input > div.checkboxes {
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  color: #371ea3;
}
div.regression-fairness-plot > div.options-container > div.subplot-input > span.label {
  font-size: 14px;
}
div.regression-fairness-plot > div.plotly-container {
  position: absolute;
  left: 230px;
  width: calc(100% - 230px);
  height: 100%;
}
</style>
