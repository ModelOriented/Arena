export default {
  examples: [
    {
      name: 'Warsaw apartments',
      url: 'https://gist.githubusercontent.com/piotrpiatyszek/d7a94e2f5d196daee8de075150aa51a1/raw/00973e459b65c412e79e3cfb97bc3c51376b6096/data.json',
      session: 'https://gist.githubusercontent.com/piotrpiatyszek/a5a188de50230e048a6331f68778cffd/raw/90ae34aa191c3b155e9138572949cfb410256d70/session.json'
    },
    {
      name: 'FIFA Players Value',
      url: 'https://gist.githubusercontent.com/piotrpiatyszek/adb844f8f353502548bc335a3f28bcf2/raw/b1268cf8c791a9ce9aaadfeef3a7c0aeaa8d7d75/data.json',
      session: 'https://gist.githubusercontent.com/piotrpiatyszek/fca4ca239036f5d946a6b90fe92db818/raw/4b9eb4c305798d4e2dd08111f0ca2f0b8db6e7c5/session.json'
    },
    {
      name: 'Employees status classification',
      url: 'https://gist.githubusercontent.com/piotrpiatyszek/9e24710b794c377fa4740ee4651bf1b7/raw/b6d6036ccd8ea317920ebe977fa4c3ef9638dba6/data.json',
      session: 'https://gist.githubusercontent.com/piotrpiatyszek/ea3713ff50f6087699473b8dba00cb0d/raw/0b66f3b74b70bfd7c4358d5e8c21be8e6538b020/session.json'
    }
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
    variable: { name: 'Partial Dependence', plotType: 'PartialDependence', plotCategory: 'Dataset Level' },
    observation: { name: 'Break Down', plotType: 'Breakdown', plotCategory: 'Observation Level' }
  },
  githubClientId: 'd7d96eec80f68c16954b',
  githubAuthorizeServer: 'https://arena.mini.pw.edu.pl/github',
  telemetryServer: 'https://arena.mini.pw.edu.pl/telemetry'
}
