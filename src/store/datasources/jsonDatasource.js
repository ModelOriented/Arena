import uuidGenerator from 'uuid/v4'
import Ajv from 'ajv'
import streams from '@/utils/streams.js'
import format from '@/utils/format.js'
import config from '@/configuration/config.js'
import dataSourceCommon from '@/store/datasources/dataSourceCommon.js'

const ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
/* eslint-disable camelcase */
const validator_1_0_0 = ajv.compile(require('@/store/schemas/data.schema.json'))
const validator_1_1_0 = ajv.compile(require('@/store/schemas/data-1.1.0.schema.json'))
const validator_1_2_0 = ajv.compile(require('@/store/schemas/data-1.2.0.schema.json'))
/* eslint-enable camelcase */

const state = {}

const getters = {
  getAvailableSlots: (state, getters) => (fullParams, scope) => {
    return getters.sources.map(source => {
      let params = getters.translateBackParams(source, fullParams)
      if (params[scope] === null) return []

      return source.plotsData.filter(d => {
        // for each single plot data we check if params of a plot are same in fullParams
        return Object.keys(d.params).reduce((acc, paramType) => {
          return acc && d.params[paramType] === params[paramType]
        }, true) && Object.keys(d.params).includes(scope)
      }).map(d => {
        return {
          localParams: [{ [scope]: fullParams[scope] }],
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

const actions = {
  loadData ({ state, commit, dispatch, rootGetters }, { data, src, uuid }) {
    let params = null
    let attributes = streams.createObjectWithArrays(config.params)
    if (validator_1_0_0(data)) {
      params = config.params.reduce((acu, paramType) => {
        acu[paramType] = data[paramType + 's'] || []
        return acu
      }, {})
    } else if (validator_1_1_0(data)) {
      params = data.availableParams
    } else if (validator_1_2_0(data)) {
      params = data.availableParams
      attributes = data.paramsAttributes
    } else {
      return false
    }
    if (!config.params.reduce((acu, p) => acu && isUnique(params[p]), true)) return false
    let source = {
      availableParams: params,
      uuid: uuid || uuidGenerator(),
      attributes,
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
  },
  init () {},
  getAttributes ({ state, commit, getters }, { paramValue, paramType }) {
    for (let source of getters.sources) {
      if (!source.options.attributes) continue
      let index = getters.translatedAvailableParams[source.uuid][paramType].indexOf(paramValue)
      if (index !== -1) {
        /* eslint-disable-next-line arena/no-hardcode-param-types */
        if (paramType === 'variable') return null
        let attrObject = source.attributes[paramType].reduce((acu, a) => {
          acu[a.name] = a.values[index]
          return acu
        }, {})
        if (Object.keys(attrObject).length > 0) return getters.translateAttributes(source.uuid, paramType, attrObject)
      }
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
