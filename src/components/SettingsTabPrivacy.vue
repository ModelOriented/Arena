<template>
  <div class="settings-tab-privacy settings-tab">
    <span class="header">Stored items</span>
    Arena store some useful information on your browser's local storage. You can remove any of them below.
    <div v-for="item in storedItems" :key="item.key" class="stored-item">
      <span class="remove-item" @click="removeStoredItem(item.key)"><font-awesome-icon :icon="['far', 'times-circle']" style="color: red"/></span>
      {{ item.name }}
    </div>
    <span class="header">Telemetry</span>
    Telemetry allows us to check how users are using Arena. Anonimized data about plot types and features are sent to us. All parameters' names are replaced and your dataset is safe.
    <div class="option-row">
      Disable telemetry
      <div class="option-input">
        <span @click="setTelemetry(false)" class="check-symbol"><span v-if="disableTelemetry"><font-awesome-icon :icon="['far', 'check-square']"/></span></span>
        <span @click="setTelemetry(true)" class="check-symbol"><span v-if="!disableTelemetry"><font-awesome-icon :icon="['far', 'square']"/></span></span>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
// import config from '@/configuration/config.js'

export default {
  name: 'SettingsTabPrivacy',
  computed: {
  },
  data () {
    return {
      storedItems: [],
      disableTelemetry: false
    }
  },
  created () {
    this.load()
  },
  methods: {
    removeStoredItem (key) {
      localStorage.removeItem(key)
      this.load()
    },
    setTelemetry (v) {
      localStorage.setItem('disableTelemetry', v ? true : '')
      this.load()
    },
    load () {
      let names = {
        githubToken: 'Github authorization token',
        recentURLSources: 'Recently used sources\' URLs',
        recentSessions: 'Recently used sessions',
        closedElements: 'Closed help messages',
        append: 'Address of last append source',
        disableTelemetry: 'Telemetry status'
      }
      this.storedItems = Object.keys(localStorage).map(key => {
        return { key, name: names[key] || key }
      })
      this.disableTelemetry = !!localStorage.getItem('disableTelemetry')
    }
  }
}
</script>
<style>
div.settings-tab-privacy > span.header {
  font-size: 20px;
  display: block;
  margin: 10px 0 3px 0;
}
div.settings-tab-privacy > div.stored-item {
  font-size: 16px;
  padding: 5px 0;
  width: 100%;
  color: #555;
}
div.settings-tab-privacy > div.stored-item > span.remove-item {
  cursor: pointer;
}
.settings-tab-privacy > div.option-row {
  width: 100%;
  padding: 20px 0;
  position: relative;
}
.settings-tab-privacy > div.option-row > div.option-input {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
}
.settings-tab-privacy > div.option-row > div.option-input > span.check-symbol {
  font-size: 20px;
  display: block;
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translate(-50%, -50%);
}
</style>
