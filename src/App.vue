<template>
  <div id="app">
    <Navbar @openSettings="settingsVisible = true" :class="{ blured: settingsVisible }"/>
    <Sidepanel id="sidepanel" :class="{ blured: settingsVisible }"/>
    <div id="playground" :class="{ blured: settingsVisible }">
      <Block v-for="slot in visibleSlots" :key="slot.uuid" :slotv="slot" @openFullscreen="fullscreenSlot = slot"/>
    </div>
    <Notifications />
    <Annotations />
    <DeleteZone />
    <PagesBar />
    <div class="overlay" v-if="settingsVisible" @click="settingsVisible = false"/>
    <Settings v-if="settingsVisible" @close="settingsVisible = false"/>
    <div class="overlay overlay-2" v-if="waitingParamsConflicts.length > 0"/>
    <NameConflicts v-if="waitingParamsConflicts.length > 0"/>
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
import { mapGetters } from 'vuex'
import Preview from '@/components/Preview.vue'
import NameConflicts from '@/components/NameConflicts.vue'
import WelcomeScreen from '@/components/WelcomeScreen.vue'
import Annotations from '@/components/Annotations.vue'
import config from '@/configuration/config.js'
import PagesBar from '@/components/PagesBar.vue'
import Notifications from '@/components/Notifications.vue'

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
    WelcomeScreen,
    Annotations,
    PagesBar,
    Notifications
  },
  data () {
    return {
      settingsVisible: false,
      fullscreenSlot: null,
      displayWelcomeScreen: true
    }
  },
  watch: {
    waitingParamsCorrect (newValue) {
      if (newValue.length === 0) return
      this.$store.commit('removeParamsFromWaitingList', newValue[0])
    },
    globalParams () {
      this.$store.dispatch('globalParamsUpdated')
    }
  },
  computed: {
    welcomeScreenVisible () { return this.displayWelcomeScreen && !this.isElementClosed('welcome-screen') },
    ...mapGetters(['visibleSlots', 'preview', 'isElementClosed', 'waitingParamsCorrect', 'waitingParamsConflicts', 'recentSessions', 'globalParams'])
  },
  created () {
    console.log(BUILDINFO)

    // eslint-disable-next-line no-unused-expressions
    import('@/components/Plotly.vue')
    this.$store.dispatch('init').then(() => {
      let searchParams = new URLSearchParams(window.location.search)
      let dataURL = searchParams.get('data')
      let demo = searchParams.get('demo')
      let sessionUUID = searchParams.get('session_uuid')
      let sessionURL = searchParams.get('session')
      let debug = searchParams.get('debug')
      let githubCode = searchParams.get('code')
      let githubState = searchParams.get('state')
      let peerServer = searchParams.get('peer_server')
      let connectorPort = searchParams.get('connector')

      if (debug) {
        this.$store.commit('setDebug', true)
      }

      if (githubCode && githubState) {
        this.$http.get(config.githubAuthorizeServer + '?code=' + githubCode + '&state=' + githubState).then(response => {
          let token = response.body
          if (connectorPort) window.location.replace('http://localhost:' + connectorPort + '/?token=' + token)
          else this.$store.dispatch('loadGithubToken', token).then(() => window.close())
        }).catch(e => {
          console.error(e)
          this.$store.dispatch('createNotification', { type: 'error', text: 'Failed to authorize' })
        })
      }

      if (peerServer) {
        this.$store.dispatch('initPeerClient', peerServer)
      }

      if (demo) {
        try {
          let nr = Number.parseInt(demo)
          dataURL = config.examples[nr].url
          sessionURL = config.examples[nr].session
        } catch (e) {
          console.error(e)
          this.$store.dispatch('createNotification', { type: 'error', text: 'Failed to find demo' })
          dataURL = sessionURL = null
        }
      }
      if (sessionURL) {
        this.$store.dispatch('loadSessionURL', sessionURL)
        this.displayWelcomeScreen = false
      } else if (sessionUUID) {
        let session = this.recentSessions.find(s => s.uuid === sessionUUID)
        if (session) {
          this.$store.dispatch('importSession', session)
          this.displayWelcomeScreen = false
        }
      } else if (dataURL) {
        this.$store.dispatch('loadURL', dataURL)
        this.displayWelcomeScreen = false
      }

      if (!localStorage.getItem('disableTelemetry')) {
        if (!config.telemetryServer) return
        this.$http.post(config.telemetryServer + '/session', {
          application: 'Arena',
          application_version: BUILDINFO.branch,
          data: JSON.stringify({
            commit: BUILDINFO.commit,
            startDemo: !!demo,
            startEmpty: this.displayWelcomeScreen,
            windowWidth: this.$el.offsetWidth,
            windowHeight: this.$el.offsetHeight
          })
        }).then(response => {
          if (typeof response.body === 'string' || response.body instanceof String) this.$store.commit('setTelemetryUUID', response.body)
        }).catch(console.error)
      }

      window.addEventListener('storage', e => {
        if (e.key === 'append' && e.newValue) this.$store.dispatch('loadURL', e.newValue)
        if (e.key === 'githubToken' && e.newValue) this.$store.dispatch('loadGithubToken', e.newValue).catch(console.error)
      })
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
#app > div.overlay-2 {
  z-index: 100003;
}
</style>
