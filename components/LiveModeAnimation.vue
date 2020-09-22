<template>
  <div class="live-mode-animation">
    <div class="labeled-icon icon-arena">
      <font-awesome-icon icon="desktop" />
      <span class="icon-label">Arena dashboard</span>
    </div>
    <div class="labeled-icon icon-r">
      <font-awesome-icon :icon="['fab', 'r-project']" />
      <span class="icon-label">arenar package</span>
    </div>
    <div class="labeled-icon icon-py">
      <font-awesome-icon :icon="['fab', 'python']" />
      <span class="icon-label">dalex package</span>
    </div>
    <div v-for="(d, i) in dots" :key="i" :style="d" class="dot" />
  </div>
</template>
<script>
export default {
  name: 'LiveModeAnimation',
  computed: {
    dots () {
      return [
        [...Array(3).keys()].map(i => ({ animationName: 'arena_to_r', animationDelay: i / 3 + 's', animationDirection: 'reverse' })),
        [...Array(1).keys()].map(i => ({ animationName: 'arena_to_r', animationDelay: '1.5s' })),
        [...Array(3).keys()].map(i => ({ animationName: 'arena_to_py', animationDelay: 1 + (i / 3) + 's', animationDirection: 'reverse' })),
        [...Array(1).keys()].map(i => ({ animationName: 'arena_to_py', animationDelay: '2.5s' }))
      ].flat()
    }
  }
}
</script>
<style lang="sass">
$dot_arena_left: 190px
$dot_arena_top: calc(50% - 20px)
$dot_r_left: calc(100% - 180px)
$dot_r_top: 80px
$dot_py_left: calc(100% - 180px)
$dot_py_top: calc(100% - 60px)

@keyframes arena_to_r
  0%
    left: $dot_arena_left
    top: $dot_arena_top
    opacity: 1
  30%
    left: $dot_r_left
    top: $dot_r_top
    opacity: 1
  31%
    left: $dot_r_left
    top: $dot_r_top
    opacity: 0
  100%
    left: $dot_r_left
    top: $dot_r_top
    opacity: 0

@keyframes arena_to_py
  0%
    left: $dot_arena_left
    top: $dot_arena_top
    opacity: 1
  30%
    left: $dot_py_left
    top: $dot_py_top
    opacity: 1
  31%
    left: $dot_py_left
    top: $dot_py_top
    opacity: 0
  100%
    left: $dot_py_left
    top: $dot_py_top
    opacity: 0

.live-mode-animation
  width: 100%
  height: 400px
  .dot
    width: 10px
    height: 10px
    background: white
    border-radius: 50%
    position: absolute
    animation-duration: 6s
    animation-iteration-count: infinite
    animation-timing-function: linear
    opacity: 0
  .labeled-icon
    width: 200px
    position: relative
    text-align: center
    font-size: 100px
    color: white
    > .icon-label
      font-size: 20px
      position: absolute
      bottom: -20px
      width: 100%
      left: 0
  .icon-arena
    font-size: 150px
    position: absolute
    left: 0
    top: 50%
    transform: translateY(-50%)
  .icon-r
    position: absolute
    right: 0
    top: 0
  .icon-py
    position: absolute
    right: 0
    bottom: 0
</style>
