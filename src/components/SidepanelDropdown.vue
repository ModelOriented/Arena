<template>
  <div class='sidepanel-dropdown'>
    <div class="options-list">
      <div class="group-name">Model</div>
      <div class="option" v-for="o in availableParams['model']" :key="o.uuid" :class="{ selected: isSelected('model', o.uuid) }" @click.self="select('model', o)">
        {{ o.name | formatTitle }}
        <span class="left-button">
          <font-awesome-icon icon="plus" class="add button" v-if="selectedGroup == 'model' && !isSelected('model', o.uuid)"/>
          <font-awesome-icon icon="plus-square" class="add button-hover" v-if="selectedGroup == 'model' && !isSelected('model', o.uuid)" @click="addSelect('model', o)"/>
          <font-awesome-icon icon="minus" class="minus button" v-if="isSelected('model', o.uuid) && selectedValues.length > 1"/>
          <font-awesome-icon icon="minus-square" class="minus button-hover" v-if="isSelected('model', o.uuid) && selectedValues.length > 1" @click="removeSelect(o.uuid)"/>
        </span>
        <font-awesome-icon icon="square" class="color-button" :style="{ display: colorSelector !== o.uuid ? 'block' : 'none', color: modelsColors[o.uuid] }" @click="colorSelector = o.uuid"/>
        <div class="color-selector" :style="{ display: colorSelector === o.uuid ? 'block' : 'none' }">
          <font-awesome-icon v-for="color in palette" :key="color" icon="square" class="color-button" :style="{ color }" @click="setColor(o.uuid, color)"/>
        </div>
      </div>
      <div class="group-name">Other</div>
      <div class="option" :class="{ selected: isSelected('other', 'clipboard') }" @click.self="select('other', 'clipboard')">Clipboard</div>
    </div>
  </div>
</template>
<script>
import format from '@/utils/format.js'
import PlotsInfo from '@/plots/PlotsInfo.js'
import { mapGetters } from 'vuex'

export default {
  name: 'SidepanelDropdown',
  data () {
    return {
      selectedGroup: 'model',
      selectedValues: [],
      colorSelector: null // uuid of model when open
    }
  },
  watch: {
    availableSlots () {
      this.$emit('updateSlotsList', this.availableSlots)
    },
    'availableParams.model': function (newValue, oldValue) {
      if (this.selectedGroup !== 'model') return
      // filter params that are not available anymore
      this.selectedValues = this.selectedValues.filter(sel => newValue.find(x => x.uuid === sel.uuid))
      if (this.selectedValues.length === 0) this.selectedValues = newValue.slice(0, 1)
    }
  },
  computed: {
    displayedValue () {
      return this.selectedValues.map(v => v.name || v || '').map(format.formatTitle).join(', ')
    },
    displayedGroup () {
      return format.firstCharUpper(this.selectedGroup)
    },
    /* Slots for selected params, will be emitted to Sidepanel */
    availableSlots () {
      // it forces refreshing slots id, when any slot is added to playground
      if (!this.allSlots) return []
      // function compares two params object based on uuid (names may differ)
      let sameParams = (a, b) => {
        let uuidA = Object.keys(a).reduce((acu, k) => { acu[k] = a[k].uuid; return acu }, {})
        let uuidB = Object.keys(b).reduce((acu, k) => { acu[k] = b[k].uuid; return acu }, {})
        return ![...new Set([...Object.keys(uuidA), ...Object.keys(uuidB)])].find(k => uuidA[k] !== uuidB[k])
      }
      if (this.selectedGroup === 'model') {
        let plotTypes = this.selectedValues.map(m => this.getAvailableSlots({ model: m })).flat().reduce((acu, slot) => {
          if (!acu[slot.plotType]) acu[slot.plotType] = slot
          else {
            if (!PlotsInfo.canMerge(acu[slot.plotType], slot)) return acu
            acu[slot.plotType].localParams = [...acu[slot.plotType].localParams, ...slot.localParams.filter(a => {
              return !acu[slot.plotType].localParams.find(b => sameParams(a, b))
            })]
          }
          return acu
        }, {})
        return Object.values(plotTypes).filter(slot => slot.localParams.length >= this.selectedValues.length)
      } else if (this.selectedGroup === 'other' && this.selectedValues.includes('clipboard')) {
        return this.archivedSlots
      }
      return []
    },
    ...mapGetters(['availableParams', 'getGlobalParam', 'modelsColors', 'palette', 'archivedSlots', 'getAvailableSlots', 'allSlots'])
  },
  filters: {
    formatTitle: format.formatTitle
  },
  methods: {
    isSelected (group, value) {
      return this.selectedGroup === group && this.selectedValues.find(s => s === value || (s || {}).uuid === value)
    },
    select (group, value) {
      this.selectedGroup = group
      this.selectedValues = [value]
      if (Object.keys(this.availableParams).includes(group)) this.$store.commit('setGlobalParam', { name: group, value })
    },
    addSelect (group, value) {
      if (this.selectedGroup !== group) this.select(group, value)
      else this.selectedValues = [...this.selectedValues, value]
    },
    removeSelect (value) {
      if (this.selectedValues.length > 1) this.selectedValues = this.selectedValues.filter(s => s !== value && (s || {}).uuid !== value)
    },
    setColor (uuid, color) {
      this.colorSelector = null
      this.$store.commit('setColor', { uuid, color })
    }
  }
}
</script>
<style>
div.sidepanel-dropdown {
  left: 0;
  width: 100%;
  position: relative;
  background: white;
}
div.sidepanel-dropdown > div.options-list {
  position: relative;
  z-index: 1;
  background: white;
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 1px solid #ccc;
}
div.sidepanel-dropdown > div.options-list > div.group-name {
  width: calc(100% - 60px);
  padding: 15px 30px 5px 30px;
  font-size: 14px;
  line-height: 14px;
  background: white;
  color: #4378bf;
}
div.sidepanel-dropdown > div.options-list > div.option {
  width: calc(100% - 60px);
  padding: 15px 30px;
  font-size: 16px;
  line-height: 16px;
  background: white;
  position: relative;
}
div.sidepanel-dropdown > div.options-list > div.option:hover {
  background: #eee;
  color: #371ea8;
}
div.sidepanel-dropdown > div.options-list > div.option.selected {
  background: #eee;
  color: #371ea8;
  font-family: "FiraSansBold";
}
div.sidepanel-dropdown > div.options-list > div.option > .left-button > * {
  position: absolute;
  left: 15px;
  top: 50%;
  font-size: 12px;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
div.sidepanel-dropdown > div.options-list > div.option > .left-button > .button {
  display: initial;
}
div.sidepanel-dropdown > div.options-list > div.option > .left-button > .button-hover {
  display: none;
  font-size: 16px;
}
div.sidepanel-dropdown > div.options-list > div.option > .left-button:hover > .button {
  display: none;
}
div.sidepanel-dropdown > div.options-list > div.option > .left-button:hover > .button-hover {
  display: initial;
}
div.sidepanel-dropdown > div.options-list > div.option .color-button {
  cursor: pointer;
  font-size: 20px;
}
div.sidepanel-dropdown > div.options-list > div.option > .color-button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translate(-50%, -50%);
}
div.sidepanel-dropdown > div.options-list > div.option > div.color-selector {
  padding: 7px 0;
  position: relative;
  top: 10px;
}
div.sidepanel-dropdown > div.options-list > div.option > div.color-selector > .color-button {
  margin: 0 5px;
}
</style>
