import Vue from 'vue'
import OptionsSchemas from '@/configuration/OptionsSchemas.js'

const state = {
  options: {},
  closedElements: [],
  annotationsActive: false,
  annotationsColor: '#371ea8',
  annotations: []
}

const getters = {
  getOption: (state, getters) => (name) => {
    if (state.options[name] !== undefined) return state.options[name]
    return (OptionsSchemas.find(s => s.name === name) || {}).default
  },
  allOptions (state, getters) {
    return OptionsSchemas.map(s => {
      return { name: s.name, value: getters.getOption(s.name) }
    })
  },
  isElementClosed: (state, getters) => (name) => {
    return !!state.closedElements.find(f => f === name)
  },
  annotationsActive (state) {
    return state.annotationsActive
  },
  annotationsColor (state) {
    return state.annotationsColor
  },
  getAnnotations: (state) => (pageNumber) => {
    return Object.assign({ paths: [], pageNumber }, state.annotations.find(a => a.pageNumber === pageNumber))
  },
  annotations (state) {
    return state.annotations
  }
}

const mutations = {
  setOption (state, { name, value }) {
    Vue.set(state.options, name, value)
  },
  closeElement (state, name) {
    state.closedElements = [...state.closedElements.filter(e => e !== name), name]
    localStorage.setItem('closedElements', JSON.stringify(state.closedElements))
  },
  setAnnotationsActive (state, active) {
    Vue.set(state, 'annotationsActive', !!active)
  },
  setAnnotationsColor (state, color) {
    Vue.set(state, 'annotationsColor', color)
  },
  setAnnotations (state, annotations) {
    Vue.set(state, 'annotations', [...state.annotations.filter(a => a.pageNumber !== annotations.pageNumber), annotations])
  },
  loadAnnotations (state, annotations) {
    Vue.set(state, 'annotations', annotations)
  },
  clearOptions (state) {
    Vue.set(state, 'options', {})
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
