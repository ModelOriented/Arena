<template>
  <div class="page-selector">
    <span class="title">Page</span>
    <span class="page-number">
      <span class="button-left" v-if="pageNumber > 0" @click="setPageNumber(pageNumber - 1)"><font-awesome-icon icon="minus-square"/></span>
      {{ pageNumber }}
      <span class="button-right" @click="setPageNumber(pageNumber + 1)"><font-awesome-icon icon="plus-square"/></span>
    </span>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PageSelector',
  computed: {
    ...mapGetters(['pageNumber'])
  },
  methods: {
    ...mapMutations(['setPageNumber'])
  }
}
</script>
<style>
div.page-selector {
  display: inline-block;
  position: relative;
  width: 140px;
  height: 100%;
  padding: 0;
  transition: width 0.3s;
}
div.page-selector > span.title {
  position: absolute;
  display: block;
  width: calc(100% - 40px);
  top: 10px;
  font-size: 14px;
  line-height: 14px;
  left: 20px;
  color: #4378bf;
}
div.page-selector > span.page-number {
  position: absolute;
  display: block;
  width: calc(100% - 40px);
  top: 30px;
  font-size: 20px;
  line-height: 20px;
  height: 30px;
  left: 20px;
  color: #555;
  text-align: center;
}
div.page-selector > span.page-number > span.button-left {
  cursor: pointer;
  position: absolute;
  left: 0;
  font-weight: 600;
  color: #4378bf;
}
div.page-selector > span.page-number > span.button-right {
  cursor: pointer;
  font-weight: 600;
  position: absolute;
  right: 0;
  color: #4378bf;
}
</style>
