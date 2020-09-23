<template>
  <div class="content">
    <img src="@/assets/diagram.png">
    <DocSection name="Connectors and data sources">
      Connectors are packages created for one of the supported languages. For now, Arena has two connectors for <a href="https://github.com/ModelOriented/ArenaR">R</a> and <a href="https://github.com/ModelOriented/DALEX/tree/master/python/dalex">Python</a>. When the connector runs a server or makes a precalculated file, then we call it a data source.<br>
      Because Arena can work with many data sources a the same time, you can compare models from different languages or compare your model with the colleague's one.
      In the settings, you can see recently used data sources and open them manually.
      <img src="@/assets/sources-tab.png">
    </DocSection>
    <DocSection name="Live and static mode">
      As presented in the diagram above connectors can work in two modes.<br>
      In the <b>live mode</b> connector runs simple http server. When user open a plot, then Arena requests resource and connector starts calculating it.<br>
      In the <b>static mode</b> connector generates all possible plots and put them into JSON file.<br>
      Arena dashboard can work with both modes at the same time.
    </DocSection>
    <DocSection name="Plots and Params">
      There are four types of params in Arena: <b>Model</b>, <b>Dataset</b>, <b>Variable</b>, <b>Observation</b>. Each plot is created for combination of some of thease params.
      For example Partial dependence profile can be created for model: <b>GLM</b> and variable: <b>age</b>.<br><br>
      To create a plot:<br>
      <b>1.</b> Choose Models or Datasets<br>
      <b>2.</b> Grab plots and move them on the grid<br>
      <b>3.</b> Observation and variable can be changed anytime using dropdown at the top bar<br>
      Thw whole proccess ilustrates video below<br>
      #TODO
    </DocSection>
  </div>
</template>
<script>
export default {
  name: 'BasicConcepts'
}
</script>
<!-- eslint-disable -->
<codesrc>
pip install dalex
pip install requests
# packages required for live mode
pip install Flask
pip install Flask-cors
</codesrc>
<codesrc>
# stable version
install.packages('arenar')
# latest version
remotes::install_github('ModelOriented/Arenar')
</codesrc>
<style lang="sass" scoped>
img
  max-width: 100%
  display: block
  margin: 30px 0
</style>
