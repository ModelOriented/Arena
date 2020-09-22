const docs = [
  { label: 'Installation', id: 'installation', category: 'Getting Started' },
  { label: 'Connectors', id: 'connectors', category: 'Getting Started' },
  { label: 'Data sources', id: 'data-sources', category: 'Getting Started' },
  { label: 'Params', id: 'params', category: 'Getting Started' },
  { label: 'Modifying Observations', id: 'modifying-observations', category: 'Usage' },
  { label: 'Multiple data sources', id: 'multiple-data-sources', category: 'Usage' },
  { label: 'Break Down', id: 'break-down', category: 'Observation Level Charts' },
  { label: 'Ceteris Paribus', id: 'ceteris-paribus', category: 'Observation Level Charts' },
  { label: 'Shapley Values', id: 'shapley-values', category: 'Observation Level Charts' },
  { label: 'Variable Importance', id: 'variable-importance', category: 'Dataset Level Charts' },
  { label: 'Partial Dependence', id: 'partial-dependence', category: 'Dataset Level Charts' },
  { label: 'Accumulated Dependence', id: 'accumulated-dependence', category: 'Dataset Level Charts' },
  { label: 'Fairness', id: 'fairness', category: 'Dataset Level Charts' },
  { label: 'Metrics', id: 'metrics', category: 'Dataset Level Charts' },
  { label: 'Variable Distribution', id: 'variable-distribution', category: 'EDA Charts' },
  { label: 'Variable Against Another', id: 'variable-against-another', category: 'EDA Charts' }
]

export const state = () => ({
  docs
})

export const getters = {
  docs (state) {
    return state.docs
  }
}

export const mutations = {
}
