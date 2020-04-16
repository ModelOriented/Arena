import uuidGenerator from 'uuid/v4'
import Ajv from 'ajv'
import format from '@/utils/format.js'
import config from '@/configuration/config.js'
import dataSourceCommon from '@/store/datasources/dataSourceCommon.js'

const ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
const validator = ajv.compile(require('@/store/schemas/data.schema.json'))

const state = {}

const getters = {
  getAvailableSlots: (state, getters) => (fullParams) => {
    return getters.sources.map(source => {
      let params = getters.translateBackParams(source, fullParams)
      if (params[config.mainParam] === null) return []

      return source.plotsData.filter(d => {
        // for each single plot data we check if params of a plot are same in fullParams
        return Object.keys(d.params).reduce((acc, paramType) => {
          return acc && d.params[paramType] === params[paramType]
        }, true)
      }).map(d => {
        return {
          localParams: [{ [config.mainParam]: fullParams[config.mainParam] }],
          name: d.name,
          plotType: d.plotType,
          plotCategory: d.plotCategory
        }
      })
    }).flat()
  }
}

const mutations = {}

// Checks if names array have unique elements, after removing special characters and in lower case
const isUnique = (array) => {
  return (new Set(array.map(format.simplify))).size === array.length
}
const validateData = (data) => {
  return validator(data) && config.params.map(paramType => isUnique(data[paramType + 's'])).reduce((acu, x) => acu && x, true)
}

const actions = {
  loadData ({ state, commit, dispatch }, { data, src, uuid }) {
    if (!validateData(data)) return false
    let params = config.params.reduce((acu, paramType) => {
      acu[paramType] = data[paramType + 's']
      return acu
    }, {})
    let source = {
      availableParams: params,
      uuid: uuid || uuidGenerator(),
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
        params: d.params
      }

      if (Object.values(obj).includes(undefined)) return
      source.plotsData.push(obj)
    })

    let waitingParams = {
      uuid: source.uuid,
      params: source.availableParams
    }
    commit('addWaitingParams', waitingParams, { root: true })
    commit('addSource', source)
    return true
  },
  query ({ state, getters }, { params, plotType }) {
    for (let source of getters.sources) {
      // translate params back to original names
      let queryParams = getters.translateBackParams(source, params)
      let plotData = source.plotsData.find(d => {
        return d.plotType === plotType &&
          Object.keys(d.params).reduce((acc, paramType) => acc && d.params[paramType] === queryParams[paramType], true)
      })
      if (plotData) return { params: getters.translateParams(source, plotData.params), ...plotData }
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
