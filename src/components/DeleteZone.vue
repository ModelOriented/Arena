<template>
  <div class="deletezone" :class="{ active, visible }" :style="{ zIndex }">
    <span class="title">Delete</span>
  </div>
</template>
<script>
import interact from 'interactjs'
import { mapMutations } from 'vuex'
import zIndexIncrementor from '@/components/zIndexIncrementor.js'

export default {
  name: 'DeleteZone',
  data () {
    return {
      active: false,
      visible: false,
      zIndex: 1
    }
  },
  watch: {
    visible () {
      if (this.visible) this.zIndex = zIndexIncrementor.getWithoutInc()
    }
  },
  methods: {
    initDropzone () {
      interact(this.$el).dropzone({
        overlap: 'pointer',
        accept: '.block',
        ondropactivate: this.validateAndRun(target => { this.visible = true }),
        ondropdeactivate: this.validateAndRun(target => {
          this.visible = this.active = false
        }, false),
        ondragenter: this.validateAndRun(target => { this.active = true }),
        ondragleave: this.validateAndRun(target => { this.active = false }),
        ondrop: this.validateAndRun(target => this.onDrop(target), false)
      })
    },
    validateAndRun (f, mustBeMoving = true) {
      return e => {
        if (!e.relatedTarget.block) return
        let target = e.relatedTarget.block
        if (target.mode !== 'moving' && mustBeMoving) return
        return f(target)
      }
    },
    onDrop (target) {
      if (target.slotv) this.deleteSlot(target.slotv)
    },
    ...mapMutations(['deleteSlot'])
  },
  mounted () {
    this.initDropzone()
  }
}
</script>
<style>
div.deletezone {
  background-color: #f9bdc690;
  border: 5px dashed #ae2c87;
  color: #ae2c87;
  visibility: hidden;
  height: 50px;
  transition: height 0.1s;
}
div.deletezone.visible {
  visibility: visible;
}
div.deletezone.active {
  background-color: #f05a71df;
  height: 150px;
}
div.deletezone > span.title {
  text-align: center;
  font-size: 40px;
  left: 50%;
  position: absolute;
  bottom: 5px;
  transform: translateX(-50%);
}
</style>
