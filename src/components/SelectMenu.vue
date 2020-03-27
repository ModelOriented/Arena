<template>
  <div class="select-menu">
    <div class="entry" v-for="e in options" :key="e.name" @click="handle(e, $event)">
      {{ e.name }}
    </div>
    <div class="entry" @click="$emit('input', false)">Close</div>
  </div>
</template>
<script>
export default {
  name: 'SelectMenu',
  props: {
    options: Array,
    value: Boolean
  },
  methods: {
    handle (entry, event) {
      if (entry.handler) entry.handler(event)
      this.$emit('input', false)
    }
  }
}
</script>
<style>
div.select-menu {
  z-index: 100000;
  position: absolute;
  min-width: 100px;
  background-color: white;
  display: inline-block;
  font-size: 13px;
  cursor: pointer;
  color: black;
  font-weight: 600;
  border: 1px solid #ddd;
  box-shadow: 0 0 8px 0 rgba(200, 200, 200, 0.5);
}
div.select-menu > div.entry {
  padding: 10px;
}
div.select-menu > div.entry:hover {
  background: #eee;
  color: #371ea8;
}
</style>
