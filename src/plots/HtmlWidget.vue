<template>
  <div class="html-widget-plot">
    <iframe v-if="iframeSrc" :srcdoc="iframeSrc"></iframe>
  </div>
</template>
<script>

export default {
  name: 'HtmlWidget',
  props: {
    data: Array,
    plotType: String
  },
  computed: {
    iframeSrc () {
      if (this.data.length === 0) return null
      return this.data[0].plotData.html
    }
  }
}
</script>
<style>
div.html-widget-plot > iframe {
  width: 125%;
  height: 125%;
  border: 0;
  scale: 0.8;
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: 0 0;
}
</style>
