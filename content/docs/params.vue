<template>
  <div class="content">
    <DocSection name="Creating charts">
      There are four types of params in Arena: <b>Model</b>, <b>Dataset</b>, <b>Variable</b>, <b>Observation</b>. Each plot is created for combination of some of these params.
      For example Partial dependence profile can be created for model: <b>GLM</b> and variable: <b>age</b>.<br><br>
      To create a plot:<br>
      <ol>
        <li>Choose Models or Datasets</li>
        <li>Grab plots and move them on the grid</li>
        <li>Observation and variable can be changed anytime using dropdown at the top bar</li>
      </ol>
      The whole proccess ilustrates video below<br>
      <Player video-id="460888134" />
    </DocSection>
    <DocSection name="Lock params">
      Although plots use global values of params by default, You can lock params on each chart.
      Use left-click to set the current value of global param or right-click to open the selection menu.
      <Player video-id="460932181" />
    </DocSection>
  </div>
</template>
<script>
export default {
  name: 'Params'
}
</script>
<style lang="sass">
</style>
