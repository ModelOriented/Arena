import Vue from 'vue'
import Vuex from 'vuex'

/* Vuex Modules */
import params from '@/store/params.js'
import slots from '@/store/slots.js'
import dataSources from '@/store/dataSources.js'
import miscellaneous from '@/store/miscellaneous.js'

Vue.use(Vuex)

const actions = {
  init ({ commit, dispatch }) {
    dispatch('initMiscellaneous')
    dispatch('initDataSources')
  }
}

export default new Vuex.Store({
  modules: {
    params,
    slots,
    dataSources,
    miscellaneous
  },
  strict: false,
  actions
})
