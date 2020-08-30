<template>
  <div class='sidepanel-dropdown'>
    <div class="options-list">
      <div class="group" v-for="g in scopes" :key="g">
        <div class="group-name">{{ g | firstCharUpper }}</div>
        <div class="option" v-for="o in availableParams[g]" :key="o" :class="{ selected: isSelected(g, o) }" @click.self="select(g, o)">
          {{ o | formatTitle }}
          <span class="left-button">
            <font-awesome-icon icon="plus" class="add button" v-if="selectedGroup === g && !isSelected(g, o)"/>
            <font-awesome-icon icon="plus-square" class="add button-hover" v-if="selectedGroup === g && !isSelected(g, o)" @click="addSelect(g, o)"/>
            <font-awesome-icon icon="minus" class="minus button" v-if="isSelected(g, o) && selectedValues.length > 1"/>
            <font-awesome-icon icon="minus-square" class="minus button-hover" v-if="isSelected(g, o) && selectedValues.length > 1" @click="removeSelect(o)"/>
          </span>
          <font-awesome-icon icon="square" class="color-button" :style="{ display: !isSelectorOpen(g, o) ? 'block' : 'none', color: scopesColors[g][o] }" @click="openColorSelector(g, o)"/>
          <div class="color-selector" :style="{ display: isSelectorOpen(g, o) ? 'block' : 'none' }">
            <font-awesome-icon v-for="color in palette" :key="color" icon="square" class="color-button" :style="{ color }" @click="setColor(g, o, color)"/>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="group-name">Other</div>
        <div class="option" :class="{ selected: isSelected('other', 'clipboard') }" @click.self="select('other', 'clipboard')">Clipboard</div>
        <div class="option" :class="{ selected: isSelected('other', 'annotate') }" @click.self="select('other', 'annotate')">
          Annotate
          <font-awesome-icon v-if="!isSelectorOpen('other', 'annotate')" :icon="annotationsColor === 'erase' ? 'eraser' : 'square'" class="color-button"
          :style="{ color: annotationsColor === 'erase' ? 'black' : annotationsColor }" @click="openColorSelector('other', 'annotate')"/>
          <div class="color-selector" :style="{ display: isSelectorOpen('other', 'annotate') ? 'block' : 'none' }">
            <font-awesome-icon v-for="color in palette" :key="color" icon="square" class="color-button" :style="{ color }" @click="setAnnotationsColor(color)"/>
            <font-awesome-icon icon="eraser" class="color-button" style="color: black" @click="setAnnotationsColor('erase')"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import format from '@/utils/format.js'
import PlotsInfo from '@/configuration/PlotsInfo.js'
import { mapGetters } from 'vuex'
import config from '@/configuration/config.js'
import equal from 'fast-deep-equal/es6'

export default {
  name: 'SidepanelDropdown',
  data () {
    return {
      selectedGroup: config.scopes[0],
      selectedValues: [],
      colorSelectorGroup: null,
      colorSelectorValue: null
    }
  },
  watch: {
    availableSlots () {
      this.$emit('updateSlotsList', this.availableSlots)
    },
    'availableSelectedGroupParams': function (newValue, oldValue) {
      // filter params that are not available anymore
      this.selectedValues = this.selectedValues.filter(sel => newValue.includes(sel))
      if (this.selectedValues.length === 0) this.selectedValues = newValue.slice(0, 1)
    },
    selectedValues () {
      this.$store.commit('setAnnotationsActive', this.selectedGroup === 'other' && this.selectedValues.find(v => v === 'annotate'))
    }
  },
  computed: {
    displayedValue () {
      return this.selectedValues.map(v => v || '').map(format.formatTitle).join(', ')
    },
    displayedGroup () {
      return format.firstCharUpper(this.selectedGroup)
    },
    scopes () { return config.scopes.filter(s => this.availableParams[s].length > 0) },
    /* Slots for selected params, will be emitted to Sidepanel */
    availableSlots () {
      // it forces refreshing slots id, when any slot is added to playground
      if (!this.allSlots) return []

      if (config.scopes.includes(this.selectedGroup)) {
        let plotTypes = this.selectedValues.map(m => this.getAvailableSlots({ [this.selectedGroup]: m }, this.selectedGroup)).flat().reduce((acu, slot) => {
          // if there are no slot of that plotType in accumulator that set current one
          // in other case just append localParams
          if (!acu[slot.plotType]) acu[slot.plotType] = slot
          else {
            if (!PlotsInfo.canMerge(acu[slot.plotType], slot)) return acu
            // get all localParams from slot that do not exist already in accumulator (removing duplications)
            let newLocalParams = slot.localParams.filter(a => {
              return !acu[slot.plotType].localParams.find(b => equal(a, b))
            })
            acu[slot.plotType].localParams = [...acu[slot.plotType].localParams, ...newLocalParams]
          }
          return acu
        }, {})
        return Object.values(plotTypes).filter(slot => slot.localParams.length >= this.selectedValues.length)
      } else if (this.selectedGroup === 'other' && this.selectedValues.includes('clipboard')) {
        return this.archivedSlots
      }
      return []
    },
    availableSelectedGroupParams () {
      if (this.selectedGroup === 'other') return ['clipboard', 'annotate']
      if (!config.scopes.includes(this.selectedGroup)) return []
      return this.availableParams[this.selectedGroup]
    },
    ...mapGetters(['availableParams', 'getGlobalParam', 'palette', 'archivedSlots', 'getAvailableSlots', 'allSlots', 'annotationsColor', 'scopesColors'])
  },
  filters: {
    formatTitle: format.formatTitle,
    firstCharUpper: format.firstCharUpper
  },
  methods: {
    isSelectorOpen (group, value) {
      return this.colorSelectorGroup === group && this.colorSelectorValue === value
    },
    isSelected (group, value) {
      return this.selectedGroup === group && this.selectedValues.includes(value)
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
      if (this.selectedValues.length > 1) this.selectedValues = this.selectedValues.filter(s => s !== value)
    },
    openColorSelector (group, value) {
      this.colorSelectorGroup = group
      this.colorSelectorValue = value
    },
    setColor (scope, paramName, color) {
      this.colorSelectorGroup = null
      this.colorSelectorValue = null
      this.$store.commit('setColor', { scope, paramName, color })
    },
    setAnnotationsColor (color) {
      this.colorSelector = null
      this.colorSelectorValue = null
      this.$store.commit('setAnnotationsColor', color)
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
div.sidepanel-dropdown > div.options-list > div.group > div.group-name {
  width: calc(100% - 60px);
  padding: 15px 30px 5px 30px;
  font-size: 14px;
  line-height: 14px;
  background: white;
  color: #4378bf;
}
div.sidepanel-dropdown > div.options-list > div.group > div.option {
  width: calc(100% - 60px);
  padding: 15px 30px;
  font-size: 16px;
  line-height: 16px;
  background: white;
  position: relative;
}
div.sidepanel-dropdown > div.options-list > div.group > div.option:hover {
  background: #eee;
  color: #371ea8;
}
div.sidepanel-dropdown > div.options-list > div.group > div.option.selected {
  background: #eee;
  color: #371ea8;
  font-family: "FiraSansBold";
}
div.sidepanel-dropdown > div.options-list > div.group > div.option > .left-button > * {
  position: absolute;
  left: 15px;
  top: 50%;
  font-size: 12px;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
div.sidepanel-dropdown > div.options-list > div.group > div.option > .left-button > .button {
  display: initial;
}
div.sidepanel-dropdown > div.options-list > div.group > div.option > .left-button > .button-hover {
  display: none;
  font-size: 16px;
}
div.sidepanel-dropdown > div.options-list > div.group > div.option > .left-button:hover > .button {
  display: none;
}
div.sidepanel-dropdown > div.options-list > div.group > div.option > .left-button:hover > .button-hover {
  display: initial;
}
div.sidepanel-dropdown > div.options-list > div.group > div.option .color-button {
  cursor: pointer;
  font-size: 20px;
}
div.sidepanel-dropdown > div.options-list > div.group > div.option > .color-button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translate(-50%, -50%);
}
div.sidepanel-dropdown > div.options-list > div.group > div.option > div.color-selector {
  padding: 7px 0;
  position: relative;
  top: 10px;
}
div.sidepanel-dropdown > div.options-list > div.group > div.option > div.color-selector > .color-button {
  margin: 0 5px;
}
</style>
