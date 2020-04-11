import uuid from 'uuid/v4'
import Ajv from 'ajv'
import format from '@/utils/format.js'

const ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
const validator = ajv.compile(require('@/store/schemas/data.schema.json'))

const state = {
  models: [],
  variables: [],
  observations: [],
  plotsData: []
}

const getters = {
  models (state) {
    return state.models
  },
  observations (state) {
    return state.observations
  },
  variables (state) {
    return state.variables
  },
  getAvailableSlots: (state, getters) => (fullParams) => {
    let params = {}
    params.model = state.models.find(m => (fullParams.model || {}).uuid === m.uuid)
    params.observation = state.observations.find(o => (fullParams.observation || {}).uuid === o.uuid)
    params.variable = state.variables.find(v => (fullParams.variable || {}).uuid === v.uuid)
    if (!params.model || !params.observation || !params.variable) return []

    return state.plotsData.filter(d => {
      return Object.keys(d.params).reduce((acc, x) => acc && d.params[x].uuid === params[x].uuid, true)
    }).map(d => {
      return {
        localParams: [{ model: d.params.model }],
        name: d.name,
        plotType: d.plotType,
        plotCategory: d.plotCategory
      }
    })
  }
}

const mutations = {
  addModels (state, x) {
    state.models = [...state.models, ...x]
  },
  addObservations (state, x) {
    state.observations = [...state.observations, ...x]
  },
  addVariables (state, x) {
    state.variables = [...state.variables, ...x]
  },
  addPlotsData (state, x) {
    state.plotsData = [...state.plotsData, ...x]
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
        // We add only params, that was not merged to already existing ones
        commit('addModels', params.model.filter(p => !updated.includes(p.uuid)))
        commit('addVariables', params.variable.filter(p => !updated.includes(p.uuid)))
        commit('addObservations', params.observation.filter(p => !updated.includes(p.uuid)))

        let plotsData = []
        data.data.forEach(d => {
          let obj = {
            plotType: d.plotType,
            plotCategory: d.plotCategory ? d.plotCategory : 'Other',
            plotComponent: d.plotComponent,
            name: d.name ? d.name : format.firstCharUpper(d.plotType),
            plotData: d.data,
            params: {}
          }
          // Firstly we search by name in not updated params
          let model = params.model.find(a => a.name === d.params.model)
          let observation = params.observation.find(a => a.name === d.params.observation)
          let variable = params.variable.find(a => a.name === d.params.variable)
          // Next we find merged version if exists
          let modelUpdated = updates[((model || {}).uuid || '')]
          let variableUpdated = updates[((variable || {}).uuid || '')]
          let observationUpdated = updates[((observation || {}).uuid || '')]
          // Set param with priority to updated version
          if (model) obj.params.model = modelUpdated || model
          if (observation) obj.params.observation = observationUpdated || observation
          if (variable) obj.params.variable = variableUpdated || variable

          if (Object.values(obj).includes(undefined)) return
          plotsData.push(obj)
        })
        commit('addPlotsData', plotsData)
        resolve(true)
      }).catch(reject)
    })
  },
  query ({ state }, { params, plotType }) {
    let plotData = state.plotsData.find(d => {
      return d.plotType === plotType &&
        Object.keys(d.params).reduce((acc, x) => acc && d.params[x].uuid === params[x].uuid, true)
    })
    return plotData
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
