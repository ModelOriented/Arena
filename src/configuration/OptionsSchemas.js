export default [
  {
    name: 'breakdown_max_variables',
    displayName: 'Maximum variables in Break Down',
    category: 'Break Down',
    type: 'integer',
    default: 6,
    min: 1,
    max: 30
  },
  {
    name: 'featureimportance_max_variables',
    displayName: 'Maximum variables in Variable Importance',
    category: 'Variable Importance',
    type: 'integer',
    default: 7,
    min: 1,
    max: 30
  },
  {
    name: 'featureimportance_boxplots',
    displayName: 'Display boxplots over Variable Importance',
    category: 'Variable Importance',
    type: 'boolean',
    default: true
  },
  {
    name: 'shapvalues_max_variables',
    displayName: 'Maximum variables in Shapley Values',
    category: 'Shapley Values',
    type: 'integer',
    default: 7,
    min: 1,
    max: 30
  },
  {
    name: 'funnelmeasure_page_size',
    displayName: 'Maximum variables in one page of Funnel Plot',
    category: 'Funnel Plot',
    type: 'integer',
    default: 6,
    min: 1,
    max: 15
  },
  {
    name: 'subsetsperformance_page_size',
    displayName: 'Maximum variables in one page of Subset Performance',
    category: 'Subset Performance',
    type: 'integer',
    default: 6,
    min: 1,
    max: 15
  },
  {
    name: 'shapvalues_boxplots',
    displayName: 'Display boxplots over Shapley Values',
    category: 'Shapley Values',
    type: 'boolean',
    default: false
  },
  {
    name: 'left_margin',
    displayName: 'Left margin for variables names with values',
    category: 'Margins',
    type: 'integer',
    default: 140,
    min: 80,
    max: 300
  },
  {
    name: 'left_margin_values',
    displayName: 'Left margin for variables values',
    category: 'Margins',
    type: 'integer',
    default: 90,
    min: 60,
    max: 300
  },
  {
    name: 'shapley_dependence_jitter',
    displayName: 'Shapley dependence jitter range as per mill of chart range',
    category: 'Shapley Dependence',
    type: 'integer',
    default: 4,
    min: 0,
    max: 100
  },
  {
    name: 'shapley_dependence_error_bar',
    displayName: 'Display error bars over Shapley dependence points',
    category: 'Shapley Dependence',
    type: 'boolean',
    default: true
  }
]
