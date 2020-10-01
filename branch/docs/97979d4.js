(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{122:function(t,e,n){"use strict";var o=n(92);n.n(o).a},123:function(t,e,n){(e=n(8)(!1)).push([t.i,".code .lang-select{padding-left:10px}.code .lang-select button{background:#fff;border:1px solid #2f2f2f;border-bottom:none;padding:5px 10px;color:#2f2f2f;font-size:16px;cursor:pointer;border-radius:5px 5px 0 0;margin:0 2px}.code .lang-select button.active,.code .source{background:#2f2f2f;color:#fff}.code .source{border-radius:5px;font-size:16px;padding:10px;overflow-x:auto;font-family:monospace,monospace}",""]),t.exports=e},81:function(t,e,n){var content=n(83);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(9).default)("0a2d4302",content,!0,{sourceMap:!1})},82:function(t,e,n){"use strict";var o=n(81);n.n(o).a},83:function(t,e,n){(e=n(8)(!1)).push([t.i,'.doc-section>h2{font-size:26px;font-family:"Fira Sans";margin-bottom:10px}.doc-section>h2>.link{color:#4378bf;font-size:15px;display:inline-block;padding-left:7px;vertical-align:middle;padding-bottom:3px;cursor:pointer;text-decoration:none}.doc-section{text-align:justify}',""]),t.exports=e},84:function(t,e,n){"use strict";n.r(e);var o={name:"DocSection",props:{name:{type:String,default:""}},computed:{baseURL:()=>"https://arena.drwhy.ai/docs",simplified(){return this.name.toLowerCase().replace(/ /g,"-")}}},r=(n(82),n(3)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"doc-section",attrs:{id:t.simplified}},[n("h2",[t._v(t._s(t.name)),n("a",{staticClass:"link",attrs:{href:t.baseURL+t.$route.path+"#"+t.simplified}},[n("font-awesome-icon",{attrs:{icon:"link"}})],1)]),t._v(" "),t._t("default")],2)}),[],!1,null,null,null);e.default=component.exports},92:function(t,e,n){var content=n(123);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(9).default)("1b75cbfc",content,!0,{sourceMap:!1})},94:function(t,e,n){"use strict";n.r(e);var o={name:"DocsInstallation"},r=n(3),l=function(t){t.exports.computed||(t.exports.computed={}),t.exports.computed.code0=()=>"pip install dalex\npip install requests\n# packages required for live mode\npip install Flask\npip install Flask-cors"},c=function(t){t.exports.computed||(t.exports.computed={}),t.exports.computed.code1=()=>"# stable version\ninstall.packages('arenar')\n# latest version\nremotes::install_github('ModelOriented/Arenar')"},d=function(t){t.exports.computed||(t.exports.computed={}),t.exports.computed.code2=()=>"git clone https://github.com/ModelOriented/Arena\ncd Arena\nnpm run install\nnpm run build\ncp -R dist/* /path/to/your/http/server/"},component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("DocSection",{attrs:{name:"Installing Connectors"}},[n("Code",{attrs:{langs:["Python (bash)","R"],syntax:["shell","r"],sources:[t.code0,t.code1]}})],1),t._v(" "),n("DocSection",{attrs:{name:"Dashboard"}},[t._v("\n    Arena is available at "),n("a",{attrs:{href:"https://arena.drwhy.ai"}},[t._v("https://arena.drwhy.ai")]),t._v(" and you don't need to to run it by yourself. In some cases, like accessing data source running on your local network, you have to use "),n("b",[t._v("not https")]),t._v(". We don't enforce ssl to make it possible. Just replace "),n("b",[t._v("https://")]),t._v(" with "),n("b",[t._v("http://")]),t._v(" in the url.\n  ")]),t._v(" "),n("DocSection",{attrs:{name:"Running own Arena dashboard server"}},[n("Code",{attrs:{langs:["Bash"],syntax:["shell"],sources:[t.code2]}})],1)],1)}),[],!1,null,null,null);"function"==typeof l&&l(component),"function"==typeof c&&c(component),"function"==typeof d&&d(component);e.default=component.exports;installComponents(component,{Code:n(99).default,DocSection:n(84).default})},99:function(t,e,n){"use strict";n.r(e);var o=n(113),r=n.n(o),l=(n(114),n(115),n(116),n(117),n(119),n(120),{name:"",props:{langs:{type:Array,default:()=>[]},sources:{type:Array,default:()=>[]},syntax:{type:Array,default:()=>[]}},data:()=>({visible:0}),computed:{highlighted(){return this.sources.map((t,i)=>r.a.highlight(t,r.a.languages[this.syntax[i]],this.syntax[i]))}},methods:{}}),c=(n(122),n(3)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"code"},[n("div",{staticClass:"lang-select"},t._l(t.langs,(function(e,i){return n("button",{key:e,class:{active:i===t.visible},on:{click:function(e){t.visible=i}}},[t._v("\n      "+t._s(e)+"\n    ")])})),0),t._v(" "),n("div",{staticClass:"source"},[n("pre",[n("code",{domProps:{innerHTML:t._s(t.highlighted[t.visible])}})])])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Code:n(99).default})}}]);