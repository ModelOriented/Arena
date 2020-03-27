import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArchive, faGripVertical, faMinusSquare, faPlusSquare, faCompressArrowsAlt, faLayerGroup, faExpand, faBars } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle, faTimesCircle, faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export function loadFontAwesome () {
  library.add(faArchive, faGripVertical, faMinusSquare, faPlusSquare, faCompressArrowsAlt, faLayerGroup, faExpand, faBars)
  library.add(faQuestionCircle, faTimesCircle, faCheckSquare, faSquare)
  Vue.component('font-awesome-icon', FontAwesomeIcon)
}
