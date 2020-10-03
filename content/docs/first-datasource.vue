<template>
  <div class="content">
    <DocSection name="Introduction">
      In this example, we will use the <a href="https://modeloriented.github.io/DALEX/reference/apartments.html">Apartments</a>
      dataset to create different models using R and Python simultaneously.
      Finally, we will use both data sources in the Arena,
      but feel free to follow snippets of only one language.<br><br>
      The dataset contains the following columns representing apartments in Warsaw:
      <ul>
        <li><b>m2.price</b> - price per square meter</li>
        <li><b>surface</b> - apartment area in square meters</li>
        <li><b>n.rooms</b> - number of rooms</li>
        <li><b>district</b> - district in which the apartment is located</li>
        <li><b>floor</b> - floor number</li>
        <li><b>construction.date</b> - construction year</li>
      </ul>
    </DocSection>
    <DocSection name="Load libraries and data">
      We load apartments and apartmentsTest datasets from dalex package and split predictors and the target variable.
      <Code :langs="['Python', 'R']" :syntax="['py', 'r']" :sources="[code0, code1]" />
    </DocSection>
    <DocSection name="Modeling">
      In this section, we use some popular libraries. But keep in mind that Arena supports everything supported by <a href="https://github.com/ModelOriented/DALEX/">DALEX</a>.
      <Code :langs="['Python', 'R', 'R (mlr)', 'R (caret)']" :syntax="['py', 'r', 'r', 'r']" :sources="[code3, code4, code5, code6]" />
    </DocSection>
    <DocSection name="Creating Explainers">
      Now we are going to pack our models into the universal structure called <b>Explainer</b> provided
      by the DALEX package. In most cases, you need to create Explainer using just three arguments:
      <ol>
        <li>model</li>
        <li>data - data frame of predictors</li>
        <li>y - target vector</li>
      </ol>
      Sometimes you need to override the default predict_function or model_type.
      For popular packages like mlr, mlr3, or tidymodels there are wrappers in <a href="https://github.com/ModelOriented/DALEXtra">DALEXtra</a>.<br>
      For more info about explaining models look at <a href="https://github.com/ModelOriented/DALEX">this</a>.
      <Code :langs="['Python', 'R', 'R (mlr)', 'R (caret)']" :syntax="['py', 'r', 'r', 'r']" :sources="[code7, code8, code9, code10]" />
    </DocSection>
    <DocSection name="Create Arena">
      In the last part, we want to create an Arena object and run a server or export JSON. To do that we need three steps
      <ol>
        <li>Initialize object</li>
        <li>
          Use methods below to fill the Arena. You can use them an unlimited number of times, but labels are required to be unique.
          <ul>
            <li><b>push_models</b> - this method takes <b>Explainer</b> as an argument and each call adds one model.</li>
            <li>
              <b>push_observations</b> - use this method to add data frames of observations. They will be explained using observation level XAI charts.
              In each call, you can pass multiple observations (one row = one observation labeled by row name).<br>
              Datasets have to contain variables required to make a prediction.
              Additional ones will be displayed in the Observation Details panel.
            </li>
            <li>
              <b>push_dataset</b> - Data frames pushed using this method will be used to create EDA (exploratory data analysis) charts. These data frames have to contain the target variable.
            </li>
          </ul>
        </li>
        <li>
          Run server or export data
          <ul>
            <li><b>run_server</b> - starts server in the live mode</li>
            <li><b>save_arena</b> - generates all plots and saves them to the file</li>
            <li><b>upload_arena</b> - generates all plots and upload them to GitHub Gist</li>
          </ul>
        </li>
      </ol>
      <Code :langs="['Python [Live mode]', 'R [Live mode]', 'R [Static mode]']" :syntax="['py', 'r', 'r']" :sources="[code11, code12, code13]" />
    </DocSection>
  </div>
</template>
<!-- eslint-disable -->
<!-- 0 - load data python -->
<codesrc>
import dalex as dx

train = dx.datasets.load_apartments()
test = dx.datasets.load_apartments_test()

X_train = train.drop(columns='m2_price')
y_train = train["m2_price"]

X_test= test.drop(columns='m2_price')
y_test = test["m2_price"]
</codesrc>
<!-- 1 - load data r -->
<codesrc>
#remember to load dplyr before DALEX
library(dplyr)
library(DALEX)
library(arenar)

X_train <- apartments
X_test <- apartmentsTest %>% select(-m2.price)
y_test <- apartmentsTest$m2.price
</codesrc>
<!-- 2 - feature engineering python -->
<codesrc>
</codesrc>
<!-- 3 - modeling python -->
<codesrc>
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import ElasticNet
from sklearn.tree import DecisionTreeRegressor

numerical_features = X_train.select_dtypes(exclude=[object]).columns
numerical_transformer = Pipeline(
    steps=[
        ('scaler', StandardScaler())
    ]
)

categorical_features = X_train.select_dtypes(include=[object]).columns
categorical_transformer = Pipeline(
    steps=[
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ]
)

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_features),
        ('cat', categorical_transformer, categorical_features)
    ]
)

model_elastic_net = Pipeline(
    steps=[
        ('preprocessor', preprocessor),
        ('model', ElasticNet())
    ]
)
model_elastic_net.fit(X=X_train, y=y_train)
model_decision_tree = Pipeline(
    steps=[
        ('preprocessor', preprocessor),
        ('model', DecisionTreeRegressor())
    ]
)
model_decision_tree.fit(X=X_train, y=y_train)
</codesrc>
<!-- 4 - modeling r -->
<codesrc>
library(gbm)
library(ranger)
model_gbm <- gbm(m2.price ~ ., data=X_train, n.trees=300)
model_ranger <- ranger(m2.price ~ ., data=X_train)
</codesrc>
<!-- 5 - modeling r mlr -->
<codesrc>
library(mlr)
task <- mlr::makeRegrTask(
  id = "R",
  data = X_train,
  target = "m2.price"
)

learner_kknn <- mlr::makeLearner("regr.kknn")
model_knn <- mlr::train(learner_kknn, task)
learner_svm <- mlr::makeLearner("regr.ksvm")
model_svm <- mlr::train(learner_svm, task)
</codesrc>
<!-- 6 - modeling r caret -->
<codesrc>
library(caret)
library(mboost)
ctrl <- trainControl(
  method = "repeatedcv",
  number = 5, # 5 fold cv
  repeats = 3 # repeated 3 times
)
tuneGrid <- expand.grid(
  mstop = c(10, 30, 60, 100, 150, 200, 300, 500, 1000),
  prune=FALSE
)
model_glmboost <- caret::train(
  m2.price ~ .,
  data = X_train,
  method = "glmboost",
  metric = "RMSE",
  trControl = ctrl,
  tuneGrid = tuneGrid
)
</codesrc>
<!-- 7 - explainers python -->
<codesrc>
exp_elastic_net = dx.Explainer(model_elastic_net, data=X_test, y=y_test)
exp_decision_tree = dx.Explainer(model_decision_tree, data=X_test, y=y_test)
</codesrc>
<!-- 8 - explainers r -->
<codesrc>
exp_gbm <- explain(model_gbm, data=X_test, y=y_test, label="GBM")
exp_ranger <- explain(model_ranger, data=X_test, y=y_test, label="Random Forest")
</codesrc>
<!-- 9 - explainers r mlr -->
<codesrc>
library(DALEXtra)
exp_svm <- explain_mlr(model_svm, data=X_test, y=y_test, label="SVM")
exp_knn <- explain_mlr(model_knn, data=X_test, y=y_test, label="KNN")
</codesrc>
<!-- 10 - explainers r caret -->
<codesrc>
predict_function <- function(model, df) as.vector(predict(model, df))
exp_glmboost <- explain(
  model_glmboost,
  data=X_test,
  y=y_test,
  predict_function=predict_function,
  label="Boosted GLM"
)
</codesrc>
<!-- 11 - arena py -->
<codesrc>
# Start creating data source
arena=dx.Arena()
# Add explainers
arena.push_model(exp_elastic_net)
arena.push_model(exp_decision_tree)
# Add 10 first rows of testing dataset as observations
arena.push_observations(X_test.iloc[1:10])
# Run live data source on port 9294
arena.run_server(port=9294)
</codesrc>
<!-- 12 - arena r -->
<codesrc>
# Start creating data source in live mode
arena <- create_arena(live=TRUE) %>%
  # R
  push_model(exp_gbm) %>%
  push_model(exp_ranger) %>%
  # R (mlr)
  push_model(exp_knn) %>%
  push_model(exp_svm) %>%
  # R (caret)
  push_model(exp_glmboost) %>%
  # Add 10 first rows of testing dataset as observations
  push_observations(X_test[1:10, ]) %>%
  # Add apartmentsTest dataset for EDA
  push_dataset(apartmentsTest, target="m2.price", label="apartmentsTest") %>%
  # Run data source in live mode on port 9293
  run_server(port=9293)
</codesrc>
<!-- 13 - arena r static -->
<codesrc>
# Start creating data source in static mode
arena <- create_arena(live=FALSE) %>%
  # R
  push_model(exp_gbm) %>%
  push_model(exp_ranger) %>%
  # R (mlr)
  push_model(exp_knn) %>%
  push_model(exp_svm) %>%
  # R (caret)
  push_model(exp_glmboost) %>%
  # Add 10 first rows of testing dataset as observations
  push_observations(X_test[1:10, ]) %>%
  # Add apartmentsTest dataset for EDA
  push_dataset(apartmentsTest, target="m2.price", label="apartmentsTest") %>%
  # Upload data to GitHub Gist
  upload_arena()
</codesrc>
