<template>
  <div class="navbar">
    <div class="nav-item left options-toggle" @click="$emit('openSettings')"><font-awesome-icon icon="bars"/></div>
    <img class="nav-item left logo" src="@/assets/logo.png">
    <div class="nav-item left title">Arena |</div>
    <div class="nav-item left session-name">
      <span v-if="!editTitle">{{ sessionName || 'Untitled project' }}</span>
      <span v-if="!editTitle" class="edit-icon" @click="editTitle=true"><font-awesome-icon :icon="['far', 'edit']"/></span>
      <span v-if="!editTitle" class="save-status">
        {{ sessionLastSaved ? 'Saved ' + new Date(sessionLastSaved).toString().split(' ').slice(0,5).join(' ') : ( sessionName ? 'Not saved yet' : 'Name project to enable auto-save' ) }}
      </span>
      <input type="text" :class="{ visible: editTitle }" @keyup.enter="saveSessionName" :value="sessionName">
    </div>
    <PageSelector class="right" />
    <SearchDropdown class="right" v-for="p in auxiliaryParams" :paramName="p" :key="p"/>
    <NavbarHelp :num="3" class="right" @close="closeElement('help-3')" v-if="!isElementClosed('help-3')"/>
    <div class="nav-item right button" style="margin-right: 10px" @click="$store.dispatch('arrangeSlots')">
      <span class="label">Auto arrange</span>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import SearchDropdown from '@/components/SearchDropdown.vue'
import PageSelector from '@/components/PageSelector.vue'
import NavbarHelp from '@/components/NavbarHelp.vue'
import config from '@/configuration/config.js'

export default {
  name: 'Navbar',
  data () {
    return {
      editTitle: false
    }
  },
  computed: {
    auxiliaryParams () { return config.params.filter(p => p !== config.mainParam) },
    ...mapGetters(['availableParams', 'getGlobalParam', 'isElementClosed', 'sessionName', 'sessionLastSaved'])
  },
  mounted () {
    document.addEventListener('pointerdown', this.onClickOutside)
  },
  beforeDestroy () {
    document.removeEventListener('pointerdown', this.onClickOutside)
  },
  methods: {
    saveSessionName (e) {
      this.editTitle = false
      this.setSessionName(e.target.value)
    },
    onClickOutside (e) {
      if (!this.$el.contains(e.target)) this.editTitle = false
    },
    ...mapMutations(['setGlobalParam', 'closeElement', 'setSessionName'])
  },
  components: { SearchDropdown, PageSelector, NavbarHelp }
}
</script>
<style>
.navbar {
  height: 64px;
  line-height: 64px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10001;
  background: white;
  box-shadow: 0 0 5px 1px #ccc2;
  border-bottom: 1px solid #ccc;
}
.navbar > .nav-item {
  display: inline-block;
  min-width: 50px;
  height: 100%;
  padding: 12px 0;
  line-height: 40px;
  color: #371ea3;
  box-sizing: border-box;
}
.navbar > .logo {
  min-width: none;
  padding: 5px;
}
.navbar > .nav-item > .label {
  font-size: 18px;
}
.navbar > .nav-item.button:hover {
  background: #4378bf;
  color: white;
}
.navbar > .nav-item.button {
  cursor: pointer;
}
.navbar > .nav-item > div {
  line-height: initial;
}
.navbar > .nav-item.title {
  font-size: 28px;
  margin: 0 10px;
}
.navbar > .nav-item.session-name {
  color: #555;
  font-size: 20px;
  position: relative;
}
.navbar > .nav-item.session-name > span.edit-icon {
  font-size: 11px;
  vertical-align: middle;
  color: #371ea8;
  margin-left: 5px;
  cursor: pointer;
}
.navbar > .nav-item.session-name > span.save-status {
  font-size: 10px;
  line-height: 10px;
  position: absolute;
  bottom: 5px;
  left: 0;
  white-space: nowrap;
}
.navbar > .nav-item.session-name > input[type="text"] {
  outline: none;
  border: none;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 20px;
  background: #eee;
  color: #371ea8;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.1s;
  z-index: -1;
  pointer-events: none;
}
.navbar > .nav-item.session-name > input[type="text"].visible {
  opacity: 1;
  z-index: 2;
  pointer-events: initial;
}
.navbar > .nav-item.options-toggle {
  font-size: 20px;
  float: left;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
}
.navbar > .nav-item.options-toggle:hover {
  background: #4378bf;
  color: white;
}
</style>
