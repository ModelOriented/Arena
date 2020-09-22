<template>
  <div class="docs">
    <div class="navigation-container">
      <DocsNavigation />
    </div>
    <div class="content-container">
      <span class="title">{{ title }}</span>
      <component :is="content" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Docs',
  layout: 'simple',
  computed: {
    content () {
      return () => import('@/content/docs/' + this.$route.params.id)
    },
    doc () {
      return this.$store.getters.docs.find(d => d.id === this.$route.params.id)
    },
    title () {
      return (this.doc || {}).label || ''
    }
  }
}
</script>
<style lang="sass">
$nav_width: 300px
$spaces: 80px
.docs
  position: relative
  .content-container
    position: relative
    width: calc(100% - #{$nav_width + 3 * $spaces})
    left: $nav_width + 2 * $spaces
    top: 100px
    .title
      font-size: 36px
      font-family: 'Fira Sans'
    @include mobile
      left: 10px
      width: calc(100% - 20px)
      top: 40px
  .navigation-container
    position: absolute
    width: $nav_width
    left: $spaces
    top: 100px
    padding-bottom: 50px
    @include mobile
      position: relative
      width: calc(100% - 20px)
      left: 10px
      top: 20px
      padding-bottom: 0
</style>
