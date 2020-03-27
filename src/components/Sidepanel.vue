<template>
  <div class="sidepanel" :class="{ closed: !open }">
    <div class="overlay" :class="{ visible: dropzoneVisible, active: dropzoneActive }">
      <span class="title"><font-awesome-icon :icon="['fas', 'archive']"/>CLIPBOARD</span>
    </div>
    <div class="arrow-button" @click="open=!open">{{ open ? "▶" : "◀" }}</div>
    <dropdown v-if="getGlobalParam('model')" :options="modelsDropdown" :selected="getGlobalParam('model')" @updateOption="setGlobalParam({ name: 'model', value: $event })"
    class="dropdown" :key="getGlobalParam('model').uuid"/>
    <div class="sidepanel-list" v-if="slotsList != null">
      <div v-for="c in slotsCategories" :key="c">
        <span class="category-name">{{ c }}</span>
        <MiniBlock v-for="slot in slotsList.filter(s => s.plotCategory === c)" :key="slot.uuid" @take="$emit('addToPlayground', $event)" :slotv="slot"/>
      </div>
    </div>
  </div>
</template>
<script>
import MiniBlock from '@/components/MiniBlock.vue'
import dropdown from 'vue-dropdowns'
import interact from 'interactjs'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Sidepanel',
  components: {
    MiniBlock,
    dropdown
  },
  data () {
    return {
      open: true,
      dropzoneActive: false,
      dropzoneVisible: false
    }
  },
  computed: {
    modelsDropdown () {
      return [...this.availableParams.model, { name: 'Clipboard', uuid: -1 }]
    },
    slotsList () {
      return (this.getGlobalParam('model') || {}).uuid === -1 ? this.archivedSlots : this.availableSlots
    },
    slotsCategories () {
      return [...this.slotsList.reduce((set, x) => set.add(x.plotCategory), new Set())]
    },
    ...mapGetters(['getGlobalParam', 'availableSlots', 'availableParams', 'archivedSlots'])
  },
  methods: {
    initDropzone () {
      interact(this.$el).dropzone({
        overlap: 'pointer',
        accept: '.block',
        ondropactivate: this.validateAndRun(target => { this.dropzoneVisible = true }),
        ondropdeactivate: this.validateAndRun(target => {
          this.dropzoneVisible = this.dropzoneActive = false
        }, false),
        ondragenter: this.validateAndRun(target => { this.dropzoneActive = true }),
        ondragleave: this.validateAndRun(target => { this.dropzoneActive = false }),
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
      if (target.slotv) this.archiveSlot(target.slotv)
    },
    ...mapMutations(['setGlobalParam', 'archiveSlot'])
  },
  mounted () {
    this.initDropzone()
  }
}
</script>
<style>
.sidepanel {
  width: 320px;
  right: 0;
  background: white;
  box-shadow: 0 10px 5px 1px #ccc2;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  transition: right 0.6s;
  padding: 10px 0px;
}
.sidepanel.closed {
  right: -320px;
}
.sidepanel .arrow-button {
  height: 60px;
  width: 20px;
  position: absolute;
  left: -20px;
  top: 10px;
  background: white;
  box-shadow: 0 0 5px 1px #ccc2;
  border: 1px solid #ccc;
  border-right: none;
  clip-path: inset(-5px 0 -5px -5px);
  text-align: center;
  line-height: 60px;
  border-radius: 6px 0 0 6px;
  font-size: 13px;
  color: rgba(130, 130, 130, 1);
}
.sidepanel > .dropdown {
  width: calc(100% - 80px);
  left: 40px;
}
.sidepanel > .sidepanel-list {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.sidepanel > .sidepanel-list > div > span.category-name {
  margin-left: 40px;
  display: block;
  width: calc(100% - 80px);
  font-size: 18px;
  color: #371ea3;
  border-bottom: 1px solid #371ea3;
}
.sidepanel > .sidepanel-list > div > .miniblock {
  width: calc(100% - 80px);
}
.sidepanel > .overlay {
  position: absolute;
  z-index: 20;
  left: 0;
  top: 0;
  visibility: hidden;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background-color: #b5e3e790;
  border: 5px dashed #4378bf;
  color: #4378bf;
}
.sidepanel > .overlay > span.title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  text-align: center;
}
.sidepanel > .overlay > span.title > .fa-archive {
  font-size: 100px;
}
.sidepanel > .overlay.active {
  background-color: #46bac2df;
}
.sidepanel > .overlay.visible {
  visibility: visible;
}
</style>
