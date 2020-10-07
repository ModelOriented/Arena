/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{138:function(e,n,t){(n=t(9)(!1)).push([e.i,"pre[class*=language-].line-numbers{position:relative;padding-left:3.8em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.8em;text-align:right}",""]),e.exports=n},139:function(e,n,t){(n=t(9)(!1)).push([e.i,'code[class*=language-],pre[class*=language-]{color:#fff;background:none;font-family:Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace;font-size:1em;text-align:left;text-shadow:0 -.1em .2em #000;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-ms-hyphens:none;hyphens:none}:not(pre)>code[class*=language-],pre[class*=language-]{background:#141414}pre[class*=language-]{border-radius:.5em;border:.3em solid #545454;box-shadow:inset 1px 1px .5em #000;margin:.5em 0;overflow:auto;padding:1em}pre[class*=language-]::-moz-selection{background:#27292a}pre[class*=language-]::selection{background:#27292a}code[class*=language-]::-moz-selection,code[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection{text-shadow:none;background:hsla(0,0%,93%,.15)}code[class*=language-]::selection,code[class*=language-] ::selection,pre[class*=language-]::selection,pre[class*=language-] ::selection{text-shadow:none;background:hsla(0,0%,93%,.15)}:not(pre)>code[class*=language-]{border-radius:.3em;border:.13em solid #545454;box-shadow:inset 1px 1px .3em -.1em #000;padding:.15em .2em .05em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#787878}.token.namespace,.token.punctuation{opacity:.7}.token.boolean,.token.deleted,.token.number,.token.tag{color:#cf694a}.token.builtin,.token.constant,.token.keyword,.token.property,.token.selector,.token.symbol{color:#f9ee9a}.language-css .token.string,.style .token.string,.token.attr-name,.token.attr-value,.token.char,.token.entity,.token.inserted,.token.operator,.token.string,.token.url,.token.variable{color:#919e6b}.token.atrule{color:#7386a5}.token.important,.token.regex{color:#e9c163}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}pre[data-line]{padding:1em 0 1em 3em;position:relative}.language-markup .token.attr-name,.language-markup .token.punctuation,.language-markup .token.tag{color:#ad895c}.token{position:relative;z-index:1}.line-highlight{background:rgba(84,84,84,.25);background:linear-gradient(90deg,rgba(84,84,84,.1) 70%,rgba(84,84,84,0));border-bottom:1px dashed #545454;border-top:1px dashed #545454;left:0;line-height:inherit;margin-top:.75em;padding:inherit 0;pointer-events:none;position:absolute;right:0;white-space:pre;z-index:0}.line-highlight:before,.line-highlight[data-end]:after{background-color:#8794a6;border-radius:999px;box-shadow:0 1px #fff;color:#f5f2f0;content:attr(data-start);font:700 65%/1.5 sans-serif;left:.6em;min-width:1em;padding:0 .5em;position:absolute;text-align:center;text-shadow:none;top:.4em;vertical-align:.3em}.line-highlight[data-end]:after{bottom:.4em;content:attr(data-end);top:auto}',""]),e.exports=n},91:function(e,n,t){(function(n){var t=function(e){var n=/\blang(?:uage)?-([\w-]+)\b/i,t=0,r={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof o?new o(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function e(n,t){var o,l;switch(t=t||{},r.util.type(n)){case"Object":if(l=r.util.objId(n),t[l])return t[l];for(var c in o={},t[l]=o,n)n.hasOwnProperty(c)&&(o[c]=e(n[c],t));return o;case"Array":return l=r.util.objId(n),t[l]?t[l]:(o=[],t[l]=o,n.forEach((function(n,i){o[i]=e(n,t)})),o);default:return n}},getLanguage:function(element){for(;element&&!n.test(element.className);)element=element.parentElement;return element?(element.className.match(n)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(t){var e=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(t.stack)||[])[1];if(e){var n=document.getElementsByTagName("script");for(var i in n)if(n[i].src==e)return n[i]}return null}},isActive:function(element,e,n){for(var t="no-"+e;element;){var r=element.classList;if(r.contains(e))return!0;if(r.contains(t))return!1;element=element.parentElement}return!!n}},languages:{extend:function(e,n){var t=r.util.clone(r.languages[e]);for(var o in n)t[o]=n[o];return t},insertBefore:function(e,n,t,o){var l=(o=o||r.languages)[e],c={};for(var d in l)if(l.hasOwnProperty(d)){if(d==n)for(var m in t)t.hasOwnProperty(m)&&(c[m]=t[m]);t.hasOwnProperty(d)||(c[d]=l[d])}var h=o[e];return o[e]=c,r.languages.DFS(r.languages,(function(n,t){t===h&&n!=e&&(this[n]=c)})),c},DFS:function e(n,t,o,l){l=l||{};var c=r.util.objId;for(var i in n)if(n.hasOwnProperty(i)){t.call(n,i,n[i],o||i);var d=n[i],m=r.util.type(d);"Object"!==m||l[c(d)]?"Array"!==m||l[c(d)]||(l[c(d)]=!0,e(d,t,i,l)):(l[c(d)]=!0,e(d,t,null,l))}}},plugins:{},highlightAll:function(e,n){r.highlightAllUnder(document,e,n)},highlightAllUnder:function(e,n,t){var o={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};r.hooks.run("before-highlightall",o),o.elements=Array.prototype.slice.apply(o.container.querySelectorAll(o.selector)),r.hooks.run("before-all-elements-highlight",o);for(var element,i=0;element=o.elements[i++];)r.highlightElement(element,!0===n,o.callback)},highlightElement:function(element,t,o){var l=r.util.getLanguage(element),c=r.languages[l];element.className=element.className.replace(n,"").replace(/\s+/g," ")+" language-"+l;var d=element.parentElement;d&&"pre"===d.nodeName.toLowerCase()&&(d.className=d.className.replace(n,"").replace(/\s+/g," ")+" language-"+l);var m={element:element,language:l,grammar:c,code:element.textContent};function h(e){m.highlightedCode=e,r.hooks.run("before-insert",m),m.element.innerHTML=m.highlightedCode,r.hooks.run("after-highlight",m),r.hooks.run("complete",m),o&&o.call(m.element)}if(r.hooks.run("before-sanity-check",m),!m.code)return r.hooks.run("complete",m),void(o&&o.call(m.element));if(r.hooks.run("before-highlight",m),m.grammar)if(t&&e.Worker){var f=new Worker(r.filename);f.onmessage=function(e){h(e.data)},f.postMessage(JSON.stringify({language:m.language,code:m.code,immediateClose:!0}))}else h(r.highlight(m.code,m.grammar,m.language));else h(r.util.encode(m.code))},highlight:function(text,e,n){var t={code:text,grammar:e,language:n};return r.hooks.run("before-tokenize",t),t.tokens=r.tokenize(t.code,t.grammar),r.hooks.run("after-tokenize",t),o.stringify(r.util.encode(t.tokens),t.language)},tokenize:function(text,e){var n=e.rest;if(n){for(var t in n)e[t]=n[t];delete e.rest}var m=new l;return c(m,m.head,text),function e(text,n,t,l,m,h){for(var f in t)if(t.hasOwnProperty(f)&&t[f]){var k=t[f];k=Array.isArray(k)?k:[k];for(var v=0;v<k.length;++v){if(h&&h.cause==f+","+v)return;var S=k[v],y=S.inside,E=!!S.lookbehind,w=!!S.greedy,A=0,_=S.alias;if(w&&!S.pattern.global){var x=S.pattern.toString().match(/[imsuy]*$/)[0];S.pattern=RegExp(S.pattern.source,x+"g")}for(var pattern=S.pattern||S,N=l.next,I=m;N!==n.tail&&!(h&&I>=h.reach);I+=N.value.length,N=N.next){var O=N.value;if(n.length>text.length)return;if(!(O instanceof o)){var T=1;if(w&&N!=n.tail.prev){if(pattern.lastIndex=I,!(D=pattern.exec(text)))break;var P=D.index+(E&&D[1]?D[1].length:0),L=D.index+D[0].length,p=I;for(p+=N.value.length;P>=p;)N=N.next,p+=N.value.length;if(p-=N.value.length,I=p,N.value instanceof o)continue;for(var R=N;R!==n.tail&&(p<L||"string"==typeof R.value);R=R.next)T++,p+=R.value.length;T--,O=text.slice(I,p),D.index-=I}else{pattern.lastIndex=0;var D=pattern.exec(O)}if(D){E&&(A=D[1]?D[1].length:0);P=D.index+A;var C=D[0].slice(A),H=(L=P+C.length,O.slice(0,P)),M=O.slice(L),z=I+O.length;h&&z>h.reach&&(h.reach=z);var G=N.prev;H&&(G=c(n,G,H),I+=H.length),d(n,G,T);var U=new o(f,y?r.tokenize(C,y):C,_,C);N=c(n,G,U),M&&c(n,N,M),T>1&&e(text,n,t,N.prev,I,{cause:f+","+v,reach:z})}}}}}}(text,m,e,m.head,0),function(e){var n=[],t=e.head.next;for(;t!==e.tail;)n.push(t.value),t=t.next;return n}(m)},hooks:{all:{},add:function(e,n){var t=r.hooks.all;t[e]=t[e]||[],t[e].push(n)},run:function(e,n){var t=r.hooks.all[e];if(t&&t.length)for(var o,i=0;o=t[i++];)o(n)}},Token:o};function o(e,content,n,t){this.type=e,this.content=content,this.alias=n,this.length=0|(t||"").length}function l(){var head={value:null,prev:null,next:null},e={value:null,prev:head,next:null};head.next=e,this.head=head,this.tail=e,this.length=0}function c(e,n,t){var r=n.next,o={value:t,prev:n,next:r};return n.next=o,r.prev=o,e.length++,o}function d(e,n,t){for(var r=n.next,i=0;i<t&&r!==e.tail;i++)r=r.next;n.next=r,r.prev=n,e.length-=i}if(e.Prism=r,o.stringify=function e(n,t){if("string"==typeof n)return n;if(Array.isArray(n)){var s="";return n.forEach((function(n){s+=e(n,t)})),s}var o={type:n.type,content:e(n.content,t),tag:"span",classes:["token",n.type],attributes:{},language:t},l=n.alias;l&&(Array.isArray(l)?Array.prototype.push.apply(o.classes,l):o.classes.push(l)),r.hooks.run("wrap",o);var c="";for(var d in o.attributes)c+=" "+d+'="'+(o.attributes[d]||"").replace(/"/g,"&quot;")+'"';return"<"+o.tag+' class="'+o.classes.join(" ")+'"'+c+">"+o.content+"</"+o.tag+">"},!e.document)return e.addEventListener?(r.disableWorkerMessageHandler||e.addEventListener("message",(function(n){var t=JSON.parse(n.data),o=t.language,code=t.code,l=t.immediateClose;e.postMessage(r.highlight(code,r.languages[o],o)),l&&e.close()}),!1),r):r;var script=r.util.currentScript();function m(){r.manual||r.highlightAll()}if(script&&(r.filename=script.src,script.hasAttribute("data-manual")&&(r.manual=!0)),!r.manual){var h=document.readyState;"loading"===h||"interactive"===h&&script&&script.defer?document.addEventListener("DOMContentLoaded",m):window.requestAnimationFrame?window.requestAnimationFrame(m):window.setTimeout(m,16)}return r}("undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{});e.exports&&(e.exports=t),void 0!==n&&(n.Prism=t)}).call(this,t(4))},92:function(e,n){Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},"string-interpolation":{pattern:/(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^\s*)@\w+(?:\.\w+)*/im,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:True|False|None)\b/,number:/(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python},93:function(e,n){Prism.languages.r={comment:/#.*/,string:{pattern:/(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},"percent-operator":{pattern:/%[^%\s]*%/,alias:"operator"},boolean:/\b(?:TRUE|FALSE)\b/,ellipsis:/\.\.(?:\.|\d+)/,number:[/\b(?:NaN|Inf)\b/,/(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+\.?\d*|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/],keyword:/\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,operator:/->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,punctuation:/[(){}\[\],;]/}},94:function(e,n){!function(e){var n="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",t={environment:{pattern:RegExp("\\$"+n),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+n),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/};e.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b\w+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+n),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:t},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\2)[^\\])*\2/,lookbehind:!0,greedy:!0,inside:t}],environment:{pattern:RegExp("\\$?"+n),alias:"constant"},variable:t.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}};for(var r=["comment","function-name","for-or-select","assign-left","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],o=t.variable[1].inside,i=0;i<r.length;i++)o[r[i]]=e.languages.bash[r[i]];e.languages.shell=e.languages.bash}(Prism)},95:function(e,n,t){var content=t(138);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(10).default)("2dc2f3ea",content,!0,{sourceMap:!1})},96:function(e,n){!function(){if("undefined"!=typeof self&&self.Prism&&self.document){var e=/\n(?!$)/g,n=Prism.plugins.lineNumbers={getLine:function(element,e){if("PRE"===element.tagName&&element.classList.contains("line-numbers")){var n=element.querySelector(".line-numbers-rows"),t=parseInt(element.getAttribute("data-start"),10)||1,r=t+(n.children.length-1);e<t&&(e=t),e>r&&(e=r);var o=e-t;return n.children[o]}},resize:function(element){o([element])},assumeViewportIndependence:!0},t=function(element){return element?window.getComputedStyle?getComputedStyle(element):element.currentStyle||null:null},r=void 0;window.addEventListener("resize",(function(){n.assumeViewportIndependence&&r===window.innerWidth||(r=window.innerWidth,o(Array.prototype.slice.call(document.querySelectorAll("pre.line-numbers"))))})),Prism.hooks.add("complete",(function(n){if(n.code){var code=n.element,pre=code.parentNode;if(pre&&/pre/i.test(pre.nodeName)&&!code.querySelector(".line-numbers-rows")&&Prism.util.isActive(code,"line-numbers")){code.classList.remove("line-numbers"),pre.classList.add("line-numbers");var t,r=n.code.match(e),l=r?r.length+1:1,c=new Array(l+1).join("<span></span>");(t=document.createElement("span")).setAttribute("aria-hidden","true"),t.className="line-numbers-rows",t.innerHTML=c,pre.hasAttribute("data-start")&&(pre.style.counterReset="linenumber "+(parseInt(pre.getAttribute("data-start"),10)-1)),n.element.appendChild(t),o([pre]),Prism.hooks.run("line-numbers",n)}}})),Prism.hooks.add("line-numbers",(function(e){e.plugins=e.plugins||{},e.plugins.lineNumbers=!0}))}function o(n){if(0!=(n=n.filter((function(e){var n=t(e)["white-space"];return"pre-wrap"===n||"pre-line"===n}))).length){var r=n.map((function(element){var n=element.querySelector("code"),t=element.querySelector(".line-numbers-rows");if(n&&t){var r=element.querySelector(".line-numbers-sizer"),o=n.textContent.split(e);r||((r=document.createElement("span")).className="line-numbers-sizer",n.appendChild(r)),r.innerHTML="0",r.style.display="block";var l=r.getBoundingClientRect().height;return r.innerHTML="",{element:element,lines:o,lineHeights:[],oneLinerHeight:l,sizer:r}}})).filter(Boolean);r.forEach((function(e){var n=e.sizer,t=e.lines,r=e.lineHeights,o=e.oneLinerHeight;r[t.length-1]=void 0,t.forEach((function(line,e){if(line&&line.length>1){var t=n.appendChild(document.createElement("span"));t.style.display="block",t.textContent=line}else r[e]=o}))})),r.forEach((function(e){for(var n=e.sizer,t=e.lineHeights,r=0,i=0;i<t.length;i++)void 0===t[i]&&(t[i]=n.children[r++].getBoundingClientRect().height)})),r.forEach((function(e){var n=e.sizer,t=e.element.querySelector(".line-numbers-rows");n.style.display="none",n.innerHTML="",e.lineHeights.forEach((function(e,n){t.children[n].style.height=e+"px"}))}))}}}()},97:function(e,n,t){var content=t(139);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(10).default)("4818eade",content,!0,{sourceMap:!1})}}]);