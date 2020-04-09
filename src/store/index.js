import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid/v4'
import jsonDatasource from '@/store/datasources/jsonDatasource.js'
import arenarLiveDatasource from '@/store/datasources/arenarLiveDatasource.js'
import format from '@/utils/format.js'
import OptionsSchemas from '@/components/OptionsSchemas.js'
import Ajv from 'ajv'

Vue.use(Vuex)
const ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))

const state = {
  datasources: ['jsonDatasource', 'arenarLiveDatasource'],
  globalParams: {
    model: null,
    variable: null,
    observation: null
  },
  slots: [],
  pageNumber: 0,
  preview: null,
  nameConflicts: [],
  options: {},
  manualColors: {},
  closedElements: [],
  recentURLSources: []
}

const getters = {
  getOption: (srare, getters) => (name) => {
    if (state.options[name] !== undefined) return state.options[name]
    return (OptionsSchemas.find(s => s.name === name) || {}).default
  },
  getGlobalParam: (state, getters) => (name) => {
    if (state.globalParams[name]) return state.globalParams[name]
    if (getters.availableParams[name] && getters.availableParams[name].length > 0) return getters.availableParams[name][0]
    return null
  },
  globalParams (state, getters) {
    return Object.keys(state.globalParams).reduce((acu, n) => {
      acu[n] = getters.getGlobalParam(n)
      return acu
    }, {})
  },
  availableParams (state, getters) {
    let params = { model: {}, variable: {}, observation: {} }
    Object.keys(params).forEach(key => {
      state.datasources.forEach(ds => {
        getters[ds + '/' + key + 's'].forEach(a => {
          params[key][a.uuid] = a // make sure we have only one param for one uuid
        })
      })
      params[key] = Object.values(params[key]) // make array from object
    })
    return params
  },
  pageNumber (state) {
    return state.pageNumber
  },
  nextNameConflicts (state) {
    return state.nameConflicts.length > 0 ? state.nameConflicts[0] : null
  },
  getAvailableSlots: (state, getters) => (params) => {
    let fullParams = Object.assign({}, getters.globalParams, params)
    let slots = []
    state.datasources.forEach(ds => { slots = slots.concat(getters[ds + '/getAvailableSlots'](fullParams)) })
    slots = slots.map(s => {
      return {
        ...s,
        uuid: uuid(),
        archived: false,
        positionX: 0,
        positionY: 0,
        width: 512,
        height: 384,
        pageNumber: state.pageNumber
      }
    })
    return slots
  },
  visibleSlots (state) {
    return state.slots.filter(s => !s.archived && s.pageNumber === state.pageNumber)
  },
  archivedSlots (state) {
    return state.slots.filter(s => s.archived)
  },
  allSlots (state) {
    return state.slots
  },
  getSlotFullParams: (state, getters) => (localParams) => {
    return localParams.map(p => Object.assign({}, getters.globalParams, p))
  },
  modelsColors (state, getters) {
    let colors = palette.slice(0)
    let defaultColors = getters.availableParams.model.reduce((acc, m) => {
      acc[m.uuid] = colors.shift() || color.h
      return acc
    }, {})
    return Object.assign({}, defaultColors, state.manualColors)
  },
  palette (state, getters) {
    return palette
  },
  preview (state) {
    return state.preview
  },
  isElementClosed: (state, getters) => (name) => {
    return !!state.closedElements.find(f => f === name)
  },
  recentURLSources (state) {
    return state.recentURLSources
  }
}

const mutations = {
  setOption (state, { name, value }) {
    Vue.set(state.options, name, value)
  },
  setGlobalParam (state, { name, value }) {
    Vue.set(state.globalParams, name, value)
  },
  addNameConflictsToResolve (state, toResolve) {
    state.nameConflicts = [...state.nameConflicts, toResolve]
  },
  removeNameConflicts (state) {
    state.nameConflicts = state.nameConflicts.slice(1)
  },
  setPageNumber (state, n) {
    state.pageNumber = n
  },
  /*
   * Slots
  */
  addSlot (state, slot) {
    if (!slot.uuid) Vue.set(slot, 'uuid', uuid())
    if (slot.archived === undefined) Vue.set(slot, 'archived', false)
    if (slot.positionX === undefined) Vue.set(slot, 'positionX', 0)
    if (slot.positionY === undefined) Vue.set(slot, 'positionY', 0)
    if (slot.width === undefined) Vue.set(slot, 'width', 512)
    if (slot.height === undefined) Vue.set(slot, 'height', 384)
    if (slot.pageNumber === undefined) Vue.set(slot, 'pageNumber', state.pageNumber)
    state.slots = [...state.slots, slot]
  },
  unarchiveSlot (state, slot) {
    Vue.set(slot, 'archived', false)
    Vue.set(slot, 'pageNumber', state.pageNumber)
  },
  archiveSlot (state, slot) {
    Vue.set(slot, 'archived', true)
  },
  deleteSlot (state, slot) {
    state.slots = state.slots.filter(s => s.uuid !== slot.uuid)
  },
  splitSlot (state, slot) {
    let n = -32
    let newSlots = slot.localParams.map(props => {
      n += 32
      return {
        name: slot.name,
        plotType: slot.plotType,
        plotCategory: slot.plotCategory,
        localParams: [props],
        uuid: uuid(),
        archived: false,
        positionX: slot.positionX + n,
        positionY: slot.positionY + n,
        width: slot.width,
        height: slot.height,
        pageNumber: slot.pageNumber
      }
    })
    state.slots = [...state.slots.filter(s => s.uuid !== slot.uuid), ...newSlots]
  },
  setSlotName (state, { slot, name }) {
    if (!name || name.length === 0) return
    Vue.set(slot, 'name', name)
  },
  setSlotPosition (state, { slot, x, y }) {
    Vue.set(slot, 'positionX', x)
    Vue.set(slot, 'positionY', y)
  },
  setSlotSize (state, { slot, width, height }) {
    Vue.set(slot, 'width', width)
    Vue.set(slot, 'height', height)
  },
  mergeSlots (state, { slot1, slot2 }) {
    if (slot1.uuid === slot2.uuid) return
    slot1.localParams = [...slot1.localParams, ...slot2.localParams]
    state.slots = state.slots.filter(s => s.uuid !== slot2.uuid)
  },
  setParam (state, { slot, paramName, paramValue }) {
    slot.localParams = slot.localParams.map(params => {
      return Object.assign({}, params, { [paramName]: paramValue })
    })
  },
  unsetParam (state, { slot, paramName }) {
    slot.localParams = slot.localParams.map(params => {
      let copy = { ...params }
      delete copy[paramName]
      return copy
    })
  },
  replaceSlots (state, { slot1, slot2 }) {
    if (slot1.uuid === slot2.uuid) return
    ['name', 'plotType', 'localParams'].forEach(v => {
      Vue.set(slot1, v, slot2[v])
    })
    state.slots = state.slots.filter(s => s.uuid !== slot2.uuid)
  },
  setPreview (state, slot) {
    state.preview = slot
  },
  setColor (state, { uuid, color }) {
    Vue.set(state.manualColors, uuid, color)
  },
  closeElement (state, name) {
    state.closedElements = [...state.closedElements.filter(e => e !== name), name]
    localStorage.setItem('closedElements', JSON.stringify(state.closedElements))
  },
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
  init ({ commit, state, dispatch }) {
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
    try {
      const validatorRecentURLSources = ajv.compile(require('@/utils/recentURLSources.schema.json'))
      let recentURLSources = JSON.parse(localStorage.getItem('recentURLSources'))
      if (validatorRecentURLSources(recentURLSources)) {
        commit('loadRecentURLSources', recentURLSources.sources)
      }
    } catch (e) {
      console.error('Failed to read recentURLSources from localStorage', e)
    }
  },
  query ({ state, dispatch }, query) {
    // array of promises and raw objects (Promise.all will handle them)
    let promises = state.datasources.map(ds => {
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
  async loadURL ({ state, dispatch, commit }, url) {
    let response = await Vue.http.get(url)
    await dispatch('loadData', { data: response.body, src: url })
    commit('addRecentURL', url)
  },
  async loadData ({ state, dispatch }, data) {
    for (let ds of state.datasources) {
      if (await dispatch(ds + '/loadData', data)) return
    }
    console.error('Failed to load data')
  },
  setGlobalParamByName ({ commit, getters }, { paramName, valueName }) {
    let param = (getters.availableParams[paramName] || []).find(p => p.name === valueName)
    if (param) commit('setGlobalParam', { name: paramName, value: param })
  },
  /*
   * Method called from datasources to check if there are name collisions
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
  arrangeSlots ({ commit, getters }) {
    let slots = getters.visibleSlots
    let width = Math.floor(document.getElementById('playground').offsetWidth / 32)
    let height = Math.floor(document.getElementById('playground').offsetHeight / 32)
    let ratio = height / width
    let c = 1 // number of columns
    let r = 1 // number of rows
    while (c * r < slots.length) (r / c) > ratio ? c += 1 : r += 1
    let slotWidth = Math.floor((width - 1) / c) - 1 // -1 for margins
    let slotHeight = Math.floor((height - 1) / r) - 1
    if (slotWidth <= 5 || slotHeight <= 5) return
    slots.forEach((slot, i) => {
      let columnNumber = Math.floor(i / r)
      let rowNumber = i - (columnNumber * r)
      let leftMargin = 1 + (columnNumber * (slotWidth + 1))
      let topMargin = 1 + (rowNumber * (slotHeight + 1))
      commit('setSlotPosition', { slot, x: 32 * leftMargin, y: 32 * topMargin })
      commit('setSlotSize', { slot, width: slotWidth * 32, height: slotHeight * 32 })
    })
  }
}

export default new Vuex.Store({
  modules: { jsonDatasource, arenarLiveDatasource },
  strict: false,
  state,
  getters,
  mutations,
  actions
})

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
