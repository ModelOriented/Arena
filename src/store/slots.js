import uuid from 'uuid/v4'
import Vue from 'vue'

const state = {
  slots: [],
  pageNumber: 0,
  slotsInitInformation: [], // contains information required to open new slot in drag mode
  preview: null
}

const getters = {
  pageNumber (state) {
    return state.pageNumber
  },
  preview (state) {
    return state.preview
  },
  getAvailableSlots: (state, getters) => (params, scope) => {
    // for auxilary params overwrite null with global params
    let fullParams = Object.assign({}, getters.globalParams, params)
    let slots = []
    getters.dataSources.forEach(ds => { slots = slots.concat(getters[ds + '/getAvailableSlots'](fullParams, scope)) })
    slots = slots.map(s => {
      return {
        ...s,
        uuid: uuid(),
        archived: false,
        positionX: 0,
        positionY: 0,
        width: 512,
        height: 384,
        scope,
        pageNumber: getters.pageNumber,
        customData: null
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
  lastPage (state) {
    return Math.max.call(null, ...state.slots.map(s => s.pageNumber))
  },
  getSlotInitInfo: (state) => (slot) => {
    return state.slotsInitInformation.find(x => x.uuid === slot.uuid)
  }
}

const mutations = {
  setPageNumber (state, n) {
    state.pageNumber = n
  },
  addSlot (state, slot) {
    if (!slot.uuid) Vue.set(slot, 'uuid', uuid())
    if (slot.archived === undefined) Vue.set(slot, 'archived', false)
    if (slot.positionX === undefined) Vue.set(slot, 'positionX', 0)
    if (slot.positionY === undefined) Vue.set(slot, 'positionY', 0)
    if (slot.width === undefined) Vue.set(slot, 'width', 512)
    if (slot.height === undefined) Vue.set(slot, 'height', 384)
    if (slot.pageNumber === undefined) Vue.set(slot, 'pageNumber', state.pageNumber)
    if (slot.customData === undefined) Vue.set(slot, 'customData', null)
    state.slots = [...state.slots, slot]
  },
  clearSlots (state) {
    Vue.set(state, 'slots', [])
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
  addSlotInitInfo (state, { slot, info }) {
    state.slotsInitInformation = [...state.slotsInitInformation, { uuid: slot.uuid, ...info }]
  },
  removeSlotInitInfo (state, slot) {
    state.slotsInitInformation = state.slotsInitInformation.filter(x => x.uuid !== slot.uuid)
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
        pageNumber: slot.pageNumber,
        scope: slot.scope,
        customData: slot.customData
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
    ['name', 'plotType', 'localParams', 'plotCategory', 'customData', 'scope'].forEach(v => {
      Vue.set(slot1, v, slot2[v])
    })
    state.slots = state.slots.filter(s => s.uuid !== slot2.uuid)
  },
  setPreview (state, slot) {
    state.preview = slot
  },
  setSlotCustomData (state, { slot, customData }) {
    Vue.set(slot, 'customData', customData)
  }
}

const actions = {
  /*
   * Method called to add slot or unarchive it
   * To make slot open in drag mode over button that was pressed to open it, set interaction and x, y params
   * @param interaction interaction object from interactjs event of pressing button etc
   * @param x left position of slot center
   * @param y top position of slot center
   * @example dispatch('addSlotToPlayground', { slot, interaction: event.interaction, x: event.pageX, y: event.pageY })
   */
  addSlotToPlayground ({ commit, getters }, { slot, interaction, x, y }) {
    if (!slot.uuid) Vue.set(slot, 'uuid', uuid())
    if (interaction) commit('addSlotInitInfo', { slot, info: { interaction, x: x || 0, y: y || 0 } })
    if (slot.archived) commit('unarchiveSlot', slot)
    else commit('addSlot', slot)
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
  },
  refreshSlots ({ commit, getters }) {
    let n = getters.pageNumber
    commit('setPageNumber', -1)
    Vue.nextTick(() => commit('setPageNumber', n))
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: false
}
