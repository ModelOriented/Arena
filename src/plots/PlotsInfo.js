import Breakdown from '@/plots/Breakdown.vue'
import FeatureImportance from '@/plots/FeatureImportance.vue'
import CategoricalDependence from '@/plots/CategoricalDependence.vue'
import LinearDependence from '@/plots/LinearDependence.vue'
import NumericalCeterisParibus from '@/plots/NumericalCeterisParibus.vue'
import CategoricalCeterisParibus from '@/plots/CategoricalCeterisParibus.vue'
import SHAPValues from '@/plots/SHAPValues.vue'

export default {
  plotComponents: {
    Breakdown, FeatureImportance, CategoricalDependence, LinearDependence, NumericalCeterisParibus, CategoricalCeterisParibus, SHAPValues
  },
  canMerge (slot1, slot2) {
    if (!slot1 || !slot2 || slot1.uuid === slot2.uuid || slot1.plotType !== slot2.plotType) return false
    let type = slot1.plotType
    let getPropsUUID = (slot, propName) => slot.localParams.map(props => (props[propName] || {}).uuid)
    let sameVariable = new Set([...getPropsUUID(slot1, 'variable'), ...getPropsUUID(slot2, 'variable')]).size === 1
    let sameObservation = new Set([...getPropsUUID(slot1, 'observation'), ...getPropsUUID(slot2, 'observation')]).size === 1
    if (type === 'PartialDependence' || type === 'AccumulatedDependence' || type === 'CeterisParibus') return sameVariable
    if (type === 'FeatureImportance') return true
    if (type === 'SHAPValues') return sameObservation
    return false
  },
  lockableParams: { // for each plotType
    Breakdown: ['observation'],
    FeatureImportance: [],
    PartialDependence: ['variable'],
    AccumulatedDependence: ['variable'],
    CeterisParibus: ['variable', 'observation'],
    SHAPValues: ['observation']
  },
  isLinear (plotComponent) {
    return ['LinearDependence', 'NumericalCeterisParibus'].includes(plotComponent)
  },
  isBars (plotComponent) {
    return ['FeatureImportance', 'CategoricalDependence', 'CategoricalCeterisParibus', 'SHAPValues'].includes(plotComponent)
  },
  getPlotDesc (plotType) {
    if (plotType === 'Breakdown') return 'Break Down shows contributions of every variable to a final prediction'
    return ''
  }
}
