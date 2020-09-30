export default {
  examples: [
    {
      name: 'Warsaw apartments',
      url: 'https://gist.githubusercontent.com/piotrpiatyszek/3bd276c312af555c9f19cfd524b52c01/raw/63c6d7dbad270c10cafa8a252cecda21b7abe54c/data.json',
      session: 'https://gist.githubusercontent.com/piotrpiatyszek/af2f1c4ad85bc48ca8641d9b31f73dfc/raw/2d832406e63a55ed9741da4e5aedbe07953e731b/session.json'
    },
    {
      name: 'FIFA Players Value',
      url: 'https://gist.githubusercontent.com/piotrpiatyszek/21c4380a44d4e527b47ba0a4f16b18f5/raw/0d5e2d98890162d631d70a93d76604533a183ee1/data.json',
      session: 'https://gist.githubusercontent.com/piotrpiatyszek/e5872fb4c62a2600e30393a66ff3413a/raw/a381762b5af4cc9dcd7d4f119013b33d8b92848d/session.json'
    },
    {
      name: 'Employees status classification',
      url: 'https://gist.githubusercontent.com/piotrpiatyszek/c7786a137e85695d9183f23f7223ebb6/raw/8163e7b39f0f400a6d4b8f9c1bdffbb5da80fb7d/data.json',
      session: 'https://gist.githubusercontent.com/piotrpiatyszek/97fabafba2c20b9f0ab6c2c691eb17cf/raw/a023546e95fbddbe6d6edbe5c9f60f3204452eb7/session.json'
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
