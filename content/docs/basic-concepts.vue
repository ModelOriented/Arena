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
  </div>
</template>
<script>
export default {
  name: 'BasicConcepts'
}
</script>
