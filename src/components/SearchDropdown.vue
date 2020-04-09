<template>
  <div class="search-dropdown" :class="{ open }" @click="open = true">
    <input type="text" v-model="editText" @keyup.escape="open = false">
    <span class="param-name">{{ displayedParamName }}</span>
    <span class="param-value">{{ displayedValue }}</span>
    <font-awesome-icon icon="angle-down" class="caret"/>
    <div class="options-list" v-if="open && availableOptions.length > 0">
      <SearchDropdownElement v-for="o in availableOptions" :key="o.uuid" :paramName="paramName" :paramValue="o"
      @setParam="setParam(o)" @take="$emit('addToPlayground', $event)"/>
      <div class="page-row" v-if="pagesCount > 1">
        <!-- We cannot use v-if here, because vue can remove item before document click listener will search for it -->
        <div class="page-left page-button" :class="{ invisible: page <= 0}" @click="page -= 1">
          <font-awesome-icon icon="angle-left"/> Previous
        </div>
        Page {{ page + 1 }} of {{ pagesCount }}
        <div class="page-right page-button" :class="{ invisible: page >= pagesCount }" @click="page += 1">
          Next <font-awesome-icon icon="angle-right"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import format from '@/utils/format.js'
import { mapGetters, mapMutations } from 'vuex'
import Fuse from 'fuse.js'
import SearchDropdownElement from '@/components/SearchDropdownElement.vue'

export default {
  name: 'SearchDropdown',
  props: {
    paramName: String
  },
  data () {
    return {
      open: false,
      page: 0,
      itemsOnPage: 15,
      editText: ''
    }
  },
  watch: {
    open (newValue, oldValue) {
      if (!newValue) {
        this.editText = ''
        this.page = 0
      }
    },
    editText () {
      this.page = 0
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
    allAvailableOptions () {
      if (this.editText.length < 1) return (this.availableParams[this.paramName] || [])
      return this.fuse.search(this.editText)
    },
    availableOptions () {
      return this.allAvailableOptions.slice(this.page * this.itemsOnPage, (this.page + 1) * this.itemsOnPage)
    },
    pagesCount () {
      return Math.ceil(this.allAvailableOptions.length / this.itemsOnPage)
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
    document.addEventListener('pointerdown', this.onClickOutside)
  },
  beforeDestroy () {
    document.removeEventListener('pointerdown', this.onClickOutside)
  },
  components: { SearchDropdownElement }
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
  cursor: pointer;
}
div.search-dropdown.open > input {
  opacity: 1;
  cursor: auto;
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
div.search-dropdown > .caret {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  color: #555;
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
div.search-dropdown > div.options-list > div.page-row {
  text-align: center;
  padding: 15px 0;
  font-size: 16px;
  line-height: 16px;
  background: white;
  position: relative;
}
div.search-dropdown > div.options-list > div.page-row > div.page-button {
  position: absolute;
  top: 0;
  padding: 15px 20px;
  cursor: pointer;
}
div.search-dropdown > div.options-list > div.page-row > div.page-button:hover {
  background: #eee;
  color: #371ea8;
}
div.search-dropdown > div.options-list > div.page-row > div.page-button.invisible {
  display: none;
}
div.search-dropdown > div.options-list > div.page-row > div.page-left {
  left: 0;
}
div.search-dropdown > div.options-list > div.page-row > div.page-right {
  right: 0;
}
</style>
