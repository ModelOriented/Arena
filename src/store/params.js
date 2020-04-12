import format from '@/utils/format.js'
import Vue from 'vue'
import config from '@/configuration/config.js'

const state = {
  globalParams: {},
  nameConflicts: [],
  manualColors: {} // colors manualy set to param (key - param uuid, value - color)
}

const getters = {
  getSlotFullParams: (state, getters) => (localParams) => {
    return localParams.map(p => Object.assign({}, getters.globalParams, p))
  },
  getGlobalParam: (state, getters) => (name) => {
    if (state.globalParams[name]) return state.globalParams[name]
    if (getters.availableParams[name] && getters.availableParams[name].length > 0) return getters.availableParams[name][0]
    return null
  },
  globalParams (state, getters) {
    return config.params.reduce((acu, n) => {
      acu[n] = getters.getGlobalParam(n)
      return acu
    }, {})
  },
  availableParams (state, getters) {
    let params = {}
    config.params.forEach(p => {
      params[p] = {}
    })
    Object.keys(params).forEach(key => {
      getters.dataSources.forEach(ds => {
        getters[ds + '/' + key + 's'].forEach(a => {
          params[key][a.uuid] = a // make sure we have only one param for one uuid
        })
      })
      params[key] = Object.values(params[key]) // make array from object
    })
    return params
  },
  nextNameConflicts (state) {
    return state.nameConflicts.length > 0 ? state.nameConflicts[0] : null
  },
  mainParamColors (state, getters) {
    let colors = palette.slice(0)
    let defaultColors = getters.availableParams[config.mainParam].reduce((acc, m) => {
      acc[m.uuid] = colors.shift() || color.h
      return acc
    }, {})
    return Object.assign({}, defaultColors, state.manualColors)
  },
  palette (state, getters) {
    return palette
  }
}

const mutations = {
  setGlobalParam (state, { name, value }) {
    Vue.set(state.globalParams, name, value)
  },
  addNameConflictsToResolve (state, toResolve) {
    state.nameConflicts = [...state.nameConflicts, toResolve]
  },
  removeNameConflicts (state) {
    state.nameConflicts = state.nameConflicts.slice(1)
  },
  setColor (state, { uuid, color }) {
    Vue.set(state.manualColors, uuid, color)
  }
}

const actions = {
  /*
   * Method called from data sources to check if there are name collisions
   * of params and resolve them.
   * @return Promise with object in which keys are uuids of params that should be replaced
   * by keys' value
   */
  removeNameConflicts ({ commit, getters }, params) {
    let toResolve = { params: {} }
    Object.keys(params).forEach(paramKey => {
      if (!getters.availableParams[paramKey]) return
      toResolve.params[paramKey] = []
      let simplified = getters.availableParams[paramKey].map(p => {
        return {
          simplified: format.simplify(p.name),
          ...p
        }
      })
      params[paramKey].forEach(p => {
        let duplicate = simplified.findIndex(s => s.simplified === format.simplify(p.name))
        if (duplicate === -1) return
        toResolve.params[paramKey].push({
          orginal: getters.availableParams[paramKey][duplicate],
          newParam: p
        })
      })
    })
    return new Promise((resolve, reject) => {
      toResolve.resolve = resolve
      toResolve.reject = reject
      commit('addNameConflictsToResolve', toResolve)
    })
  },
  setGlobalParamByName ({ commit, getters }, { paramName, valueName }) {
    let param = (getters.availableParams[paramName] || []).find(p => p.name === valueName)
    if (param) commit('setGlobalParam', { name: paramName, value: param })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: false
}

const color = {
  a: '#8bdcbe',
  b: '#f05a71',
  c: '#371ea3',
  d: '#46bac2',
  e: '#ae2c87',
  f: '#ffa58c',
  g: '#4378bf',
  h: '#160e3b'
}

const palette = [color.a, color.b, color.g, color.d, color.e, color.f, color.c, color.h]
