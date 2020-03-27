<template>
  <div class="search-dropdown" :class="{ open }" @click="open = true">
    <input type="text" v-model="editText" @keyup.escape="open = false">
    <span class="param-name">{{ displayedParamName }}</span>
    <span class="param-value">{{ displayedValue }}</span>
    <div class="options-list" v-if="open && availableOptions.length > 0">
      <div class="option" v-for="o in availableOptions" :key="o.uuid" @click="setParam(o)">
        {{ o.name | formatTitle }}
      </div>
    </div>
  </div>
</template>
<script>
import format from '@/utils/format.js'
import { mapGetters, mapMutations } from 'vuex'
import Fuse from 'fuse.js'

export default {
  name: 'SearchDropdown',
  props: {
    paramName: String
  },
  data () {
    return {
      open: false,
      editText: ''
    }
  },
  watch: {
    open (newValue, oldValue) {
      if (!newValue) this.editText = ''
    }
  },
  computed: {
    displayedValue () {
      let valueName = (this.getGlobalParam(this.paramName) || {}).name
      return format.formatTitle(valueName || '')
    },
    displayedParamName () {
      return format.firstCharUpper(this.paramName)
    },
    fuse () {
      return new Fuse(this.availableParams[this.paramName] || [], { keys: ['name'] })
    },
    availableOptions () {
      if (this.editText.length < 1) return (this.availableParams[this.paramName] || []).slice(0, 15)
      return this.fuse.search(this.editText).slice(0, 15)
    },
    ...mapGetters(['availableParams', 'getGlobalParam'])
  },
  methods: {
    onClickOutside (e) {
      if (!this.$el.contains(e.target)) this.open = false
    },
    setParam (p) {
      this.open = false
      this.setGlobalParam({ name: this.paramName, value: p })
    },
    ...mapMutations(['setGlobalParam'])
  },
  mounted () {
    document.addEventListener('click', this.onClickOutside)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.onClickOutside)
  },
  filters: {
    formatTitle: format.formatTitle
  }
}
</script>
<style>
div.search-dropdown {
  display: inline-block;
  position: relative;
  width: 250px;
  height: 100%;
  padding: 0;
  transition: width 0.3s;
}
div.search-dropdown.open {
  width: 400px;
}
div.search-dropdown > input {
  width: calc(100% - 40px);
  height: 100%;
  border: 0;
  padding: 0 20px;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
  color: #371ea3;
  background: none;
  opacity: 0;
  background: #eee;
  transition: opacity 0.3s;
  z-index: 2;
  outline: none;
}
div.search-dropdown.open > input {
  opacity: 1;
}
div.search-dropdown > span.param-name {
  z-index: 1;
  opacity: 1;
  position: absolute;
  display: block;
  width: calc(100% - 40px);
  top: 10px;
  font-size: 14px;
  line-height: 14px;
  left: 20px;
  color: #4378bf;
}
div.search-dropdown.open > span.param-name {
  opacity: 0;
}
div.search-dropdown > span.param-value {
  z-index: 1;
  opacity: 1;
  position: absolute;
  display: block;
  width: calc(100% - 40px);
  top: 30px;
  font-size: 20px;
  line-height: 20px;
  height: 30px;
  left: 20px;
  color: #555;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
div.search-dropdown.open > span.param-name {
  opacity: 0;
}
div.search-dropdown > div.options-list {
  position: absolute;
  left: 0;
  top: calc(100% + 10px);
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 0 8px 0 rgba(200, 200, 200, 0.5);
}
div.search-dropdown > div.options-list > div.option {
  width: calc(100% - 40px);
  padding: 15px 20px;
  font-size: 16px;
  line-height: 16px;
  background: white;
}
div.search-dropdown > div.options-list > div.option:hover {
  background: #eee;
  color: #371ea8;
}
</style>
