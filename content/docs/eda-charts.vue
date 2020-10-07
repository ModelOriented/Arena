<template>
  <div class="content">
    <DocSection name="Variable Distribution">
      <img src="@/assets/variable_distribution.png">
      <h4>Dashboard options</h4>
      <ul>
        <li>Left margin for variables values - for categorical variables</li>
      </ul>
      <h4>Connector options</h4>
      <Code :langs="['R']" :syntax="['r']" :sources="[code0]" />
    </DocSection>
    <DocSection name="Variable Against Another">
      <img src="@/assets/vaa.png">
      <h4>Connector options</h4>
      <Code :langs="['R']" :syntax="['r']" :sources="[code1]" />
    </DocSection>
  </div>
</template>
<!-- eslint-disable -->
<!-- 0 - vd r arguments -->
<codesrc>
create_arena(
  # Vector of bins count that will be available int the slider
  distribution_bins = seq(5, 40, 5),
)
</codesrc>
<!-- 1 - vaa r arguments -->
<codesrc>
create_arena(
  # Number of points to be randomly selected from the dataset
  # and visible in scatter plot.
  # Boxplots and heatmaps still use the whole data frame.
  max_points_number = 150,
)
</codesrc>
