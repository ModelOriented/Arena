<template>
  <div class="code">
    <div class="lang-select">
      <button v-for="(lang, i) in langs" :key="lang" :class="{ active: i === visible }" @click="visible = i">
        {{ lang }}
      </button>
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div class="source">
      <pre><code v-html="highlighted[visible]" /></pre>
    </div>
  </div>
</template>
<script>
import Prism from 'prismjs'
export default {
  name: '',
  props: {
    langs: {
      type: Array,
      default: () => []
    },
    sources: {
      type: Array,
      default: () => []
    },
    syntax: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visible: 0
    }
  },
  computed: {
    highlighted () {
      return this.sources.map((src, i) => {
        return Prism.highlight(src, Prism.languages[this.syntax[i]], this.syntax[i])
      })
    }
  },
  methods: {}
}
</script>
<style lang="sass">
$bgcolor: #2f2f2f
.code
  margin: 15px 0
  .lang-select
    padding-left: 10px
    overflow-x: auto
    white-space: nowrap
    button
      background: white
      border: 1px solid $bgcolor
      border-bottom: none
      padding: 5px 10px
      color: $bgcolor
      font-size: 16px
      cursor: pointer
      border-radius: 5px 5px 0 0
      margin: 0 2px
    button.active
      background: $bgcolor
      color: white
  .source
    border-radius: 5px
    font-size: 16px
    background: $bgcolor
    padding: 10px
    color: white
    overflow-x: auto
    font-family: monospace, monospace
</style>
