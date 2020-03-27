<template>
  <div class="fullscreen-block">
    <BlockHead :slotv="slotv" :plotComponent="plotComponent" />
    <PlotProxy :slotv="slotv" @plotComponentUpdate="plotComponent = $event"/>
    <div class="close-button" @click="$emit('close')"><font-awesome-icon :icon="['far', 'times-circle']"/></div>
  </div>
</template>
<script>
import PlotProxy from '@/components/PlotProxy.vue'
import BlockHead from '@/components/BlockHead.vue'

export default {
  name: 'FullscreenBlock',
  props: {
    slotv: Object
  },
  data () {
    return {
      plotComponent: '' // for legend colors
    }
  },
  components: { PlotProxy, BlockHead }
}
</script>
<style>
div.fullscreen-block {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000000;
  background: white;
}
div.fullscreen-block > div.plot-proxy {
  width: 100%;
  height: calc(100% - 64px);
  position: relative;
}
div.fullscreen-block > div.close-button {
  position: absolute;
  right: 25px;
  top: 70px;
  font-size: 30px;
  color: #f05a71;
  cursor: pointer;
}
</style>
