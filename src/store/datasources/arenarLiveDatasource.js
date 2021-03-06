import uuidGenerator from 'uuid/v4'
import Ajv from 'ajv'
import format from '@/utils/format.js'
import Vue from 'vue'
import equal from 'fast-deep-equal/es6'
import config from '@/configuration/config.js'
import dataSourceCommon from '@/store/datasources/dataSourceCommon.js'

const ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
/* eslint-disable camelcase */
const validator_1_0_0 = ajv.compile(require('@/store/schemas/arenarLive.schema.json'))
const validator_1_1_0 = ajv.compile(require('@/store/schemas/arenarLive-1.1.0.schema.json'))
const validator_1_2_0 = ajv.compile(require('@/store/schemas/arenarLive-1.2.0.schema.json'))
/* eslint-enable camelcase */

const state = {}

const getters = {
  getAvailableSlots: (state, getters) => (fullParams, scope) => {
    return getters.sources.map(source => {
      let params = getters.translateBackParams(source, fullParams)
      if (!params[scope]) return []

      return source.availablePlots.filter(d => {
        // check if all required params are available from that source (not null in params variable)
        return d.requiredParams.reduce((acu, paramType) => acu && params[paramType], true) && d.requiredParams.includes(scope)
      }).map(d => {
        return {
          plotType: d.plotType,
          plotCategory: d.plotCategory ? d.plotCategory : 'Other',
          name: d.name ? d.name : format.firstCharUpper(d.plotType),
          localParams: [{ [scope]: fullParams[scope] }]
        }
      })
    }).flat()
  }
}

const mutations = {
  addToCache (state, { source, slotData }) {
    Vue.set(source, 'cache', [...source.cache, slotData])
  },
  removeFromCache (state, { source, slotData }) {
    Vue.set(source, 'cache', source.cache.filter(c => c !== slotData))
  },
  addPendingRequest (state, { source, pendingRequest }) {
    Vue.set(source, 'pendingRequests', [...source.pendingRequests, pendingRequest])
  },
  removePendingRequest (state, { source, pendingRequest }) {
    Vue.set(source, 'pendingRequests', source.pendingRequests.filter(w => w !== pendingRequest))
  }
}

// Checks if names array have unique elements, after removing special characters and in lower case
const isUnique = (array) => {
  return (new Set(array.map(format.simplify))).size === array.length
}

const actions = {
  loadData ({ state, commit, dispatch, rootGetters }, { data, src, uuid }) {
    let params = null
    let options = { customParams: false, attributes: false }
    if (validator_1_0_0(data)) {
      params = config.params.reduce((acu, paramType) => {
        acu[paramType] = data[paramType + 's'] || []
        return acu
      }, {})
    } else if (validator_1_1_0(data)) {
      params = data.availableParams
    } else if (validator_1_2_0(data)) {
      params = data.availableParams
      options = data.options
    } else {
      return false
    }
    if (!config.params.reduce((acu, p) => acu && isUnique(params[p]), true)) return false
    let source = {
      availableParams: params,
      availablePlots: data.availablePlots,
      options: options,
      uuid: uuid || uuidGenerator(),
      address: src,
      timestamp: data.timestamp,
      cache: [],
      pendingRequests: []
    }
    let waitingParams = {
      uuid: source.uuid,
      params: source.availableParams
    }
    commit('addWaitingParams', waitingParams, { root: true })
    commit('addSource', source)
    return true
  },
  query ({ state, commit, getters }, { params, plotType }) {
    for (let source of getters.sources) {
      // translate params back to original names
      let queryParams = getters.translateBackParams(source, params)

      // for each source we find required params for plotType
      let plotProperties = source.availablePlots.find(p => p.plotType === plotType)
      if (!plotProperties) continue

      // check if all required params are not null
      if (!plotProperties.requiredParams.reduce((acu, plotType) => acu && queryParams[plotType], true)) continue

      queryParams = plotProperties.requiredParams.reduce((acu, plotType) => {
        acu[plotType] = queryParams[plotType]
        return acu
      }, {})

      // check if response for same query is not cached
      let cached = source.cache.find(c => c.plotType === plotType && equal(c.params, queryParams))
      if (cached) return cached

      // check it there is already pending request for same query
      let pendingRequest = source.pendingRequests.find(w => w.plotType === plotType && equal(w.params, queryParams))
      if (pendingRequest) return pendingRequest.promise

      return new Promise((resolve, reject) => {
        let pendingRequest = {
          promise: null,
          resolve: null,
          reject: null,
          params: queryParams,
          plotType: plotType
        }
        let pendingRequestPromise = new Promise((resolve, reject) => {
          pendingRequest.resolve = resolve
          pendingRequest.reject = reject
          // To make sure promise parameter is already set
          if (pendingRequest.promise) commit('addPendingRequest', { source, pendingRequest })
        })
        pendingRequest.promise = pendingRequestPromise
        if (pendingRequest.resolve) commit('addPendingRequest', { source, pendingRequest })

        let queryString = Object.entries(queryParams).map(e => e.map(encodeURIComponent).join('=')).join('&')
        Vue.http.get(source.address + plotType + '?' + queryString).then(respone => {
          let data = respone.body
          let slotData = {
            plotType: plotType,
            params: getters.translateParams(source, queryParams),
            plotData: data.data,
            plotComponent: data.plotComponent
          }
          slotData.computations = {
            isDone: data.isDone === undefined ? true : data.isDone,
            progress: (data.progress === undefined || data.prograss === -1) ? null : data.progress
          }
          commit('addToCache', { source, slotData })
          pendingRequest.resolve(slotData)
          commit('removePendingRequest', { source, pendingRequest })
          resolve(slotData)
        }).catch((e) => {
          pendingRequest.reject(e)
          reject(e)
        })
      })
    }
    return null
  },
  updateSource ({ getters, commit, dispatch }, source) {
    Vue.http.get(source.address).then(response => {
      commit('removeSource', source)
      dispatch('loadData', { data: response.body, src: source.address, uuid: source.uuid })
      dispatch('refreshSlots', null, { root: true })
    }).catch(console.error)
  },
  refresh ({ getters, commit, dispatch }) {
    getters.sources.forEach(source => {
      Vue.http.get(source.address + 'timestamp').then(response => {
        let timestamp = response.body.timestamp
        if (timestamp > source.timestamp) dispatch('updateSource', source)
      }).catch(console.error)
      let toUpdate = source.cache.filter(c => c.computations && !c.computations.isDone)
      toUpdate.forEach(cached => {
        commit('removeFromCache', { source, slotData: cached })
      })
      // if (toUpdate.length > 0) dispatch('refreshSlots', null, { root: true })
    })
  },
  init ({ dispatch }) {
    setInterval(() => dispatch('refresh'), 3000)
  },
  getAttributes ({ state, commit, getters }, { paramValue, paramType }) {
    for (let source of getters.sources) {
      if (!source.options.attributes) continue
      let index = getters.translatedAvailableParams[source.uuid][paramType].indexOf(paramValue)
      if (index === -1) continue
      let originalValue = source.availableParams[paramType][index]
      /* eslint-disable-next-line arena/no-hardcode-param-types */
      if (paramType === 'variable' && !source.options.customParams) return null
      let cached = source.cache.find(c => c.attributes && c.paramType === paramType && c.paramValue === originalValue)
      if (cached) return getters.translateAttributes(source.uuid, paramType, cached.attributes)
      return new Promise((resolve, reject) => {
        Vue.http.get(source.address + 'attribute/' + paramType + '/' + encodeURIComponent(originalValue)).then(response => {
          commit('addToCache', { source, slotData: { attributes: response.body, paramType, paramValue: originalValue } })
          resolve(response.body)
        }).catch(e => {
          console.error(e)
          reject(e)
        })
      })
    }
    return null
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  modules: {
    dataSourceCommon: dataSourceCommon.getNew()
  },
  namespaced: true
}
