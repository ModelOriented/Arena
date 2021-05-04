<template>
  <div class="content">
    <DocSection name="Ceteris Paribus">
      <img src="@/assets/ceteris_paribus.png">
      This chart shows how prediction will change if only one variable will be different. You can merge
      plots for different models and for different observations.
      The dark blue dot represents original value for the observation.
      <h4>Dashboard options</h4>
      <ul>
        <li>Left margin for variables values - for categorical variables only</li>
      </ul>
      <h4>Connector options</h4>
      <Code :langs="['Python', 'R']" :syntax="['py', 'r']" :sources="[code0, code1]" />
    </DocSection>
    <DocSection name="Break Down">
      <img src="@/assets/break_down.png">
      The idea of this chart is to check how values of variables for this specific observation affect the final prediction.
      The result is a waterfall of positive and negative contributions.
      The starting point is an averaged prediction for the whole dataset.
      The algorithm consists of two steps:
      <ol>
        <li>
          Choose path - we want to start with variables that were the most important.
          To create an order we for each column set the observation's value for the whole testing dataset.
          The absolute value of the difference in averaged prediction will be our importance.
        </li>
        <li>
          Calculate contributions along the path - this step looks similar to the previous one.
          We start with the testing dataset and iterate over the path.
          Each iteration fixes column at observation's value. The next iteration uses the data frame from the previous one.
          In the end, every column will be constant.
          After replacements, we measure contribution as a difference in averaged prediction.
        </li>
      </ol>
      <h4>Dashboard options</h4>
      <ul>
        <li>Left margin for variables names with values</li>
        <li>Maximum variables in Break Down</li>
      </ul>
    </DocSection>
    <DocSection name="Shapley Values">
      <img src="@/assets/shapley_values.png">
      Shapley Values chart is an extended version of Break Down.
      Instead of creating the best order of variables, it chooses multiple random paths and averages contributions.
      Take a look at the options tab in the dashboard to enable boxplots over columns.
      <h4>Dashboard options</h4>
      <ul>
        <li>Display boxplots over Shapley Values</li>
        <li>Left margin for variables names with values</li>
        <li>Maximum variables in Shapley Values</li>
      </ul>
      <h4>Connector options</h4>
      <Code :langs="['Python', 'Python (dalex <= 1.1.0)', 'R']" :syntax="['py', 'py', 'r']" :sources="[code4, code2, code3]" />
    </DocSection>
  </div>
</template>
<!-- eslint-disable -->
<!-- 0 - cp python arguments -->
<codesrc>
# Maxiumum number of grid points.
# When grid_type is quantile then actual number can be lower.
arena.set_option('CeterisParibus', 'grid_points', value)
# Type of grid. Points can be taken uniformly ('uniform')
# or from empirical distribution of the variable ('quantile')
arena.set_option('CeterisParibus', 'grid_type', value)
</codesrc>
<!-- 1 - cp r arguments -->
<codesrc>
create_arena(
  # Maxiumum number of grid points.
  grid_points = value
)
</codesrc>
<!-- 2 - shap python arguments -->
<codesrc>
# Number of random paths
arena.set_option('SHAPValues', 'B', value)
</codesrc>
<!-- 3 - shap r arguments -->
<codesrc>
create_arena(
  # Number of random paths
  shap_B = value
)
</codesrc>
<!-- 4 - shap python > 1.1.0 arguments -->
<codesrc>
# Number of random paths
arena.set_option('ShapleyValues', 'B', value)
# Number of parallel processes
arena.set_option('ShapleyValues', 'cpus', value)
</codesrc>
