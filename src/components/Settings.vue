<template>
  <div class="settings-container">
    <div class="settings-tabs">
      <span class="tab-name" v-for="t in tabs" :key="t.name"><span :class="{ active: t.name === activeTab }" @click="activeTab = t.name">{{ t.name }}</span></span>
    </div>
    <div class="close-button" @click="$emit('close')"><font-awesome-icon :icon="['far', 'times-circle']"/></div>
    <component :is="activeTabComponent"/>
  </div>
</template>
<script>
import SettingsTabOptions from '@/components/SettingsTabOptions.vue'
import SettingsTabSessions from '@/components/SettingsTabSessions.vue'
import SettingsTabSources from '@/components/SettingsTabSources.vue'
import SettingsTabPrivacy from '@/components/SettingsTabPrivacy.vue'

export default {
  name: 'Settings',
  data () {
    return {
      tabs: [
        { name: 'Sources', component: 'SettingsTabSources' },
        { name: 'Sessions', component: 'SettingsTabSessions' },
        { name: 'Options', component: 'SettingsTabOptions' },
        { name: 'Privacy', component: 'SettingsTabPrivacy' }
      ],
      activeTab: 'Options'
    }
  },
  computed: {
    activeTabComponent () {
      return (this.tabs.find(t => t.name === this.activeTab) || {}).component || ''
    }
  },
  components: {
    SettingsTabOptions, SettingsTabSessions, SettingsTabSources, SettingsTabPrivacy
  }
}
</script>
<style>
div.settings-container {
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(180, 180, 180, 0.5);
  background: white;
  width: 850px;
  max-width: 90%;
  height: 600px;
  max-height: 90%;
  z-index: 100002;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
div.settings-container > div.close-button {
  position: absolute;
  top: -30px;
  right: -30px;
  cursor: pointer;
  color: white;
  font-size: 23px;
}
div.settings-tabs {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #eee;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
div.settings-tabs > span.tab-name {
  line-height: 80px;
  text-align: center;
  font-size: 22px;
  color: #371ea3;
}
div.settings-tabs > span.tab-name > span {
  cursor: pointer;
}
div.settings-tabs > span.tab-name > span.active {
  font-weight: 800;
  border-bottom: 3px solid #371ea3;
}
div.settings-container > .settings-tab {
  width: calc(100% - 40px);
  height: calc(100% - 100px);
  padding: 10px 20px;
}
</style>
