(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{110:function(t,o,e){"use strict";e.r(o);var n={name:"LiveModeAnimation",computed:{dots:()=>[[...Array(3).keys()].map(i=>({animationName:"arena_to_r",animationDelay:i/3+"s",animationDirection:"reverse"})),[...Array(1).keys()].map(i=>({animationName:"arena_to_r",animationDelay:"1.5s"})),[...Array(3).keys()].map(i=>({animationName:"arena_to_py",animationDelay:1+i/3+"s",animationDirection:"reverse"})),[...Array(1).keys()].map(i=>({animationName:"arena_to_py",animationDelay:"2.5s"}))].flat()}},c=(e(94),e(3)),component=Object(c.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"live-mode-animation"},[e("div",{staticClass:"labeled-icon icon-arena"},[e("font-awesome-icon",{attrs:{icon:"desktop"}}),t._v(" "),e("span",{staticClass:"icon-label"},[t._v("Arena dashboard")])],1),t._v(" "),e("div",{staticClass:"labeled-icon icon-r"},[e("font-awesome-icon",{attrs:{icon:["fab","r-project"]}}),t._v(" "),e("span",{staticClass:"icon-label"},[t._v("arenar package")])],1),t._v(" "),e("div",{staticClass:"labeled-icon icon-py"},[e("font-awesome-icon",{attrs:{icon:["fab","python"]}}),t._v(" "),e("span",{staticClass:"icon-label"},[t._v("dalex package")])],1),t._v(" "),t._l(t.dots,(function(t,i){return e("div",{key:i,staticClass:"dot",style:t})}))],2)}),[],!1,null,null,null);o.default=component.exports},113:function(t,o,e){"use strict";e.r(o);var n=[function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"main-section"},[o("span",{staticClass:"title"},[this._v("Arena is the universal dashboard for models exploration for Python and R")]),this._v(" "),o("img",{attrs:{src:e(90)}})])},function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"usage-section"},[e("div",{staticClass:"column"},[e("span",[e("span",[t._v("Explore single model")])]),t._v(" "),e("span",[e("span",[t._v("Compare multiple models")])]),t._v(" "),e("span",[e("span",[t._v("Compare R with Python")])])]),t._v(" "),e("div",{staticClass:"column"},[e("span",[e("span",[t._v("Explain prediction")])]),t._v(" "),e("span",[e("span",[t._v("Check Fairness")])]),t._v(" "),e("span",[e("span",[t._v("Explainable AI")])])]),t._v(" "),e("div",{staticClass:"column"},[e("span",[e("span",[t._v("Model Performance")])]),t._v(" "),e("span",[e("span",[t._v("Exploratory data analysis")])]),t._v(" "),e("span",[e("span",[t._v("Share session")])])])])},function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"support-section"},[o("span",[this._v("Supported packages")]),this._v(" "),o("div",{staticClass:"cards"},[o("a",{staticClass:"card",attrs:{href:"https://mlr-org.com/"}},[o("img",{attrs:{src:"https://mlr3.mlr-org.com/reference/figures/logo.png"}})]),this._v(" "),o("a",{staticClass:"card",attrs:{href:"https://scikit-learn.org"}},[o("img",{attrs:{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/260px-Scikit_learn_logo_small.svg.png"}})]),this._v(" "),o("a",{staticClass:"card",attrs:{href:"https://modeloriented.github.io/DALEX/"}},[o("img",{attrs:{src:"https://github.com/ModelOriented/DALEX/raw/master/man/figures/logo.png"}})])])])}],c={layout:"simple",data:()=>({sectionMode:"live"})},r=(e(91),e(3)),component=Object(r.a)(c,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"about-container"},[t._m(0),t._v(" "),t._m(1),t._v(" "),e("div",{staticClass:"mode-section"},[e("div",{staticClass:"mode-selection"},[e("button",{staticClass:"left",class:{active:"live"===t.sectionMode},on:{click:function(o){t.sectionMode="live"}}},[t._v("Live")]),t._v(" "),e("button",{staticClass:"right",class:{active:"static"===t.sectionMode},on:{click:function(o){t.sectionMode="static"}}},[t._v("Static")])]),t._v(" "),"live"===t.sectionMode?e("div",{staticClass:"keypoints"},[e("span",[t._v("Quick startup")]),t._v(" "),e("span",[t._v("Charts are generated in real time")]),t._v(" "),e("span",[t._v("Shareable within local network")])]):t._e(),t._v(" "),"static"===t.sectionMode?e("div",{staticClass:"keypoints"},[e("span",[t._v("Precalculated to single file .json")]),t._v(" "),e("span",[t._v("Charts are loading without latency")]),t._v(" "),e("span",[t._v("Shareable as simple link")]),t._v(" "),e("span",[t._v("Easy to archive and reuse later")])]):t._e(),t._v(" "),e("div",{staticClass:"animation"},["live"===t.sectionMode?e("LiveModeAnimation"):t._e()],1)]),t._v(" "),t._m(2)])}),n,!1,null,null,null);o.default=component.exports;installComponents(component,{LiveModeAnimation:e(110).default})},79:function(t,o,e){var content=e(92);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(9).default)("332c61ac",content,!0,{sourceMap:!1})},80:function(t,o,e){var content=e(95);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(9).default)("33270a64",content,!0,{sourceMap:!1})},90:function(t,o,e){t.exports=e.p+"img/preview.8b6e9cc.gif"},91:function(t,o,e){"use strict";var n=e(79);e.n(n).a},92:function(t,o,e){var n=e(8),c=e(40),r=e(93);o=n(!1);var l=c(r);o.push([t.i,".about-container{position:absolute;width:100%;height:100%;top:0;z-index:-1}.about-container>.main-section{position:relative;height:800px;background:linear-gradient(180deg,#fff,hsla(0,0%,100%,.1)),url("+l+');background-size:cover;background-position-y:center;background-position-x:center;box-shadow:0 0 5px 0 rgba(85,85,85,.66667);z-index:10}.about-container>.main-section>.title{display:inline-block;position:relative;font-size:60px;font-family:"Fira Sans";margin-top:300px;color:#160e3b;max-width:50%;left:5%}@media (max-width:750px){.about-container>.main-section>.title{font-size:30px;margin-top:200px;width:calc(100% - 20px);max-width:unset;left:10px}}.about-container>.main-section>img{width:600px;max-width:40%;position:absolute;right:5%;top:50%;transform:translateY(-50%);box-shadow:0 0 5px 0 hsla(0,0%,78.4%,.8)}@media (max-width:750px){.about-container>.main-section>img{width:calc(100% - 20px);max-width:unset;position:relative;right:0;top:0;transform:none;margin:30px 10px}}.about-container>.usage-section{position:relative;background:#fff;font-size:0;font-family:"Fira Sans";white-space:nowrap}.about-container>.usage-section>.column{display:inline-block;width:33%;height:100%;padding:80px 50px;box-sizing:border-box;font-size:40px;vertical-align:top}.about-container>.usage-section>.column>span{display:block;padding:30px 0}.about-container>.usage-section>.column>span:before{content:"\\2714  ";color:#8bdcbe;vertical-align:top}.about-container>.usage-section>.column>span>span{display:inline-block;white-space:normal}.about-container>.mode-section{position:relative;height:600px;background:#555;box-shadow:0 0 5px 0 rgba(85,85,85,.66667);z-index:10}.about-container>.mode-section>.mode-selection{font-size:0;position:absolute;top:20px;left:50%;transform:translateX(-50%)}.about-container>.mode-section>.mode-selection>button{background:transparent;border:1px solid #fff;border-radius:0 5px 5px 0;padding:10px 20px;color:#fff;font-weight:400;font-size:20px}.about-container>.mode-section>.mode-selection>button.left{border-radius:5px 0 0 5px}.about-container>.mode-section>.mode-selection>button.active{background:#fff;color:#555}.about-container>.mode-section>.keypoints{position:absolute;top:50%;left:5%;max-width:40%;font-size:30px;color:#fff;transform:translateY(-50%);font-family:"Fira Sans Bold"}.about-container>.mode-section>.keypoints>span{display:block;padding:30px 0}.about-container>.mode-section>.keypoints>span:before{content:"• "}@media (max-width:750px){.about-container>.mode-section>.keypoints{position:relative;max-width:unset;width:90%;top:80px;transform:none}}.about-container>.mode-section>.animation{position:absolute;top:50%;right:5%;width:40%;transform:translateY(-50%)}@media (max-width:750px){.about-container>.mode-section>.animation{position:relative;top:100px;width:90%;transform:unset;right:-5%}}@media (max-width:750px){.about-container>.mode-section{height:900px}}.about-container>.support-section{position:relative;background:#fff;z-index:9;padding:30px 0;overflow-x:auto;white-space:nowrap}.about-container>.support-section>span{position:absolute;top:20px;left:5%;font-size:40px;font-family:"Fira Sans";color:#555}.about-container>.support-section>.cards{overflow-x:auto;margin-top:70px}.about-container>.support-section>.cards>.card{display:inline-block;height:100px;margin:0 50px}.about-container>.support-section>.cards>.card>img{height:100%}',""]),t.exports=o},93:function(t,o,e){t.exports=e.p+"img/bg1.9a15be2.jpeg"},94:function(t,o,e){"use strict";var n=e(80);e.n(n).a},95:function(t,o,e){(o=e(8)(!1)).push([t.i,"@-webkit-keyframes arena_to_r{0%{left:190px;top:calc(50% - 20px);opacity:1}30%{left:calc(100% - 180px);top:80px;opacity:1}31%{left:calc(100% - 180px);top:80px;opacity:0}to{left:calc(100% - 180px);top:80px;opacity:0}}@keyframes arena_to_r{0%{left:190px;top:calc(50% - 20px);opacity:1}30%{left:calc(100% - 180px);top:80px;opacity:1}31%{left:calc(100% - 180px);top:80px;opacity:0}to{left:calc(100% - 180px);top:80px;opacity:0}}@-webkit-keyframes arena_to_py{0%{left:190px;top:calc(50% - 20px);opacity:1}30%{left:calc(100% - 180px);top:calc(100% - 60px);opacity:1}31%{left:calc(100% - 180px);top:calc(100% - 60px);opacity:0}to{left:calc(100% - 180px);top:calc(100% - 60px);opacity:0}}@keyframes arena_to_py{0%{left:190px;top:calc(50% - 20px);opacity:1}30%{left:calc(100% - 180px);top:calc(100% - 60px);opacity:1}31%{left:calc(100% - 180px);top:calc(100% - 60px);opacity:0}to{left:calc(100% - 180px);top:calc(100% - 60px);opacity:0}}.live-mode-animation{width:100%;height:400px}.live-mode-animation .dot{width:10px;height:10px;background:#fff;border-radius:50%;position:absolute;-webkit-animation-duration:6s;animation-duration:6s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}.live-mode-animation .labeled-icon{width:200px;position:relative;text-align:center;font-size:100px;color:#fff}.live-mode-animation .labeled-icon>.icon-label{font-size:20px;position:absolute;bottom:-20px;width:100%;left:0}.live-mode-animation .icon-arena{font-size:150px;position:absolute;left:0;top:50%;transform:translateY(-50%)}.live-mode-animation .icon-r{position:absolute;right:0;top:0}.live-mode-animation .icon-py{position:absolute;right:0;bottom:0}",""]),t.exports=o}}]);