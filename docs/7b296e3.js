(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{104:function(e,t,n){"use strict";n.r(t);var o=n(3),r=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code0=()=>"import dalex as dx\n\ntrain = dx.datasets.load_apartments()\ntest = dx.datasets.load_apartments_test()\n\nX_train = train.drop(columns='m2_price')\ny_train = train[\"m2_price\"]\n\nX_test= test.drop(columns='m2_price')\ny_test = test[\"m2_price\"]"},l=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code1=()=>"#remember to load dplyr before DALEX\nlibrary(dplyr)\nlibrary(DALEX)\nlibrary(arenar)\n\nX_train <- apartments\nX_test <- apartmentsTest %>% select(-m2.price)\ny_test <- apartmentsTest$m2.price"},d=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code2=()=>""},c=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code3=()=>"from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.linear_model import ElasticNet\nfrom sklearn.tree import DecisionTreeRegressor\n\nnumerical_features = X_train.select_dtypes(exclude=[object]).columns\nnumerical_transformer = Pipeline(\n    steps=[\n        ('scaler', StandardScaler())\n    ]\n)\n\ncategorical_features = X_train.select_dtypes(include=[object]).columns\ncategorical_transformer = Pipeline(\n    steps=[\n        ('onehot', OneHotEncoder(handle_unknown='ignore'))\n    ]\n)\n\npreprocessor = ColumnTransformer(\n    transformers=[\n        ('num', numerical_transformer, numerical_features),\n        ('cat', categorical_transformer, categorical_features)\n    ]\n)\n\nmodel_elastic_net = Pipeline(\n    steps=[\n        ('preprocessor', preprocessor),\n        ('model', ElasticNet())\n    ]\n)\nmodel_elastic_net.fit(X=X_train, y=y_train)\nmodel_decision_tree = Pipeline(\n    steps=[\n        ('preprocessor', preprocessor),\n        ('model', DecisionTreeRegressor())\n    ]\n)\nmodel_decision_tree.fit(X=X_train, y=y_train)"},m=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code4=()=>"library(gbm)\nlibrary(ranger)\nmodel_gbm <- gbm(m2.price ~ ., data=X_train, n.trees=300)\nmodel_ranger <- ranger(m2.price ~ ., data=X_train)"},_=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code5=()=>'library(mlr)\ntask <- mlr::makeRegrTask(\n  id = "R",\n  data = X_train,\n  target = "m2.price"\n)\n\nlearner_kknn <- mlr::makeLearner("regr.kknn")\nmodel_knn <- mlr::train(learner_kknn, task)\nlearner_svm <- mlr::makeLearner("regr.ksvm")\nmodel_svm <- mlr::train(learner_svm, task)'},f=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code6=()=>'library(caret)\nlibrary(mboost)\nctrl <- trainControl(\n  method = "repeatedcv",\n  number = 5, # 5 fold cv\n  repeats = 3 # repeated 3 times\n)\ntuneGrid <- expand.grid(\n  mstop = c(10, 30, 60, 100, 150, 200, 300, 500, 1000),\n  prune=FALSE\n)\nmodel_glmboost <- caret::train(\n  m2.price ~ .,\n  data = X_train,\n  method = "glmboost",\n  metric = "RMSE",\n  trControl = ctrl,\n  tuneGrid = tuneGrid\n)'},v=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code7=()=>"exp_elastic_net = dx.Explainer(model_elastic_net, data=X_test, y=y_test)\nexp_decision_tree = dx.Explainer(model_decision_tree, data=X_test, y=y_test)"},x=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code8=()=>'exp_gbm <- explain(model_gbm, data=X_test, y=y_test, label="GBM")\nexp_ranger <- explain(model_ranger, data=X_test, y=y_test, label="Random Forest")'},h=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code9=()=>'library(DALEXtra)\nexp_svm <- explain_mlr(model_svm, data=X_test, y=y_test, label="SVM")\nexp_knn <- explain_mlr(model_knn, data=X_test, y=y_test, label="KNN")'},y=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code10=()=>'predict_function <- function(model, df) as.vector(predict(model, df))\nexp_glmboost <- explain(\n  model_glmboost,\n  data=X_test,\n  y=y_test,\n  predict_function=predict_function,\n  label="Boosted GLM"\n)'},k=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code11=()=>"# Start creating data source\narena=dx.Arena()\n# Add explainers\narena.push_model(exp_elastic_net)\narena.push_model(exp_decision_tree)\n# Add 10 first rows of testing dataset as observations\narena.push_observations(X_test.iloc[1:10])\n# Run live data source on port 9294\narena.run_server(port=9294)"},w=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code12=()=>'# Start creating data source in live mode\narena <- create_arena(live=TRUE) %>%\n  # R\n  push_model(exp_gbm) %>%\n  push_model(exp_ranger) %>%\n  # R (mlr)\n  push_model(exp_knn) %>%\n  push_model(exp_svm) %>%\n  # R (caret)\n  push_model(exp_glmboost) %>%\n  # Add 10 first rows of testing dataset as observations\n  push_observations(X_test[1:10, ]) %>%\n  # Add apartmentsTest dataset for EDA\n  push_dataset(apartmentsTest, target="m2.price", label="apartmentsTest") %>%\n  # Run data source in live mode on port 9293\n  run_server(port=9293)'},X=function(e){e.exports.computed||(e.exports.computed={}),e.exports.computed.code13=()=>'# Start creating data source in static mode\narena <- create_arena(live=FALSE) %>%\n  # R\n  push_model(exp_gbm) %>%\n  push_model(exp_ranger) %>%\n  # R (mlr)\n  push_model(exp_knn) %>%\n  push_model(exp_svm) %>%\n  # R (caret)\n  push_model(exp_glmboost) %>%\n  # Add 10 first rows of testing dataset as observations\n  push_observations(X_test[1:10, ]) %>%\n  # Add apartmentsTest dataset for EDA\n  push_dataset(apartmentsTest, target="m2.price", label="apartmentsTest") %>%\n  # Upload data to GitHub Gist\n  upload_arena()'},component=Object(o.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("DocSection",{attrs:{name:"Introduction"}},[e._v("\n    In this example, we will use the "),n("a",{attrs:{href:"https://modeloriented.github.io/DALEX/reference/apartments.html"}},[e._v("Apartments")]),e._v("\n    dataset to create different models using R and Python simultaneously.\n    Finally, we will use both data sources in the Arena,\n    but feel free to follow snippets of only one language."),n("br"),n("br"),e._v("\n    The dataset contains the following columns representing apartments in Warsaw:\n    "),n("ul",[n("li",[n("b",[e._v("m2.price")]),e._v(" - price per square meter")]),e._v(" "),n("li",[n("b",[e._v("surface")]),e._v(" - apartment area in square meters")]),e._v(" "),n("li",[n("b",[e._v("n.rooms")]),e._v(" - number of rooms")]),e._v(" "),n("li",[n("b",[e._v("district")]),e._v(" - district in which the apartment is located")]),e._v(" "),n("li",[n("b",[e._v("floor")]),e._v(" - floor number")]),e._v(" "),n("li",[n("b",[e._v("construction.date")]),e._v(" - construction year")])])]),e._v(" "),n("DocSection",{attrs:{name:"Load libraries and data"}},[e._v("\n    We load apartments and apartmentsTest datasets from dalex package and split predictors and the target variable.\n    "),n("Code",{attrs:{langs:["Python","R"],syntax:["py","r"],sources:[e.code0,e.code1]}})],1),e._v(" "),n("DocSection",{attrs:{name:"Modeling"}},[e._v("\n    In this section, we use some popular libraries. But keep in mind that Arena supports everything supported by "),n("a",{attrs:{href:"https://github.com/ModelOriented/DALEX/"}},[e._v("DALEX")]),e._v(".\n    "),n("Code",{attrs:{langs:["Python","R","R (mlr)","R (caret)"],syntax:["py","r","r","r"],sources:[e.code3,e.code4,e.code5,e.code6]}})],1),e._v(" "),n("DocSection",{attrs:{name:"Creating Explainers"}},[e._v("\n    Now we are going to pack our models into the universal structure called "),n("b",[e._v("Explainer")]),e._v(" provided\n    by the DALEX package. In most cases, you need to create Explainer using just three arguments:\n    "),n("ol",[n("li",[e._v("model")]),e._v(" "),n("li",[e._v("data - data frame of predictors")]),e._v(" "),n("li",[e._v("y - target vector")])]),e._v("\n    Sometimes you need to override the default predict_function or model_type.\n    For popular packages like mlr, mlr3, or tidymodels there are wrappers in "),n("a",{attrs:{href:"https://github.com/ModelOriented/DALEXtra"}},[e._v("DALEXtra")]),e._v("."),n("br"),e._v("\n    For more info about explaining models look at "),n("a",{attrs:{href:"https://github.com/ModelOriented/DALEX"}},[e._v("this")]),e._v(".\n    "),n("Code",{attrs:{langs:["Python","R","R (mlr)","R (caret)"],syntax:["py","r","r","r"],sources:[e.code7,e.code8,e.code9,e.code10]}})],1),e._v(" "),n("DocSection",{attrs:{name:"Create Arena"}},[e._v("\n    In the last part, we want to create an Arena object and run a server or export JSON. To do that we need three steps\n    "),n("ol",[n("li",[e._v("Initialize object")]),e._v(" "),n("li",[e._v("\n        Use methods below to fill the Arena. You can use them an unlimited number of times, but labels are required to be unique.\n        "),n("ul",[n("li",[n("b",[e._v("push_models")]),e._v(" - this method takes "),n("b",[e._v("Explainer")]),e._v(" as an argument and each call adds one model.")]),e._v(" "),n("li",[n("b",[e._v("push_observations")]),e._v(" - use this method to add data frames of observations. They will be explained using observation level XAI charts.\n            In each call, you can pass multiple observations (one row = one observation labeled by row name)."),n("br"),e._v("\n            Datasets have to contain variables required to make a prediction.\n            Additional ones will be displayed in the Observation Details panel.\n          ")]),e._v(" "),n("li",[n("b",[e._v("push_dataset")]),e._v(" - Data frames pushed using this method will be used to create EDA (exploratory data analysis) charts. These data frames have to contain the target variable.\n          ")])])]),e._v(" "),n("li",[e._v("\n        Run server or export data\n        "),n("ul",[n("li",[n("b",[e._v("run_server")]),e._v(" - starts server in the live mode")]),e._v(" "),n("li",[n("b",[e._v("save_arena")]),e._v(" - generates all plots and saves them to the file")]),e._v(" "),n("li",[n("b",[e._v("upload_arena")]),e._v(" - generates all plots and upload them to GitHub Gist")])])])]),e._v(" "),n("Code",{attrs:{langs:["Python [Live mode]","R [Live mode]","R [Static mode]"],syntax:["py","r","r"],sources:[e.code11,e.code12,e.code13]}})],1)],1)}),[],!1,null,null,null);"function"==typeof r&&r(component),"function"==typeof l&&l(component),"function"==typeof d&&d(component),"function"==typeof c&&c(component),"function"==typeof m&&m(component),"function"==typeof _&&_(component),"function"==typeof f&&f(component),"function"==typeof v&&v(component),"function"==typeof x&&x(component),"function"==typeof h&&h(component),"function"==typeof y&&y(component),"function"==typeof k&&k(component),"function"==typeof w&&w(component),"function"==typeof X&&X(component);t.default=component.exports;installComponents(component,{DocSection:n(84).default,Code:n(87).default})},81:function(e,t,n){var content=n(83);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(10).default)("0a2d4302",content,!0,{sourceMap:!1})},82:function(e,t,n){"use strict";var o=n(81);n.n(o).a},83:function(e,t,n){(t=n(9)(!1)).push([e.i,'.doc-section>h2{font-size:26px;font-family:"Fira Sans";margin-bottom:10px}.doc-section>h2>.link{color:#4378bf;font-size:15px;display:inline-block;padding-left:7px;vertical-align:middle;padding-bottom:3px;cursor:pointer;text-decoration:none}.doc-section{text-align:justify}',""]),e.exports=t},84:function(e,t,n){"use strict";n.r(t);var o={name:"DocSection",props:{name:{type:String,default:""}},computed:{baseURL:()=>"https://arena.drwhy.ai/docs",simplified(){return this.name.toLowerCase().replace(/ /g,"-")}}},r=(n(82),n(3)),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"doc-section",attrs:{id:e.simplified}},[n("h2",[e._v(e._s(e.name)),n("a",{staticClass:"link",attrs:{href:e.baseURL+e.$route.path+"#"+e.simplified}},[n("font-awesome-icon",{attrs:{icon:"link"}})],1)]),e._v(" "),e._t("default")],2)}),[],!1,null,null,null);t.default=component.exports},86:function(e,t,n){var content=n(95);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(10).default)("1b75cbfc",content,!0,{sourceMap:!1})},87:function(e,t,n){"use strict";n.r(t);var o=n(97),r=n.n(o),l=(n(98),n(99),n(100),n(101),n(102),n(103),{name:"",props:{langs:{type:Array,default:()=>[]},sources:{type:Array,default:()=>[]},syntax:{type:Array,default:()=>[]}},data:()=>({visible:0}),computed:{highlighted(){return this.sources.map((e,i)=>r.a.highlight(e,r.a.languages[this.syntax[i]],this.syntax[i]))}},methods:{}}),d=(n(94),n(3)),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"code"},[n("div",{staticClass:"lang-select"},e._l(e.langs,(function(t,i){return n("button",{key:t,class:{active:i===e.visible},on:{click:function(t){e.visible=i}}},[e._v("\n      "+e._s(t)+"\n    ")])})),0),e._v(" "),n("div",{staticClass:"source"},[n("pre",[n("code",{domProps:{innerHTML:e._s(e.highlighted[e.visible])}})])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Code:n(87).default})},94:function(e,t,n){"use strict";var o=n(86);n.n(o).a},95:function(e,t,n){(t=n(9)(!1)).push([e.i,".code{margin:15px 0}.code .lang-select{padding-left:10px;overflow-x:auto;white-space:nowrap}.code .lang-select button{background:#fff;border:1px solid #2f2f2f;border-bottom:none;padding:5px 10px;color:#2f2f2f;font-size:16px;cursor:pointer;border-radius:5px 5px 0 0;margin:0 2px}.code .lang-select button.active,.code .source{background:#2f2f2f;color:#fff}.code .source{border-radius:5px;font-size:16px;padding:10px;overflow-x:auto;font-family:monospace,monospace}",""]),e.exports=t}}]);