<template>
  <div class="settings-tab-sessions settings-tab">
    <div class="current-session">
      <button class="download" @click="save">Download current session</button>
      <input type="file" style="display: none" ref="fileinput" @change="loadFiles">
      <button class="upload" @click="$refs.fileinput.click()">Load session from file</button>
      <button class="share" @click="share">Share using Github Gist</button>
      <button class="share-peer" @click="sharePeer">Share using P2P</button>
    </div>
    <span v-if="message" class="message" :style="{ color: message.error ? '#f05a71' : '#46bac2' }">{{ message.text }}</span>
    <div class="recently-used">
      <span>Recent sessions</span>
      <div v-for="s in recentSessions" :key="s.time">
        <a :href="baseURL + '/?session_uuid=' + s.uuid" @click.prevent="loadSession(s)">{{ s.name || 'Unnamed' }}</a>
        <span class="date">{{ new Date(s.time).toString().split(' ').slice(0,5).join(' ') }}</span>
        <span class="option" @click="downloadSession(s)"><font-awesome-icon icon="file-download"/></span>
        <span class="option" @click="deleteSession(s)"><font-awesome-icon :icon="['far', 'times-circle']" style="color: red"/></span>
      </div>
    </div>
  </div>
</template>
<script>
import { saveAs } from 'file-saver'
import { mapGetters } from 'vuex'
import config from '@/configuration/config.js'

export default {
  name: 'SettingsTabSessions',
  computed: {
    baseURL () { return config.url },
    ...mapGetters(['recentSessions'])
  },
  data () {
    return {
      message: null
    }
  },
  methods: {
    loadSession (session) {
      this.$store.dispatch('importSession', session)
    },
    downloadSession (session) {
      let json = JSON.stringify(session)
      saveAs(new Blob([json], { type: 'application/json', name: 'session-' + session.time + '.json' }), 'session-' + session.time + '.json')
    },
    deleteSession (session) {
      // nextTick to suppress loop warning
      this.$nextTick(() => {
        this.$store.dispatch('deleteSession', session.uuid)
      })
    },
    save () {
      this.$store.dispatch('exportSession').then(session => {
        this.downloadSession(session)
      })
    },
    share () {
      this.$store.dispatch('shareSession').then(url => {
        this.message = {
          text: this.baseURL + '/?session=' + url
        }
      }).catch(e => {
        console.error(e)
        this.message = { text: 'Failed to share session', error: true }
      })
    },
    async sharePeer () {
      this.message = { text: 'Connecting...', error: false }
      await this.$store.dispatch('initPeerServer')
      let id = this.$store.getters.peer.id
      this.message = { text: this.baseURL + '/?peer_server=' + id, error: false }
    },
    loadFiles (event) {
      for (var file of event.target.files) this.loadFile(file)
    },
    loadFile (file) {
      var reader = new FileReader()
      reader.onload = e => {
        if (e.type !== 'load' || !e.target.result) return
        let [ type, data ] = e.target.result.split(',')
        if (type === 'data:application/json;base64') {
          try {
            let parsed = JSON.parse(atob(data))
            this.$store.dispatch('importSession', parsed)
          } catch (e) {
            console.error('Cannot parse the file. Look to console for more details.')
            console.error(e)
          }
        } else {
          console.error('File type is unsupported yet')
        }
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
<style>
div.settings-tab-sessions > div.current-session {
  text-align: center;
}
div.settings-tab-sessions > div.current-session > button {
  display: inline;
  font-size: 15px;
  border: 0;
  border-radius: 4px;
  color: white;
  height: 40px;
  background: #46bac2;
  margin: 0 15px;
  font-weight: 800;
}
div.settings-tab-sessions > div.current-session > button:hover {
  box-shadow: 0 0 5px 0 #46bac2;
}
div.settings-tab-sessions > div.current-session > button.upload {
  background: #4378bf;
}
div.settings-tab-sessions > div.current-session > button.upload:hover {
  box-shadow: 0 0 5px 0 #4378bf;
}
div.settings-tab-sessions > div.current-session > button.share {
  background: #f05a71;
}
div.settings-tab-sessions > div.current-session > button.share:hover {
  box-shadow: 0 0 5px 0 #f05a71;
}
div.settings-tab-sessions > div.current-session > button.share-peer {
  background: #8bdcbe;
}
div.settings-tab-sessions > div.current-session > button.share-peer:hover {
  box-shadow: 0 0 5px 0 #8bdcbe;
}
div.settings-tab-sessions > div.recently-used {
  padding: 20px 0;
}
div.settings-tab-sessions > div.recently-used > span {
  font-size: 20px;
}
div.settings-tab-sessions > div.recently-used > div {
  font-size: 13px;
  padding: 3px 0;
  width: 100%;
  color: #555;
}
div.settings-tab-sessions > div.recently-used > div:nth-child(2n+1) {
  background: #eee;
}
div.settings-tab-sessions > div.recently-used > div > a {
  color: #555;
  display: inline-block;
  width: calc(100% - 300px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
div.settings-tab-sessions > div.recently-used > div > span.date {
  width: 250px;
  display: inline-block;
  vertical-align: middle;
  font-size: 15px;
  text-align: center;
}
div.settings-tab-sessions > div.recently-used > div > span.option {
  width: 25px;
  display: inline-block;
  vertical-align: middle;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
}
div.settings-tab-sessions > span.message {
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 15px;
  user-select: all;
  word-break: break-all;
}
</style>
