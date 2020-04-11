<template>
  <div class="navbar-help">
    <span class="big-number">{{ num }}</span>
    <div class="desc">{{ text }}</div>
    <font-awesome-icon :icon="['far', 'times-circle']" class="close-button" @click="$emit('close')"/>
  </div>
</template>
<script>
import config from '@/configuration/config.js'

export default {
  name: 'NavbarHelp',
  props: {
    num: Number
  },
  computed: {
    text () { return config.helpMessages[this.num] }
  }
}
</script>
<style>
div.navbar-help {
  display: inline-block;
  position: relative;
  height: 64px;
  background-color: #eee;
  overflow: hidden;
  width: 300px;
  height: 100%;
  padding: 0;
}
div.navbar-help > span.big-number {
  line-height: 44px;
  font-size: 37px;
  position: relative;
  top: 9px;
  left: 9px;
  width: 44px;
  height: 44px;
  display: inline-block;
  border: 2px solid black;
  border-radius: 50%;
  text-align: center;
}
div.navbar-help > div.desc {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: calc(100% - 100px);
  left: 70px;
  font-size: 16px;
  line-height: 16px;
}
div.navbar-help > .close-button {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>
