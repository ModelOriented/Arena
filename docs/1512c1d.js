(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{103:function(e,t,o){"use strict";o.r(t);var n={name:"Player",props:{videoId:{type:String,default:""}}},r=(o(94),o(3)),component=Object(r.a)(n,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"player"},[t("client-only",[this.videoId?t("vimeo-player",{staticClass:"player-component",attrs:{"video-id":this.videoId}}):this._e()],1)],1)}),[],!1,null,null,null);t.default=component.exports},113:function(e,t,o){"use strict";o.r(t);var n=o(3),component=Object(n.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"content"},[o("DocSection",{attrs:{name:"Creating charts"}},[e._v("\n    There are four types of params in Arena: "),o("b",[e._v("Model")]),e._v(", "),o("b",[e._v("Dataset")]),e._v(", "),o("b",[e._v("Variable")]),e._v(", "),o("b",[e._v("Observation")]),e._v(". Each plot is created for combination of some of these params.\n    For example Partial dependence profile can be created for model: "),o("b",[e._v("GLM")]),e._v(" and variable: "),o("b",[e._v("age")]),e._v("."),o("br"),o("br"),e._v("\n    To create a plot:"),o("br"),e._v(" "),o("ol",[o("li",[e._v("Choose Models or Datasets")]),e._v(" "),o("li",[e._v("Grab plots and move them on the grid")]),e._v(" "),o("li",[e._v("Observation and variable can be changed anytime using dropdown at the top bar")])]),e._v("\n    The whole proccess ilustrates video below"),o("br"),e._v(" "),o("Player",{attrs:{"video-id":"460888134"}})],1),e._v(" "),o("DocSection",{attrs:{name:"Lock params"}},[e._v("\n    Although plots use global values of params by default, You can lock params on each chart.\n    Use left-click to set the current value of global param or right-click to open the selection menu.\n    "),o("Player",{attrs:{"video-id":"460932181"}})],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Player:o(103).default,DocSection:o(84).default})},81:function(e,t,o){var content=o(83);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(10).default)("0a2d4302",content,!0,{sourceMap:!1})},82:function(e,t,o){"use strict";var n=o(81);o.n(n).a},83:function(e,t,o){(t=o(9)(!1)).push([e.i,'.doc-section>h2{font-size:26px;font-family:"Fira Sans";margin-bottom:10px}.doc-section>h2>.link{color:#4378bf;font-size:15px;display:inline-block;padding-left:7px;vertical-align:middle;padding-bottom:3px;cursor:pointer;text-decoration:none}.doc-section{text-align:justify;line-height:150%}',""]),e.exports=t},84:function(e,t,o){"use strict";o.r(t);var n={name:"DocSection",props:{name:{type:String,default:""}},computed:{baseURL:()=>"https://arena.drwhy.ai/docs",simplified(){return this.name.toLowerCase().replace(/ /g,"-")}}},r=(o(82),o(3)),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",{staticClass:"doc-section",attrs:{id:e.simplified}},[o("h2",[e._v(e._s(e.name)),o("a",{staticClass:"link",attrs:{href:e.baseURL+e.$route.path+"#"+e.simplified}},[o("font-awesome-icon",{attrs:{icon:"link"}})],1)]),e._v(" "),e._t("default")],2)}),[],!1,null,null,null);t.default=component.exports},87:function(e,t,o){var content=o(95);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(10).default)("1b324a2a",content,!0,{sourceMap:!1})},94:function(e,t,o){"use strict";var n=o(87);o.n(n).a},95:function(e,t,o){(t=o(9)(!1)).push([e.i,".player{width:100%;padding:30px 0}.player iframe{width:100%!important;min-height:400px}",""]),e.exports=t}}]);