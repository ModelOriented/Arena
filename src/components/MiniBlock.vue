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
      holdDuration: 10
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
  box-shadow: 0 0 5px 0 #ccc6;
  border: 1px solid #ccc;
  height: 90px;
  opacity: 1;
  margin: 20px 40px;
  cursor: grab;
  border-radius: 10px;
  background: #4378bf;
}
div.miniblock:hover {
  box-shadow: 0 0 5px 0 #4378bf;
  border: 1px solid #4378bf;
}
div.miniblock > span.grab-icon {
  font-size: 30px;
  line-height: 90px;
  padding-left: 10px;
  color: white;
}
div.miniblock > span.name {
  text-align: left;
  font-size: 23px;
  color: white;
  width: calc(100% - 55px);
  left: 45px;
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
