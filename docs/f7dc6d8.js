(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{100:function(t,e,n){"use strict";n.r(e);var o={name:"Player",props:{videoId:{type:String,default:""}}},r=(n(98),n(3)),component=Object(r.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"player"},[e("client-only",[this.videoId?e("vimeo-player",{staticClass:"player-component",attrs:{"video-id":this.videoId}}):this._e()],1)],1)}),[],!1,null,null,null);e.default=component.exports},117:function(t,e,n){"use strict";n.r(e);var o=n(3),component=Object(o.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content"},[e("DocSection",{attrs:{name:"Annotate using brush"}},[e("Player",{attrs:{"video-id":"466309501"}}),this._v("\n    This mechanism allows you to draw on charts and in the space between them.\n    You can use different colors and sizes to annotate inconspicuous figures and write comments.\n    The drawing area is located over the workspace.\n    If you move the chart, the annotation stays in the old location."),e("br"),this._v("\n    To change brush size, use the mouse scroll.\n    Rubber is the last available color.\n  ")],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Player:n(100).default,DocSection:n(86).default})},81:function(t,e,n){var content=n(84);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(10).default)("0a2d4302",content,!0,{sourceMap:!1})},82:function(t,e,n){"use strict";e.a={baseURL:"https://arena.drwhy.ai/docs"}},83:function(t,e,n){"use strict";var o=n(81);n.n(o).a},84:function(t,e,n){(e=n(9)(!1)).push([t.i,'.doc-section>h2{font-size:26px;font-family:"Fira Sans";margin-bottom:10px}.doc-section>h2>.link{color:#4378bf;font-size:15px;display:inline-block;padding-left:7px;vertical-align:middle;padding-bottom:3px;cursor:pointer;text-decoration:none}.doc-section{text-align:justify;line-height:150%}',""]),t.exports=e},86:function(t,e,n){"use strict";n.r(e);var o=n(82),r={name:"DocSection",props:{name:{type:String,default:""}},computed:{baseURL:()=>o.a.baseURL,simplified(){return this.name.toLowerCase().replace(/ /g,"-")}}},l=(n(83),n(3)),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"doc-section",attrs:{id:t.simplified}},[n("h2",[t._v(t._s(t.name)),n("a",{staticClass:"link",attrs:{href:t.baseURL+t.$route.path+"#"+t.simplified}},[n("font-awesome-icon",{attrs:{icon:"link"}})],1)]),t._v(" "),t._t("default")],2)}),[],!1,null,null,null);e.default=component.exports},88:function(t,e,n){var content=n(99);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(10).default)("1b324a2a",content,!0,{sourceMap:!1})},98:function(t,e,n){"use strict";var o=n(88);n.n(o).a},99:function(t,e,n){(e=n(9)(!1)).push([t.i,".player{width:100%;padding:30px 0}.player iframe{width:100%!important;min-height:400px}",""]),t.exports=e}}]);