import jsonDatasource from '@/store/datasources/jsonDatasource.js'
import arenarLiveDatasource from '@/store/datasources/arenarLiveDatasource.js'
import Vue from 'vue'
import Ajv from 'ajv'

const ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))

const state = {
  dataSources: [
    'jsonDatasource',
    'arenarLiveDatasource'
  ],
  recentURLSources: []
}

const getters = {
  dataSources (state) {
    return state.dataSources
  },
  recentURLSources (state) {
    return state.recentURLSources
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
  loadRecentURLSources (state, sources) {
    state.recentURLSources = sources
  }
}

const actions = {
  initDataSources ({ commit, getters }) {
    try {
      const validatorRecentURLSources = ajv.compile(require('@/store/schemas/recentURLSources.schema.json'))
      let recentURLSources = JSON.parse(localStorage.getItem('recentURLSources'))
      if (validatorRecentURLSources(recentURLSources)) {
        commit('loadRecentURLSources', recentURLSources.sources)
      }
    } catch (e) {
      console.error('Failed to read recentURLSources from localStorage', e)
    }
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
  async loadURL ({ dispatch, commit }, url) {
    let response = await Vue.http.get(url)
    await dispatch('loadData', { data: response.body, src: url })
    commit('addRecentURL', url)
  },
  async loadData ({ dispatch, getters }, data) {
    for (let ds of getters.dataSources) {
      if (await dispatch(ds + '/loadData', data)) return
    }
    console.error('Failed to load data')
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  modules: {
    jsonDatasource,
    arenarLiveDatasource
  },
  namespaced: false
}
