const docs = [
  { label: 'Basic Concepts', id: 'basic-concepts', category: 'Getting Started' },
  { label: 'Installation', id: 'installation', category: 'Getting Started' },
  { label: 'Params', id: 'params', category: 'Getting Started' },
  { label: 'Your first data source', id: 'first-datasource', category: 'Getting Started' },
  { label: 'Sharing Session', id: 'sharing-session', category: 'Getting Started' },
  { label: 'Annotations', id: 'annotations', category: 'Features' },
  { label: 'Chart Options', id: 'charts-options', category: 'Features' },
  { label: 'Peer to Peer Sharing', id: 'p2p-sharing', category: 'Features' },
  { label: 'Modifying Observations', id: 'modifying-observations', category: 'Features' },
  { label: 'Multiple Data Sources', id: 'multiple-data-sources', category: 'Usage' },
  { label: 'Explaining observations', id: 'explaining-observations', category: 'Usage' },
  { label: 'Global explanations', id: 'global-explanations', category: 'Usage' },
  { label: 'Workflow Tricks & Tips', id: 'workflow-tips', category: 'Usage' },
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
