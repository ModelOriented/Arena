import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import VueResource from 'vue-resource'
import { loadFontAwesome } from './utils/fontAwesomeLoader.js'

loadFontAwesome()

let appendURL = new URLSearchParams(window.location.search).get('append')
let clearStorage = new URLSearchParams(window.location.search).get('clear_storage')

if (clearStorage) {
  localStorage.clear()
  document.write('Local Storage is now clear')
} else if (appendURL) {
  localStorage.setItem('append', '')
  localStorage.setItem('append', appendURL)
  document.write('You can close this window')
} else {
  Vue.config.productionTip = false
  Vue.use(VueResource)

  new Vue({
    render: h => h(App),
    store
  }).$mount('#app')
}
