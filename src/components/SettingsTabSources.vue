<template>
  <div class="settings-tab-sources settings-tab">
    <div class="add-sources-row">
      <input type="text" placeholder="Enter URL here" v-model="inputURL" @keyup.enter="loadURL">
      <input type="file" style="display: none" ref="fileinput" @change="loadFiles" multiple>
      <button class="add-url" @click="loadURL">Add URL</button>
      <button class="add-file" @click="$refs.fileinput.click()">Add File</button>
      <div class="error" v-if="addSourceError">{{ addSourceError }}</div>
      <div class="ok" v-if="sourceAdded">Data loaded</div>
    </div>
    <div class="recently-used">
      <span>Recenty used</span>
      <div v-for="s in recentURLSources" :key="s.time">
        <a :href="baseURL + '/?data=' + s.url" @click.prevent="loadURL(s.url)">{{ s.url }}</a>
        <span class="date">{{ new Date(s.time).toString().split(' ').slice(0,5).join(' ') }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import config from '@/utils/config.js'

export default {
  name: 'SettingsTabSources',
  data () {
    return {
      addSourceError: null,
      sourceAdded: false,
      inputURL: ''
    }
  },
  computed: {
    baseURL () { return config.url },
    ...mapGetters(['recentURLSources'])
  },
  methods: {
    loadFiles (event) {
      this.sourceAdded = false
      this.addSourceError = null
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
            this.$store.dispatch('loadData', { data: parsed, src: 'UPLOAD-' + file.name }).then(() => {
              this.sourceAdded = true
            })
          } catch (e) {
            this.addSourceError = 'Cannot parse the file. Look to console for more details.'
            console.error(e)
          }
        } else {
          this.addSourceError = 'File type is unsupported yet'
        }
      }
      reader.readAsDataURL(file)
    },
    loadURL (url) {
      this.sourceAdded = false
      this.addSourceError = null
      if (!url) url = this.inputURL
      if (!url) {
        this.addSourceError = 'Empty URL'
        return
      }
      this.$store.dispatch('loadURL', url).then(() => {
        this.sourceAdded = true
      }).catch(e => {
        this.addSourceError = 'Cannot load the file. Look to console for more details.'
        console.error(e)
      })
    }
  }
}
</script>
<style>
div.settings-tab-sources > div.add-sources-row > input[type="text"] {
  width: calc(100% - 215px);
  padding: 0 20px;
  margin: 0;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #4378bf;
  border-radius: 4px 0 0 4px;
}
div.settings-tab-sources > div.add-sources-row > button {
  display: inline;
  font-size: 15px;
  width: 100px;
  border: 0;
  border-radius: 4px;
  color: white;
  height: 40px;
  background: #46bac2;
  margin-left: 15px;
  font-weight: 800;
}
div.settings-tab-sources > div.add-sources-row > button.add-url {
  margin-left: 0;
  border-radius: 0 4px 4px 0;
  background: #4378bf;
}
div.settings-tab-sources > div.add-sources-row > div.error {
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 5px;
  color: #f05a71;
}
div.settings-tab-sources > div.add-sources-row > div.ok {
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 5px;
  color: #46bac2;
}
div.settings-tab-sources > div.recently-used {
  padding: 20px 0;
}
div.settings-tab-sources > div.recently-used > span {
  font-size: 20px;
}
div.settings-tab-sources > div.recently-used > div {
  font-size: 13px;
  padding: 3px 0;
  width: 100%;
  color: #555;
}
div.settings-tab-sources > div.recently-used > div:nth-child(2n+1) {
  background: #eee;
}
div.settings-tab-sources > div.recently-used > div > a {
  color: #555;
  display: inline-block;
  width: calc(100% - 250px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
div.settings-tab-sources > div.recently-used > div > span.date {
  width: 250px;
  display: inline-block;
  vertical-align: middle;
  font-size: 15px;
  text-align: center;
}
</style>
