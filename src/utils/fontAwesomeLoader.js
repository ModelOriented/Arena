import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArchive, faGripVertical, faMinusSquare, faPlusSquare, faCompressArrowsAlt,
  faLayerGroup, faExpand, faBars, faAngleDown, faCaretDown, faAngleUp, faPlus, faMinus, faSquare as fasSquare,
  faChartBar, faPoll, faListAlt, faAngleLeft, faAngleRight, faFileDownload, faEraser } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle, faTimesCircle, faCheckSquare, faSquare, faClone, faEdit } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export function loadFontAwesome () {
  library.add(faArchive, faGripVertical, faMinusSquare, faPlusSquare, faCompressArrowsAlt, faLayerGroup, faExpand, faBars)
  library.add(faAngleDown, faCaretDown, faPlus, faMinus, faAngleUp, fasSquare, faChartBar, faPoll, faListAlt, faAngleLeft, faAngleRight)
  library.add(faFileDownload, faEraser)
  library.add(faQuestionCircle, faTimesCircle, faCheckSquare, faSquare, faClone, faEdit)
  Vue.component('font-awesome-icon', FontAwesomeIcon)
}
