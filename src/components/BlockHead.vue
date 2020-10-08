<template>
  <div class="block-head">
    <div class="main-title-box">
      <span v-if="!titleEdit" @dblclick="titleEdit = true" class="title tooltiped">
        <span class="tooltip">Double click to edit</span>
        <span class="title-text">{{ slotv.name }}</span>
      </span>
      <span class="tooltiped plot-help-box" v-if="docURL && !titleEdit">
        <span class="tooltip">Open documentation</span>
        <a :href="docURL" target="_blank"><font-awesome-icon :icon="['far', 'question-circle']"/></a>
      </span>
      <input v-if="titleEdit" type="text" class="title-input" :value="slotv.name" @blur="saveTitle" @keyup.enter="saveTitle" @keyup.escape="titleEdit = false" ref="titleInput">
      <div class="subtitle" v-html="usedModels"></div>
    </div>
    <div class="locks">
      <span v-if="isMerged" @click="splitSlot(slotv)">Split <font-awesome-icon :icon="['far', 'clone']"/></span>
      <span v-for="p in lockableParams" :key="p.name" @click="lockUnlockParam(p.name)" @contextmenu.prevent="openParamSearch(p.name, $event)" class="tooltiped">
        <span class="tooltip">Left click to lock<br>Right click to choose</span>
        {{ p.value ? p.value : p.name | titleFormat }} {{ p.value ? '&#x1f512;' : '&#x1f513;' }}
      </span>
      <SearchMenu v-if="searchMenuParam" :paramName="searchMenuParam" :style="searchManuStyle" @close="searchMenuParam = ''" @setParam="setSlotParam($event)"/>
    </div>
  </div>
</template>
<script>
import PlotsInfo from '@/configuration/PlotsInfo.js'
import SearchMenu from '@/components/SearchMenu.vue'
import format from '@/utils/format.js'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'BlockHead',
  props: {
    slotv: Object,
    plotComponent: String
  },
  data () {
    return {
      titleEdit: false,
      searchMenuParam: '',
      searchManuStyle: {}
    }
  },
  filters: {
    titleFormat: format.formatTitle
  },
  computed: {
    fullParams () { return this.getSlotFullParams(this.slotv.localParams) },
    usedModels () {
      let scope = this.slotv.scope
      return [...new Set(this.fullParams.map((p, i) => '<span style="color: ' + this.scopesColors[scope][p[scope]] + '">' + p[scope] + '</span>'))].join(', ')
    },
    isMerged () {
      return this.slotv && this.slotv.localParams.length > 1
    },
    lockableParams () {
      if (this.slotv.localParams.length === 0) return []
      let available = PlotsInfo.lockableParams[this.slotv.plotType] || []
      // Use only those params, that have identical value (including undefined) in all sub plots
      let sameValueParams = available.filter(avail => !this.slotv.localParams.find(local => local[avail] !== this.slotv.localParams[0][avail]))
      return sameValueParams.map(p => { return { name: p, value: this.slotv.localParams[0][p] } })
    },
    docURL () {
      if (!this.slotv) return ''
      return PlotsInfo.getPlotDoc(this.slotv.plotType)
    },
    ...mapGetters(['getSlotFullParams', 'availableParams', 'scopesColors'])
  },
  methods: {
    saveTitle () {
      this.setSlotName({ slot: this.slotv, name: this.$refs.titleInput.value })
      this.titleEdit = false
    },
    lockUnlockParam (param) {
      let isLocked = !!this.lockableParams.find(p => p.name === param && p.value)
      isLocked ? this.unsetParam({ slot: this.slotv, paramName: param }) : this.setParam({ slot: this.slotv, paramName: param, paramValue: this.fullParams[0][param] })
    },
    openParamSearch (param, e) {
      this.searchManuStyle = { top: e.pointerY, left: e.pointerX }
      this.searchMenuParam = param
    },
    setSlotParam (paramValue) {
      this.setParam({ slot: this.slotv, paramName: this.searchMenuParam, paramValue })
      this.searchMenuParam = ''
    },
    ...mapMutations(['setSlotName', 'setParam', 'unsetParam', 'splitSlot'])
  },
  components: { SearchMenu }
}
</script>
<style>
div.block-head {
  height: 64px;
  box-sizing: border-box;
  font-size: 28px;
  line-height: 28px;
  padding-left: 10px;
  font-weight: 800;
  white-space: nowrap;
  color: #371ea3;
}
div.block-head > div.main-title-box {
  position: absolute;
  width: calc(100% - 10px);
}
div.block-head > div.main-title-box > span.title {
  position: relative;
  top: 24px;
}
div.block-head > div.main-title-box > span.title > span.title-text {
  cursor: text;
  display: inline-block;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
}
div.block-head > div.main-title-box > input.title-input {
  border: none;
  font-size: 28px;
  height: 36px;
  position: relative;
  top: 24px;
  color: #371ea3;
  outline: none;
}
div.block-head > div.main-title-box > span.plot-help-box {
  position: relative;
  top: 17px;
  left: 5px;
  font-size: 15px;
}
div.block-head > div.locks {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 14px;
  line-height: 18px;
  float: right;
}
div.block-head > div.locks > span {
  display: block;
  text-align: right;
  cursor: pointer;
}
div.block-head > div.main-title-box > div.subtitle {
  position: absolute;
  top: 0;
  height: 28px;
  font-size: 14px;
  line-height: 28px;
  overflow: hidden;
  width: calc(100% - 10px);
  text-overflow: ellipsis;
}
</style>
