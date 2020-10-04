<template>
  <section :id="simplified" class="doc-section">
    <h2>{{ name }}<a class="link" :href="baseURL + $route.path + '#' + simplified"><font-awesome-icon icon="link" /></a></h2>
    <slot />
  </section>
</template>
<script>
export default {
  name: 'DocSection',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    baseURL () {
      return 'https://arena.drwhy.ai/docs'
    },
    simplified () {
      return this.name.toLowerCase().replace(/ /g, '-')
    }
  }
}
</script>
<style lang="sass">
.doc-section > h2
  font-size: 26px
  font-family: 'Fira Sans'
  margin-bottom: 10px
  > .link
    color: $blue
    font-size: 15px
    display: inline-block
    padding-left: 7px
    vertical-align: middle
    padding-bottom: 3px
    cursor: pointer
    text-decoration: none
.doc-section
  text-align: justify
  line-height: 150%
</style>
