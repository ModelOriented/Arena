export default {
  examples: [
    {
      name: 'Warsaw apartments',
      url: 'https://gist.githubusercontent.com/piotrpiatyszek/fe8fcce96ebd46012a9e53aa3910fc69/raw/39e488d1299e763a29c083395b4c7da8fde62c23/data.json',
      session: 'https://gist.githubusercontent.com/piotrpiatyszek/af2f1c4ad85bc48ca8641d9b31f73dfc/raw/71a74f086c7576f912f469e5d910c18eec847d3e/session.json'
    },
    {
      name: 'FIFA Players Value',
      url: 'https://gist.githubusercontent.com/piotrpiatyszek/adb844f8f353502548bc335a3f28bcf2/raw/b1268cf8c791a9ce9aaadfeef3a7c0aeaa8d7d75/data.json',
      session: 'https://gist.githubusercontent.com/piotrpiatyszek/fca4ca239036f5d946a6b90fe92db818/raw/4b9eb4c305798d4e2dd08111f0ca2f0b8db6e7c5/session.json'
    },
    {
      name: 'Employees status classification',
      url: 'https://gist.githubusercontent.com/piotrpiatyszek/82b6eadfd1d932ec79ad783ae74bf1a2/raw/cfaadd9752d7cfeb62766910a9e4c1099fe466c8/data.json',
      session: 'https://gist.githubusercontent.com/piotrpiatyszek/0765dfca6af874494eeda8e53ffb812d/raw/03707b3dc04024911d9d3dc4883e581f6909bef3/session.json'
    }
  ],
  url: 'https://arena.drwhy.ai',
  // All params used in app
  params: ['variable', 'observation', 'model', 'dataset'],
  scopes: ['model', 'dataset'],
  helpMessages: {
    1: 'Select one or more models to create plots for them',
    2: 'Hold any of generated plots to open it',
    3: 'Change parameters to manipulete plots'
  },
  // Plots that are generated after holding a value in SearchDropdown for auxilary params.
  searchDropdownPlots: {
    variable: { name: 'Partial Dependence', plotType: 'PartialDependence', plotCategory: 'Dataset Level', scope: 'model' },
    observation: { name: 'Break Down', plotType: 'Breakdown', plotCategory: 'Observation Level', scope: 'model' }
  },
  githubClientId: 'd7d96eec80f68c16954b',
  githubAuthorizeServer: 'https://arena.mini.pw.edu.pl/github',
  telemetryServer: 'https://arena.mini.pw.edu.pl/telemetry'
}
