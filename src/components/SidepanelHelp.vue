<template>
  <div class="sidepanel-help">
    <span class="big-number">{{ num }}</span>
    <div class="desc">{{ text }}</div>
    <font-awesome-icon :icon="['far', 'times-circle']" class="close-button" @click="$emit('close')"/>
  </div>
</template>
<script>
export default {
  name: 'SidepanelHelp',
  props: {
    num: Number,
    text: String
  }
}
</script>
<style>
div.sidepanel-help {
  width: 100%;
  position: relative;
  height: 64px;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}
div.sidepanel-help > span.big-number {
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
div.sidepanel-help > div.desc {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: calc(100% - 100px);
  left: 70px;
  font-size: 16px;
}
div.sidepanel-help > .close-button {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>
