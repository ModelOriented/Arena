import Vue from 'vue'
import uuid from 'uuid/v4'

const state = {
  notifications: []
}

const getters = {
  notifications (state) {
    return state.notifications
  }
}

const mutations = {
  addNotification (state, { type, text, id }) {
    Vue.set(state, 'notifications', [...state.notifications, { type, text, id }])
  },
  delNotification (state, id) {
    Vue.set(state, 'notifications', state.notifications.filter(x => x.id !== id))
  }
}

const actions = {
  createNotification ({ commit }, { type, text }) {
    const id = uuid()
    commit('addNotification', { id, type, text })
    return id
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: false
}
