<template>
  <div class="block" ref="block" :style="style" :class="{ moving: this.mode === 'moving', dropzone: mode.indexOf('dropzone') != -1 }">
    <div class="overlay full" :class="{ visible: singleDropzone, active: activeDropzone === 'full' }">
      <span class="overlay-title"><font-awesome-icon icon="compress-arrows-alt"/><br>REPLACE</span>
    </div>
    <div class="overlay left" :class="{ visible: dualDropzone, active: activeDropzone === 'left' }" ref="leftdropzone">
      <span class="overlay-title"><font-awesome-icon icon="layer-group"/><br>MERGE</span>
    </div>
    <div class="overlay right" :class="{ visible: dualDropzone, active: activeDropzone === 'right' }" ref="rightdropzone">
      <span class="overlay-title"><font-awesome-icon icon="compress-arrows-alt"/><br>REPLACE</span>
    </div>
    <BlockHead :slotv="slotv" :plotComponent="plotComponent" />
    <PlotProxy :slotv="slotv" ref="plot" @plotComponentUpdate="plotComponent = $event"/>
    <span class="fullscreen-toggle tooltiped" @click="$emit('openFullscreen')"><span class="tooltip">Fullscreen</span><span><font-awesome-icon icon="expand"/></span></span>
  </div>
</template>
<script>
import zIndexIncrementor from '@/components/zIndexIncrementor.js'
import { mapMutations } from 'vuex'
import BlockInteractions from '@/components/Block.interactions.js'
import PlotsInfo from '@/plots/PlotsInfo.js'
import PlotProxy from '@/components/PlotProxy.vue'
import BlockHead from '@/components/BlockHead.vue'

export default {
  name: 'Block',
  mixins: [BlockInteractions],
  data () {
    return {
      mode: 'normal', // normal, moving,  single-dropzone, dual-dropzone
      activeDropzone: 'none', // none, left, right, full
      zIndex: zIndexIncrementor.get(),
      plotComponent: '' // for legend colors
    }
  },
  props: {
    slotv: Object
  },
  watch: {
    mode (newValue, oldValue) {
      if (newValue === 'moving') this.zIndex = zIndexIncrementor.get()
    }
  },
  computed: {
    style () {
      return {
        zIndex: this.mode === 'moving' ? 10000 : this.zIndex,
        transform: 'translate(' + this.slotv.positionX + 'px, ' + this.slotv.positionY + 'px)',
        width: this.slotv.width + 'px',
        height: this.slotv.height + 'px'
      }
    }
  },
  mounted () { this.initInteractions() },
  methods: {
    onSwapDrop (target) { this.replaceSlots({ slot1: this.slotv, slot2: target.slotv }) },
    onMergeDrop (target) {
      if (this.canMerge(target)) this.mergeSlots({ slot1: this.slotv, slot2: target.slotv })
    },
    canMerge (target) { return PlotsInfo.canMerge(this.slotv, target.slotv) },
    ...mapMutations(['mergeSlots', 'replaceSlots'])
  },
  components: {
    BlockHead,
    PlotProxy
  }
}
</script>
<style>
div.block {
  box-sizing: border-box;
  box-shadow: 0 0 5px 0 rgba(180, 180, 180, 0.5);
  background: white;
  width: 512px;
  height: 384px;
  z-index: 100;
  position: absolute;
}
div.block.moving {
  filter: blur(2px);
}
div.block > .overlay {
  position: absolute;
  z-index: 20;
  left: 0;
  top: 0;
  visibility: hidden;
  width: calc(50% - 10px);
  height: calc(100% - 10px);
  background-color: #b5e3e790;/* #46bac230; */
  border: 5px dashed #4378bf;
  color: #4378bf;
}
div.block > .overlay.left {
  background-color: #f9bdc690;/* #f05a7130; */
  border: 5px dashed #ae2c87;
  color: #ae2c87;
}
div.block > .overlay.right {
  left: unset;
  right: 0;
}
div.block > .overlay.full {
  width: calc(100% - 10px);
}
div.block > .overlay > img {
  width: 35%;
  max-height: 30%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
div.block > .overlay > span.overlay-title {
  font-size: 32px;
  display: inline-block;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}
div.block > .overlay > span.overlay-title > .fa-layer-group {
  font-size: 70px;
}
div.block > .overlay > span.overlay-title > .fa-compress-arrows-alt {
  font-size: 70px;
}
div.block > .overlay.active {
  background-color: #46bac2df;
}
div.block > .overlay.left.active {
  background-color: #f05a71df;
}
div.block > .overlay.visible {
  visibility: visible;
}
div.block > .plot-proxy {
  height: calc(100% - 74px);
  width: calc(100% - 20px);
  left: 10px;
  bottom: 10px;
  position: absolute;
}
div.block > span.fullscreen-toggle {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 13px;
  cursor: pointer;
  color: #371ea3;
}
</style>
