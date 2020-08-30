import uuidGenerator from 'uuid/v4'
import Vue from 'vue'
import config from '@/configuration/config.js'
import streams from '@/utils/streams.js'
import dataSourceCommon from '@/store/datasources/dataSourceCommon.js'
import Ajv from 'ajv'

let requestCounter = 1
let getRequestId = () => {
  return requestCounter++
}
const state = {
  requestPromises: [],
  availableSlots: []
}

const ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
/* eslint-disable camelcase */
const validatorSession_1_0_0 = ajv.compile(require('@/store/schemas/session.schema.json'))
const validatorSession_1_1_0 = ajv.compile(require('@/store/schemas/session-1.1.0.schema.json'))
/* eslint-enable camelcase */

const getters = {
  getAvailableSlots: (state, getters) => (fullParams, scope) => {
    return getters.sources.map(source => {
      let params = getters.translateBackParams(source, fullParams)
      if (!params[scope]) return []

      return (getters.availableSlots.find(s => s.uuid === source.uuid && s.scope === scope) || {}).slots || []
    }).flat()
  },
  availableSlots (state) {
    return state.availableSlots
  },
  getRequestPromise: (state) => (id) => {
    return state.requestPromises.find(d => d.id === id)
  }
}

const mutations = {
  addRequestPromise (state, data) {
    state.requestPromises = [...state.requestPromises, data]
  },
  removeRequestPromise (state, id) {
    state.requestPromises = state.requestPromises.filter(d => d.id !== id)
  },
  clearAvailableSlots (state) {
    Vue.set(state, 'availableSlots', [])
  },
  addAvailableSlots (state, slots) {
    Vue.set(state, 'availableSlots', [...state.availableSlots.filter(s => s.uuid !== slots.uuid || s.scope !== slots.scope), slots])
  },
  addToCache (state, { source, slotData }) {
    Vue.set(source, 'cache', [...source.cache, slotData])
  }
}

const actions = {
  doRequest ({ commit, dispatch, rootGetters }, { request, conn }) {
    request = { id: getRequestId(), ...request }
    let promise = new Promise((resolve, reject) => {
      commit('addRequestPromise', { id: request.id, resolve, reject })
      conn.send(request)
    })
    return promise
  },
  async loadData ({ state, commit, dispatch, rootGetters, getters }, { data, uuid }) {
    if (data.type !== 'peer' || !data.peerId) return false
    if (!rootGetters.peer) await dispatch('initPeer', { root: true })
    let conn = rootGetters.peer.connect(data.peerId)
    conn.on('open', () => {
      let source = {
        availableParams: streams.createObjectWithArrays(config.params),
        uuid: uuid || uuidGenerator(),
        address: null,
        cache: [],
        conn
      }
      commit('addSource', source)
      conn.on('close', () => commit('remoiveSource', source.uuid))
      conn.on('error', e => {
        console.error(e)
        commit('remoiveSource', source.uuid)
      })
      conn.on('data', async d => {
        if (validatorSession_1_1_0(d) || validatorSession_1_0_0(d)) {
          d.sources = []
          let mySource = getters.sources.find(s => s.uuid === source.uuid)
          await dispatch('importSession', d, { root: true })
          commit('addSource', mySource)
          return
        }
        let promise = getters.getRequestPromise(d.id)
        if (!promise) return
        if (d.error) promise.reject(d.response)
        else promise.resolve(d.response)
        commit('removeRequestPromise', d.id)
      })
      dispatch('doRequest', { conn, request: { type: 'getParams' } }).then(params => {
        commit('expandSource', { uuid: source.uuid, availableParams: params })
        let waitingParams = {
          uuid: source.uuid,
          params
        }
        commit('addWaitingParams', waitingParams, { root: true })
      })
    })
    return true
  },
  query ({ state, commit, getters, dispatch }, { params, plotType }) {
    let promises = []
    for (let source of getters.sources) {
      // translate params back to original names
      let queryParams = getters.translateBackParams(source, params)
      let cached = source.cache.find(d => {
        return d.plotType === plotType &&
          Object.keys(d.params).reduce((acc, paramType) => acc && d.params[paramType] === queryParams[paramType], true)
      })
      if (cached) return { ...cached, params: getters.translateParams(source, cached.params) }

      let promise = dispatch('doRequest', { conn: source.conn, request: { type: 'getPlot', params: queryParams, plotType } }).then(slotData => {
        if (slotData) commit('addToCache', { source, slotData })
        else return null
        return { ...slotData, params: getters.translateParams(source, slotData.params) }
      })
      promises.push(promise)
    }
    return Promise.all(promises).then(list => list.find(x => x))
  },
  globalParamsUpdated ({ commit, rootGetters, getters, dispatch }) {
    commit('clearAvailableSlots')
    getters.sources.forEach(source => {
      config.scopes.forEach(scope => {
        dispatch('doRequest', { conn: source.conn, request: { type: 'getAvailableSlots', params: rootGetters.globalParams, scope } }).then(slots => {
          commit('addAvailableSlots', { uuid: source.uuid, scope, slots })
        })
      })
    })
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
