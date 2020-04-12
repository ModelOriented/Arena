import uuid from 'uuid/v4'
import Ajv from 'ajv'
import format from '@/utils/format.js'

const ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
const validator = ajv.compile(require('@/store/schemas/data.schema.json'))

const state = {
  files: []
}

const getters = {
  models (state) {
    return state.files.map(f => f.models).flat()
  },
  observations (state) {
    return state.files.map(f => f.observations).flat()
  },
  variables (state) {
    return state.files.map(f => f.variables).flat()
  },
  getAvailableSlots: (state, getters) => (fullParams) => {
    for (let file of state.files) {
      let params = {}
      params.model = file.models.find(m => (fullParams.model || {}).uuid === m.uuid)
      params.observation = file.observations.find(o => (fullParams.observation || {}).uuid === o.uuid)
      params.variable = file.variables.find(v => (fullParams.variable || {}).uuid === v.uuid)
      if (!params.model || !params.observation || !params.variable) return []

      return file.plotsData.filter(d => {
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
}

const mutations = {
  addFile (state, file) {
    state.files = [...state.files, file]
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

        let file = {
          models: params.model.map(p => updated.includes(p.uuid) ? Object.assign({}, updates[p.uuid], { orginalName: p.name }) : p),
          variables: params.variable.map(p => updated.includes(p.uuid) ? Object.assign({}, updates[p.uuid], { orginalName: p.name }) : p),
          observations: params.observation.map(p => updated.includes(p.uuid) ? Object.assign({}, updates[p.uuid], { orginalName: p.name }) : p),
          uuid: uuid(),
          address: src,
          plotsData: []
        }

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
          file.plotsData.push(obj)
        })

        commit('addFile', file)
        resolve(true)
      }).catch(reject)
    })
  },
  query ({ state }, { params, plotType }) {
    for (let file of state.files) {
      let plotData = file.plotsData.find(d => {
        return d.plotType === plotType &&
          Object.keys(d.params).reduce((acc, x) => acc && d.params[x].uuid === params[x].uuid, true)
      })
      if (plotData) return plotData
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
