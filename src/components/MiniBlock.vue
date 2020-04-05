<template>
  <div class="miniblock tooltiped" ref="miniblock">
    <span class="tooltip">Hold to pick it</span>
    <span class="grab-icon"><font-awesome-icon icon="chart-bar"/></span>
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
  padding: 15px 0;
  box-sizing: border-box;
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
  font-size: 16px;
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translate(-50%, -50%);
}
div.miniblock > span.name {
  text-align: left;
  font-size: 16px;
  width: calc(100% - 60px);
  padding-left: 30px;
  display: block;
  word-wrap: break-word;
  overflow: hidden;
}
</style>
