<template>
  <div class="navbar">
    <div class="nav-item options-toggle" @click="$emit('openSettings')"><font-awesome-icon icon="bars"/></div>
    <div class="nav-item title">Arena</div>
    <PageSelector class="right" />
    <SearchDropdown class="right" paramName="variable"/>
    <SearchDropdown class="right" paramName="observation"/>
    <NavbarHelp :num="3" text="Change parameters to manipulete plots" class="right" @close="closeElement('help-3')" v-if="!isElementClosed('help-3')"/>
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

export default {
  name: 'Navbar',
  computed: mapGetters(['availableParams', 'getGlobalParam', 'isElementClosed']),
  methods: mapMutations(['setGlobalParam', 'closeElement']),
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
  padding: 12px;
  line-height: 40px;
  color: #371ea3;
  box-sizing: border-box;
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
  float: left;
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
