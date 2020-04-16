<template>
  <div>
    <button @click="save">save session</button><br>
    <input type="file" style="display: none" ref="fileinput" @change="loadFiles">
    <button @click="$refs.fileinput.click()">load session</button>
  </div>
</template>
<script>
import { saveAs } from 'file-saver'

export default {
  name: 'SettingsTabSessions',
  methods: {
    save () {
      this.$store.dispatch('exportSession').then(session => {
        let json = JSON.stringify(session)
        saveAs(new Blob([json], { type: 'application/json', name: 'session-' + session.time + '.json' }), 'session-' + session.time + '.json')
      })
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
</style>
