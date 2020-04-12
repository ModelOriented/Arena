import Vue from 'vue'
import OptionsSchemas from '@/configuration/OptionsSchemas.js'

const state = {
  options: {},
  closedElements: []
}

const getters = {
  getOption: (stare, getters) => (name) => {
    if (state.options[name] !== undefined) return state.options[name]
    return (OptionsSchemas.find(s => s.name === name) || {}).default
  },
  isElementClosed: (state, getters) => (name) => {
    return !!state.closedElements.find(f => f === name)
  }
}

const mutations = {
  setOption (state, { name, value }) {
    Vue.set(state.options, name, value)
  },
  closeElement (state, name) {
    state.closedElements = [...state.closedElements.filter(e => e !== name), name]
    localStorage.setItem('closedElements', JSON.stringify(state.closedElements))
  }
}

const actions = {
  initMiscellaneous ({ commit, dispatch }) {
    try {
      let closed = JSON.parse(localStorage.getItem('closedElements'))
      if (closed) {
        if (!Array.isArray(closed)) throw new Error('value is not an array')
        closed.forEach(name => {
          if (typeof name === 'string' || name instanceof String) commit('closeElement', name)
        })
      }
    } catch (e) {
      console.error('Failed to read closedElements from localStorage', e)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: false
}
