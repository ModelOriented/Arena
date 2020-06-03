import config from '@/configuration/config.js'
import streams from '@/utils/streams.js'
import Vue from 'vue'

const state = () => {
  return {
    sources: []
  }
}

const getters = {
  availableParams (state, getters) {
    return getters.sources
      .reduce((acu, s) => {
        config.params.forEach(paramType => {
          acu[paramType] = [...acu[paramType], ...(getters.translatedAvailableParams[s.uuid][paramType] || [])]
        })
        return acu
      }, streams.createObjectWithArrays(config.params))
  },
  translatedAvailableParams (state, getters, rootState, rootGetters) {
    return state.sources.reduce((acu, s) => {
      acu[s.uuid] = {}
      config.params.forEach(paramType => {
        let translation = (rootGetters.translations[s.uuid] || {})[paramType] || {}
        acu[s.uuid][paramType] = s.availableParams[paramType].map(paramName => translation[paramName] || paramName)
      })
      return acu
    }, {})
  },
  translateIfPossible: (state, getters, rootState, rootGetters) => (uuid, paramType, paramName) => {
    return ((rootGetters.translations[uuid] || {})[paramType] || {})[paramName] || paramName
  },
  // Published sources
  sources (state, getters, rootState, rootGetters) {
    return state.sources.filter(s => rootGetters.canPublishParams(s.uuid))
  },
  validateParams: (state, getters, rootState, rootGetters) => (source, fullParams) => {
    if (!rootGetters.canPublishParams(source.uuid)) return {}
    return config.params.reduce((acu, paramType) => {
      acu[paramType] = getters.translatedAvailableParams[source.uuid][paramType].includes(fullParams[paramType]) ? fullParams[paramType] : null
      return acu
    }, {})
  },
  translateBackParams: (state, getters, rootState, rootGetters) => (source, fullParams) => {
    if (!rootGetters.canPublishParams(source.uuid)) return {}
    return config.params.reduce((acu, paramType) => {
      let index = getters.translatedAvailableParams[source.uuid][paramType].indexOf(fullParams[paramType])
      acu[paramType] = index === -1 ? null : source.availableParams[paramType][index]
      return acu
    }, {})
  },
  translateParams: (state, getters) => (source, params) => {
    return Object.keys(params).reduce((acu, paramType) => {
      acu[paramType] = getters.translateIfPossible(source.uuid, paramType, params[paramType])
      return acu
    }, {})
  }
}

const mutations = {
  addSource (state, source) {
    if (!source.timestamp) Vue.set(source, 'timestamp', new Date().getTime())
    Vue.set(state, 'sources', [...state.sources, source])
  },
  removeSource (state, source) {
    Vue.set(state, 'sources', state.sources.filter(s => s !== source && s.uuid !== source))
  },
  clearSources (state) {
    Vue.set(state, 'sources', [])
  }
}

export default {
  getNew () {
    return {
      state: state(),
      getters: { ...getters },
      mutations: { ...mutations },
      namespaced: false
    }
  }
}
