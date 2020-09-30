<template>
  <div class="sidepanel" :class="{ closed: !open }" v-resize:throttle.100="onResize">
    <div class="overlay" :class="{ visible: dropzoneVisible, active: dropzoneActive }">
      <span class="title"><font-awesome-icon :icon="['fas', 'archive']"/>CLIPBOARD</span>
    </div>
    <div class="menu">
      <div class="menu-block" :style="{ width: splitPos + 'px'}">
        <div v-for="m in availableMenus.up" :class="{ active: openMenu.up === m }" :key="m" class="menu-item tooltiped" @click="$set(openMenu, 'up', openMenu.up === m ? null : m)">
          <span class="tooltip">{{ m |firstCharUpper }}</span>
          {{ m | firstCharUpper }}
        </div>
      </div>
      <div class="menu-block" :style="{ top: splitPos + 'px' }">
        <div v-for="m in availableMenus.down" :class="{ active: openMenu.down === m }" :key="m" class="menu-item tooltiped" @click="$set(openMenu, 'down', openMenu.down === m ? null : m)">
          <span class="tooltip">{{ m |firstCharUpper }}</span>
          {{ m | firstCharUpper }}
        </div>
      </div>
    </div>
    <!-- Upper menu -->
    <div class="menu-container" :style="{ display: m + 's' === openMenu.up ? 'flex' : 'none', ...containerStyle.up}" v-for="m in scopes" :key="m">
      <SidepanelHelp :num="1" @close="closeElement('help-1')" v-if="!isElementClosed('help-1')"/>
      <span class="section-title"><font-awesome-icon icon="list-alt"/> {{ (m + 's') | firstCharUpper }}</span>
      <SidepanelDropdown @updateSlotsList="slotsList = m + 's' === lastUpperMenu ? $event : slotsList" :groups="[m]" :trigger="openMenu.up"/>
    </div>
    <div class="menu-container" :style="{ display: 'Other' === openMenu.up ? 'flex' : 'none', ...containerStyle.up}">
      <span class="section-title"><font-awesome-icon icon="list-alt"/> Other</span>
      <SidepanelDropdown @updateSlotsList="slotsList = 'Other' === lastUpperMenu ? $event : slotsList" :groups="['other']" :trigger="openMenu.up"/>
    </div>
    <!-- Split -->
    <div class="splitter" :style="{ display: openMenu.up && openMenu.down ? 'block' : 'none' }" ref="splitter">
      <font-awesome-icon icon="ellipsis-h"/>
    </div>
    <!-- Bottom menu -->
    <div class="menu-container" :style="containerStyle.down" v-if="openMenu.down === 'Plots'">
      <SidepanelHelp :num="2" @close="closeElement('help-2')" v-if="!isElementClosed('help-2')"/>
      <span class="section-title"><font-awesome-icon icon="poll"/> Plots</span>
      <div class="sidepanel-list" v-if="slotsList != null">
        <div v-for="c in slotsCategories" :key="c">
          <span class="category-name">{{ c }}</span>
          <SlotsListElement v-for="slot in slotsList.filter(s => s.plotCategory === c)" :key="slot.uuid" @take="$emit('addToPlayground', $event)" :slotv="slot"/>
        </div>
      </div>
    </div>
    <div class="menu-container" :style="containerStyle.down" v-if="openMenu.down === 'Observation Details'">
      <span class="section-title"><font-awesome-icon icon="user-edit"/> Observation</span>
      <ObservationDetails />
    </div>
    <div class="menu-container" :style="containerStyle.down" v-if="openMenu.down === 'Options'">
      <span class="section-title"><font-awesome-icon icon="user-edit"/> Options</span>
      <SidepanelOptions />
    </div>
  </div>
</template>
<script>
import SlotsListElement from '@/components/SlotsListElement.vue'
import SidepanelDropdown from '@/components/SidepanelDropdown.vue'
import SidepanelHelp from '@/components/SidepanelHelp.vue'
import ObservationDetails from '@/components/ObservationDetails.vue'
import SidepanelOptions from '@/components/SidepanelOptions.vue'
import interact from 'interactjs'
import { mapMutations, mapGetters } from 'vuex'
import config from '@/configuration/config.js'
import format from '@/utils/format.js'
import resize from 'vue-resize-directive'

export default {
  name: 'Sidepanel',
  components: {
    SlotsListElement,
    SidepanelDropdown,
    SidepanelHelp,
    ObservationDetails,
    SidepanelOptions
  },
  filters: {
    formatTitle: format.formatTitle,
    firstCharUpper: format.firstCharUpper
  },
  data () {
    return {
      dropzoneActive: false,
      dropzoneVisible: false,
      openMenu: { up: config.scopes[0] + 's', down: 'Plots' },
      availableMenus: {
        up: [...config.scopes.map(x => x + 's'), 'Other'],
        down: ['Plots', 'Observation Details', 'Options']
      },
      slotsList: [],
      lastUpperMenu: config.scopes[0] + 's',
      splitPos: 300,
      splitterEvent: null,
      height: 0
    }
  },
  watch: {
    'openMenu.up': function () {
      if (this.openMenu.up) this.lastUpperMenu = this.openMenu.up
    }
  },
  computed: {
    scopes () {
      return config.scopes
    },
    containerStyle () {
      return {
        up: this.openMenu.down ? { height: this.splitPos + 'px' } : { height: '100%' },
        down: this.openMenu.up ? { height: this.height - this.splitPos - 10 + 'px' } : { height: '100%' }
      }
    },
    open () {
      return this.openMenu.up || this.openMenu.down
    },
    slotsCategories () {
      return [...this.slotsList.reduce((set, x) => set.add(x.plotCategory), new Set())].sort()
    },
    selectTitle () {
      return format.firstCharUpper(config.scopes[0] + 's')
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
    onResize () {
      let el = this.$el
      if (!el) return
      this.height = el.offsetHeight
    },
    handlePointerDown (event) {
      this.splitterEvent = {
        startClientY: event.clientY - this.splitPos
      }
      event.stopPropagation()
    },
    handlePointerUp (event) {
      this.splitterEvent = null
    },
    handlePointerMove (event) {
      if (!this.splitterEvent) return
      this.splitPos = event.clientY - this.splitterEvent.startClientY
    },
    ...mapMutations(['archiveSlot', 'closeElement'])
  },
  mounted () {
    this.initDropzone()
    this.$refs.splitter.addEventListener('pointerdown', this.handlePointerDown)
    document.addEventListener('pointerup', this.handlePointerUp)
    document.addEventListener('pointercancel', this.handlePointerUp)
    document.addEventListener('pointermove', this.handlePointerMove)
    this.onResize()
  },
  updated () {
    this.onResize()
  },
  directives: {
    resize
  }
}
</script>
<style>
.sidepanel {
  width: 320px;
  right: 32px;
  background: white;
  box-shadow: 0 10px 5px 1px #ccc2;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
}
.sidepanel.closed {
  right: -320px;
}
.sidepanel > div.menu {
  height: 100%;
  width: 32px;
  position: absolute;
  top: 0;
  right: -32px;
  background: white;
  border-left: 1px solid #ccc;
  box-sizing: border-box;
  z-index: 1000;
}
.sidepanel.closed > div.menu {
  position: absolute;
  top: 0;
  right: 320px;
}
.sidepanel > div.menu > div.menu-block {
  position: absolute;
  width: 10000px;
  height: 32px;
  transform-origin: 16px 16px;
  transform: rotate(90deg);
  white-space: nowrap;
  border-left: 10px solid white;
  background: white;
}
.sidepanel > div.menu > div.menu-block:first-child {
  border-left: none;
}
.sidepanel > div.menu > div.menu-block > div.menu-item {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
}
.sidepanel > div.menu > div.menu-block > div.menu-item:hover {
  background: #eee;
  color: #371ea3;
}
.sidepanel > div.menu > div.menu-block > div.menu-item.active {
  background: #eee;
  color: #371ea3;
  font-weight: 800;
}
.sidepanel > div.menu > div.menu-block > div.menu-item > .tooltip {
  transform-origin: 0 50%;
  transform: translate(0, -10px) rotate(-90deg) translate(-100%, 0);
  min-width: unset;
  max-width: unset;
  white-space: nowrap;
}
.sidepanel > div.menu-container {
  display: flex;
  flex-direction: column;
}
.sidepanel > div.menu-container > *:last-child {
  flex: 1;
  overflow-y: auto
}
.sidepanel > div.menu-container > span.section-title {
  color: #555;
  font-weight: 800;
  font-size: 20px;
  padding: 15px 0 15px 0;
  text-align: center;
}
.sidepanel > div.menu-container > .sidepanel-list > div > span.category-name {
  display: block;
  width: calc(100% - 60px);
  padding: 15px 30px 5px 30px;
  font-size: 14px;
  line-height: 14px;
  background: white;
  color: #4378bf;
}
.sidepanel > div.splitter {
  height: 10px;
  background: #eee;
  color: #ccc;
  font-size: 16px;
  text-align: center;
  cursor: row-resize;
}
.sidepanel > div.splitter > * {
  position: relative;
  top: -3px;
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
