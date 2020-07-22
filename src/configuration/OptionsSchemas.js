export default [
  {
    name: 'breakdown_max_variables',
    displayName: 'Maximum variables in Break Down',
    type: 'integer',
    default: 6,
    min: 1
  },
  {
    name: 'featureimportance_max_variables',
    displayName: 'Maximum variables in Feature Importance',
    type: 'integer',
    default: 7,
    min: 1
  },
  {
    name: 'featureimportance_boxplots',
    displayName: 'Display boxplots over Feature Importance',
    type: 'boolean',
    default: true
  },
  {
    name: 'shapvalues_max_variables',
    displayName: 'Maximum variables in SHAP Values',
    type: 'integer',
    default: 7,
    min: 1
  },
  {
    name: 'funnelmeasure_page_size',
    displayName: 'Maximum variables in one page of Funnel Plot',
    type: 'integer',
    default: 6,
    min: 1
  },
  {
    name: 'shapvalues_boxplots',
    displayName: 'Display boxplots over SHAP Values',
    type: 'boolean',
    default: false
  },
  {
    name: 'left_margin',
    displayName: 'Left margin for variable names',
    type: 'integer',
    default: 140,
    min: 80,
    max: 300
  },
  {
    name: 'left_margin_values',
    displayName: 'Left margin for variable values',
    type: 'integer',
    default: 90,
    min: 60,
    max: 300
  }
]
