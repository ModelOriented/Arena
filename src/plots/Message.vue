<template>
  <div class="message-plot">
    <span class="msg" v-for="m in errorMessages" :key="m" style="color: #f05a71;">{{ m }}</span>
    <span class="msg" v-for="m in infoMessages" :key="m" style="color: #371ea8;">{{ m }}</span>
  </div>
</template>
<script>

export default {
  name: 'Message',
  props: {
    data: Array,
    plotType: String
  },
  computed: {
    errorMessages () {
      return [...new Set(this.data.map(data => data.plotData).filter(d => d.type === 'error').map(d => d.message))]
    },
    infoMessages () {
      return [...new Set(this.data.map(data => data.plotData).filter(d => d.type === 'info').map(d => d.message))]
    }
  }
}
</script>
<style>
div.message-plot > span.msg {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
