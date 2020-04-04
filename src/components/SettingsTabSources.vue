<template>
  <div class="settings-tab-sources settings-tab">
    <div class="add-sources-row">
      <input type="text" placeholder="Enter URL here" v-model="inputURL">
      <input type="file" style="display: none" ref="fileinput" @change="loadFiles" multiple>
      <button class="add-url" @click="loadURL">Add URL</button>
      <button class="add-file" @click="$refs.fileinput.click()">Add File</button>
      <div class="error" v-if="addSourceError">{{ addSourceError }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SettingsTabSources',
  data () {
    return {
      addSourceError: null,
      inputURL: ''
    }
  },
  methods: {
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
            this.$store.dispatch('loadData', { data: parsed, src: 'UPLOAD-' + file.name })
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
    loadURL () {
      if (!this.inputURL) {
        this.addSourceError = 'Empty URL'
        return
      }
      this.$http.get(this.inputURL).then(response => {
        this.$store.dispatch('loadData', { data: response.body, src: this.inputURL })
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
</style>
