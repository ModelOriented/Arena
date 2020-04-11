import uuid from 'uuid/v4'
import Ajv from 'ajv'
import format from '@/utils/format.js'
import Vue from 'vue'
import equal from 'fast-deep-equal/es6'

const ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
const validator = ajv.compile(require('@/store/schemas/arenarLive.schema.json'))

const state = {
  servers: []
}

const getters = {
  // These can produce duplicats, index.js removes them
  models (state) {
    return state.servers.map(s => s.models).flat()
  },
  observations (state) {
    return state.servers.map(s => s.observations).flat()
  },
  variables (state) {
    return state.servers.map(s => s.variables).flat()
  },
  getAvailableSlots: (state, getters) => (fullParams) => {
    for (let server of state.servers) {
      let params = {}
      // we check if model is from this server
      params.model = server.models.find(m => (fullParams.model || {}).uuid === m.uuid)
      params.observation = server.observations.find(o => (fullParams.observation || {}).uuid === o.uuid)
      params.variable = server.variables.find(v => (fullParams.variable || {}).uuid === v.uuid)
      if (!params.model || !params.observation || !params.variable) continue

      return server.availablePlots.map(d => {
        return {
          plotType: d.plotType,
          plotCategory: d.plotCategory ? d.plotCategory : 'Other',
          name: d.name ? d.name : format.firstCharUpper(d.plotType),
          localParams: [{ model: params.model }]
        }
      })
    }
    return []
  }
}

const mutations = {
  addServer (state, server) {
    state.servers = [...state.servers, server]
  },
  addToCache (state, { server, slotData }) {
    server.cache = [...server.cache, slotData]
  },
  addWaiting (state, { server, waitingObject }) {
    server.waiting = [...server.waiting, waitingObject]
  },
  removeWaiting (state, { server, waitingObject }) {
    server.waiting = server.waiting.filter(w => w !== waitingObject)
  }
}

// Checks if names array have unique elements, after removing special characters and in lower case
const isUnique = (array) => {
  return (new Set(array.map(format.simplify))).size === array.length
}
const validateData = (data) => {
  return validator(data) && isUnique(data.observations) && isUnique(data.variables) && isUnique(data.models)
}

const actions = {
  loadData ({ state, commit, dispatch }, { data, src }) {
    if (!validateData(data)) return false
    let params = {
      model: data.models.map(a => { return { name: a, uuid: uuid() } }),
      variable: data.variables.map(a => { return { name: a, uuid: uuid() } }),
      observation: data.observations.map(a => { return { name: a, uuid: uuid() } })
    }
    return new Promise((resolve, reject) => {
      dispatch('removeNameConflicts', params, { root: true }).then(updates => {
        // array of uuids of params that was merged to the already existing param
        let updated = Object.keys(updates)

        let server = {
          models: params.model.map(p => updated.includes(p.uuid) ? Object.assign({}, updates[p.uuid], { orginalName: p.name }) : p),
          variables: params.variable.map(p => updated.includes(p.uuid) ? Object.assign({}, updates[p.uuid], { orginalName: p.name }) : p),
          observations: params.observation.map(p => updated.includes(p.uuid) ? Object.assign({}, updates[p.uuid], { orginalName: p.name }) : p),
          uuid: uuid(),
          timestamp: data.timestamp,
          address: src,
          availablePlots: data.availablePlots,
          cache: [],
          waiting: []
        }
        commit('addServer', server)
        resolve(true)
      }).catch(reject)
    })
  },
  query ({ state, commit }, { params, plotType }) {
    for (let server of state.servers) {
      // for each server we find required params for plotType
      let plotProperties = server.availablePlots.find(p => p.plotType === plotType)
      if (!plotProperties) continue

      // each param is maped to object from this server (same uuid is not enought)
      let serverParams = plotProperties.requiredParams.reduce((acu, paramName) => {
        acu[paramName] = server[paramName + 's'].find(p => p.uuid === params[paramName].uuid)
        return acu
      }, {})
      // one of required params is not from this server
      if (Object.values(serverParams).includes(undefined) || Object.values(serverParams).includes(null)) continue

      let cached = server.cache.find(c => c.plotType === plotType && equal(c.params, serverParams))
      if (cached) return cached

      let query = Object.keys(serverParams).reduce((acu, p) => {
        acu[p] = serverParams[p].orginalName || serverParams[p].name
        return acu
      }, {})

      let alreadyWaiting = server.waiting.find(w => w.plotType === plotType && equal(w.params, serverParams))
      if (alreadyWaiting) return alreadyWaiting.promise

      return new Promise((resolve, reject) => {
        let waitingObject = {
          promise: null,
          resolve: null,
          reject: null,
          params: serverParams,
          plotType: plotType
        }
        let waitingPromise = new Promise((resolve, reject) => {
          waitingObject.resolve = resolve
          waitingObject.reject = reject
          // To make sure promise parameter is already set
          if (waitingObject.promise) commit('addWaiting', { server, waitingObject })
        })
        waitingObject.promise = waitingPromise
        if (waitingObject.resolve) commit('addWaiting', { server, waitingObject })

        let queryString = Object.entries(query).map(e => e.map(encodeURIComponent).join('=')).join('&')
        Vue.http.get(server.address + plotType + '?' + queryString).then(respone => {
          let data = respone.body
          let slotData = {
            plotType: plotType,
            params: serverParams,
            plotData: data.data,
            plotComponent: data.plotComponent
          }
          commit('addToCache', { server, slotData })
          waitingObject.resolve(slotData)
          commit('removeWaiting', { server, waitingObject })
          resolve(slotData)
        }).catch((e) => {
          waitingObject.reject(e)
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
  namespaced: true
}
