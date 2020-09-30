<template>
  <div class="plot-dropdown" :class="{ active }">
    <div class="selected" @click="active = !active" @contextmenu.prevent="active = !active">
      <span class="value">{{ value | formatTitle }}</span>
    </div>
    <font-awesome-icon icon="angle-down" class="caret"/>
    <div v-if="active" class="values" :style="valuesStyle">
      <div class="value" v-for="v in values" :key="v" @click="setValue(v)">{{ v | formatTitle }}</div>
    </div>
  </div>
</template>
<script>
import format from '@/utils/format.js'

export default {
  name: 'PlotDropdown',
  props: {
    start: String,
    values: Array,
    listDown: Boolean
  },
  data () {
    return {
      active: false,
      value: String
    }
  },
  watch: {
    value () {
      this.$emit('update', this.value)
    },
    start () {
      if (this.value !== this.start) this.value = this.start
    }
  },
  created () {
    this.value = this.start
  },
  filters: {
    formatTitle: format.formatTitle
  },
  mounted () {
    document.addEventListener('pointerdown', this.handlePointerDown)
  },
  beforeDestroy () {
    document.removeEventListener('pointerdown', this.handlePointerDown)
  },
  computed: {
    valuesStyle () {
      if (this.listDown) return { top: '30px' }
      else return { bottom: '30px' }
    }
  },
  methods: {
    handlePointerDown (event) {
      if (!this.$el.contains(event.target)) this.active = false
    },
    setValue (v) {
      this.value = v
      this.active = false
    }
  }
}
</script>
<style>
div.plot-dropdown {
  max-width: 200px;
  min-width: 30px;
  padding-right: 20px;
  position: relative;
  color: #371ea3;
}
div.plot-dropdown > div.selected {
  height: 30px;
  line-height: 30px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'FiraSansBold'
}
div.plot-dropdown > .caret {
  position: absolute;
  right: 5px;
  top: 7px;
}
div.plot-dropdown > div.values {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 0 8px 0 rgba(200, 200, 200, 0.5);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}
div.plot-dropdown > div.values > div.value {
  color: black;
  padding: 5px 15px;
  background: white;
}
div.plot-dropdown > div.values > div.value:hover {
  color: #371ea3;
  background: #eee;
}
</style>
