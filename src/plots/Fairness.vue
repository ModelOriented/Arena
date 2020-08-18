<template>
  <div class="fairness-plot">
    <div class="options-container">
      <span class="label">Choose plot type</span>
      <div class="subplot-input" v-for="s in subplots" :key="s.name">
        <div class="checkboxes">
          <font-awesome-icon v-if="subplot === s" :icon="['fas', 'check-circle']"/>
          <font-awesome-icon v-else :icon="['far', 'circle']" @click="setSubplot(s)"/>
        </div>
        <span class="label">{{ s.name }}</span>
      </div>
      <span class="label">Choose privileged variable and set cutoffs</span>
      <div class="cutoff-input" v-for="s in cutoffs" :key="s.subgroup">
        <span class="label">{{ s.subgroup }}</span>
        <div class="checkboxes">
          <font-awesome-icon v-if="privileged === s.subgroup" :icon="['fas', 'check-circle']"/>
          <font-awesome-icon v-else :icon="['far', 'circle']" @click="setPrivileged(s.subgroup)"/>
        </div>
        <Slider v-if="selectedCutoffs" :min="0" :max="1" :start="selectedCutoffs[s.subgroup]" :values="s.cutoffs" @update="setCutoff(s.subgroup, $event)"/>
      </div>
    </div>
    <component :is="subplot.component" v-bind="{ data, metrics, privileged }" class="plotly-container"/>
  </div>
</template>
<script>
import Slider from '@/components/Slider.vue'
import streams from '@/utils/streams.js'
import FairnessSubplotRelative from '@/plots/FairnessSubplotRelative.vue'
import FairnessSubplotAbsolute from '@/plots/FairnessSubplotAbsolute.vue'
const subplots = [
  { name: 'Fairness Check', component: 'FairnessSubplotRelative' },
  { name: 'Metric Scores', component: 'FairnessSubplotAbsolute' }
]

export default {
  name: 'Fairness',
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data () {
    return {
      privileged: null,
      selectedCutoffs: null,
      subplot: subplots[0]
    }
  },
  watch: {
    cutoffs: {
      handler () {
        if (!this.cutoffs) this.selectedCutoffs = {}
        if (this.customData && this.customData.cutoffs &&
            Object.entries(this.customData.cutoffs).every(([subgroup, cutoff]) => this.cutoffs.find(c => c.subgroup === subgroup && c.cutoffs.includes(cutoff))) &&
            this.cutoffs.every(c => Object.keys(this.customData.cutoffs).includes(c.subgroup))) {
          this.selectedCutoffs = this.customData.cutoffs
        } else {
          let selectedCutoffs = this.cutoffs.reduce((acu, s) => {
            let diffs = s.cutoffs.map(cutoff => Math.abs(cutoff - 0.5))
            acu[s.subgroup] = s.cutoffs[diffs.indexOf(Math.min(...diffs))]
            return acu
          }, {})
          this.setSelectedCutoffs(selectedCutoffs)
        }
      },
      immediate: true
    },
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
        if (this.customData.cutoffs && Object.entries(this.customData.cutoffs).every(([subgroup, cutoff]) => this.cutoffs.find(c => c.subgroup === subgroup && c.cutoffs.includes(cutoff))) &&
            this.cutoffs.every(c => Object.keys(this.customData.cutoffs).includes(c.subgroup))) {
          this.selectedCutoffs = this.customData.cutoffs
        }
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
      return [...new Set(this.data.map(d => Object.keys(d.plotData.subgroups)).flat())]
    },
    error () {
      return false
    },
    cutoffs () {
      return this.subgroupsNames.map(subgroup => {
        return {
          cutoffs: this.data.map(d => Object.keys(d.plotData.subgroups[subgroup])).reduce((acu, x) => acu.filter(y => x.includes(y))).map(x => Number.parseFloat(x)).sort(),
          subgroup
        }
      })
    },
    metrics () {
      if (!this.privileged || !this.selectedCutoffs) return null
      return this.data.map(d => streams.runOnChildren(d.plotData.subgroups, (arr, key) => arr[this.selectedCutoffs[key]]))
    }
  },
  methods: {
    setCutoff (subgroup, value) {
      this.setSelectedCutoffs({ ...this.selectedCutoffs, [subgroup]: value })
    },
    setPrivileged (v) {
      this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...this.customData, privileged: v } })
    },
    setSubplot (v) {
      this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...this.customData, subplot: v } })
    },
    setSelectedCutoffs (v) {
      this.$store.commit('setSlotCustomData', { slot: this.slotv, customData: { ...this.customData, cutoffs: v } })
    }
  },
  components: {
    Slider, FairnessSubplotRelative, FairnessSubplotAbsolute
  }
}
</script>
<style>
div.fairness-plot > div.options-container {
  position: absolute;
  width: 220px;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  overflow-y: auto;
}
div.fairness-plot > div.options-container > span.label {
  font-size: 16px;
  color: #371ea3;
  width: 100%;
  display: inline-block;
  font-weight: 600;
  margin: 7px 0;
}
div.fairness-plot > div.options-container > div.cutoff-input {
  position: relative;
  padding-left: 15px;
}
div.fairness-plot > div.options-container > div.cutoff-input > div.checkboxes {
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  color: #371ea3;
}
div.fairness-plot > div.options-container > div.cutoff-input > span.label {
  font-size: 14px;
}
div.fairness-plot > div.options-container > div.subplot-input {
  position: relative;
  padding: 3px 0 3px 15px;
}
div.fairness-plot > div.options-container > div.subplot-input > div.checkboxes {
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  color: #371ea3;
}
div.fairness-plot > div.options-container > div.subplot-input > span.label {
  font-size: 14px;
}
div.fairness-plot > div.plotly-container {
  position: absolute;
  left: 230px;
  width: calc(100% - 230px);
  height: 100%;
}
</style>
