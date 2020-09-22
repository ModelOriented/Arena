import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faAngleDown, faDesktop } from '@fortawesome/free-solid-svg-icons'
import { faRProject, faPython } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars, faAngleDown, faDesktop)
library.add(faRProject, faPython)
Vue.component('font-awesome-icon', FontAwesomeIcon)
