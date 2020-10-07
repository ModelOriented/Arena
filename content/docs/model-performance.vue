<template>
  <div class="content">
    <DocSection name="Metrics">
      <img src="@/assets/metrics.png">
      Simple chart presenting performance using one line for each model.
      In regression tasks, a better model lies under worse ones.
      In classification this rule is inverted.
    </DocSection>
    <DocSection name="Receiver Operating Characteristic">
      <img src="@/assets/roc.png">
      This is a well known ROC curve used in classification tasks.
      For many values of cutoff algorithm measure sensitivity TP/(TP + FN) and specificity TP/(TP + FP).
      You can use the mouse to check the value of the cutoff for the selected point on a curve.
      <h4>Connector options</h4>
      <Code :langs="['R']" :syntax="['r']" :sources="[code0]" />
    </DocSection>
    <DocSection name="Receiver Error Characteristic">
      <img src="@/assets/rec.png">
      REC chart shows what percentage of observations have residual in given tolerance.
      <h4>Connector options</h4>
      <Code :langs="['R']" :syntax="['r']" :sources="[code1]" />
    </DocSection>
    <DocSection name="Subset Performance">
      <img src="@/assets/subset_performance.png">
      The metrics can vary across different subsets of the testing dataset.
      If our model has an accuracy of 0.9, it does not mean that for underrepresented group accuracy is also equal to 0.9.
      It is important to know if some subsets of observations have worse performance.<br><br>
      Each lollipop on this plot starts from the line representing measure for the whole dataset.
      A dot shows the value of the metric for one subset.
      Keep in mind, that the testing data frame is split independently for each variable.
      You can check the details of any using mouse.<br><br>
      For categorical variable splitting process is easy.
      The most numerous levels are taken.
      The rest are merged to the "Other" label.<br>
      Numerical variables are cut to k intervals using k-1 points.
      The algorithm does not take these points uniformly.
      It uses quantiles.
      For example to make 4 intervals we use 25%, 50%, 75% percentiles.
      <h4>Dashboard options</h4>
      <ul>
        <li>Maximum variables in one page Subset Performance</li>
      </ul>
      <h4>Connector options</h4>
      <Code :langs="['R']" :syntax="['r']" :sources="[code2]" />
    </DocSection>
    <DocSection name="Funnel Plot">
      <img src="@/assets/funnel_plot.png">
      Funnel Plot bases on the presented above Subset Performance.
      The main difference is the usage of these charts.
      Instead of drawing raw values of metrics, the funnel plot relates every metric to the analogical metric of some primary model.<br><br>
      One of the proposed usages is using a high-performance and black-box model as the primary one.
      We can compare white-box interpretable models to it. Lolipops will show the different in loss value.
      <h4>Dashboard options</h4>
      <ul>
        <li>Maximum variables in one page Funnel Plot</li>
      </ul>
      <h4>Connector options</h4>
      <Code :langs="['R']" :syntax="['r']" :sources="[code3]" />
    </DocSection>
  </div>
</template>
<!-- eslint-disable -->
<!-- 0 - roc r arguments -->
<codesrc>
create_arena(
  # Number of tested cutoffs
  grid_points = 101
)
</codesrc>
<!-- 1 - rec r arguments -->
<codesrc>
create_arena(
  # Number of tested residuals thresholds
  grid_points = 101
)
</codesrc>
<!-- 2 - sp r arguments -->
<codesrc>
create_arena(
  # Number of intervals for numerical columns
  funnel_nbins = 5,
  # Cutoff of frequency for categorical variables. Levels less frequent will be joined into the "Other" level
  funnel_cutoff = 0.01,
  # Numerical variables with less unique values will be treated as categorical
  funnel_factor_threshold = 7
)
</codesrc>
<!-- 3 - fp r arguments -->
<codesrc>
create_arena(
  # Number of intervals for numerical columns
  funnel_nbins = 5,
  # Cutoff of frequency for categorical variables. Levels less frequent will be joined into the "Other" level
  funnel_cutoff = 0.01,
  # Numerical variables with less unique values will be treated as categorical
  funnel_factor_threshold = 7
)
</codesrc>
