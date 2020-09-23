<template>
  <div class="nav">
    <div class="nav-item left menu-toggle url mobile" @click="open = !open">
      <font-awesome-icon icon="bars" />
    </div>
    <img class="nav-item left logo" src="@/assets/logo.png">
    <div class="nav-item left title">Arena</div>
    <div v-for="l in [...links].reverse()" :key="l.label" class="nav-item right url desktop" :class="{ active: activeLink === l }">
      <a v-if="l.link && l.link.startsWith('http')" :href="l.link">{{ l.label }}</a>
      <NLink v-else-if="l.link" :to="l.link">{{ l.label }}</NLink>
      <span v-else>{{ l.label }}</span>
      <font-awesome-icon v-if="l.children" icon="angle-down" class="caret" />
      <div v-if="l.children" class="submenu">
        <div v-for="s in l.children" :key="s.label">
          <a v-if="s.link && s.link.startsWith('http')" :href="s.link">{{ s.label }}</a>
          <NLink v-else-if="s.link" :to="s.link">{{ s.label }}</NLink>
          <span v-else>{{ s.label }}</span>
        </div>
      </div>
    </div>
    <div v-if="open" class="menu mobile">
      <div v-for="l in links" :key="l.label" :class="{ active: l.label === submenu }" @click="submenu = submenu === l.label ? null : l.label">
        <a v-if="l.link && l.link.startsWith('http') && !l.children" :href="l.link">{{ l.label }}</a>
        <NLink v-else-if="l.link && !l.children" :to="l.link">{{ l.label }}</NLink>
        <span v-else>{{ l.label }}</span>
        <font-awesome-icon v-if="l.children" icon="angle-down" class="caret" />
        <div v-if="l.children && submenu == l.label" class="submenu">
          <div v-for="s in l.children" :key="s.label">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a v-if="s.link && s.link.startsWith('http')" :href="s.link">{{ s.label }}</a>
            <NLink v-else-if="s.link" :to="s.link">{{ s.label }}</NLink>
            <span v-else>{{ s.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data (context) {
    return {
      open: false,
      manualLinks: [
        {
          label: 'Demos',
          children: [
            { label: 'Apertments', link: 'https://arena.drwhy.ai?demo=0' },
            { label: 'FIFA Players value', link: 'https://arena.drwhy.ai?demo=1' },
            { label: 'Employees status classification', link: 'https://arena.drwhy.ai?demo=2' }
          ]
        },
        { label: 'GitHub', link: 'https://github.com/ModelOriented/Arena' }
      ],
      submenu: null
    }
  },
  computed: {
    links () {
      const docs = this.$store.getters.docs
      const categories = [...new Set(docs.map(d => d.category))].map(c => docs.find(d => d.category === c)).map(d => ({ label: d.category, link: '/guide/' + d.id }))
      // const docsLinks = categories.map(c => ({ label: c, children: docs.filter(d => d.category === c).map(d => ({ label: d.label, link: '/docs/' + d.id })) }))
      const links = [{ label: 'About', link: '/' }, { label: 'Guide', children: categories, link: '/guide' }]
      return links.concat(this.manualLinks)
    },
    activeLink () {
      return this.links.filter(l => l.link && this.$route.path.startsWith(l.link)).sort((a, b) => b.link.length - a.link.length).find(x => x)
    }
  },
  watch: {
    $route () {
      this.open = false
    }
  },
  methods: {}
}
</script>
<style lang="sass">
$nav_height: 90px
$nav_mobile_height: 60px
$nav_padding: 10px

.nav
  position: relative
  width: 100%
  height: $nav_height
  line-height: $nav_height
  font-family: 'Fira Sans'
  box-sizing: border-box
  padding: 0 15px

  @include mobile
    height: $nav_mobile_height
    line-height: $nav_mobile_height

  > .nav-item
    position: relative
    display: inline-block
    min-width: 50px
    height: 100%
    padding: $nav_padding 0
    margin: 0 15px
    line-height: #{$nav_height - 2 * $nav_padding}
    box-sizing: border-box
    vertical-align: top
    font-size: 24px
    color: $darkgrey
    @include mobile
      line-height: $nav_mobile_height - 2 * $nav_padding

  > .nav-item.right
    float: right

  > .nav-item.logo
    margin: 0 5px;

  > .nav-item.title
    font-size: 28px
    margin: 0 10px
    color: $darkblue

  > .nav-item.url
    &, a
      cursor: pointer
      color: $darkgrey
      text-decoration: none
    &:hover, &:hover > a
      color: $darkblue
    &.active, &.active > a
      color: $darkblue
      font-weight: 800

  > .nav-item > .caret
    font-size: 15px
    vertical-align: baseline

  > .nav-item.menu-toggle
    font-size: 20px
    margin: 0 10px 0 5px
    min-width: unset

.nav > .nav-item.url
  > .submenu
    display: none
    position: absolute
    right: 0
    top: $nav_height - 10px
    background: white
    border: 1px solid $lightgrey
    border-radius: 7px
    box-shadow: 0 0 2px 0 rgba(200, 200, 200, 0.2)
    min-width: 100px
    font-size: 16px
    z-index: 100
    line-height: 16px
    > div
      white-space: nowrap
      width: 100%
      text-align: right
      > *
        display: block
        text-decoration: none
        color: $darkgrey
        padding: 15px 10px
    > div:hover
      background: $lightgrey
      > *
        color: $darkblue

  &:hover > .submenu
    display: block

.nav > .menu
  position: absolute
  top: $nav_mobile_height
  left: 0
  width: 100%
  background: white
  border: 1px solid $lightgrey
  z-index: 100
  > div
    font-size: 16px
    padding: 15px 10px
    cursor: pointer
    line-height: 16px
    > a, > span
      text-decoration: none
      color: $darkgrey
    &:hover
      background: $lightgrey
      > *
        color: $darkblue
      &.active
        background: white
    &.active
      > *
        color: $darkblue
    > .submenu
      > div
        padding: 10px 10px
        > *
          text-decoration: none
          color: $darkgrey
        &:hover
          background: $lightgrey
          > *
            color: $darkblue
</style>
