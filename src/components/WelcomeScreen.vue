<template>
  <div class="welcome-screen-container">
    <div class="close-button" @click="$emit('close')"><font-awesome-icon :icon="['far', 'times-circle']"/></div>
    <div class="welcome-screen-content">
      <span class="welcome">Welcome to Arena - Interactive XAI dashboard</span>
      <h2>About</h2>
      <p><b>Arena</b> is an interactive dashboard to compare <b>AI explanations</b> for multiple predictive models at once. You can work with static precalculated data from one or more sources and with a live server that calculates plots on demand.</p>
      <h2>See demo</h2>
      <div v-for="e in examples" :key="e.name" class="example">
        <a :href="e.href" @click.prevent="openExample(e)">{{ e.name }}</a>
        <span v-if="loadingExample === e"> (Loading...)</span>
      </div>
      <h2>Test on your data</h2>
      <p><a href="https://github.com/ModelOriented/ArenaR">Use Arena with R</a></p>
      <h2>See also</h2>
      <p>
        <b>Arena</b> is a part of <a href="https://drwhy.ai"><b>DrWhy.AI</b></a> family. Check it out.<br>
        Source code is available at <a href="https://github.com/ModelOriented/Arena">Github</a>
      </p>
    </div>
    <div class="buttons">
      <button class="close-permanent" @click="closeElement('welcome-screen')">Do not show again</button>
      <button class="close" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>
<script>
import config from '@/configuration/config.js'
import { mapMutations } from 'vuex'

export default {
  name: 'WelcomeScreen',
  data () {
    return {
      loadingExample: null
    }
  },
  computed: {
    baseURL () { return config.url },
    examples () {
      return config.examples.map(e => {
        return {
          name: e.name,
          href: this.baseURL + (e.session ? ('/?session=' + e.session) : ('/?data=' + e.url)),
          url: e.session || e.url,
          action: e.session ? 'loadSessionURL' : 'loadURL'
        }
      })
    }
  },
  methods: {
    openExample (e) {
      if (this.loadingExample) return
      this.loadingExample = e
      this.$store.dispatch(e.action, e.url).then(() => {
        this.$emit('close')
      }).catch(error => {
        this.loadingExample = null
        console.error(error)
      })
    },
    ...mapMutations(['closeElement'])
  }
}
</script>
<style>
div.welcome-screen-container {
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(180, 180, 180, 0.5);
  background: white;
  width: 850px;
  height: 500px;
  max-width: 85%;
  max-height: 85%;
  z-index: 100003;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
div.welcome-screen-container > div.close-button {
  position: absolute;
  top: -30px;
  right: -30px;
  cursor: pointer;
  color: white;
  font-size: 23px;
}
div.welcome-screen-container > div.welcome-screen-content {
  overflow-y: auto;
  width: calc(100% - 40px);
  max-height: calc(100% - 40px);
  padding: 20px;
}
div.welcome-screen-container > div.welcome-screen-content > span.welcome {
  font-size: 35px;
  color: #4378bf;
}
div.welcome-screen-container > div.welcome-screen-content > h2 {
  color: #4378bf;
  font-size: 20px;
  margin-bottom: 5px;
  margin-top: 20px;
}
div.welcome-screen-container > div.welcome-screen-content > p {
  margin-top: 2px;
  margin-bottom: 2px;
}
div.welcome-screen-container > div.welcome-screen-content > * > a {
  color: #371ea3;
  font-weight: 600;
}
div.welcome-screen-container > div.welcome-screen-content > div.example {
  padding: 1px 0;
}
div.welcome-screen-container > div.buttons {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
div.welcome-screen-container > div.buttons > button {
  border: 0;
  border-radius: 4px;
  color: white;
  padding: 0 20px;
  height: 40px;
  margin: 0 10px;
}
div.welcome-screen-container > div.buttons > button.close-permanent {
  background: #f05a71;
}
div.welcome-screen-container > div.buttons > button.close-permanent:hover {
  box-shadow: 0 0 5px 0 #f05a71;
}
div.welcome-screen-container > div.buttons > button.close {
  background: #4378bf;
}
div.welcome-screen-container > div.buttons > button.close:hover {
  box-shadow: 0 0 5px 0 #4378bf;
}
</style>
