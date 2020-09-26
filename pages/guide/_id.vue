<template>
  <div class="docs">
    <div class="navigation-container">
      <DocsNavigation />
    </div>
    <article class="content-container">
      <span class="title">{{ title }}</span>
      <hr>
      <component :is="content" />
      <NLink v-if="prev" :to="'/guide/' + prev.id" class="page-nav left">
        <font-awesome-icon icon="angle-left" />
        {{ prev.label }}
      </NLink>
      <NLink v-if="next" :to="'/guide/' + next.id" class="page-nav right">
        {{ next.label }}
        <font-awesome-icon icon="angle-right" />
      </NLink>
    </article>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Docs',
  layout: 'simple',
  computed: {
    docId () {
      return this.$route.params.id || this.docs[0].id
    },
    content () {
      return () => import('@/content/docs/' + this.docId)
    },
    doc () {
      return this.docs.find(d => d.id === this.docId)
    },
    title () {
      return (this.doc || {}).label || ''
    },
    docIndex () {
      return this.docs.indexOf(this.doc)
    },
    next () {
      return this.docIndex < this.docs.length - 1 ? this.docs[this.docIndex + 1] : null
    },
    prev () {
      return this.docIndex > 0 ? this.docs[this.docIndex - 1] : null
    },
    ...mapGetters(['docs'])
  }
}
</script>
<style lang="sass">
$nav_width: 300px
$spaces: 80px
$left_upper: calc((50% - #{($nav_width + $spaces + 800px) / 2}) + #{$nav_width + $spaces})
$left_lower: #{$nav_width + 2 * $spaces}
.docs
  position: relative
  .content-container
    position: relative
    width: calc(100% - #{$nav_width + 3 * $spaces})
    max-width: 800px
    left: unquote('max(#{$left_lower}, #{$left_upper})')
    top: 100px
    font-size: 1.1em
    font-family: 'Arial', 'Sans Serif'
    padding-bottom: 80px
    img
      max-width: 100%
      display: block
      margin: 30px 0
    .title
      font-size: 40px
      font-family: 'Fira Sans'
      color: black
    > hr
      color: black
      margin-bottom: 30px
    ol, ul
      margin: 10px 0
      > li
        padding: 3px 0
        &::marker
          font-weight: 800
    @include mobile
      left: 10px
      width: calc(100% - 20px)
      top: 40px
      padding-bottom: 0
    > .page-nav
      padding: 10px 15px
      border: 1px solid $blue
      border-radius: 5px
      text-decoration: none
      font-weight: 800
      position: absolute
      bottom: 20px
      &.right
        right: 0
      &.left
        left: 0
      @include mobile
        width: calc(100% - 30px)
        display: block
        position: relative
        bottom: 0
        margin: 10px 0
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
