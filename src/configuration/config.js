export default {
  examples: [
    {
      name: 'Apartments from 2009-2010 price per m2',
      url: 'https://gist.githubusercontent.com/piotrpiatyszek/e90d62f8896637001b9110cbe143956f/raw/15a1c75488122580dc5766e3ca7474949ba89678/data.json',
      session: 'https://arena.drwhy.ai/?session=https://gist.githubusercontent.com/piotrpiatyszek/20377262b400348d0af4c8dd9500b85e/raw/0042ce5b93185d36ffd27fb37a36e6e499924f78/session.json'
    },
    {
      name: 'FIFA Players Value',
      url: 'https://gist.githubusercontent.com/piotrpiatyszek/db055c7ba325c964b22e52dc87a0019f/raw/ce3687e1d6e595d792f84bca0f07dd216f161d75/data.json',
      session: 'https://gist.githubusercontent.com/piotrpiatyszek/e9f438852eecd30329cd769fe8f1b66a/raw/ac5c38a9407b463cd342dd1a73feeb927ce02245/session.json'
    },
    { name: 'Employees status classification', url: 'https://gist.githubusercontent.com/piotrpiatyszek/42841017d32d89e1ca9ca0c89da94b88/raw/052bbed2b8a519e833663940225f16792cf337ca/data.json' }
  ],
  url: 'https://arena.drwhy.ai',
  // All params used in app
  params: ['variable', 'observation', 'model'],
  // Main param that is selected in side panel and cannot be changed for once generated plot
  mainParam: 'model',
  helpMessages: {
    1: 'Select one or more models to create plots for them',
    2: 'Hold any of generated plots to open it',
    3: 'Change parameters to manipulete plots'
  },
  // Plots that are generated after holding a value in SearchDropdown for auxilary params.
  searchDropdownPlots: {
    variable: { name: 'Partial Dependence', plotType: 'PartialDependence' },
    observation: { name: 'Break Down', plotType: 'Breakdown' }
  },
  githubClientId: 'd7d96eec80f68c16954b',
  githubAuthorizeServer: localStorage.getItem('githubAuthServer') || '' // temporary
}
