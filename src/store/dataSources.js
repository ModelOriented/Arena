import jsonDatasource from '@/store/datasources/jsonDatasource.js'
import arenarLiveDatasource from '@/store/datasources/arenarLiveDatasource.js'
import peerDatasource from '@/store/datasources/peerDatasource.js'
import Vue from 'vue'
import Ajv from 'ajv'
import uuid from 'uuid/v4'
import config from '@/configuration/config.js'
import Peer from 'peerjs'

const ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
/* eslint-disable camelcase */
const validatorSession_1_0_0 = ajv.compile(require('@/store/schemas/session.schema.json'))
const validatorSession_1_1_0 = ajv.compile(require('@/store/schemas/session-1.1.0.schema.json'))
/* eslint-enable camelcase */

const state = {
  dataSources: [
    'jsonDatasource',
    'arenarLiveDatasource',
    'peerDatasource'
  ],
  recentURLSources: [],
  recentSessions: [],
  sessionUUID: uuid(), // uuid of active session
  sessionName: '',
  sessionLastSaved: null,
  debug: false,
  tokenCallback: null, // promise resolve function waiting for token
  peer: null
}

const getters = {
  dataSources (state) {
    return state.dataSources
  },
  recentURLSources (state) {
    return state.recentURLSources
  },
  sessionUUID (state) {
    return state.sessionUUID
  },
  sessionName (state) {
    return state.sessionName
  },
  sessionLastSaved (state) {
    return state.sessionLastSaved
  },
  recentSessions (state) {
    return state.recentSessions
  },
  debug (state) {
    return state.debug
  },
  tokenCallback (state) {
    return state.tokenCallback
  },
  peer (state) {
    return state.peer
  }
}

const mutations = {
  addRecentURL (state, url) {
    state.recentURLSources = [
      ...state.recentURLSources.filter(s => s.url !== url),
      { time: new Date().getTime(), url }
    ].sort((a, b) => b.time - a.time).slice(0, 5) // get last 5 urls
    localStorage.setItem('recentURLSources', JSON.stringify({ version: '1.0.0', sources: state.recentURLSources }))
  },
  deleteRecentSource (state, source) {
    Vue.set(state, 'recentURLSources', state.recentURLSources.filter(s => s !== source))
    localStorage.setItem('recentURLSources', JSON.stringify({ version: '1.0.0', sources: state.recentURLSources }))
  },
  loadRecentURLSources (state, sources) {
    state.recentURLSources = sources
  },
  setRecentSessions (state, sessions) {
    Vue.set(state, 'recentSessions', sessions)
  },
  setSessionName (state, name) {
    Vue.set(state, 'sessionName', name)
  },
  resetSession (state) {
    Vue.set(state, 'sessionUUID', uuid())
    Vue.set(state, 'sessionName', '')
    Vue.set(state, 'sessionLastSaved', null)
  },
  setSaveTime (state, time) {
    Vue.set(state, 'sessionLastSaved', time)
  },
  setDebug (state, v) {
    Vue.set(state, 'debug', !!v)
  },
  setTokenCallback (state, f) {
    Vue.set(state, 'tokenCallback', f)
  },
  clearTokenCallback (state) {
    Vue.set(state, 'tokenCallback', null)
  },
  setPeer (state, peer) {
    Vue.set(state, 'peer', peer)
  }
}

const actions = {
  initDataSources ({ commit, getters, dispatch }) {
    try {
      const validatorRecentURLSources = ajv.compile(require('@/store/schemas/recentURLSources.schema.json'))
      let recentURLSources = JSON.parse(localStorage.getItem('recentURLSources'))
      if (validatorRecentURLSources(recentURLSources)) {
        commit('loadRecentURLSources', recentURLSources.sources)
      }
    } catch (e) {
      console.error('Failed to read recentURLSources from localStorage', e)
    }
    setInterval(() => dispatch('saveSession'), 30 * 1000)
    dispatch('loadRecentSessions')
    window.addEventListener('storage', e => {
      if (e.key !== 'recentSessions' && e.newValue) return
      dispatch('loadRecentSessions')
    })
    getters.dataSources.forEach(ds => {
      dispatch(ds + '/init')
    })
  },
  query ({ dispatch, getters }, query) {
    // array of promises and raw objects (Promise.all will handle them)
    let promises = getters.dataSources.map(ds => {
      return dispatch(ds + '/query', query)
    })
    return Promise.all(promises).then(results => {
      results = results.filter(r => r) // filter null and undefined
      // Only one promise should return not null value. In some weird situations, when data is doubled from
      // different sources, then results length will be bigger.
      if (results.length === 0) return null
      if (results.length >= 1) return results[0]
    })
  },
  getAttributes ({ dispatch, getters }, query) {
    // array of promises and raw objects (Promise.all will handle them)
    let promises = getters.dataSources.map(ds => {
      return dispatch(ds + '/getAttributes', query)
    })
    return Promise.all(promises).then(results => results.find(r => r))
  },
  async loadURL ({ dispatch, commit }, url) {
    let notificationId = await dispatch('createNotification', { type: 'loading', text: 'Downloading data file' })
    try {
      let response = await Vue.http.get(url)
      await dispatch('loadData', { data: response.body, src: url })
      commit('addRecentURL', url)
    } catch (e) {
      dispatch('createNotification', { type: 'error', text: 'Download failed' })
    } finally {
      commit('delNotification', notificationId)
    }
  },
  async loadData ({ dispatch, getters, commit }, data) {
    let notificationId = await dispatch('createNotification', { type: 'loading', text: 'Importing data' })
    for (let ds of getters.dataSources) {
      if (await dispatch(ds + '/loadData', data)) {
        commit('delNotification', notificationId)
        return
      }
    }
    commit('delNotification', notificationId)
    dispatch('createNotification', { type: 'error', text: 'Failed to import data' })
    console.error('Failed to load data')
  },
  exportSession ({ getters, dispatch }) {
    let sources = getters.dataSources.map(ds => getters[ds + '/sources'])
      .flat()
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(source => {
        return {
          address: source.address,
          translations: getters.translations[source.uuid] || {},
          uuid: source.uuid
        }
      })
    if (sources.find(s => s.address.startsWith('UPLOAD'))) {
      dispatch('createNotification', { type: 'warning', text: 'There are manualy uploaded data sources. They will not be available in shared session.' })
    }
    let slots = getters.allSlots
    let colors = getters.manualColors
    let annotations = getters.annotations
    let options = getters.allOptions
    return {
      sources,
      slots,
      colors,
      annotations,
      options,
      version: '1.1.0',
      name: getters.sessionName,
      uuid: getters.sessionUUID,
      time: new Date().getTime()
    }
  },
  async importSession ({ getters, commit, dispatch }, session) {
    if (validatorSession_1_0_0(session)) {
      session.slots = session.slots.map(s => ({ ...s, scope: config.scopes[0] }))
    } else if (validatorSession_1_1_0(session)) {
    } else {
      throw new Error('Invalid session file')
    }
    commit('resetSession')
    getters.dataSources.forEach(ds => commit(ds + '/clearSources'))
    commit('clearTranslations')
    commit('clearOptions')
    commit('setSessionName', session.name || '')
    session.options.forEach(o => commit('setOption', o))
    commit('loadManualColors', session.colors)
    commit('loadAnnotations', session.annotations || [])
    for (let source of session.sources) {
      if (!source.address) continue
      if (source.translations) commit('addTranslations', { uuid: source.uuid, params: source.translations })
      await Vue.http.get(source.address)
        .then(response => dispatch('loadData', { data: response.body, src: source.address, uuid: source.uuid }))
        .catch(e => console.error('Failed to load source ' + source.uuid + ' from ' + source.address, e))
    }
    commit('clearSlots')
    session.slots.forEach(slot => commit('addSlot', slot))
  },
  async loadRecentSessions ({ commit }) {
    try {
      let recentSessions = JSON.parse(localStorage.getItem('recentSessions'))
      if (Array.isArray(recentSessions)) {
        commit('setRecentSessions', recentSessions)
        return recentSessions
      }
    } catch (e) {
      console.error('Failed to read recentSessions from localStorage', e)
    }
    return []
  },
  async saveSession ({ dispatch, getters, commit }) {
    try {
      if (!getters.sessionName) return
      let recentSessions = await dispatch('loadRecentSessions')
      let exported = await dispatch('exportSession')
      let newValue = [...recentSessions.filter(s => s.uuid !== exported.uuid), exported].slice(-10)
      localStorage.setItem('recentSessions', JSON.stringify(newValue))
      commit('setRecentSessions', newValue)
      commit('setSaveTime', exported.time)
    } catch (e) {
      console.error('Failed to save session', e)
    }
  },
  async deleteSession ({ dispatch, commit }, uuid) {
    try {
      let recentSessions = await dispatch('loadRecentSessions')
      let newValue = recentSessions.filter(s => s.uuid !== uuid)
      localStorage.setItem('recentSessions', JSON.stringify(newValue))
      commit('setRecentSessions', newValue)
    } catch (e) {
      console.error('Failed to delete session from localStorage', e)
    }
  },
  async authorize ({ commit }) {
    let token = localStorage.getItem('githubToken')
    if (!token) {
      return new Promise((resolve, reject) => {
        commit('setTokenCallback', resolve)
        window.open('https://github.com/login/oauth/authorize?client_id=' + config.githubClientId + '&state=' + uuid() + '&scope=gist')
      })
    } else {
      return token
    }
  },
  async shareSession ({ dispatch, commit, getters }) {
    let exported = await dispatch('exportSession')
    let token = await dispatch('authorize')
    let json = JSON.stringify(exported)
    return Vue.http.post('https://api.github.com/gists', {
      public: false,
      description: exported.name || 'Arena session',
      files: { 'session.json': { content: json } }
    }, { headers: { 'Authorization': 'token ' + token } }).then(response => {
      return (((response.body || {}).files || {})['session.json'] || {}).raw_url
    })
  },
  loadGithubToken ({ getters, commit }, token) {
    if (localStorage.getItem('githubToken') !== token) localStorage.setItem('githubToken', token)
    if (getters.tokenCallback) getters.tokenCallback(token)
    commit('clearTokenCallback')
  },
  async loadSessionURL ({ dispatch, commit }, url) {
    let notificationId = await dispatch('createNotification', { type: 'loading', text: 'Loading session' })
    try {
      let response = await Vue.http.get(url)
      await dispatch('importSession', response.body)
    } catch (e) {
      console.error(e)
      dispatch('createNotification', { type: 'error', text: 'Loading session failed' })
    } finally {
      commit('delNotification', notificationId)
    }
  },
  initPeer ({ commit, getters }) {
    let peer = new Peer()
    return new Promise((resolve, reject) => {
      peer.on('open', () => {
        commit('setPeer', peer)
        resolve()
      })
      peer.on('error', e => {
        commit('setPeer', null)
        reject(e)
      })
      peer.on('close', () => {
        commit('setPeer', null)
      })
    })
  },
  async initPeerServer ({ commit, getters, dispatch }) {
    if (!getters.peer) await dispatch('initPeer')
    getters.peer.on('connection', (conn) => {
      conn.on('data', async (data) => {
        try {
          let parsed = data
          if (!parsed.id || !parsed.type) return
          let response = { ok: true, id: parsed.id }
          if (parsed.type === 'getParams') {
            response.response = getters.availableParams
          } else if (parsed.type === 'getPlot' && parsed.params && parsed.plotType) {
            console.log('query request')
            console.log(parsed)
            response.response = await dispatch('query', { params: parsed.params, plotType: parsed.plotType })
            console.log(response)
          } else if (parsed.type === 'getAvailableSlots' && parsed.params && parsed.scope) {
            response.response = getters.getAvailableSlots(parsed.params, parsed.scope)
          } else {
            response.ok = false
          }
          conn.send(response)
        } catch (e) {
          console.error(e)
        }
      })
      conn.on('open', () => {
        dispatch('exportSession').then(s => conn.send(s)).catch(console.error)
      })
    })
  },
  async initPeerClient ({ commit, getters, dispatch }, peerId) {
    if (!getters.peer) await dispatch('initPeer')
    dispatch('loadData', { data: { type: 'peer', peerId } })
  },
  globalParamsUpdated ({ dispatch }) {
    dispatch('peerDatasource/globalParamsUpdated')
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  modules: {
    jsonDatasource,
    arenarLiveDatasource,
    peerDatasource
  },
  namespaced: false
}
