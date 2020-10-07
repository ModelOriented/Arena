<template>
  <div class="content">
    <DocSection name="Variable Importance">
      <img src="@/assets/variable_importance.png">
      <h4>Dashboard options</h4>
      <ul>
        <li>Maximum variables in Variable Importance</li>
        <li>Display boxplots over Variable Importance</li>
        <li>Left margin for variables names with values</li>
      </ul>
      <h4>Connector options</h4>
      <Code :langs="['Python', 'R']" :syntax="['py', 'r']" :sources="[code0, code1]" />
    </DocSection>
    <DocSection name="Partial Dependence">
      <img src="@/assets/partial_dependence.png">
      <h4>Dashboard options</h4>
      <ul>
        <li>Left margin for variables values - for categorical variables</li>
      </ul>
      <h4>Connector options</h4>
      <Code :langs="['Python', 'R']" :syntax="['py', 'r']" :sources="[code2, code3]" />
    </DocSection>
    <DocSection name="Accumulated Dependence">
      <img src="@/assets/accumulated_dependence.png">
      <h4>Dashboard options</h4>
      <ul>
        <li>Left margin for variables values - for categorical variables</li>
      </ul>
      <h4>Connector options</h4>
      <Code :langs="['Python', 'R']" :syntax="['py', 'r']" :sources="[code4, code5]" />
    </DocSection>
  </div>
</template>
<!-- eslint-disable -->
<!-- 0 - fi python arguments -->
<codesrc>
# Size of random subset. For large datasets can speedup calculations.
# Use None to select whole dataset.
arena.set_option('FeatureImportance', 'N', None)
# Number of permutations.
arena.set_option('FeatureImportance', 'B', 10)
</codesrc>
<!-- 1 - fi r arguments -->
<codesrc>
create_arena(
  # Size of random subset. For large datasets can speedup calculations.
  # Use NULL to select whole dataset.
  fi_N = NULL,
  # Number of permutations.
  fi_B = 10
)
</codesrc>
<!-- 2 - fi python arguments -->
<codesrc>
# Method of selecting points: 'quantile' or 'uniform'
arena.set_option('PartialDependence', 'grid_type', 'quantile')
# Maximum number of points for profile. Final number can
# be lower using 'quantile' method.
arena.set_option('PartialDependence', 'grid_points', 101)
# Size of random subset. For large datasets can speedup calculations.
# Use None to select whole dataset.
arena.set_option('PartialDependence', 'N', 500)
</codesrc>
<!-- 3 - fi r arguments -->
<codesrc>
create_arena(
  # Maximum number of points for profile. Final number can
  # be lower if uniformly distributed quantiles are not unique.
  grid_points = 101,
  # Size of random subset. For large datasets can speedup calculations.
  # Use NULL to select whole dataset.
  N = 500
)
</codesrc>
<!-- 4 - fi python arguments -->
<codesrc>
# Method of selecting points: 'quantile' or 'uniform'
arena.set_option('AccumulatedDependence', 'grid_type', 'quantile')
# Maximum number of points for profile. Final number can
# be lower using 'quantile' method.
arena.set_option('AccumulatedDependence', 'grid_points', 101)
# Size of random subset. For large datasets can speedup calculations.
# Use None to select whole dataset.
arena.set_option('AccumulatedDependence', 'N', 500)
</codesrc>
<!-- 5 - fi r arguments -->
<codesrc>
create_arena(
  # Maximum number of points for profile. Final number can
  # be lower if uniformly distributed quantiles are not unique.
  grid_points = 101,
  # Size of random subset. For large datasets can speedup calculations.
  # Use NULL to select whole dataset.
  N = 500
)
</codesrc>
