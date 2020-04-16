import format from '@/utils/format.js'
import Vue from 'vue'
import config from '@/configuration/config.js'
import streams from '@/utils/streams.js'

const state = {
  globalParams: {},
  nameConflicts: [],
  manualColors: {}, // colors manualy set to param (key - param name, value - color)
  waitingParams: [],
  translations: []
}

const getters = {
  getSlotFullParams: (state, getters) => (localParams) => {
    return localParams.map(p => Object.assign({}, getters.globalParams, p))
  },
  getGlobalParam: (state, getters) => (paramType) => {
    if (state.globalParams[paramType]) return state.globalParams[paramType]
    if (getters.availableParams[paramType] && getters.availableParams[paramType].length > 0) return getters.availableParams[paramType][0]
    return null
  },
  globalParams (state, getters) {
    return config.params.reduce((acu, paramType) => {
      acu[paramType] = getters.getGlobalParam(paramType)
      return acu
    }, {})
  },
  availableParams (state, getters) {
    return config.params.reduce((acu, paramType) => {
      acu[paramType] = [...new Set(getters.dataSources.map(ds => getters[ds + '/availableParams'][paramType]).flat())]
      return acu
    }, {})
  },
  nextNameConflicts (state) {
    return state.nameConflicts.length > 0 ? state.nameConflicts[0] : null
  },
  mainParamColors (state, getters) {
    let colors = palette.slice(0)
    let defaultColors = getters.availableParams[config.mainParam].reduce((acc, m) => {
      acc[m] = colors.shift() || color.h
      return acc
    }, {})
    return Object.assign({}, defaultColors, state.manualColors)
  },
  palette (state, getters) {
    return palette
  },
  translations (state) {
    return state.translations.reduce((acu, t) => {
      acu[t.uuid] = t.params
      return acu
    }, {})
  },
  /* For collision checks only */
  simplifiedNames (state, getters) {
    return streams.mapChildren(getters.availableParams, format.simplify)
  },
  /* Returns if rename input for source specified by uuid is correct. */
  isRenameCorrect: (state, getters) => (uuid, paramType, paramName) => {
    if (!paramName || !uuid) return false
    let simplified = format.simplify(paramName)
    // if new name already is used
    if (getters.simplifiedNames[paramType].includes(simplified)) return false
    let translations = ((getters.translations[uuid] || {}).params || {})[paramType] || {}
    // if user already used that name in translation for waiting params
    if (Object.entries(translations).find(([from, to]) => format.simplify(to) === simplified && from !== paramName)) return false
    return true
  },
  waitingParamsConflicts (state, getters) {
    return state.waitingParams.map(wp => {
      let result = { uuid: wp.uuid, params: {} }
      let params = wp.params
      config.params.forEach(paramType => {
        if (!params[paramType]) return
        // Get translations object for given source and param type
        let translations = (getters.translations[wp.uuid] || {})[paramType] || {}
        let conflicts = []
        params[paramType].forEach(name => {
          let translated = translations[name]
          let conflictedIndex = getters.simplifiedNames[paramType].indexOf(format.simplify(translated || name))
          if (conflictedIndex === -1) return
          let conflicted = getters.availableParams[paramType][conflictedIndex]
          if (translated === conflicted) return // merged to already existing
          conflicts.push({ paramName: name, conflictedWith: conflicted })
        })
        if (conflicts.length > 0) result.params[paramType] = conflicts
      })
      return result
    })
  },
  waitingParamsCorrect (state, getters) {
    return getters.waitingParamsConflicts.filter(result => Object.keys(result.params).length === 0).map(result => result.uuid)
  },
  canPublishParams: (state, getters) => (uuid) => {
    return !state.waitingParams.find(wp => wp.uuid === uuid)
  }
}

const mutations = {
  setGlobalParam (state, { name, value }) {
    Vue.set(state.globalParams, name, value)
  },
  addNameConflictsToResolve (state, toResolve) {
    Vue.set(state, 'nameConflicts', [...state.nameConflicts, toResolve])
  },
  removeNameConflicts (state) {
    Vue.set(state, 'nameConflicts', state.nameConflicts.slice(1))
  },
  setColor (state, { paramName, color }) {
    Vue.set(state.manualColors, paramName, color)
  },
  removeParamsFromWaitingList (state, uuid) {
    Vue.set(state, 'waitingParams', state.waitingParams.filter(wp => wp.uuid !== uuid))
  },
  addWaitingParams (state, { params, uuid }) {
    Vue.set(state, 'waitingParams', [...state.waitingParams, { params, uuid }])
  },
  addTranslations (state, translation) {
    // Get already existing translation for same source
    let currentTranslations = state.translations.find(t => t.uuid === translation.uuid) || { params: {} }
    let newTranslations = { uuid: translation.uuid, params: {} }
    config.params.forEach(paramType => {
      // apply new translations over the old one
      newTranslations.params[paramType] = Object.assign({}, currentTranslations.params[paramType], translation.params[paramType])
      // check if translations are unique, if not, then abort for that paramType
      let uniqueTranslations = new Set(Object.values(newTranslations.params[paramType]).map(format.simplify))
      if (uniqueTranslations.size < Object.keys(newTranslations.params[paramType]).length) newTranslations.params[paramType] = currentTranslations.params[paramType] || {}
    })
    Vue.set(state, 'translations', [...state.translations.filter(t => t.uuid !== translation.uuid), newTranslations])
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
