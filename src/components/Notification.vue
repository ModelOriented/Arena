<template>
  <div class="notification">
    <font-awesome-icon v-if="type === 'error'" icon="exclamation-circle" style="color: #f05a71"/>
    <font-awesome-icon v-if="type === 'warning'" icon="exclamation-triangle" style="color: #ffa85c"/>
    <font-awesome-icon v-if="type === 'info'" icon="check" style="color: #8bdcbe"/>
    <Loading v-if="type === 'loading'" :progress="null"/>
    <span class="msg">{{ text }}</span>
    <font-awesome-icon icon="times" class="close" @click="$emit('close')"/>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue'
export default {
  name: 'Notification',
  props: {
    text: String,
    type: String
  },
  computed: {},
  methods: {},
  components: { Loading }
}
</script>
<style>
div.notification {
  width: 100%;
  padding: 10px;
  background: white;
  box-shadow: 0 0 5px 1px #ccc2;
  margin: 20px 0;
  position: relative;
  user-select: text;
}
div.notification > .msg {
  margin-left: 8px;
}
div.notification > .close {
  position: absolute;
  right: 8px;
  top: 6px;
  cursor: pointer;
  font-size: 12px;
  color: #888;
}
div.notification > .close:hover {
  color: unset;
}
div.notification > .loading {
  width: 26px;
  display: inline-block;
  vertical-align: middle;
}
div.notification > .loading > .box {
  border-width: 2px;
}
</style>
