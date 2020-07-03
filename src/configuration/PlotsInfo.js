import Breakdown from '@/plots/Breakdown.vue'
import FeatureImportance from '@/plots/FeatureImportance.vue'
import CategoricalDependence from '@/plots/CategoricalDependence.vue'
import LinearDependence from '@/plots/LinearDependence.vue'
import NumericalCeterisParibus from '@/plots/NumericalCeterisParibus.vue'
import CategoricalCeterisParibus from '@/plots/CategoricalCeterisParibus.vue'
import SHAPValues from '@/plots/SHAPValues.vue'
import HtmlWidget from '@/plots/HtmlWidget.vue'
import ROC from '@/plots/ROC.vue'
import REC from '@/plots/REC.vue'
import Metrics from '@/plots/Metrics.vue'

export default {
  plotComponents: {
    Breakdown, FeatureImportance, CategoricalDependence, LinearDependence, NumericalCeterisParibus, CategoricalCeterisParibus, SHAPValues, HtmlWidget, ROC, REC, Metrics
  },
  canMerge (slot1, slot2) {
    if (!slot1 || !slot2 || slot1 === slot2 || slot1.plotType !== slot2.plotType) return false
    let type = slot1.plotType
    let testSameParamName = paramType => (new Set([...slot1.localParams, ...slot2.localParams].map(params => params[paramType])).size === 1)
    let sameVariable = testSameParamName('variable')
    let sameObservation = testSameParamName('observation')
    if (type === 'PartialDependence' || type === 'AccumulatedDependence' || type === 'CeterisParibus') return sameVariable
    if (type === 'FeatureImportance') return true
    if (type === 'SHAPValues') return sameObservation
    if (type === 'ROC') return true
    if (type === 'REC') return true
    if (type === 'Metrics') return true
    return false
  },
  lockableParams: { // for each plotType
    Breakdown: ['observation'],
    FeatureImportance: [],
    PartialDependence: ['variable'],
    AccumulatedDependence: ['variable'],
    CeterisParibus: ['variable', 'observation'],
    SHAPValues: ['observation'],
    FairnessCheck: ['variable']
  },
  isLinear (plotComponent) {
    return ['LinearDependence', 'NumericalCeterisParibus', 'ROC', 'REC'].includes(plotComponent)
  },
  isBars (plotComponent) {
    return ['FeatureImportance', 'CategoricalDependence', 'CategoricalCeterisParibus', 'SHAPValues', 'Metrics'].includes(plotComponent)
  },
  getPlotDesc (plotType) {
    if (plotType === 'Breakdown') return 'Break Down shows contributions of every variable to a final prediction'
    if (plotType === 'ROC') return 'Receiver Operating Characterstic Curve is a plot of the Sensivity against the Specifity for the different thresholds. It is useful for measuring and comparing the accuracy of the classificators.'
    if (plotType === 'REC') return 'On the x axis of the plot there is an error tolerance and on the y axis there is a percentage of observations predicted within the given tolerance.'
    return ''
  }
}
