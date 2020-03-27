<template>
  <div class="preview-block">
    <PlotProxy v-if="slotv" :slotv="slotv"/>
  </div>
</template>
<script>
import PlotProxy from '@/components/PlotProxy.vue'

export default {
  name: 'Preview',
  props: {
    slotv: Object
  },
  components: { PlotProxy }
}
</script>
<style>
@keyframes preview-block-animation {
  from { opacity: 0; }
  to { opacity: 1; }
}
div.preview-block {
  width: 700px;
  height: 500px;
  box-shadow: 0 0 5px 0 rgba(180, 180, 180, 0.5);
  padding: 10px;
  position: absolute;
  right: 350px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000000;
  background: white;
  animation-fill-mode: both;
  animation-name: preview-block-animation;
  animation-delay: 0.1s;
  animation-duration: 0.2s;
}
div.preview-block > div.plot-proxy {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
