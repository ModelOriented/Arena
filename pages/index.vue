<template>
  <div class="about-container">
    <div class="main-section">
      <span class="title">Arena is the universal dashboard for models exploration for Python and R</span>
      <img src="@/assets/preview.gif">
    </div>
    <div class="usage-section">
      <div class="column">
        <span><span>Explore single model</span></span>
        <span><span>Compare multiple models</span></span>
        <span><span>Compare R with Python</span></span>
      </div>
      <div class="column">
        <span><span>Explain prediction</span></span>
        <span><span>Check Fairness</span></span>
        <span><span>Explainable AI</span></span>
      </div>
      <div class="column">
        <span><span>Model Performance</span></span>
        <span><span>Exploratory data analysis</span></span>
        <span><span>Share session</span></span>
      </div>
    </div>
    <div class="mode-section">
      <div class="mode-selection">
        <button class="left" :class="{ active: sectionMode === 'live' }" @click="sectionMode = 'live'">Live</button>
        <button class="right" :class="{ active: sectionMode === 'static' }" @click="sectionMode = 'static'">Static</button>
      </div>
      <div v-if="sectionMode === 'live'" class="keypoints">
        <span>Quick startup</span>
        <span>Charts are generated in real time</span>
        <span>Shareable within local network</span>
      </div>
      <div v-if="sectionMode === 'static'" class="keypoints">
        <span>Precalculated to single file .json</span>
        <span>Charts are loading without latency</span>
        <span>Shareable as simple link</span>
        <span>Easy to archive and reuse later</span>
      </div>
      <div class="animation">
        <LiveModeAnimation v-if="sectionMode === 'live'" />
      </div>
    </div>
    <div class="support-section">
      <span>Supported packages</span>
      <div class="cards">
        <a class="card" href="https://mlr-org.com/">
          <img src="https://mlr3.mlr-org.com/reference/figures/logo.png">
        </a>
        <a class="card" href="https://scikit-learn.org">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/260px-Scikit_learn_logo_small.svg.png">
        </a>
        <a class="card" href="https://modeloriented.github.io/DALEX/">
          <img src="https://github.com/ModelOriented/DALEX/raw/master/man/figures/logo.png">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'simple',
  data () {
    return {
      sectionMode: 'live'
    }
  }
}
</script>
<style lang="sass">
.about-container
  position: absolute
  width: 100%
  height: 100%
  top: 0
  z-index: -1
  > .main-section
    position: relative
    height: 800px
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.1)), url('../assets/bg1.jpeg')
    background-size: cover
    background-position-y: center
    background-position-x: center
    box-shadow: 0 0 5px 0 #555a
    z-index: 10
    > .title
      display: inline-block
      position: relative
      font-size: 60px
      font-family: 'Fira Sans'
      margin-top: 300px
      color: $coolblack
      max-width: 50%
      left: 5%
      @include mobile
        font-size: 30px
        margin-top: 200px
        width: calc(100% - 20px)
        max-width: unset
        left: 10px
    > img
      width: 600px
      max-width: 40%
      position: absolute
      right: 5%
      top: 50%;
      transform: translateY(-50%)
      box-shadow: 0 0 5px 0 rgba(200, 200, 200, 0.8)
      @include mobile
        width: calc(100% - 20px)
        max-width: unset
        position: relative
        right: 0
        top: 0
        transform: none
        margin: 30px 10px
  > .usage-section
    position: relative
    background: white
    font-size: 0
    font-family: 'Fira Sans'
    white-space: nowrap
    > .column
      display: inline-block
      width: 33%
      height: 100%
      padding: 80px 50px
      box-sizing: border-box
      font-size: 40px
      vertical-align: top
      > span
        display: block
        padding: 30px 0
        &:before
          content: '\2714  '
          color: $green
          vertical-align: top
        > span
          display: inline-block
          white-space: normal
  > .mode-section
    position: relative
    height: 600px
    background: $darkgrey
    box-shadow: 0 0 5px 0 #555a
    z-index: 10
    > .mode-selection
      font-size: 0 /* remove space between buttons */
      position: absolute
      top: 20px
      left: 50%
      transform: translateX(-50%)
      > button
        background: transparent
        border: 1px solid white
        border-radius: 0 5px 5px 0
        padding: 10px 20px
        color: white
        font-weight: 400
        font-size: 20px
        &.left
          border-radius: 5px 0 0 5px
        &.active
          background: white
          color: $darkgrey
    > .keypoints
      position: absolute
      top: 50%
      left: 5%
      max-width: 40%
      font-size: 30px
      color: white
      transform: translateY(-50%)
      font-family: 'Fira Sans Bold'
      > span
        display: block
        padding: 30px 0
        &:before
          content: '• '
      @include mobile
        position: relative
        max-width: unset
        width: 90%
        top: 80px
        transform: none
    > .animation
      position: absolute
      top: 50%
      right: 5%
      width: 40%
      transform: translateY(-50%)
      @include mobile
        position: relative
        top: 100px
        width: 90%
        transform: unset
        right: -5%
    @include mobile
      height: 900px
  > .support-section
    position: relative
    background: white
    z-index: 9
    padding: 30px 0
    overflow-x: auto
    white-space: nowrap
    > span
      position: absolute
      top: 20px
      left: 5%
      font-size: 40px
      font-family: 'Fira Sans'
      color: $darkgrey
    > .cards
      overflow-x: auto
      margin-top: 70px
      > .card
        display: inline-block
        height: 100px
        margin: 0 50px
        > img
          height: 100%
</style>
