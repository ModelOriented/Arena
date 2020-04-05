<template>
  <div class="miniblock tooltiped" ref="miniblock">
    <span class="tooltip">Hold to pick it</span>
    <span class="grab-icon"><font-awesome-icon icon="grip-vertical"/></span>
    <span v-if="slotv" class="name">{{ slotv.name }}</span>
  </div>
</template>
<script>
import interact from 'interactjs'
import { mapMutations } from 'vuex'

export default {
  name: 'MiniBlock',
  props: {
    slotv: Object
  },
  mounted () {
    interact(this.$refs.miniblock).pointerEvents({
      holdDuration: 100
    }).on('hold', event => {
      event.stopPropagation()
      event.preventDefault()
      this.$emit('take', { slot: this.slotv, mouseEvent: event })
    }).on('down', event => {
      event.preventDefault()
    })
    this.$refs.miniblock.addEventListener('pointerenter', () => this.enablePreview())
    this.$refs.miniblock.addEventListener('pointerleave', () => this.disablePreview())
    this.$refs.miniblock.addEventListener('pointercancel', () => this.disablePreview())
    this.$refs.miniblock.addEventListener('pointerdown', () => this.disablePreview())
  },
  methods: {
    enablePreview () {
      this.setPreview(this.slotv)
    },
    disablePreview () {
      this.setPreview(null)
    },
    ...mapMutations(['setPreview'])
  }
}
</script>
<style>
div.miniblock {
  position: relative;
  padding: 0;
  box-sizing: border-box;
  height: 70px;
  opacity: 1;
  margin: 0;
  cursor: grab;
  background: white;
  width: 100%;
}
div.miniblock:hover {
  background: #eee;
  color: #371ea8;
}
div.miniblock > span.grab-icon {
  font-size: 20px;
  line-height: 70px;
  padding-left: 20px;
}
div.miniblock > span.name {
  text-align: left;
  font-size: 16px;
  width: calc(100% - 70px);
  left: 50px;
  position: absolute;
  display: block;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  word-wrap: break-word;
  max-height: 100%;
  overflow: hidden;
}
</style>
