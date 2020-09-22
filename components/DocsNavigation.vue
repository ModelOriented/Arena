<template>
  <div class="docs-navigation">
    <div v-for="c in categories" :key="c" class="category" :class="{ desktop: c !== activeCategory }">
      <span class="label">{{ c }}</span>
      <NLink v-for="d in docs.filter(d => d.category === c)" :key="d.id" :to="'/docs/' + d.id" :class="{ active: '/docs/' + d.id === $route.path }">
        {{ d.label }}
      </NLink>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DocsNavigation',
  data () {
    return {
    }
  },
  computed: {
    docs () {
      return this.$store.getters.docs
    },
    categories () {
      return [...new Set(this.docs.map(d => d.category))]
    },
    activeCategory () {
      return (this.docs.find(d => '/docs/' + d.id === this.$route.path) || {}).category
    }
  },
  methods: {}
}
</script>
<style lang="sass">
.docs-navigation
  border: 1px solid $lightgrey
  border-radius: 7px
  box-shadow: 0 0 2px 0 rgba(200, 200, 200, 0.2)
  font-family: 'Fira Sans'
  > .category
    border-top: 1px solid $lightgrey
    @include mobile
      border-top: none
    &:first-child
      border-top: none
    > .label
      font-family: 'Fira Sans Bold'
      display: block
      padding: 10px 5px
      color: $darkblue
    > a
      display: block
      padding: 10px 5px
      text-decoration: none
      color: $darkgrey
    > a:hover
      color: $darkblue
      background: $lightgrey
    > a.active
      color: $darkblue
      font-weight: 800
      background: $lightgrey
</style>
