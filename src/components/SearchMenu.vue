<template>
  <div class="search-menu">
    <input type="text" v-model="editText">
    <div class="entry" v-for="o in availableOptions" :key="o.uuid" @click="$emit('setParam', o)">
      {{ o.name | formatTitle }}
    </div>
    <div class="entry" @click="$emit('close')">Close</div>
  </div>
</template>
<script>
import format from '@/utils/format.js'
import { mapGetters } from 'vuex'
import Fuse from 'fuse.js'

export default {
  name: 'SearchMenu',
  props: {
    paramName: String
  },
  data () {
    return {
      editText: ''
    }
  },
  computed: {
    fuse () {
      return new Fuse(this.availableParams[this.paramName] || [], { keys: ['name'] })
    },
    availableOptions () {
      if (this.editText.length < 1) return (this.availableParams[this.paramName] || []).slice(0, 10)
      return this.fuse.search(this.editText).slice(0, 10)
    },
    ...mapGetters(['availableParams'])
  },
  filters: {
    formatTitle: format.formatTitle
  },
  methods: {
    onClickOutside (e) {
      if (!this.$el.contains(e.target)) this.$emit('close')
    }
  },
  mounted () {
    document.addEventListener('click', this.onClickOutside)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.onClickOutside)
  }
}
</script>
<style>
div.search-menu {
  z-index: 100000;
  position: absolute;
  min-width: 100px;
  background-color: white;
  display: inline-block;
  font-size: 13px;
  cursor: pointer;
  color: black;
  font-weight: 600;
  border: 1px solid #ddd;
  box-shadow: 0 0 8px 0 rgba(200, 200, 200, 0.5);
}
div.search-menu > div.entry {
  padding: 10px;
}
div.search-menu > div.entry:hover {
  background: #eee;
  color: #371ea8;
}
div.search-menu > input {
  padding: 10px;
  width: calc(100% - 20px);
  border: none;
  outline: none;
  background: #eee;
  color: #371ea3;
  margin: 0;
}
</style>
