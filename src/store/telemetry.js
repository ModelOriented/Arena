import Vue from 'vue'
import config from '@/configuration/config.js'

const state = {
  lastActivity: new Date().getTime(),
  lastActivitySended: 0,
  telemetryUUID: null
}

const getters = {
  telemetryUUID (state) {
    return state.telemetryUUID
  },
  lastActivity (state) {
    return state.lastActivity
  },
  lastActivitySended (state) {
    return state.lastActivitySended
  }
}

const mutations = {
  updateLastActivity (state) {
    Vue.set(state, 'lastActivity', new Date().getTime())
  },
  setLastActivitySended (state, time) {
    Vue.set(state, 'lastActivitySended', time)
  },
  setTelemetryUUID (state, v) {
    Vue.set(state, 'telemetryUUID', v)
  }
}

const actions = {
  initTelemetry ({ commit, getters }) {
    document.addEventListener('pointerdown', () => {
      commit('updateLastActivity')
    })
    setInterval(() => {
      if (localStorage.getItem('disableTelemetry')) return
      if (getters.lastActivity <= getters.lastActivitySended) return
      if (!getters.telemetryUUID) return
      Vue.http.post(config.telemetryServer + '/state', {
        uuid: getters.telemetryUUID,
        type: 'active',
        data: ''
      }).catch(console.error)
      commit('setLastActivitySended', getters.lastActivity)
    }, 1000 * 60 * 1)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: false
}
