<template>
  <div class="pages-bar">
    <div v-for="i in pages" :key="i" class="page-button" @click="setPageNumber(i)" :class="{ active: pageNumber === i }" :style="scrollStyle">
      <div class="left-triangle"></div>
      <div class="content">
        Page {{ i }}
      </div>
      <div class="right-triangle"></div>
    </div>
    <div class="page-button" @click="n += 1" :style="scrollStyle">
      <div class="left-triangle"></div>
      <div class="content">
        <font-awesome-icon icon="plus"/>
      </div>
      <div class="right-triangle"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PagesBar',
  data () {
    return {
      n: 1,
      scroll: 0
    }
  },
  computed: {
    maxPages () {
      return Math.max(this.n, this.lastPage + 1, this.lastPageAnnotations + 1)
    },
    pages () {
      return [...Array(this.maxPages).keys()]
    },
    scrollStyle () {
      return { left: this.boundedScroll + 'px' }
    },
    boundedScroll () {
      if (!this.$el) return this.scroll
      let scroll = Math.min(0, this.scroll)
      return Math.max(-1 * this.$el.scrollWidth + this.$el.offsetWidth, scroll)
    },
    ...mapGetters(['lastPage', 'pageNumber', 'lastPageAnnotations'])
  },
  methods: {
    ...mapMutations(['setPageNumber'])
  },
  mounted () {
    this.$el.addEventListener('wheel', e => {
      let diff = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      this.scroll -= diff * 1.3
    })
  }
}
</script>
<style>
div.pages-bar {
  width: 100%;
  height: 32px;
  position: absolute;
  left: 0;
  bottom: 0;
  white-space: nowrap;
  overflow: hidden;
}
div.pages-bar > div.page-button {
  display: inline-block;
  height: 32px;
  padding: 0 16px;
  line-height: 32px;
  position: relative;
  margin: 0 -6px;
  cursor: pointer;
  color: black;
}
div.pages-bar > div.page-button.active {
  background: #eee;
  color: #371ea8;
  font-family: "FiraSansBold";
}
div.pages-bar > div.page-button > * {
  background: white;
}
div.pages-bar > div.page-button:hover > * {
  background: #eee;
  color: #371ea8;
}
div.pages-bar > div.page-button > div.content {
  border-top: 1px solid #ccc;
  padding: 0 5px;
  z-index: 2;
  position: relative;
}
div.pages-bar > div.page-button > div.left-triangle {
  height: 32px;
  width: 16px;
  position: absolute;
  left: 0;
  top: 0;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  transform: skewX(-26.57deg);
  transform-origin: 0 32px;
}
div.pages-bar > div.page-button > div.right-triangle {
  height: 32px;
  width: 16px;
  position: absolute;
  right: 0;
  top: 0;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  transform: skewX(26.57deg);
  transform-origin: 0 32px;
}
</style>
