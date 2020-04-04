<template>
  <div id="app">
    <Navbar @openSettings="settingsVisible = true" :class="{ blured: settingsVisible }"/>
    <Sidepanel id="sidepanel" @addToPlayground="addToPlayground" :class="{ blured: settingsVisible }"/>
    <div id="playground" :class="{ blured: settingsVisible }">
      <Block v-for="slot in visibleSlots" :key="slot.uuid" :slotv="slot" :startMoving="slot === movingBlock.slot ? movingBlock.mouseEvent : null"
      @took="movingBlock = {}" @openFullscreen="fullscreenSlot = slot"/>
    </div>
    <DeleteZone />
    <div class="overlay" v-if="settingsVisible" @click="settingsVisible = false"/>
    <Settings v-if="settingsVisible" @close="settingsVisible = false"/>
    <div class="overlay" v-if="nextNameConflicts"/>
    <NameConflicts v-if="nextNameConflicts" />
    <div class="overlay" v-if="welcomeScreenVisible" @click="displayWelcomeScreen = false"/>
    <WelcomeScreen v-if="welcomeScreenVisible" @close="displayWelcomeScreen = false"/>
    <FullscreenBlock v-if="fullscreenSlot" :slotv="fullscreenSlot" @close="fullscreenSlot = null"/>
    <Preview :slotv="preview" v-if="preview" />
  </div>
</template>
<script>
import Sidepanel from '@/components/Sidepanel.vue'
import Navbar from '@/components/Navbar.vue'
import DeleteZone from '@/components/DeleteZone.vue'
import Block from '@/components/Block.vue'
import Settings from '@/components/Settings.vue'
import FullscreenBlock from '@/components/FullscreenBlock.vue'
import { mapMutations, mapGetters } from 'vuex'
import Preview from '@/components/Preview.vue'
import NameConflicts from '@/components/NameConflicts.vue'
import WelcomeScreen from '@/components/WelcomeScreen.vue'

export default {
  name: 'app',
  components: {
    Block,
    DeleteZone,
    Sidepanel,
    Navbar,
    Settings,
    FullscreenBlock,
    Preview,
    NameConflicts,
    WelcomeScreen
  },
  data () {
    return {
      movingBlock: {},
      settingsVisible: false,
      fullscreenSlot: null,
      displayWelcomeScreen: true
    }
  },
  computed: {
    welcomeScreenVisible () { return this.displayWelcomeScreen && !this.isElementClosed('welcome-screen') },
    ...mapGetters(['visibleSlots', 'preview', 'nextNameConflicts', 'isElementClosed'])
  },
  methods: {
    addToPlayground ({ slot, mouseEvent }) {
      if (slot.archived) this.unarchiveSlot(slot)
      else this.addSlot(slot)
      this.movingBlock = { slot, mouseEvent }
    },
    ...mapMutations(['addSlot', 'unarchiveSlot'])
  },
  created () {
    // eslint-disable-next-line no-unused-expressions
    import('@/components/Plotly.vue')
    this.$store.dispatch('init')
    let dataURL = new URLSearchParams(window.location.search).get('data')
    if (dataURL) {
      this.$store.dispatch('loadURL', dataURL).catch(console.error)
      this.displayWelcomeScreen = false
    }

    window.addEventListener('storage', e => {
      if (e.key !== 'append' && e.newValue) return
      this.$store.dispatch('loadURL', e.newValue).catch(console.error)
    })
  }
}
</script>
<style>
@import "style.css";

#app {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
#playground {
  position: absolute;
  top:64px;
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  background: url('assets/grid.png') repeat;
}
#app > .deletezone {
  position: absolute;
  bottom: -10px;
  left: 0;
  width: calc(100% - 10px);
}
#app > .sidepanel {
  height: calc(100% - 64px);
  position: absolute;
  z-index: 10000;
  top: 64px;
}
#app > div.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100001;
}
</style>
