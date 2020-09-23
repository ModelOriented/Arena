<template>
  <div class="player">
    <client-only>
      <vimeo-player v-if="videoId" :video-id="videoId" class="player-component" />
    </client-only>
  </div>
</template>
<script>
export default {
  name: 'Player',
  props: {
    videoId: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="sass">
.player
  width: 100%
  padding: 30px 0
  iframe
    width: 100% !important
    min-height: 400px
</style>
