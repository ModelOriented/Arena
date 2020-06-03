<template>
  <div class="sidepanel" :class="{ closed: !open }">
    <div class="overlay" :class="{ visible: dropzoneVisible, active: dropzoneActive }">
      <span class="title"><font-awesome-icon :icon="['fas', 'archive']"/>CLIPBOARD</span>
    </div>
    <div class="arrow-button" @click="open=!open">{{ open ? "▶" : "◀" }}</div>
    <SidepanelHelp :num="1" @close="closeElement('help-1')" v-if="!isElementClosed('help-1')"/>
    <span class="section-title"><font-awesome-icon icon="list-alt"/> {{ selectTitle }}</span>
    <SidepanelDropdown @updateSlotsList="slotsList = $event"/>
    <SidepanelHelp :num="2" @close="closeElement('help-2')" v-if="!isElementClosed('help-2')"/>
    <span class="section-title"><font-awesome-icon icon="poll"/> Plots</span>
    <div class="sidepanel-list" v-if="slotsList != null">
      <div v-for="c in slotsCategories" :key="c">
        <span class="category-name">{{ c }}</span>
        <SlotsListElement v-for="slot in slotsList.filter(s => s.plotCategory === c)" :key="slot.uuid" @take="$emit('addToPlayground', $event)" :slotv="slot"/>
      </div>
    </div>
  </div>
</template>
<script>
import SlotsListElement from '@/components/SlotsListElement.vue'
import SidepanelDropdown from '@/components/SidepanelDropdown.vue'
import SidepanelHelp from '@/components/SidepanelHelp.vue'
import interact from 'interactjs'
import { mapMutations, mapGetters } from 'vuex'
import config from '@/configuration/config.js'
import format from '@/utils/format.js'

export default {
  name: 'Sidepanel',
  components: {
    SlotsListElement,
    SidepanelDropdown,
    SidepanelHelp
  },
  data () {
    return {
      open: true,
      dropzoneActive: false,
      dropzoneVisible: false,
      slotsList: []
    }
  },
  computed: {
    slotsCategories () {
      return [...this.slotsList.reduce((set, x) => set.add(x.plotCategory), new Set())].sort()
    },
    selectTitle () {
      return format.firstCharUpper(config.mainParam + 's')
    },
    ...mapGetters(['isElementClosed'])
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
        if (!target.moving && mustBeMoving) return
        return f(target)
      }
    },
    onDrop (target) {
      if (target.slotv) this.archiveSlot(target.slotv)
    },
    ...mapMutations(['archiveSlot', 'closeElement'])
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
  flex-direction: column;
  display: flex;
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
.sidepanel > span.section-title {
  color: #555;
  font-weight: 800;
  font-size: 20px;
  padding: 15px 0 0 0;
  text-align: center;
}
.sidepanel > .sidepanel-list {
  width: 100%;
  overflow-y: auto;
  flex: 1;
}
.sidepanel > .sidepanel-list > div > span.category-name {
  display: block;
  width: calc(100% - 60px);
  padding: 15px 30px 5px 30px;
  font-size: 14px;
  line-height: 14px;
  background: white;
  color: #4378bf;
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
