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
import FunnelMeasure from '@/plots/FunnelMeasure.vue'
import Fairness from '@/plots/Fairness.vue'
import SubsetsPerformance from '@/plots/SubsetsPerformance.vue'
import Message from '@/plots/Message.vue'
import DistributionCounts from '@/plots/DistributionCounts.vue'
import DistributionHistogram from '@/plots/DistributionHistogram.vue'
import VariableAgainstAnother from '@/plots/VariableAgainstAnother.vue'
import LinearShapleyDependence from '@/plots/LinearShapleyDependence.vue'
import CategoricalShapleyDependence from '@/plots/CategoricalShapleyDependence.vue'
import ShapleyValuesVariableImportance from '@/plots/ShapleyValuesVariableImportance.vue'
import RegressionFairness from '@/plots/RegressionFairness.vue'

export default {
  plotComponents: {
    Breakdown, FeatureImportance, CategoricalDependence, LinearDependence, NumericalCeterisParibus, CategoricalCeterisParibus, SHAPValues, HtmlWidget, ROC, REC, Metrics, FunnelMeasure, Fairness, SubsetsPerformance, Message, DistributionCounts, DistributionHistogram, VariableAgainstAnother, RegressionFairness, LinearShapleyDependence, CategoricalShapleyDependence, ShapleyValuesVariableImportance
  },
  canMerge (slot1, slot2) {
    if (!slot1 || !slot2 || slot1 === slot2 || slot1.plotType !== slot2.plotType) return false
    let type = slot1.plotType
    let testSameParamName = paramType => (new Set([...slot1.localParams, ...slot2.localParams].map(params => params[paramType])).size === 1)
    let sameVariable = testSameParamName('variable')
    let sameObservation = testSameParamName('observation')
    if (type === 'PartialDependence' || type === 'AccumulatedDependence' || type === 'CeterisParibus' || type === 'Fairness' || type === 'ShapleyValuesDependence') return sameVariable
    if (type === 'FeatureImportance' || type === 'ShapleyValuesVariableImportance') return true
    if (type === 'SHAPValues') return sameObservation
    if (type === 'ROC') return true
    if (type === 'REC') return true
    if (type === 'Metrics') return true
    if (type === 'FunnelMeasure') return true
    if (type === 'SubsetsPerformance') return true
    if (type === 'VariableDistribution') return sameVariable
    return false
  },
  lockableParams: { // for each plotType
    Breakdown: ['observation'],
    FeatureImportance: [],
    PartialDependence: ['variable'],
    AccumulatedDependence: ['variable'],
    ShapleyValuesDependence: ['variable'],
    CeterisParibus: ['variable', 'observation'],
    SHAPValues: ['observation'],
    Fairness: ['variable'],
    VariableDistribution: ['variable'],
    VariableAgainstAnother: ['variable'],
    ShapleyValuesVariableImportance: []
  },
  getPlotDoc (plotType) {
    const docs = {
      'CeterisParibus': 'https://arena.drwhy.ai/docs/guide/observation-level#ceteris-paribus',
      'Breakdown': 'https://arena.drwhy.ai/docs/guide/observation-level#break-down',
      'SHAPValues': 'https://arena.drwhy.ai/docs/guide/observation-level#shapley-values',
      'FeatureImportance': 'https://arena.drwhy.ai/docs/guide/dataset-level#variable-importance',
      'PartialDependence': 'https://arena.drwhy.ai/docs/guide/dataset-level#partial-dependence',
      'AccumulatedDependence': 'https://arena.drwhy.ai/docs/guide/dataset-level#accumulated-dependence',
      'Fairness': 'https://arena.drwhy.ai/docs/guide/fairness#fairness-check',
      'Metrics': 'https://arena.drwhy.ai/docs/guide/model-performance#metrics',
      'ROC': 'https://arena.drwhy.ai/docs/guide/model-performance#receiver-operating-characteristic',
      'REC': 'https://arena.drwhy.ai/docs/guide/model-performance#receiver-error-characteristic',
      'SubsetsPerformance': 'https://arena.drwhy.ai/docs/guide/model-performance#subset-performance',
      'FunnelMeasure': 'https://arena.drwhy.ai/docs/guide/model-performance#funnel-plot',
      'VariableDistribution': 'https://arena.drwhy.ai/docs/guide/eda-charts#variable-distribution',
      'VariableAgainstAnother': 'https://arena.drwhy.ai/docs/guide/eda-charts#variable-against-another'
    }
    return docs[plotType] || ''
  },
  optionsCategories: {
    Breakdown: ['Break Down', ['Margins', 'left_margin']],
    FeatureImportance: ['Variable Importance', ['Margins', 'left_margin']],
    CategoricalDependence: [['Margins', 'left_margin_values']],
    LinearDependence: [],
    NumericalCeterisParibus: [],
    CategoricalCeterisParibus: [['Margins', 'left_margin_values']],
    SHAPValues: ['Shapley Values', ['Margins', 'left_margin']],
    HtmlWidget: [],
    ROC: [],
    REC: [],
    Metrics: [],
    FunnelMeasure: ['Funnel Plot'],
    Fairness: [],
    SubsetsPerformance: ['Subset Performance'],
    Message: [],
    DistributionCounts: [['Margins', 'left_margin_values']],
    DistributionHistogram: [],
    VariableAgainstAnother: [],
    LinearShapleyDependence: ['Shapley Dependence'],
    CategoricalShapleyDependence: [['Margins', 'left_margin_values']],
    ShapleyValuesVariableImportance: ['Variable Importance', ['Margins', 'left_margin']]
  }
}
