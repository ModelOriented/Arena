const docs = [
  { label: 'Installation', id: 'installation', category: 'Getting Started' },
  { label: 'Basic Concepts', id: 'basic-concepts', category: 'Getting Started' },
  { label: 'Params', id: 'params', category: 'Getting Started' },
  { label: 'Sharing Session', id: 'sharing-session', category: 'Getting Started' },
  { label: 'Annotations', id: 'annotations', category: 'Features' },
  { label: 'Chart Options', id: 'plot-options', category: 'Features' },
  { label: 'Merging Charts', id: 'merging-charts', category: 'Features' },
  { label: 'Modifying Observations', id: 'modifying-observations', category: 'Usage' },
  { label: 'Multiple Data Sources', id: 'multiple-data-sources', category: 'Usage' },
  { label: 'Observation Level XAI', id: 'observation-level', category: 'Charts' },
  { label: 'Dataset Level XAI', id: 'dataset-level', category: 'Charts' },
  { label: 'Fairness', id: 'fairness', category: 'Charts' },
  { label: 'Model Performance', id: 'model-performance', category: 'Charts' },
  { label: 'Exploratory data analysis', id: 'eda-charts', category: 'Charts' }
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
