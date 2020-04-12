/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"app": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + "." + {"chunk-7100a0c6":"8c6527ae"}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"chunk-7100a0c6":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "css/" + ({}[chunkId]||chunkId) + "." + {"chunk-7100a0c6":"83b35c86"}[chunkId] + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ "005c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "00ef":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breakdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f5bc");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breakdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breakdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breakdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0337":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NavbarHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1e59");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NavbarHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NavbarHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NavbarHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "034f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("85ec");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0b76":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "1173":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PageSelector_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("005c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PageSelector_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PageSelector_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PageSelector_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "166a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1a12":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1e59":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1e7c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchDropdownElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("71e8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchDropdownElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchDropdownElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchDropdownElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "248e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2528":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3064":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "374f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3c46":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabOptions_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ff6e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabOptions_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabOptions_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabOptions_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "424a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Block_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8c4f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Block_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Block_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Block_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "4859":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NameConflicts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("711e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NameConflicts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NameConflicts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NameConflicts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "51d1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FullscreenBlock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e467");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FullscreenBlock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FullscreenBlock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FullscreenBlock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "525a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__("2b3d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__("a79d");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=81e275b4&
var Appvue_type_template_id_81e275b4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('Navbar',{class:{ blured: _vm.settingsVisible },on:{"openSettings":function($event){_vm.settingsVisible = true}}}),_c('Sidepanel',{class:{ blured: _vm.settingsVisible },attrs:{"id":"sidepanel"}}),_c('div',{class:{ blured: _vm.settingsVisible },attrs:{"id":"playground"}},_vm._l((_vm.visibleSlots),function(slot){return _c('Block',{key:slot.uuid,attrs:{"slotv":slot},on:{"openFullscreen":function($event){_vm.fullscreenSlot = slot}}})}),1),_c('DeleteZone'),(_vm.settingsVisible)?_c('div',{staticClass:"overlay",on:{"click":function($event){_vm.settingsVisible = false}}}):_vm._e(),(_vm.settingsVisible)?_c('Settings',{on:{"close":function($event){_vm.settingsVisible = false}}}):_vm._e(),(_vm.nextNameConflicts)?_c('div',{staticClass:"overlay"}):_vm._e(),(_vm.nextNameConflicts)?_c('NameConflicts'):_vm._e(),(_vm.welcomeScreenVisible)?_c('div',{staticClass:"overlay",on:{"click":function($event){_vm.displayWelcomeScreen = false}}}):_vm._e(),(_vm.welcomeScreenVisible)?_c('WelcomeScreen',{on:{"close":function($event){_vm.displayWelcomeScreen = false}}}):_vm._e(),(_vm.fullscreenSlot)?_c('FullscreenBlock',{attrs:{"slotv":_vm.fullscreenSlot},on:{"close":function($event){_vm.fullscreenSlot = null}}}):_vm._e(),(_vm.preview)?_c('Preview',{attrs:{"slotv":_vm.preview}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=81e275b4&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Sidepanel.vue?vue&type=template&id=3f8132b8&
var Sidepanelvue_type_template_id_3f8132b8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sidepanel",class:{ closed: !_vm.open }},[_c('div',{staticClass:"overlay",class:{ visible: _vm.dropzoneVisible, active: _vm.dropzoneActive }},[_c('span',{staticClass:"title"},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'archive']}}),_vm._v("CLIPBOARD")],1)]),_c('div',{staticClass:"arrow-button",on:{"click":function($event){_vm.open=!_vm.open}}},[_vm._v(_vm._s(_vm.open ? "▶" : "◀"))]),(!_vm.isElementClosed('help-1'))?_c('SidepanelHelp',{attrs:{"num":1,"text":"Select one or more models to create plots for them"},on:{"close":function($event){return _vm.closeElement('help-1')}}}):_vm._e(),_c('span',{staticClass:"section-title"},[_c('font-awesome-icon',{attrs:{"icon":"list-alt"}}),_vm._v(" Models")],1),_c('SidepanelDropdown',{on:{"updateSlotsList":function($event){_vm.slotsList = $event}}}),(!_vm.isElementClosed('help-2'))?_c('SidepanelHelp',{attrs:{"num":2,"text":"Hold any of generated plots to open it"},on:{"close":function($event){return _vm.closeElement('help-2')}}}):_vm._e(),_c('span',{staticClass:"section-title"},[_c('font-awesome-icon',{attrs:{"icon":"poll"}}),_vm._v(" Plots")],1),(_vm.slotsList != null)?_c('div',{staticClass:"sidepanel-list"},_vm._l((_vm.slotsCategories),function(c){return _c('div',{key:c},[_c('span',{staticClass:"category-name"},[_vm._v(_vm._s(c))]),_vm._l((_vm.slotsList.filter(function (s) { return s.plotCategory === c; })),function(slot){return _c('SlotsListElement',{key:slot.uuid,attrs:{"slotv":slot},on:{"take":function($event){return _vm.$emit('addToPlayground', $event)}}})})],2)}),0):_vm._e()],1)}
var Sidepanelvue_type_template_id_3f8132b8_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Sidepanel.vue?vue&type=template&id=3f8132b8&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("13d5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.js
var es_set = __webpack_require__("6062");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("2909");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SlotsListElement.vue?vue&type=template&id=6620718e&
var SlotsListElementvue_type_template_id_6620718e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"slotsListElement",staticClass:"slots-list-element tooltiped"},[_c('span',{staticClass:"tooltip"},[_vm._v("Hold to pick it")]),_c('span',{staticClass:"grab-icon"},[_c('font-awesome-icon',{attrs:{"icon":"chart-bar"}})],1),(_vm.slotv)?_c('span',{staticClass:"name"},[_vm._v(_vm._s(_vm.slotv.name))]):_vm._e()])}
var SlotsListElementvue_type_template_id_6620718e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SlotsListElement.vue?vue&type=template&id=6620718e&

// EXTERNAL MODULE: ./node_modules/interactjs/dist/interact.min.js
var interact_min = __webpack_require__("5014");
var interact_min_default = /*#__PURE__*/__webpack_require__.n(interact_min);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SlotsListElement.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//


/* harmony default export */ var SlotsListElementvue_type_script_lang_js_ = ({
  name: 'SlotsListElement',
  props: {
    slotv: Object
  },
  mounted: function mounted() {
    var _this = this;

    interact_min_default()(this.$refs.slotsListElement).pointerEvents({
      holdDuration: 100
    }).on('hold', function (event) {
      event.stopPropagation();
      event.preventDefault();

      _this.$store.dispatch('addSlotToPlayground', {
        slot: _this.slotv,
        interaction: event.interaction,
        x: event.pageX,
        y: event.pageY
      });
    }).on('down', function (event) {
      event.preventDefault();
    });
    this.$refs.slotsListElement.addEventListener('pointerenter', function () {
      return _this.enablePreview();
    });
    this.$refs.slotsListElement.addEventListener('pointerleave', function () {
      return _this.disablePreview();
    });
    this.$refs.slotsListElement.addEventListener('pointercancel', function () {
      return _this.disablePreview();
    });
    this.$refs.slotsListElement.addEventListener('pointerdown', function () {
      return _this.disablePreview();
    });
  },
  methods: Object(objectSpread2["a" /* default */])({
    enablePreview: function enablePreview() {
      this.setPreview(this.slotv);
    },
    disablePreview: function disablePreview() {
      this.setPreview(null);
    }
  }, Object(vuex_esm["d" /* mapMutations */])(['setPreview']))
});
// CONCATENATED MODULE: ./src/components/SlotsListElement.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SlotsListElementvue_type_script_lang_js_ = (SlotsListElementvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SlotsListElement.vue?vue&type=style&index=0&lang=css&
var SlotsListElementvue_type_style_index_0_lang_css_ = __webpack_require__("9542");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/SlotsListElement.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SlotsListElementvue_type_script_lang_js_,
  SlotsListElementvue_type_template_id_6620718e_render,
  SlotsListElementvue_type_template_id_6620718e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SlotsListElement = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SidepanelDropdown.vue?vue&type=template&id=ab4572a4&
var SidepanelDropdownvue_type_template_id_ab4572a4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sidepanel-dropdown"},[_c('div',{staticClass:"options-list"},[_c('div',{staticClass:"group-name"},[_vm._v("Model")]),_vm._l((_vm.availableParams['model']),function(o){return _c('div',{key:o.uuid,staticClass:"option",class:{ selected: _vm.isSelected('model', o.uuid) },on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }return _vm.select('model', o)}}},[_vm._v(" "+_vm._s(_vm._f("formatTitle")(o.name))+" "),_c('span',{staticClass:"left-button"},[(_vm.selectedGroup == 'model' && !_vm.isSelected('model', o.uuid))?_c('font-awesome-icon',{staticClass:"add button",attrs:{"icon":"plus"}}):_vm._e(),(_vm.selectedGroup == 'model' && !_vm.isSelected('model', o.uuid))?_c('font-awesome-icon',{staticClass:"add button-hover",attrs:{"icon":"plus-square"},on:{"click":function($event){return _vm.addSelect('model', o)}}}):_vm._e(),(_vm.isSelected('model', o.uuid) && _vm.selectedValues.length > 1)?_c('font-awesome-icon',{staticClass:"minus button",attrs:{"icon":"minus"}}):_vm._e(),(_vm.isSelected('model', o.uuid) && _vm.selectedValues.length > 1)?_c('font-awesome-icon',{staticClass:"minus button-hover",attrs:{"icon":"minus-square"},on:{"click":function($event){return _vm.removeSelect(o.uuid)}}}):_vm._e()],1),_c('font-awesome-icon',{staticClass:"color-button",style:({ display: _vm.colorSelector !== o.uuid ? 'block' : 'none', color: _vm.modelsColors[o.uuid] }),attrs:{"icon":"square"},on:{"click":function($event){_vm.colorSelector = o.uuid}}}),_c('div',{staticClass:"color-selector",style:({ display: _vm.colorSelector === o.uuid ? 'block' : 'none' })},_vm._l((_vm.palette),function(color){return _c('font-awesome-icon',{key:color,staticClass:"color-button",style:({ color: color }),attrs:{"icon":"square"},on:{"click":function($event){return _vm.setColor(o.uuid, color)}}})}),1)],1)}),_c('div',{staticClass:"group-name"},[_vm._v("Other")]),_c('div',{staticClass:"option",class:{ selected: _vm.isSelected('other', 'clipboard') },on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }return _vm.select('other', 'clipboard')}}},[_vm._v("Clipboard")])],2)])}
var SidepanelDropdownvue_type_template_id_ab4572a4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SidepanelDropdown.vue?vue&type=template&id=ab4572a4&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.flat.js
var es_array_flat = __webpack_require__("0481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.unscopables.flat.js
var es_array_unscopables_flat = __webpack_require__("4069");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__("07ac");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.math.log10.js
var es_math_log10 = __webpack_require__("6b93");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// CONCATENATED MODULE: ./src/utils/format.js











var round = function round(x) {
  var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  if (x === 0) return 0;
  var lg = Math.round(Math.log10(Math.abs(x)));
  var k = p - lg;
  return Math.round(x * Math.pow(10, k)) / Math.pow(10, k);
};

/* harmony default export */ var format = ({
  addNewLines: function addNewLines(label) {
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 140;
    var words = label.split('_').join(' ').split(' ');
    var output = '';
    var line = '';
    var limit = Math.floor(width / 7);
    words.forEach(function (word) {
      if (word.length > limit) {
        var n = limit - line.length - 1;
        output += '<br>' + line + (n < 0 ? '' : ' ' + word.substr(0, n));
        line = word.substr(n >= 0 ? n : 0);
        console.log(word.substr(0, n), n);
      } else if (word.length + line.length + 1 > limit) {
        output += '<br>' + line;
        line = word;
      } else line += line.length === 0 ? word : ' ' + word;
    });
    if (line.length > 0) output += '<br>' + line;
    return output.split('<br>').filter(function (x) {
      return x.length > 0;
    }).join('<br>'); // Remove first one or two <br>
  },
  round: round,
  formatTitle: function formatTitle(title) {
    return title.replace(/[._-]/gi, ' ');
  },
  formatValue: function formatValue(x) {
    var addSign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var space = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var r = round(x);
    if (Math.abs(2 * x) >= Math.pow(10, 6)) r = round(x / Math.pow(10, 6), 1) + 'M';else if (Math.abs(2 * x) >= Math.pow(10, 3)) r = round(x / Math.pow(10, 3), 2) + 'K';
    if (x >= 0) return space + (addSign ? '+' : '') + r;else return r + space;
  },
  simplify: function simplify(name) {
    return name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '').toLowerCase();
  },
  firstCharUpper: function firstCharUpper(name) {
    return name.split(' ').map(function (word) {
      return word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '';
    }).join(' ');
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/Breakdown.vue?vue&type=template&id=01dbb149&
var Breakdownvue_type_template_id_01dbb149_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"breakdown-plot"},[_c('Plotly',_vm._b({ref:"plot",on:{"plotly_click":_vm.onPlotlyClick}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false)),(_vm.selectVisible)?_c('SelectMenu',{style:(_vm.selectStyle),attrs:{"options":_vm.selectOptions},model:{value:(_vm.selectVisible),callback:function ($$v) {_vm.selectVisible=$$v},expression:"selectVisible"}}):_vm._e()],1)}
var Breakdownvue_type_template_id_01dbb149_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/Breakdown.vue?vue&type=template&id=01dbb149&

// EXTERNAL MODULE: ./node_modules/vue-resize-directive/dist/Vueresize.js
var Vueresize = __webpack_require__("428d");
var Vueresize_default = /*#__PURE__*/__webpack_require__.n(Vueresize);

// CONCATENATED MODULE: ./src/utils/Resize.js

/* harmony default export */ var Resize = ({
  data: function data() {
    return {
      width: 0
    };
  },
  updated: function updated() {
    this.onResize();
  },
  mounted: function mounted() {
    this.onResize();
  },
  methods: {
    onResize: function onResize() {
      if (this.$refs.plot) this.width = this.$refs.plot.$el.offsetWidth;
    }
  },
  directives: {
    resize: Vueresize_default.a
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SelectMenu.vue?vue&type=template&id=c0eb574e&
var SelectMenuvue_type_template_id_c0eb574e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"select-menu"},[_vm._l((_vm.options),function(e){return _c('div',{key:e.name,staticClass:"entry",on:{"click":function($event){return _vm.handle(e, $event)}}},[_vm._v(" "+_vm._s(e.name)+" ")])}),_c('div',{staticClass:"entry",on:{"click":function($event){return _vm.$emit('input', false)}}},[_vm._v("Close")])],2)}
var SelectMenuvue_type_template_id_c0eb574e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SelectMenu.vue?vue&type=template&id=c0eb574e&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SelectMenu.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
/* harmony default export */ var SelectMenuvue_type_script_lang_js_ = ({
  name: 'SelectMenu',
  props: {
    options: Array,
    value: Boolean
  },
  methods: {
    handle: function handle(entry, event) {
      if (entry.handler) entry.handler(event);
      this.$emit('input', false);
    }
  }
});
// CONCATENATED MODULE: ./src/components/SelectMenu.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SelectMenuvue_type_script_lang_js_ = (SelectMenuvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SelectMenu.vue?vue&type=style&index=0&lang=css&
var SelectMenuvue_type_style_index_0_lang_css_ = __webpack_require__("c2d7");

// CONCATENATED MODULE: ./src/components/SelectMenu.vue






/* normalize component */

var SelectMenu_component = Object(componentNormalizer["a" /* default */])(
  components_SelectMenuvue_type_script_lang_js_,
  SelectMenuvue_type_template_id_c0eb574e_render,
  SelectMenuvue_type_template_id_c0eb574e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SelectMenu = (SelectMenu_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/Breakdown.vue?vue&type=script&lang=js&








//
//
//
//
//
//




var Plotly = function Plotly() {
  return __webpack_require__.e(/* import() */ "chunk-7100a0c6").then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var Breakdownvue_type_script_lang_js_ = ({
  name: 'Breakdown',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String
  },
  data: function data() {
    var _this = this;

    return {
      selectOptions: [{
        name: 'Set variable',
        handler: function handler() {
          _this.$store.commit('setGlobalParam', {
            name: 'variable',
            value: _this.selectedVariable
          });
        }
      }, {
        name: 'Open Ceteris Paribus',
        handler: function handler() {
          if (!_this.selectedVariable || !_this.selectedModel) return;

          _this.$store.commit('addSlot', {
            name: 'Ceteris Paribus',
            plotType: 'CeterisParibus',
            localParams: [{
              model: _this.selectedModel,
              variable: _this.selectedVariable,
              observation: _this.selectedObservation
            }]
          });
        }
      }],
      selectedVariable: null,
      selectedModel: null,
      selectedObservation: undefined,
      selectStyle: null,
      selectVisible: false
    };
  },
  computed: {
    trimmed: function trimmed() {
      var _this2 = this;

      return this.data.map(function (d) {
        if (d.plotData.contribution.length <= _this2.maxVariables) return d;
        return Object.assign({}, d, {
          plotData: {
            contribution: [].concat(Object(toConsumableArray["a" /* default */])(d.plotData.contribution.slice(0, _this2.maxVariables)), [d.plotData.contribution.slice(_this2.maxVariables).reduce(function (a, b) {
              return a + b;
            }, 0)]),
            variables: [].concat(Object(toConsumableArray["a" /* default */])(d.plotData.variables.slice(0, _this2.maxVariables)), ['+ All other variables']),
            variables_value: [].concat(Object(toConsumableArray["a" /* default */])(d.plotData.variables_value.slice(0, _this2.maxVariables)), [undefined]),
            intercept: d.plotData.intercept,
            prediction: d.plotData.prediction
          }
        });
      });
    },
    traces: function traces() {
      var _this3 = this;

      return this.trimmed.map(function (d) {
        return {
          name: d.params.model.name,
          type: 'waterfall',
          orientation: 'h',
          measure: ['relative'].concat(Object(toConsumableArray["a" /* default */])(d.plotData.variables.map(function (y) {
            return 'relative';
          })), ['total']),
          y: ['Intercept'].concat(Object(toConsumableArray["a" /* default */])(d.plotData.variables.map(function (y, i) {
            var value = d.plotData.variables_value[i];
            return value === undefined ? y : format.addNewLines(format.formatTitle(y) + ' = ' + value, _this3.leftMargin);
          })), ['Prediction']),
          base: d.plotData.intercept,
          x: [0].concat(Object(toConsumableArray["a" /* default */])(d.plotData.contribution), [d.plotData.prediction]),
          text: [format.formatValue(d.plotData.intercept, false, ' ')].concat(Object(toConsumableArray["a" /* default */])(d.plotData.contribution.map(function (x) {
            return format.formatValue(x, true, ' ');
          })), [format.formatValue(d.plotData.prediction, false, ' ')]),
          textposition: 'outside',
          hovertext: ['Intercept'].concat(Object(toConsumableArray["a" /* default */])(d.plotData.variables), ['Prediction']),
          hoverinfo: 'text+delta',
          hoverlabel: {
            bgcolor: 'rgba(0,0,0,0.5)',
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          connector: {
            mode: 'spanning',
            line: {
              width: 2,
              color: 'black',
              dash: 0
            }
          },
          increasing: {
            marker: {
              color: '#8bdcbe'
            }
          },
          decreasing: {
            marker: {
              color: '#f05a71'
            }
          },
          totals: {
            marker: {
              color: '#371ea3'
            }
          }
        };
      });
    },
    layout: function layout() {
      return {
        yaxis: {
          type: 'category',
          autorange: 'reversed',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false
        },
        xaxis: {
          type: 'linear',
          title: {
            text: 'contribution',
            standoff: 10
          },
          gridwidth: 2,
          range: this.range,
          fixedrange: true,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        showlegend: false,
        margin: {
          l: this.leftMargin,
          t: 0,
          b: 45,
          r: 5
        },
        shapes: this.data.map(function (d) {
          return {
            type: 'line',
            x0: d.plotData.intercept,
            x1: d.plotData.intercept,
            y0: 0,
            y1: 1,
            yref: 'paper',
            xref: 'x',
            line: {
              color: 'black',
              width: 1,
              dash: 'dot'
            }
          };
        }),
        dragmode: 'pan'
      };
    },
    config: function config() {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      };
    },
    minimalValue: function minimalValue() {
      return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(this.trimmed.map(function (d) {
        // eslint-disable-next-line no-return-assign
        var cumSum = function (sum) {
          return function (value) {
            return sum += value;
          };
        }(d.plotData.intercept);

        return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.contribution.map(cumSum)).concat([d.plotData.intercept]));
      })));
    },
    maximalValue: function maximalValue() {
      return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(this.trimmed.map(function (d) {
        // eslint-disable-next-line no-return-assign
        var cumSum = function (sum) {
          return function (value) {
            return sum += value;
          };
        }(d.plotData.intercept);

        return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.contribution.map(cumSum)).concat([d.plotData.intercept]));
      })));
    },
    range: function range() {
      var len = this.maximalValue - this.minimalValue; // margin = 1/2 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )

      var margin = 0.5 * 120 * len / (this.width - 120 - this.leftMargin - 5);
      return [this.minimalValue - margin, this.maximalValue + margin];
    },
    layoutPatches: function layoutPatches() {
      return {
        'xaxis.range': this.range,
        'margin.l': this.leftMargin
      };
    },
    maxVariables: function maxVariables() {
      return this.$store.getters.getOption('breakdown_max_variables');
    },
    leftMargin: function leftMargin() {
      return this.$store.getters.getOption('left_margin');
    }
  },
  methods: {
    onPlotlyClick: function onPlotlyClick(e) {
      var event = e.data.event;
      if (e.data.points.length !== 1) return;
      var curve = e.data.points[0].curveNumber;
      var variable = e.data.points[0].pointNumber - 1; // first is intercept

      if (variable < 0 || variable >= this.trimmed[curve].plotData.variables.length) return; // prediction

      if (this.trimmed[curve].plotData.variables_value[variable] === undefined) return; // All other variables

      this.selectStyle = {
        left: event.pointerX + 'px',
        top: event.pointerY + 'px'
      };
      var variableName = this.data[curve].plotData.variables[variable];
      this.selectedVariable = this.$store.getters.availableParams.variable.find(function (v) {
        return v.name === variableName;
      });
      this.selectedModel = this.data[curve].params.model;
      this.selectedObservation = this.data[curve].params.observation;
      this.selectVisible = true;
    }
  },
  components: {
    Plotly: Plotly,
    SelectMenu: SelectMenu
  }
});
// CONCATENATED MODULE: ./src/plots/Breakdown.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_Breakdownvue_type_script_lang_js_ = (Breakdownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/plots/Breakdown.vue?vue&type=style&index=0&lang=css&
var Breakdownvue_type_style_index_0_lang_css_ = __webpack_require__("00ef");

// CONCATENATED MODULE: ./src/plots/Breakdown.vue






/* normalize component */

var Breakdown_component = Object(componentNormalizer["a" /* default */])(
  plots_Breakdownvue_type_script_lang_js_,
  Breakdownvue_type_template_id_01dbb149_render,
  Breakdownvue_type_template_id_01dbb149_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Breakdown = (Breakdown_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/FeatureImportance.vue?vue&type=template&id=300ca0af&
var FeatureImportancevue_type_template_id_300ca0af_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"feature-importance--plot"},[_c('Plotly',_vm._b({ref:"plot",on:{"plotly_click":_vm.onPlotlyClick}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false))],1)}
var FeatureImportancevue_type_template_id_300ca0af_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/FeatureImportance.vue?vue&type=template&id=300ca0af&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/FeatureImportance.vue?vue&type=script&lang=js&













//
//
//
//
//




var FeatureImportancevue_type_script_lang_js_Plotly = function Plotly() {
  return __webpack_require__.e(/* import() */ "chunk-7100a0c6").then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var FeatureImportancevue_type_script_lang_js_ = ({
  name: 'FeatureImportance',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String
  },
  data: function data() {
    return {
      selectedModel: null
    };
  },
  computed: Object(objectSpread2["a" /* default */])({
    trimmed: function trimmed() {
      var _this = this;

      var variables = new Set(this.data.map(function (d) {
        return d.plotData.variables.slice(0, _this.maxVariables);
      }).flat());
      return this.data.map(function (d) {
        if (d.plotData.variables.length <= _this.maxVariables) return d;

        var filter = function filter(v, i) {
          return variables.has(d.plotData.variables[i]);
        };

        return Object.assign({}, d, {
          plotData: {
            variables: d.plotData.variables.filter(filter),
            dropout_loss: d.plotData.dropout_loss.filter(filter),
            min: d.plotData.min.filter(filter),
            max: d.plotData.max.filter(filter),
            q1: d.plotData.q1.filter(filter),
            q3: d.plotData.q3.filter(filter),
            base: d.plotData.base
          }
        });
      });
    },
    traces: function traces() {
      var _this2 = this;

      return this.trimmed.map(function (d, i) {
        return {
          name: d.params.model.name,
          type: 'bar',
          orientation: 'h',
          y: d.plotData.variables.map(function (y) {
            return format.addNewLines(y, _this2.leftMargin);
          }),
          base: d.plotData.base,
          x: d.plotData.dropout_loss.map(function (x) {
            return x - d.plotData.base;
          }),
          text: d.plotData.dropout_loss.map(function (x) {
            return format.formatValue(x - d.plotData.base, true, '  ');
          }),
          textposition: _this2.displayBoxplots ? 'inside' : 'outside',
          hovertext: d.plotData.variables,
          textfont: {
            color: _this2.displayBoxplots ? 'white' : '#371ea3'
          },
          hoverinfo: 'template',
          hovertemplate: d.plotData.dropout_loss.map(function (x, i) {
            return format.formatValue(d.plotData.base) + ' => ' + format.formatValue(x);
          }),
          hoverlabel: {
            bgcolor: _this2.modelsColors[d.params.model.uuid],
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          marker: {
            color: _this2.modelsColors[d.params.model.uuid]
          },
          insidetextanchor: 'start',
          selectedpoints: _this2.selectedModel === d.params.model.uuid || _this2.selectedModel === null ? undefined : [] // undefined - all selected, [] - all unselected

        };
      }).concat(!this.displayBoxplots ? [] : this.trimmed.map(function (d, i) {
        return {
          name: d.params.model.name,
          type: 'box',
          orientation: 'h',
          y: d.plotData.variables.map(function (y) {
            return format.addNewLines(y, _this2.leftMargin);
          }),
          q1: d.plotData.q1,
          median: d.plotData.q1,
          // median is invisible, but need to be between q1 and q3
          q3: d.plotData.q3,
          marker: {
            color: _this2.selectedModel === d.params.model.uuid || _this2.selectedModel === null ? '#371ea3' : 'transparent'
          },
          line: {
            width: 1
          },
          fillcolor: _this2.selectedModel === d.params.model.uuid || _this2.selectedModel === null ? '#371ea3' : 'transparent',
          lowerfence: d.plotData.min,
          upperfence: d.plotData.max,
          showlegend: false,
          hoverinfo: 'none',
          whiskerwidth: 0
        };
      }));
    },
    layout: function layout() {
      return {
        yaxis: {
          type: 'category',
          autorange: 'reversed',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false
        },
        xaxis: {
          type: 'linear',
          title: {
            text: 'dropout loss',
            standoff: 10
          },
          gridwidth: 2,
          range: this.range,
          fixedrange: true,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        hovermode: 'closest',
        boxgap: 0.2,
        boxgroupgap: 0.6,
        bargap: 0.2,
        boxmode: 'group',
        showlegend: false,
        margin: {
          l: this.leftMargin,
          t: 0,
          b: 45,
          r: 5
        },
        dragmode: 'pan',
        shapes: this.trimmed.map(function (d) {
          return {
            type: 'line',
            x0: d.plotData.base,
            x1: d.plotData.base,
            y0: 0,
            y1: 1,
            yref: 'paper',
            xref: 'x',
            line: {
              color: 'black',
              width: 2,
              dash: 'dot'
            }
          };
        })
      };
    },
    config: function config() {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d2', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      };
    },
    minimalValue: function minimalValue() {
      return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(this.trimmed.map(function (d) {
        return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.min).concat([d.plotData.base]));
      })));
    },
    maximalValue: function maximalValue() {
      return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(this.trimmed.map(function (d) {
        return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.max));
      })));
    },
    range: function range() {
      var len = this.maximalValue - this.minimalValue; // margin = 0.5 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )

      var margin = 0.5 * 100 * len / (this.width - 100 - this.leftMargin - 5);
      return [this.minimalValue - margin, this.maximalValue + margin];
    },
    layoutPatches: function layoutPatches() {
      return {
        'xaxis.range': this.range,
        'margin.l': this.leftMargin
      };
    },
    maxVariables: function maxVariables() {
      return this.$store.getters.getOption('featureimportance_max_variables');
    },
    leftMargin: function leftMargin() {
      return this.$store.getters.getOption('left_margin');
    },
    displayBoxplots: function displayBoxplots() {
      return this.$store.getters.getOption('featureimportance_boxplots');
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['modelsColors'])),
  methods: {
    onPlotlyClick: function onPlotlyClick(e) {
      var _this3 = this;

      var points = e.data.points.filter(function (p) {
        return p.curveNumber < _this3.trimmed.length;
      }); // Boxplots are after all bars

      if (points.length === 0) return;
      var yaxis = points[0].yaxis; // All points have the same
      // I do not know why it works, I just found this by experiments

      var barWidth = (yaxis._length - yaxis._m - yaxis._b) / (this.trimmed.length * yaxis._categories.length);
      var barsTop = yaxis.d2p(points[0].y) - 0.5 * barWidth * this.trimmed.length; // Center - half of widths sum

      var curveNum = Math.floor((e.data.event.pointerY - barsTop) / barWidth); // Assuming plot is at top:0

      if (curveNum >= this.trimmed.length || curveNum < 0) return;
      var model = this.trimmed[curveNum].params.model.uuid; // If this model is already selected, then unselect

      this.selectedModel = this.selectedModel === model ? null : model;
    }
  },
  components: {
    Plotly: FeatureImportancevue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/FeatureImportance.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_FeatureImportancevue_type_script_lang_js_ = (FeatureImportancevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/plots/FeatureImportance.vue





/* normalize component */

var FeatureImportance_component = Object(componentNormalizer["a" /* default */])(
  plots_FeatureImportancevue_type_script_lang_js_,
  FeatureImportancevue_type_template_id_300ca0af_render,
  FeatureImportancevue_type_template_id_300ca0af_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FeatureImportance = (FeatureImportance_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/CategoricalDependence.vue?vue&type=template&id=245fd492&
var CategoricalDependencevue_type_template_id_245fd492_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"categorical-dependence-plot"},[_c('Plotly',_vm._b({ref:"plot"},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false))],1)}
var CategoricalDependencevue_type_template_id_245fd492_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/CategoricalDependence.vue?vue&type=template&id=245fd492&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/CategoricalDependence.vue?vue&type=script&lang=js&






//
//
//
//
//




var CategoricalDependencevue_type_script_lang_js_Plotly = function Plotly() {
  return __webpack_require__.e(/* import() */ "chunk-7100a0c6").then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var CategoricalDependencevue_type_script_lang_js_ = ({
  name: 'CategoricalDependence',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String
  },
  computed: Object(objectSpread2["a" /* default */])({
    traces: function traces() {
      var _this = this;

      return this.data.map(function (d, i) {
        return {
          name: d.params.model.name,
          type: 'bar',
          orientation: 'h',
          base: d.plotData.base,
          y: d.plotData.x.map(function (y) {
            return format.addNewLines(y, _this.leftMargin);
          }),
          x: d.plotData.y.map(function (x) {
            return x - d.plotData.base;
          }),
          text: d.plotData.y.map(function (x) {
            return format.formatValue(x - d.plotData.base, true, ' ');
          }),
          textposition: 'outside',
          hoverinfo: 'template',
          hovertemplate: d.plotData.y.map(function (x) {
            return format.formatValue(x - d.plotData.base, true);
          }),
          hoverlabel: {
            bgcolor: _this.modelsColors[d.params.model.uuid],
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          marker: {
            color: _this.modelsColors[d.params.model.uuid]
          },
          insidetextanchor: 'start'
        };
      });
    },
    layout: function layout() {
      return {
        yaxis: {
          type: 'category',
          autorange: 'reversed',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false
        },
        xaxis: {
          type: 'linear',
          title: {
            text: this.plotType === 'AccumulatedDependence' ? 'Accumulated prediction' : 'Average prediction',
            standoff: 10
          },
          gridwidth: 2,
          range: this.range,
          fixedrange: true,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        hovermode: 'closest',
        showlegend: false,
        margin: {
          l: this.leftMargin,
          t: 0,
          b: 45,
          r: 5
        },
        dragmode: 'pan',
        shapes: this.data.map(function (d) {
          return {
            type: 'line',
            x0: d.plotData.base,
            x1: d.plotData.base,
            y0: 0,
            y1: 1,
            yref: 'paper',
            xref: 'x',
            line: {
              color: 'black',
              dash: 'dot',
              width: 2
            }
          };
        })
      };
    },
    config: function config() {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      };
    },
    minimalValue: function minimalValue() {
      return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(this.data.map(function (d) {
        return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.y).concat([d.plotData.base]));
      })));
    },
    maximalValue: function maximalValue() {
      return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(this.data.map(function (d) {
        return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.y).concat([d.plotData.base]));
      })));
    },
    range: function range() {
      var len = this.maximalValue - this.minimalValue; // margin = 0.5 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )

      var margin = 0.5 * 120 * len / (this.width - 120 - this.leftMargin - 5);
      return [this.minimalValue - margin, this.maximalValue + margin];
    },
    layoutPatches: function layoutPatches() {
      return {
        'xaxis.range': this.range,
        'margin.l': this.leftMargin
      };
    },
    leftMargin: function leftMargin() {
      return this.$store.getters.getOption('left_margin_values');
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['modelsColors'])),
  components: {
    Plotly: CategoricalDependencevue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/CategoricalDependence.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_CategoricalDependencevue_type_script_lang_js_ = (CategoricalDependencevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/plots/CategoricalDependence.vue





/* normalize component */

var CategoricalDependence_component = Object(componentNormalizer["a" /* default */])(
  plots_CategoricalDependencevue_type_script_lang_js_,
  CategoricalDependencevue_type_template_id_245fd492_render,
  CategoricalDependencevue_type_template_id_245fd492_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CategoricalDependence = (CategoricalDependence_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/LinearDependence.vue?vue&type=template&id=34925c04&
var LinearDependencevue_type_template_id_34925c04_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"linear-dependence-plot"},[_c('Plotly',_vm._b({ref:"plot",on:{"plotly_click":_vm.onPlotlyClick}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout },false))],1)}
var LinearDependencevue_type_template_id_34925c04_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/LinearDependence.vue?vue&type=template&id=34925c04&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/LinearDependence.vue?vue&type=script&lang=js&




//
//
//
//
//



var LinearDependencevue_type_script_lang_js_Plotly = function Plotly() {
  return __webpack_require__.e(/* import() */ "chunk-7100a0c6").then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var LinearDependencevue_type_script_lang_js_ = ({
  name: 'LinearDependence',
  props: {
    data: Array,
    plotType: String
  },
  computed: Object(objectSpread2["a" /* default */])({
    traces: function traces() {
      var _this = this;

      return this.data.map(function (d, i) {
        return {
          name: d.params.model.name + ' - ' + d.params.variable.name,
          type: 'scatter',
          mode: 'lines',
          x: d.plotData.x,
          y: d.plotData.y,
          hoverinfo: 'none',
          line: {
            shape: 'spline'
          },
          marker: {
            color: _this.modelsColors[d.params.model.uuid]
          }
        };
      });
    },
    layout: function layout() {
      return {
        xaxis: {
          type: 'linear',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          title: {
            text: this.data.length > 0 ? format.formatTitle(this.data[0].params.variable.name) : '',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          title: {
            text: this.plotType === 'AccumulatedDependence' ? 'Accumulated prediction' : 'Average prediction',
            standoff: 10
          },
          gridwidth: 2,
          fixedrange: true,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        showlegend: false,
        margin: {
          l: 60,
          t: 0,
          b: 45,
          r: 5
        },
        dragmode: 'pan'
      };
    },
    config: function config() {
      return {
        displaylogo: false,
        displayModeBar: true,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      };
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['modelsColors'])),
  methods: {
    onPlotlyClick: function onPlotlyClick() {}
  },
  components: {
    Plotly: LinearDependencevue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/LinearDependence.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_LinearDependencevue_type_script_lang_js_ = (LinearDependencevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/plots/LinearDependence.vue





/* normalize component */

var LinearDependence_component = Object(componentNormalizer["a" /* default */])(
  plots_LinearDependencevue_type_script_lang_js_,
  LinearDependencevue_type_template_id_34925c04_render,
  LinearDependencevue_type_template_id_34925c04_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var LinearDependence = (LinearDependence_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/NumericalCeterisParibus.vue?vue&type=template&id=46b62688&
var NumericalCeterisParibusvue_type_template_id_46b62688_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"numerical-cateris-paribus-plot"},[_c('Plotly',_vm._b({ref:"plot",on:{"plotly_click":_vm.onPlotlyClick}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout },false))],1)}
var NumericalCeterisParibusvue_type_template_id_46b62688_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/NumericalCeterisParibus.vue?vue&type=template&id=46b62688&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/NumericalCeterisParibus.vue?vue&type=script&lang=js&









//
//
//
//
//



var NumericalCeterisParibusvue_type_script_lang_js_Plotly = function Plotly() {
  return __webpack_require__.e(/* import() */ "chunk-7100a0c6").then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var NumericalCeterisParibusvue_type_script_lang_js_ = ({
  name: 'NumericalCaterisParibus',
  props: {
    data: Array,
    plotType: String
  },
  computed: Object(objectSpread2["a" /* default */])({
    traces: function traces() {
      var _this = this;

      return this.data.map(function (d, i) {
        return [{
          name: d.params.model.name + ' - ' + d.params.variable.name,
          type: 'scatter',
          mode: 'lines',
          x: d.plotData.x,
          y: d.plotData.y,
          hoverinfo: 'none',
          line: {
            shape: 'spline'
          },
          marker: {
            color: _this.modelsColors[d.params.model.uuid]
          }
        }, {
          name: d.params.model.name + ' - ' + d.params.variable.name,
          type: 'scatter',
          mode: 'marker',
          x: [d.plotData.observation[d.plotData.variable]],
          y: [d.plotData.observation['_yhat_']],
          text: '<b>Prediction: ' + d.plotData.observation['_yhat_'] + '</b><br><br>' + Object.keys(d.plotData.observation).filter(function (o) {
            return o.length > 0 && o.charAt(0) !== '_';
          }).map(function (o) {
            return o + ': ' + d.plotData.observation[o];
          }).join('<br>'),
          hoverinfo: 'text',
          marker: {
            color: '#371ea3',
            size: 8
          },
          hoverlabel: {
            bgcolor: 'rgba(0,0,0,0.5)',
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          }
        }];
      }).flat();
    },
    layout: function layout() {
      return {
        xaxis: {
          type: 'linear',
          gridwidth: 2,
          fixedrange: true,
          showspikes: true,
          zeroline: false,
          title: {
            text: this.data.length > 0 ? format.formatTitle(this.data[0].params.variable.name) : '',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          title: {
            text: 'prediction',
            standoff: 10
          },
          showspikes: true,
          gridwidth: 2,
          fixedrange: true,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        showlegend: false,
        margin: {
          l: 60,
          t: 0,
          b: 45,
          r: 5
        },
        dragmode: 'pan',
        hovermode: 'closest'
      };
    },
    config: function config() {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      };
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['modelsColors'])),
  methods: {
    onPlotlyClick: function onPlotlyClick() {}
  },
  components: {
    Plotly: NumericalCeterisParibusvue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/NumericalCeterisParibus.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_NumericalCeterisParibusvue_type_script_lang_js_ = (NumericalCeterisParibusvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/plots/NumericalCeterisParibus.vue





/* normalize component */

var NumericalCeterisParibus_component = Object(componentNormalizer["a" /* default */])(
  plots_NumericalCeterisParibusvue_type_script_lang_js_,
  NumericalCeterisParibusvue_type_template_id_46b62688_render,
  NumericalCeterisParibusvue_type_template_id_46b62688_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var NumericalCeterisParibus = (NumericalCeterisParibus_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/CategoricalCeterisParibus.vue?vue&type=template&id=af75ba16&
var CategoricalCeterisParibusvue_type_template_id_af75ba16_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"categorical-dependence-plot"},[_c('Plotly',_vm._b({ref:"plot"},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false))],1)}
var CategoricalCeterisParibusvue_type_template_id_af75ba16_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/CategoricalCeterisParibus.vue?vue&type=template&id=af75ba16&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/CategoricalCeterisParibus.vue?vue&type=script&lang=js&






//
//
//
//
//




var CategoricalCeterisParibusvue_type_script_lang_js_Plotly = function Plotly() {
  return __webpack_require__.e(/* import() */ "chunk-7100a0c6").then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var CategoricalCeterisParibusvue_type_script_lang_js_ = ({
  name: 'CategoricalDependence',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String
  },
  computed: Object(objectSpread2["a" /* default */])({
    traces: function traces() {
      var _this = this;

      return this.data.map(function (d, i) {
        return {
          name: d.params.model.name + ' - ' + d.params.variable.name,
          type: 'bar',
          orientation: 'h',
          base: d.plotData.observation['_yhat_'],
          y: d.plotData.x.map(function (y) {
            return format.addNewLines(y, _this.leftMargin);
          }),
          x: d.plotData.y.map(function (x) {
            return x - d.plotData.observation['_yhat_'];
          }),
          text: d.plotData.y.map(function (x) {
            return x - d.plotData.observation['_yhat_'];
          }).map(function (diff) {
            return diff >= 0 ? '    +' + Math.round(diff) : Math.round(diff) + '    ';
          }),
          textposition: 'inside',
          textfont: {
            color: 'white'
          },
          hoverinfo: 'none',
          marker: {
            color: _this.modelsColors[d.params.model.uuid]
          },
          insidetextanchor: 'start'
        };
      });
    },
    layout: function layout() {
      return {
        yaxis: {
          type: 'category',
          autorange: 'reversed',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false
        },
        xaxis: {
          type: 'linear',
          title: {
            text: 'prediction',
            standoff: 10
          },
          gridwidth: 2,
          range: this.range,
          fixedrange: true,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        showlegend: false,
        margin: {
          l: this.leftMargin,
          t: 0,
          b: 45,
          r: 5
        },
        dragmode: 'pan',
        shapes: this.data.map(function (d) {
          return {
            type: 'line',
            x0: d.plotData.observation['_yhat_'],
            x1: d.plotData.observation['_yhat_'],
            y0: 0,
            y1: 1,
            yref: 'paper',
            xref: 'x',
            line: {
              color: 'black',
              width: 2
            }
          };
        })
      };
    },
    config: function config() {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      };
    },
    minimalValue: function minimalValue() {
      return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(this.data.map(function (d) {
        return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.y).concat([d.plotData.observation['_yhat_'], d.plotData.min]));
      })));
    },
    maximalValue: function maximalValue() {
      return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(this.data.map(function (d) {
        return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.y).concat([d.plotData.observation['_yhat_'], d.plotData.max]));
      })));
    },
    range: function range() {
      var len = this.maximalValue - this.minimalValue; // margin = 0.5 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )

      var margin = 0.5 * 80 * len / (this.width - 120 - this.leftMargin - 5);
      return [this.minimalValue - margin, this.maximalValue + margin];
    },
    layoutPatches: function layoutPatches() {
      return {
        'xaxis.range': this.range,
        'margin.l': this.leftMargin
      };
    },
    leftMargin: function leftMargin() {
      return this.$store.getters.getOption('left_margin_values');
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['modelsColors'])),
  components: {
    Plotly: CategoricalCeterisParibusvue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/CategoricalCeterisParibus.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_CategoricalCeterisParibusvue_type_script_lang_js_ = (CategoricalCeterisParibusvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/plots/CategoricalCeterisParibus.vue





/* normalize component */

var CategoricalCeterisParibus_component = Object(componentNormalizer["a" /* default */])(
  plots_CategoricalCeterisParibusvue_type_script_lang_js_,
  CategoricalCeterisParibusvue_type_template_id_af75ba16_render,
  CategoricalCeterisParibusvue_type_template_id_af75ba16_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CategoricalCeterisParibus = (CategoricalCeterisParibus_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/SHAPValues.vue?vue&type=template&id=37e7186c&
var SHAPValuesvue_type_template_id_37e7186c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"shap-values-plot"},[_c('Plotly',_vm._b({ref:"plot",on:{"plotly_click":_vm.onPlotlyClick}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false))],1)}
var SHAPValuesvue_type_template_id_37e7186c_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/SHAPValues.vue?vue&type=template&id=37e7186c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/SHAPValues.vue?vue&type=script&lang=js&













//
//
//
//
//




var SHAPValuesvue_type_script_lang_js_Plotly = function Plotly() {
  return __webpack_require__.e(/* import() */ "chunk-7100a0c6").then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var SHAPValuesvue_type_script_lang_js_ = ({
  name: 'SHAPValues',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String
  },
  data: function data() {
    return {
      selectedModel: null
    };
  },
  computed: Object(objectSpread2["a" /* default */])({
    trimmed: function trimmed() {
      var _this = this;

      var variables = new Set(this.data.map(function (d) {
        return d.plotData.variables.slice(0, _this.maxVariables);
      }).flat());
      return this.data.map(function (d) {
        if (d.plotData.variables.length <= _this.maxVariables) return d;

        var filter = function filter(v, i) {
          return variables.has(d.plotData.variables[i]);
        };

        return Object.assign({}, d, {
          plotData: {
            variables_value: d.plotData.variables_value.filter(filter),
            variables: d.plotData.variables.filter(filter),
            mean: d.plotData.mean.filter(filter),
            min: d.plotData.min.filter(filter),
            max: d.plotData.max.filter(filter),
            q1: d.plotData.q1.filter(filter),
            q3: d.plotData.q3.filter(filter),
            intercept: d.plotData.intercept
          }
        });
      });
    },
    traces: function traces() {
      var _this2 = this;

      return this.trimmed.map(function (d, i) {
        return {
          name: d.params.model.name,
          type: 'bar',
          orientation: 'h',
          y: d.plotData.variables.map(function (y, i) {
            return format.addNewLines(format.formatTitle(y) + ' = ' + d.plotData.variables_value[i], _this2.leftMargin);
          }),
          base: d.plotData.intercept,
          x: d.plotData.mean,
          text: d.plotData.mean.map(function (x) {
            return format.formatValue(x, true, '  ');
          }),
          textposition: _this2.displayBoxplots ? 'inside' : 'outside',
          hovertext: d.plotData.variables,
          textfont: {
            color: _this2.displayBoxplots ? 'white' : '#371ea3'
          },
          hoverinfo: 'template',
          hovertemplate: d.plotData.mean.map(function (x, i) {
            return format.formatValue(d.plotData.intercept) + ' => ' + format.formatValue(x + d.plotData.intercept);
          }),
          hoverlabel: {
            bgcolor: _this2.modelsColors[d.params.model.uuid],
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          marker: {
            color: _this2.modelsColors[d.params.model.uuid]
          },
          insidetextanchor: 'start',
          selectedpoints: _this2.selectedModel === d.params.model.uuid || _this2.selectedModel === null ? undefined : [] // undefined - all selected, [] - all unselected

        };
      }).concat(!this.displayBoxplots ? [] : this.trimmed.map(function (d, i) {
        return {
          name: d.params.model.name,
          type: 'box',
          orientation: 'h',
          y: d.plotData.variables.map(function (y, i) {
            return format.addNewLines(format.formatTitle(y) + ' = ' + d.plotData.variables_value[i], _this2.leftMargin);
          }),
          q1: d.plotData.q1.map(function (v) {
            return v + d.plotData.intercept;
          }),
          median: d.plotData.q1.map(function (v) {
            return v + d.plotData.intercept;
          }),
          // median is invisible, but need to be between q1 and q3
          q3: d.plotData.q3.map(function (v) {
            return v + d.plotData.intercept;
          }),
          marker: {
            color: _this2.selectedModel === d.params.model.uuid || _this2.selectedModel === null ? '#371ea3' : 'transparent'
          },
          line: {
            width: 1
          },
          fillcolor: _this2.selectedModel === d.params.model.uuid || _this2.selectedModel === null ? '#371ea3' : 'transparent',
          lowerfence: d.plotData.min.map(function (v) {
            return v + d.plotData.intercept;
          }),
          upperfence: d.plotData.max.map(function (v) {
            return v + d.plotData.intercept;
          }),
          showlegend: false,
          hoverinfo: 'none',
          whiskerwidth: 0
        };
      }));
    },
    layout: function layout() {
      return {
        yaxis: {
          type: 'category',
          autorange: 'reversed',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false
        },
        xaxis: {
          type: 'linear',
          title: {
            text: 'contribution',
            standoff: 10
          },
          gridwidth: 2,
          range: this.range,
          fixedrange: true,
          zeroline: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        hovermode: 'closest',
        boxmode: 'group',
        boxgap: 0.2,
        boxgroupgap: 0.6,
        bargap: 0.2,
        showlegend: false,
        margin: {
          l: this.leftMargin,
          t: 0,
          b: 45,
          r: 5
        },
        dragmode: 'pan',
        shapes: this.trimmed.map(function (d) {
          return {
            type: 'line',
            x0: d.plotData.intercept,
            x1: d.plotData.intercept,
            y0: 0,
            y1: 1,
            yref: 'paper',
            xref: 'x',
            line: {
              color: 'black',
              width: 2,
              dash: 'dot'
            }
          };
        })
      };
    },
    config: function config() {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d2', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      };
    },
    minimalValue: function minimalValue() {
      return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(this.trimmed.map(function (d) {
        return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.min).concat([0])) + d.plotData.intercept;
      })));
    },
    maximalValue: function maximalValue() {
      return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(this.trimmed.map(function (d) {
        return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.max).concat([0])) + d.plotData.intercept;
      })));
    },
    range: function range() {
      var len = this.maximalValue - this.minimalValue; // margin = 0.5 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )

      var margin = 0.5 * 120 * len / (this.width - 120 - this.leftMargin - 5);
      return [this.minimalValue - margin, this.maximalValue + margin];
    },
    layoutPatches: function layoutPatches() {
      return {
        'xaxis.range': this.range,
        'margin.l': this.leftMargin
      };
    },
    maxVariables: function maxVariables() {
      return this.$store.getters.getOption('shapvalues_max_variables');
    },
    leftMargin: function leftMargin() {
      return this.$store.getters.getOption('left_margin');
    },
    displayBoxplots: function displayBoxplots() {
      return this.$store.getters.getOption('shapvalues_boxplots');
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['modelsColors'])),
  methods: {
    onPlotlyClick: function onPlotlyClick(e) {
      var _this3 = this;

      var points = e.data.points.filter(function (p) {
        return p.curveNumber < _this3.trimmed.length;
      }); // Boxplots are after all bars

      if (points.length === 0) return;
      var yaxis = points[0].yaxis; // All points have the same
      // I do not know why it works, I just found this by experiments

      var barWidth = (yaxis._length - yaxis._m - yaxis._b) / (this.trimmed.length * yaxis._categories.length);
      var barsTop = yaxis.d2p(points[0].y) - 0.5 * barWidth * this.trimmed.length; // Center - half of widths sum

      var curveNum = Math.floor((e.data.event.pointerY - barsTop) / barWidth); // Assuming plot is at top:0

      if (curveNum >= this.trimmed.length || curveNum < 0) return;
      var model = this.trimmed[curveNum].params.model.uuid; // If this model is already selected, then unselect

      this.selectedModel = this.selectedModel === model ? null : model;
    }
  },
  components: {
    Plotly: SHAPValuesvue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/SHAPValues.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_SHAPValuesvue_type_script_lang_js_ = (SHAPValuesvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/plots/SHAPValues.vue





/* normalize component */

var SHAPValues_component = Object(componentNormalizer["a" /* default */])(
  plots_SHAPValuesvue_type_script_lang_js_,
  SHAPValuesvue_type_template_id_37e7186c_render,
  SHAPValuesvue_type_template_id_37e7186c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SHAPValues = (SHAPValues_component.exports);
// CONCATENATED MODULE: ./src/plots/PlotsInfo.js















/* harmony default export */ var PlotsInfo = ({
  plotComponents: {
    Breakdown: Breakdown,
    FeatureImportance: FeatureImportance,
    CategoricalDependence: CategoricalDependence,
    LinearDependence: LinearDependence,
    NumericalCeterisParibus: NumericalCeterisParibus,
    CategoricalCeterisParibus: CategoricalCeterisParibus,
    SHAPValues: SHAPValues
  },
  canMerge: function canMerge(slot1, slot2) {
    if (!slot1 || !slot2 || slot1.uuid === slot2.uuid || slot1.plotType !== slot2.plotType) return false;
    var type = slot1.plotType;

    var getPropsUUID = function getPropsUUID(slot, propName) {
      return slot.localParams.map(function (props) {
        return (props[propName] || {}).uuid;
      });
    };

    var sameVariable = new Set([].concat(Object(toConsumableArray["a" /* default */])(getPropsUUID(slot1, 'variable')), Object(toConsumableArray["a" /* default */])(getPropsUUID(slot2, 'variable')))).size === 1;
    var sameObservation = new Set([].concat(Object(toConsumableArray["a" /* default */])(getPropsUUID(slot1, 'observation')), Object(toConsumableArray["a" /* default */])(getPropsUUID(slot2, 'observation')))).size === 1;
    if (type === 'PartialDependence' || type === 'AccumulatedDependence' || type === 'CeterisParibus') return sameVariable;
    if (type === 'FeatureImportance') return true;
    if (type === 'SHAPValues') return sameObservation;
    return false;
  },
  lockableParams: {
    // for each plotType
    Breakdown: ['observation'],
    FeatureImportance: [],
    PartialDependence: ['variable'],
    AccumulatedDependence: ['variable'],
    CeterisParibus: ['variable', 'observation'],
    SHAPValues: ['observation']
  },
  isLinear: function isLinear(plotComponent) {
    return ['LinearDependence', 'NumericalCeterisParibus'].includes(plotComponent);
  },
  isBars: function isBars(plotComponent) {
    return ['FeatureImportance', 'CategoricalDependence', 'CategoricalCeterisParibus', 'SHAPValues'].includes(plotComponent);
  },
  getPlotDesc: function getPlotDesc(plotType) {
    if (plotType === 'Breakdown') return 'Break Down shows contributions of every variable to a final prediction';
    return '';
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SidepanelDropdown.vue?vue&type=script&lang=js&




















//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SidepanelDropdownvue_type_script_lang_js_ = ({
  name: 'SidepanelDropdown',
  data: function data() {
    return {
      selectedGroup: 'model',
      selectedValues: [],
      colorSelector: null // uuid of model when open

    };
  },
  watch: {
    availableSlots: function availableSlots() {
      this.$emit('updateSlotsList', this.availableSlots);
    },
    'availableParams.model': function availableParamsModel(newValue, oldValue) {
      if (this.selectedGroup !== 'model') return; // filter params that are not available anymore

      this.selectedValues = this.selectedValues.filter(function (sel) {
        return newValue.find(function (x) {
          return x.uuid === sel.uuid;
        });
      });
      if (this.selectedValues.length === 0) this.selectedValues = newValue.slice(0, 1);
    }
  },
  computed: Object(objectSpread2["a" /* default */])({
    displayedValue: function displayedValue() {
      return this.selectedValues.map(function (v) {
        return v.name || v || '';
      }).map(format.formatTitle).join(', ');
    },
    displayedGroup: function displayedGroup() {
      return format.firstCharUpper(this.selectedGroup);
    },

    /* Slots for selected params, will be emitted to Sidepanel */
    availableSlots: function availableSlots() {
      var _this = this;

      // it forces refreshing slots id, when any slot is added to playground
      if (!this.allSlots) return []; // function compares two params object based on uuid (names may differ)

      var sameParams = function sameParams(a, b) {
        var uuidA = Object.keys(a).reduce(function (acu, k) {
          acu[k] = a[k].uuid;
          return acu;
        }, {});
        var uuidB = Object.keys(b).reduce(function (acu, k) {
          acu[k] = b[k].uuid;
          return acu;
        }, {});
        return !Object(toConsumableArray["a" /* default */])(new Set([].concat(Object(toConsumableArray["a" /* default */])(Object.keys(uuidA)), Object(toConsumableArray["a" /* default */])(Object.keys(uuidB))))).find(function (k) {
          return uuidA[k] !== uuidB[k];
        });
      };

      if (this.selectedGroup === 'model') {
        var plotTypes = this.selectedValues.map(function (m) {
          return _this.getAvailableSlots({
            model: m
          });
        }).flat().reduce(function (acu, slot) {
          if (!acu[slot.plotType]) acu[slot.plotType] = slot;else {
            if (!PlotsInfo.canMerge(acu[slot.plotType], slot)) return acu;
            acu[slot.plotType].localParams = [].concat(Object(toConsumableArray["a" /* default */])(acu[slot.plotType].localParams), Object(toConsumableArray["a" /* default */])(slot.localParams.filter(function (a) {
              return !acu[slot.plotType].localParams.find(function (b) {
                return sameParams(a, b);
              });
            })));
          }
          return acu;
        }, {});
        return Object.values(plotTypes).filter(function (slot) {
          return slot.localParams.length >= _this.selectedValues.length;
        });
      } else if (this.selectedGroup === 'other' && this.selectedValues.includes('clipboard')) {
        return this.archivedSlots;
      }

      return [];
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['availableParams', 'getGlobalParam', 'modelsColors', 'palette', 'archivedSlots', 'getAvailableSlots', 'allSlots'])),
  filters: {
    formatTitle: format.formatTitle
  },
  methods: {
    isSelected: function isSelected(group, value) {
      return this.selectedGroup === group && this.selectedValues.find(function (s) {
        return s === value || (s || {}).uuid === value;
      });
    },
    select: function select(group, value) {
      this.selectedGroup = group;
      this.selectedValues = [value];
      if (Object.keys(this.availableParams).includes(group)) this.$store.commit('setGlobalParam', {
        name: group,
        value: value
      });
    },
    addSelect: function addSelect(group, value) {
      if (this.selectedGroup !== group) this.select(group, value);else this.selectedValues = [].concat(Object(toConsumableArray["a" /* default */])(this.selectedValues), [value]);
    },
    removeSelect: function removeSelect(value) {
      if (this.selectedValues.length > 1) this.selectedValues = this.selectedValues.filter(function (s) {
        return s !== value && (s || {}).uuid !== value;
      });
    },
    setColor: function setColor(uuid, color) {
      this.colorSelector = null;
      this.$store.commit('setColor', {
        uuid: uuid,
        color: color
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/SidepanelDropdown.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SidepanelDropdownvue_type_script_lang_js_ = (SidepanelDropdownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SidepanelDropdown.vue?vue&type=style&index=0&lang=css&
var SidepanelDropdownvue_type_style_index_0_lang_css_ = __webpack_require__("774b");

// CONCATENATED MODULE: ./src/components/SidepanelDropdown.vue






/* normalize component */

var SidepanelDropdown_component = Object(componentNormalizer["a" /* default */])(
  components_SidepanelDropdownvue_type_script_lang_js_,
  SidepanelDropdownvue_type_template_id_ab4572a4_render,
  SidepanelDropdownvue_type_template_id_ab4572a4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SidepanelDropdown = (SidepanelDropdown_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SidepanelHelp.vue?vue&type=template&id=d570f4ba&
var SidepanelHelpvue_type_template_id_d570f4ba_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sidepanel-help"},[_c('span',{staticClass:"big-number"},[_vm._v(_vm._s(_vm.num))]),_c('div',{staticClass:"desc"},[_vm._v(_vm._s(_vm.text))]),_c('font-awesome-icon',{staticClass:"close-button",attrs:{"icon":['far', 'times-circle']},on:{"click":function($event){return _vm.$emit('close')}}})],1)}
var SidepanelHelpvue_type_template_id_d570f4ba_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SidepanelHelp.vue?vue&type=template&id=d570f4ba&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SidepanelHelp.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
/* harmony default export */ var SidepanelHelpvue_type_script_lang_js_ = ({
  name: 'SidepanelHelp',
  props: {
    num: Number,
    text: String
  }
});
// CONCATENATED MODULE: ./src/components/SidepanelHelp.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SidepanelHelpvue_type_script_lang_js_ = (SidepanelHelpvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SidepanelHelp.vue?vue&type=style&index=0&lang=css&
var SidepanelHelpvue_type_style_index_0_lang_css_ = __webpack_require__("8ff1");

// CONCATENATED MODULE: ./src/components/SidepanelHelp.vue






/* normalize component */

var SidepanelHelp_component = Object(componentNormalizer["a" /* default */])(
  components_SidepanelHelpvue_type_script_lang_js_,
  SidepanelHelpvue_type_template_id_d570f4ba_render,
  SidepanelHelpvue_type_template_id_d570f4ba_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SidepanelHelp = (SidepanelHelp_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Sidepanel.vue?vue&type=script&lang=js&







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var Sidepanelvue_type_script_lang_js_ = ({
  name: 'Sidepanel',
  components: {
    SlotsListElement: SlotsListElement,
    SidepanelDropdown: SidepanelDropdown,
    SidepanelHelp: SidepanelHelp
  },
  data: function data() {
    return {
      open: true,
      dropzoneActive: false,
      dropzoneVisible: false,
      slotsList: []
    };
  },
  computed: Object(objectSpread2["a" /* default */])({
    slotsCategories: function slotsCategories() {
      return Object(toConsumableArray["a" /* default */])(this.slotsList.reduce(function (set, x) {
        return set.add(x.plotCategory);
      }, new Set())).sort();
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['isElementClosed'])),
  methods: Object(objectSpread2["a" /* default */])({
    initDropzone: function initDropzone() {
      var _this = this;

      interact_min_default()(this.$el).dropzone({
        overlap: 'pointer',
        accept: '.block',
        ondropactivate: this.validateAndRun(function (target) {
          _this.dropzoneVisible = true;
        }),
        ondropdeactivate: this.validateAndRun(function (target) {
          _this.dropzoneVisible = _this.dropzoneActive = false;
        }, false),
        ondragenter: this.validateAndRun(function (target) {
          _this.dropzoneActive = true;
        }),
        ondragleave: this.validateAndRun(function (target) {
          _this.dropzoneActive = false;
        }),
        ondrop: this.validateAndRun(function (target) {
          return _this.onDrop(target);
        }, false)
      });
    },
    validateAndRun: function validateAndRun(f) {
      var mustBeMoving = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return function (e) {
        if (!e.relatedTarget.block) return;
        var target = e.relatedTarget.block;
        if (!target.moving && mustBeMoving) return;
        return f(target);
      };
    },
    onDrop: function onDrop(target) {
      if (target.slotv) this.archiveSlot(target.slotv);
    }
  }, Object(vuex_esm["d" /* mapMutations */])(['archiveSlot', 'closeElement'])),
  mounted: function mounted() {
    this.initDropzone();
  }
});
// CONCATENATED MODULE: ./src/components/Sidepanel.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Sidepanelvue_type_script_lang_js_ = (Sidepanelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Sidepanel.vue?vue&type=style&index=0&lang=css&
var Sidepanelvue_type_style_index_0_lang_css_ = __webpack_require__("ea04");

// CONCATENATED MODULE: ./src/components/Sidepanel.vue






/* normalize component */

var Sidepanel_component = Object(componentNormalizer["a" /* default */])(
  components_Sidepanelvue_type_script_lang_js_,
  Sidepanelvue_type_template_id_3f8132b8_render,
  Sidepanelvue_type_template_id_3f8132b8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Sidepanel = (Sidepanel_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Navbar.vue?vue&type=template&id=438e6cd2&
var Navbarvue_type_template_id_438e6cd2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"navbar"},[_c('div',{staticClass:"nav-item left options-toggle",on:{"click":function($event){return _vm.$emit('openSettings')}}},[_c('font-awesome-icon',{attrs:{"icon":"bars"}})],1),_c('img',{staticClass:"nav-item left logo",attrs:{"src":__webpack_require__("cf05")}}),_c('div',{staticClass:"nav-item left title"},[_vm._v("Arena")]),_c('PageSelector',{staticClass:"right"}),_c('SearchDropdown',{staticClass:"right",attrs:{"paramName":"variable"}}),_c('SearchDropdown',{staticClass:"right",attrs:{"paramName":"observation"}}),(!_vm.isElementClosed('help-3'))?_c('NavbarHelp',{staticClass:"right",attrs:{"num":3,"text":"Change parameters to manipulete plots"},on:{"close":function($event){return _vm.closeElement('help-3')}}}):_vm._e(),_c('div',{staticClass:"nav-item right button",staticStyle:{"margin-right":"10px"},on:{"click":function($event){return _vm.$store.dispatch('arrangeSlots')}}},[_c('span',{staticClass:"label"},[_vm._v("Auto arrange")])])],1)}
var Navbarvue_type_template_id_438e6cd2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Navbar.vue?vue&type=template&id=438e6cd2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SearchDropdown.vue?vue&type=template&id=3aa86351&
var SearchDropdownvue_type_template_id_3aa86351_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"search-dropdown",class:{ open: _vm.open },on:{"click":function($event){_vm.open = true}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.editText),expression:"editText"}],attrs:{"type":"text"},domProps:{"value":(_vm.editText)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"escape",undefined,$event.key,undefined)){ return null; }_vm.open = false},"input":function($event){if($event.target.composing){ return; }_vm.editText=$event.target.value}}}),_c('span',{staticClass:"param-name"},[_vm._v(_vm._s(_vm.displayedParamName))]),_c('span',{staticClass:"param-value"},[_vm._v(_vm._s(_vm.displayedValue))]),_c('font-awesome-icon',{staticClass:"caret",attrs:{"icon":"angle-down"}}),(_vm.open && _vm.availableOptions.length > 0)?_c('div',{staticClass:"options-list"},[_vm._l((_vm.availableOptions),function(o){return _c('SearchDropdownElement',{key:o.uuid,attrs:{"paramName":_vm.paramName,"paramValue":o},on:{"setParam":function($event){return _vm.setParam(o)}}})}),(_vm.pagesCount > 1)?_c('div',{staticClass:"page-row"},[_c('div',{staticClass:"page-left page-button",class:{ invisible: _vm.page <= 0},on:{"click":function($event){_vm.page -= 1}}},[_c('font-awesome-icon',{attrs:{"icon":"angle-left"}}),_vm._v(" Previous ")],1),_vm._v(" Page "+_vm._s(_vm.page + 1)+" of "+_vm._s(_vm.pagesCount)+" "),_c('div',{staticClass:"page-right page-button",class:{ invisible: _vm.page >= _vm.pagesCount },on:{"click":function($event){_vm.page += 1}}},[_vm._v(" Next "),_c('font-awesome-icon',{attrs:{"icon":"angle-right"}})],1)]):_vm._e()],2):_vm._e()],1)}
var SearchDropdownvue_type_template_id_3aa86351_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SearchDropdown.vue?vue&type=template&id=3aa86351&

// EXTERNAL MODULE: ./node_modules/fuse.js/dist/fuse.js
var dist_fuse = __webpack_require__("ffe7");
var fuse_default = /*#__PURE__*/__webpack_require__.n(dist_fuse);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SearchDropdownElement.vue?vue&type=template&id=0266174a&
var SearchDropdownElementvue_type_template_id_0266174a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"search-dropdown-element",class:{ active: _vm.isActive }},[_vm._v(" "+_vm._s(_vm._f("formatTitle")(_vm.paramValue.name))+" ")])}
var SearchDropdownElementvue_type_template_id_0266174a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SearchDropdownElement.vue?vue&type=template&id=0266174a&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SearchDropdownElement.vue?vue&type=script&lang=js&

//
//
//
//
//



/* harmony default export */ var SearchDropdownElementvue_type_script_lang_js_ = ({
  name: 'SearchDropdownElement',
  props: {
    paramName: String,
    paramValue: Object
  },
  data: function data() {
    return {
      initInfo: null
    };
  },
  computed: Object(objectSpread2["a" /* default */])({
    isActive: function isActive() {
      return this.paramValue && (this.getGlobalParam(this.paramName) || {}).uuid === this.paramValue.uuid;
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['getGlobalParam'])),
  methods: {},
  mounted: function mounted() {
    var _this = this;

    interact_min_default()(this.$el).pointerEvents({
      holdDuration: 250
    }).on('hold', function (event) {
      event.preventDefault();
      var slot = null;

      if (_this.paramName === 'observation' && _this.getGlobalParam('model')) {
        slot = {
          name: 'Break Down',
          plotType: 'Breakdown',
          localParams: [{
            observation: _this.paramValue,
            model: _this.getGlobalParam('model')
          }]
        };
      } else if (_this.paramName === 'variable' && _this.getGlobalParam('model')) {
        slot = {
          name: 'Partial Dependence',
          plotType: 'PartialDependence',
          localParams: [{
            variable: _this.paramValue,
            model: _this.getGlobalParam('model')
          }]
        };
      }

      if (_this.initInfo && slot) {
        _this.$store.dispatch('addSlotToPlayground', Object(objectSpread2["a" /* default */])({
          slot: slot
        }, _this.initInfo));
      }
    }).on('up', function (event) {
      if (!_this.initInfo) return;
      var timeDiff = event.timeStamp - _this.initInfo.timeStamp;
      if (timeDiff < 250) _this.$emit('setParam'); // when timeDiff < holdDuration it is click

      _this.initInfo = null;
    }).on('down', function (event) {
      _this.initInfo = {
        timeStamp: event.timeStamp,
        interaction: event.interaction,
        x: event.pageX,
        y: event.pageY
      };
    });
  },
  filters: {
    formatTitle: format.formatTitle
  }
});
// CONCATENATED MODULE: ./src/components/SearchDropdownElement.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SearchDropdownElementvue_type_script_lang_js_ = (SearchDropdownElementvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SearchDropdownElement.vue?vue&type=style&index=0&lang=css&
var SearchDropdownElementvue_type_style_index_0_lang_css_ = __webpack_require__("1e7c");

// CONCATENATED MODULE: ./src/components/SearchDropdownElement.vue






/* normalize component */

var SearchDropdownElement_component = Object(componentNormalizer["a" /* default */])(
  components_SearchDropdownElementvue_type_script_lang_js_,
  SearchDropdownElementvue_type_template_id_0266174a_render,
  SearchDropdownElementvue_type_template_id_0266174a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SearchDropdownElement = (SearchDropdownElement_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SearchDropdown.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var SearchDropdownvue_type_script_lang_js_ = ({
  name: 'SearchDropdown',
  props: {
    paramName: String
  },
  data: function data() {
    return {
      open: false,
      page: 0,
      itemsOnPage: 15,
      editText: ''
    };
  },
  watch: {
    open: function open(newValue, oldValue) {
      if (!newValue) {
        this.editText = '';
        this.page = 0;
      }
    },
    editText: function editText() {
      this.page = 0;
    }
  },
  computed: Object(objectSpread2["a" /* default */])({
    displayedValue: function displayedValue() {
      var valueName = (this.getGlobalParam(this.paramName) || {}).name;
      return format.formatTitle(valueName || '');
    },
    displayedParamName: function displayedParamName() {
      return format.firstCharUpper(this.paramName);
    },
    fuse: function fuse() {
      return new fuse_default.a(this.availableParams[this.paramName] || [], {
        keys: ['name']
      });
    },
    allAvailableOptions: function allAvailableOptions() {
      if (this.editText.length < 1) return this.availableParams[this.paramName] || [];
      return this.fuse.search(this.editText);
    },
    availableOptions: function availableOptions() {
      return this.allAvailableOptions.slice(this.page * this.itemsOnPage, (this.page + 1) * this.itemsOnPage);
    },
    pagesCount: function pagesCount() {
      return Math.ceil(this.allAvailableOptions.length / this.itemsOnPage);
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['availableParams', 'getGlobalParam'])),
  methods: Object(objectSpread2["a" /* default */])({
    onClickOutside: function onClickOutside(e) {
      if (!this.$el.contains(e.target)) this.open = false;
    },
    setParam: function setParam(p) {
      this.open = false;
      this.setGlobalParam({
        name: this.paramName,
        value: p
      });
    }
  }, Object(vuex_esm["d" /* mapMutations */])(['setGlobalParam'])),
  mounted: function mounted() {
    document.addEventListener('pointerdown', this.onClickOutside);
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('pointerdown', this.onClickOutside);
  },
  components: {
    SearchDropdownElement: SearchDropdownElement
  }
});
// CONCATENATED MODULE: ./src/components/SearchDropdown.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SearchDropdownvue_type_script_lang_js_ = (SearchDropdownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SearchDropdown.vue?vue&type=style&index=0&lang=css&
var SearchDropdownvue_type_style_index_0_lang_css_ = __webpack_require__("9efa");

// CONCATENATED MODULE: ./src/components/SearchDropdown.vue






/* normalize component */

var SearchDropdown_component = Object(componentNormalizer["a" /* default */])(
  components_SearchDropdownvue_type_script_lang_js_,
  SearchDropdownvue_type_template_id_3aa86351_render,
  SearchDropdownvue_type_template_id_3aa86351_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SearchDropdown = (SearchDropdown_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PageSelector.vue?vue&type=template&id=6f9a0c84&
var PageSelectorvue_type_template_id_6f9a0c84_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page-selector"},[_c('span',{staticClass:"title"},[_vm._v("Page")]),_c('span',{staticClass:"page-number"},[(_vm.pageNumber > 0)?_c('span',{staticClass:"button-left",on:{"click":function($event){return _vm.setPageNumber(_vm.pageNumber - 1)}}},[_c('font-awesome-icon',{attrs:{"icon":"minus-square"}})],1):_vm._e(),_vm._v(" "+_vm._s(_vm.pageNumber)+" "),_c('span',{staticClass:"button-right",on:{"click":function($event){return _vm.setPageNumber(_vm.pageNumber + 1)}}},[_c('font-awesome-icon',{attrs:{"icon":"plus-square"}})],1)])])}
var PageSelectorvue_type_template_id_6f9a0c84_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/PageSelector.vue?vue&type=template&id=6f9a0c84&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PageSelector.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var PageSelectorvue_type_script_lang_js_ = ({
  name: 'PageSelector',
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapGetters */])(['pageNumber'])),
  methods: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["d" /* mapMutations */])(['setPageNumber']))
});
// CONCATENATED MODULE: ./src/components/PageSelector.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PageSelectorvue_type_script_lang_js_ = (PageSelectorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/PageSelector.vue?vue&type=style&index=0&lang=css&
var PageSelectorvue_type_style_index_0_lang_css_ = __webpack_require__("1173");

// CONCATENATED MODULE: ./src/components/PageSelector.vue






/* normalize component */

var PageSelector_component = Object(componentNormalizer["a" /* default */])(
  components_PageSelectorvue_type_script_lang_js_,
  PageSelectorvue_type_template_id_6f9a0c84_render,
  PageSelectorvue_type_template_id_6f9a0c84_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PageSelector = (PageSelector_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NavbarHelp.vue?vue&type=template&id=90864ca0&
var NavbarHelpvue_type_template_id_90864ca0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"navbar-help"},[_c('span',{staticClass:"big-number"},[_vm._v(_vm._s(_vm.num))]),_c('div',{staticClass:"desc"},[_vm._v(_vm._s(_vm.text))]),_c('font-awesome-icon',{staticClass:"close-button",attrs:{"icon":['far', 'times-circle']},on:{"click":function($event){return _vm.$emit('close')}}})],1)}
var NavbarHelpvue_type_template_id_90864ca0_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/NavbarHelp.vue?vue&type=template&id=90864ca0&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NavbarHelp.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
/* harmony default export */ var NavbarHelpvue_type_script_lang_js_ = ({
  name: 'NavbarHelp',
  props: {
    num: Number,
    text: String
  }
});
// CONCATENATED MODULE: ./src/components/NavbarHelp.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_NavbarHelpvue_type_script_lang_js_ = (NavbarHelpvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/NavbarHelp.vue?vue&type=style&index=0&lang=css&
var NavbarHelpvue_type_style_index_0_lang_css_ = __webpack_require__("0337");

// CONCATENATED MODULE: ./src/components/NavbarHelp.vue






/* normalize component */

var NavbarHelp_component = Object(componentNormalizer["a" /* default */])(
  components_NavbarHelpvue_type_script_lang_js_,
  NavbarHelpvue_type_template_id_90864ca0_render,
  NavbarHelpvue_type_template_id_90864ca0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var NavbarHelp = (NavbarHelp_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Navbar.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var Navbarvue_type_script_lang_js_ = ({
  name: 'Navbar',
  computed: Object(vuex_esm["c" /* mapGetters */])(['availableParams', 'getGlobalParam', 'isElementClosed']),
  methods: Object(vuex_esm["d" /* mapMutations */])(['setGlobalParam', 'closeElement']),
  components: {
    SearchDropdown: SearchDropdown,
    PageSelector: PageSelector,
    NavbarHelp: NavbarHelp
  }
});
// CONCATENATED MODULE: ./src/components/Navbar.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Navbarvue_type_script_lang_js_ = (Navbarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Navbar.vue?vue&type=style&index=0&lang=css&
var Navbarvue_type_style_index_0_lang_css_ = __webpack_require__("5dfc");

// CONCATENATED MODULE: ./src/components/Navbar.vue






/* normalize component */

var Navbar_component = Object(componentNormalizer["a" /* default */])(
  components_Navbarvue_type_script_lang_js_,
  Navbarvue_type_template_id_438e6cd2_render,
  Navbarvue_type_template_id_438e6cd2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Navbar = (Navbar_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DeleteZone.vue?vue&type=template&id=048ba35e&
var DeleteZonevue_type_template_id_048ba35e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"deletezone",class:{ active: _vm.active, visible: _vm.visible },style:({ zIndex: _vm.zIndex })},[_c('span',{staticClass:"title"},[_vm._v("Delete")])])}
var DeleteZonevue_type_template_id_048ba35e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/DeleteZone.vue?vue&type=template&id=048ba35e&

// CONCATENATED MODULE: ./src/components/zIndexIncrementor.js
var z = 100;
/* harmony default export */ var zIndexIncrementor = ({
  get: function get() {
    z += 1;
    return z;
  },
  getWithoutInc: function getWithoutInc() {
    return z;
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DeleteZone.vue?vue&type=script&lang=js&

//
//
//
//
//



/* harmony default export */ var DeleteZonevue_type_script_lang_js_ = ({
  name: 'DeleteZone',
  data: function data() {
    return {
      active: false,
      visible: false,
      zIndex: 1
    };
  },
  watch: {
    visible: function visible() {
      if (this.visible) this.zIndex = zIndexIncrementor.getWithoutInc();
    }
  },
  methods: Object(objectSpread2["a" /* default */])({
    initDropzone: function initDropzone() {
      var _this = this;

      interact_min_default()(this.$el).dropzone({
        overlap: 'pointer',
        accept: '.block',
        ondropactivate: this.validateAndRun(function (target) {
          _this.visible = true;
        }),
        ondropdeactivate: this.validateAndRun(function (target) {
          _this.visible = _this.active = false;
        }, false),
        ondragenter: this.validateAndRun(function (target) {
          _this.active = true;
        }),
        ondragleave: this.validateAndRun(function (target) {
          _this.active = false;
        }),
        ondrop: this.validateAndRun(function (target) {
          return _this.onDrop(target);
        }, false)
      });
    },
    validateAndRun: function validateAndRun(f) {
      var mustBeMoving = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return function (e) {
        if (!e.relatedTarget.block) return;
        var target = e.relatedTarget.block;
        if (!target.moving && mustBeMoving) return;
        return f(target);
      };
    },
    onDrop: function onDrop(target) {
      if (target.slotv) this.deleteSlot(target.slotv);
    }
  }, Object(vuex_esm["d" /* mapMutations */])(['deleteSlot'])),
  mounted: function mounted() {
    this.initDropzone();
  }
});
// CONCATENATED MODULE: ./src/components/DeleteZone.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_DeleteZonevue_type_script_lang_js_ = (DeleteZonevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/DeleteZone.vue?vue&type=style&index=0&lang=css&
var DeleteZonevue_type_style_index_0_lang_css_ = __webpack_require__("8369");

// CONCATENATED MODULE: ./src/components/DeleteZone.vue






/* normalize component */

var DeleteZone_component = Object(componentNormalizer["a" /* default */])(
  components_DeleteZonevue_type_script_lang_js_,
  DeleteZonevue_type_template_id_048ba35e_render,
  DeleteZonevue_type_template_id_048ba35e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DeleteZone = (DeleteZone_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Block.vue?vue&type=template&id=8ab356a4&
var Blockvue_type_template_id_8ab356a4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"block",staticClass:"block",class:{ moving: _vm.moving, dropzone: _vm.mode.indexOf('dropzone') != -1 },style:(_vm.style)},[_c('div',{staticClass:"overlay full",class:{ visible: _vm.singleDropzone, active: _vm.activeDropzone === 'full' }},[_c('span',{staticClass:"overlay-title"},[_c('font-awesome-icon',{attrs:{"icon":"compress-arrows-alt"}}),_c('br'),_vm._v("REPLACE")],1)]),_c('div',{ref:"leftdropzone",staticClass:"overlay left",class:{ visible: _vm.dualDropzone, active: _vm.activeDropzone === 'left' }},[_c('span',{staticClass:"overlay-title"},[_c('font-awesome-icon',{attrs:{"icon":"layer-group"}}),_c('br'),_vm._v("MERGE")],1)]),_c('div',{ref:"rightdropzone",staticClass:"overlay right",class:{ visible: _vm.dualDropzone, active: _vm.activeDropzone === 'right' }},[_c('span',{staticClass:"overlay-title"},[_c('font-awesome-icon',{attrs:{"icon":"compress-arrows-alt"}}),_c('br'),_vm._v("REPLACE")],1)]),_c('BlockHead',{attrs:{"slotv":_vm.slotv,"plotComponent":_vm.plotComponent}}),_c('PlotProxy',{ref:"plot",attrs:{"slotv":_vm.slotv},on:{"plotComponentUpdate":function($event){_vm.plotComponent = $event}}}),_c('span',{staticClass:"fullscreen-toggle tooltiped",on:{"click":function($event){return _vm.$emit('openFullscreen')}}},[_c('span',{staticClass:"tooltip"},[_vm._v("Fullscreen")]),_c('span',[_c('font-awesome-icon',{attrs:{"icon":"expand"}})],1)]),_c('div',{staticClass:"handle handle-left"}),_c('div',{staticClass:"handle handle-top"}),_c('div',{staticClass:"handle handle-right"}),_c('div',{staticClass:"handle handle-bottom"}),_c('div',{staticClass:"handle handle-left handle-top"}),_c('div',{staticClass:"handle handle-left handle-bottom"}),_c('div',{staticClass:"handle handle-right handle-top"}),_c('div',{staticClass:"handle handle-right handle-bottom"})],1)}
var Blockvue_type_template_id_8ab356a4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Block.vue?vue&type=template&id=8ab356a4&

// CONCATENATED MODULE: ./src/components/Block.config.js

/* harmony default export */ var Block_config = ({
  dragModifiers: [interact_min_default.a.modifiers.snap({
    targets: [interact_min_default.a.createSnapGrid({
      x: 32,
      y: 32
    })],
    range: Infinity,
    offset: {
      x: 0,
      y: 0
    },
    relativePoints: [{
      x: 0,
      y: 0
    }]
  }), interact_min_default.a.modifiers.restrict({
    restriction: '#playground',
    endOnly: true
  })],
  resizeConfig: {
    edges: {
      left: '.handle-left',
      right: '.handle-right',
      bottom: '.handle-bottom',
      top: '.handle-top'
    },
    modifiers: [interact_min_default.a.modifiers.restrict({
      restriction: '#playground',
      endOnly: true
    }), interact_min_default.a.modifiers.snap({
      targets: [interact_min_default.a.createSnapGrid({
        x: 32,
        y: 32
      })],
      range: Infinity,
      offset: {
        x: 0,
        y: 0
      },
      relativePoints: [{
        x: 0,
        y: 0
      }]
    }), interact_min_default.a.modifiers.restrictSize({
      min: {
        width: 320,
        height: 320
      }
    })],
    inertia: true
  }
});
// CONCATENATED MODULE: ./src/components/Block.interactions.js






/* harmony default export */ var Block_interactions = ({
  computed: Object(objectSpread2["a" /* default */])({
    singleDropzone: function singleDropzone() {
      return this.mode === 'single-dropzone';
    },
    dualDropzone: function dualDropzone() {
      return this.mode === 'dual-dropzone';
    },
    activeLeftDropzone: function activeLeftDropzone() {
      return this.dualDropzone && this.activeDropzone === 'left';
    },
    activeRightDropzone: function activeRightDropzone() {
      return this.dualDropzone && this.activeDropzone === 'right';
    },
    activeFullDropzone: function activeFullDropzone() {
      return this.singleDropzone && this.activeDropzone === 'full';
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['getSlotInitInfo'])),
  methods: Object(objectSpread2["a" /* default */])({
    initInteractions: function initInteractions() {
      var _this = this;

      // Link to component from dom element
      this.$el.block = this;
      this.interactable = interact_min_default()(this.$refs.block).pointerEvents({
        holdDuration: 250
      }).draggable({
        interia: true,
        autoScroll: true,
        modifiers: Block_config.dragModifiers,
        onmove: function onmove(event) {
          return _this.dragOnMove(event);
        },
        onstart: function onstart(event) {
          return _this.dragOnStart(event);
        },
        onend: function onend(event) {
          return _this.dragOnEnd(event);
        },
        cursorChecker: function cursorChecker(action, interactable, element, interacting) {
          return interacting ? 'grabbing' : 'grab';
        }
      }).resizable(Block_config.resizeConfig).on('resizemove', function (event) {
        return _this.resizeOnMove(event);
      }).on('hold', function (event) {
        return _this.onHold(event);
      }); // Init component moving using interaction object from holding button event (See SlotsListElement)

      var initInfo = this.getSlotInitInfo(this.slotv);

      if (initInfo) {
        var target = this.$refs.block;
        var x = initInfo.x - target.parentElement.offsetLeft - target.offsetWidth / 2;
        var y = initInfo.y - target.parentElement.offsetTop - target.offsetHeight / 2;
        this.updateTargetPosition(target, x, y);
        initInfo.interaction.start({
          name: 'drag'
        }, this.interactable, this.$el);
        this.removeSlotInitInfo(this.slotv);
        this.moving = true;
      }
      /* Init dropzone */


      var dropzoneCommonProperties = {
        overlap: 'pointer',
        accept: '.block',
        ondropactivate: this.validateAndRun(function (target) {
          if (_this.moving) return;
          /* Do not run placeholder on moving block */

          _this.mode = _this.canMerge(target) ? 'dual-dropzone' : 'single-dropzone';
          _this.activeDropzone = 'none';
        }, true, false),
        ondropdeactivate: function ondropdeactivate(e) {
          if (e.relatedTarget.block) _this.mode = 'normal';
        },
        checker: function checker(dragEvent, event, dropped, dropzone, dropElement, draggable, draggableElement) {
          return dropped && draggableElement !== _this.$el;
        }
      };
      interact_min_default()(this.$refs.leftdropzone).dropzone(Object.assign({}, dropzoneCommonProperties, {
        ondragenter: this.validateAndRun(function (target) {
          _this.activeDropzone = _this.dualDropzone ? 'left' : 'full';
        }),
        ondragleave: this.validateAndRun(function (target) {
          if (_this.singleDropzone || _this.activeLeftDropzone) _this.activeDropzone = 'none';
        }),
        ondrop: this.validateAndRun(function (target) {
          _this.singleDropzone ? _this.onSwapDrop(target) : _this.onMergeDrop(target);
        }, false)
      }));
      interact_min_default()(this.$refs.rightdropzone).dropzone(Object.assign({}, dropzoneCommonProperties, {
        ondragenter: this.validateAndRun(function (target) {
          _this.activeDropzone = _this.dualDropzone ? 'right' : 'full';
        }),
        ondragleave: this.validateAndRun(function (target) {
          if (_this.singleDropzone || _this.activeRightDropzone) _this.activeDropzone = 'none';
        }, false),
        ondrop: this.validateAndRun(this.onSwapDrop, false)
      }));
    },
    roundToGrid: function roundToGrid(x) {
      return Math.round(x / 32) * 32;
    },
    validateAndRun: function validateAndRun(f) {
      var _this2 = this;

      var mustBeMoving = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var checkMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return function (e) {
        if (_this2.mode === 'normal' && checkMode) return;
        if (!e.relatedTarget.block) return;
        var target = e.relatedTarget.block;
        if (!target.moving && mustBeMoving) return;
        return f(target);
      };
    },
    dragOnMove: function dragOnMove(event) {
      event.stopPropagation();
      event.preventDefault();
      this.updateTargetProperties(event);
    },
    dragOnStart: function dragOnStart(event) {
      this.moving = true;
    },
    dragOnEnd: function dragOnEnd(event) {
      this.moving = false;
    },
    onHold: function onHold(event) {
      if (!event.target || Array.prototype.includes.call(event.target.classList, 'handle')) return;
      var interaction = event.interaction;

      if (!interaction.interacting()) {
        interaction.start({
          name: 'drag'
        }, event.interactable, event.currentTarget);
      }
    },
    resizeOnMove: function resizeOnMove(event) {
      event.preventDefault();
      this.updateTargetProperties(event);
    },
    updateTargetPosition: function updateTargetPosition(target, x, y) {
      target.setAttribute('data-x', this.roundToGrid(x));
      target.setAttribute('data-y', this.roundToGrid(y));
      this.setSlotPosition({
        slot: this.slotv,
        x: this.roundToGrid(x),
        y: this.roundToGrid(y)
      });
    },
    updateTargetProperties: function updateTargetProperties(event) {
      var x = this.slotv.positionX + (event.type === 'resizemove' ? event.deltaRect.left : event.dx);
      var y = this.slotv.positionY + (event.type === 'resizemove' ? event.deltaRect.top : event.dy);
      this.updateTargetPosition(event.target, x, y);
      this.setSlotSize({
        slot: this.slotv,
        width: this.roundToGrid(event.rect.width),
        height: this.roundToGrid(event.rect.height)
      });
    }
  }, Object(vuex_esm["d" /* mapMutations */])(['setSlotPosition', 'setSlotSize', 'removeSlotInitInfo']))
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PlotProxy.vue?vue&type=template&id=5037b042&
var PlotProxyvue_type_template_id_5037b042_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"plot-proxy"},[(_vm.loading)?_c('span',{staticClass:"msg"},[_vm._v("Loading...")]):_vm._e(),(!_vm.renderPlot && !_vm.error && !_vm.loading && _vm.slotData.length === 0)?_c('span',{staticClass:"msg"},[_vm._v("Cannot load plot data!")]):_vm._e(),(!_vm.renderPlot && _vm.error && !_vm.loading)?_c('span',{staticClass:"msg error"},[_vm._v("Error occured during loading plot data!")]):_vm._e(),(_vm.renderPlot)?_c(_vm.plotComponent,{ref:"plot",tag:"component",staticClass:"plot",attrs:{"data":_vm.slotData,"plotType":_vm.slotv.plotType}}):_vm._e()],1)}
var PlotProxyvue_type_template_id_5037b042_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/PlotProxy.vue?vue&type=template&id=5037b042&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.every.js
var es_array_every = __webpack_require__("a623");

// EXTERNAL MODULE: ./node_modules/fast-deep-equal/es6/index.js
var es6 = __webpack_require__("9f6a");
var es6_default = /*#__PURE__*/__webpack_require__.n(es6);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PlotProxy.vue?vue&type=script&lang=js&













//
//
//
//
//
//
//
//



/* harmony default export */ var PlotProxyvue_type_script_lang_js_ = ({
  name: 'PlotProxy',
  props: {
    slotv: Object
  },
  data: function data() {
    return {
      plotVisible: false,
      // It is very important to render plot after component is mounted, to make picking SlotsListElement faster
      error: null,
      // type of error
      loading: null,
      // time of last pending query
      slotData: [] // data returned from query(fullParams)

    };
  },
  watch: {
    fullParams: {
      // Reload slot data, when params change
      handler: function handler(newValue, oldValue) {
        if (!es6_default()(newValue, oldValue)) this.loadSlotData();
      },
      immediate: true
    },
    'slotv.plotType': {
      // Reload slot data, when plot type change
      handler: function handler(newValue, oldValue) {
        if (newValue !== oldValue) this.loadSlotData();
      },
      immediate: true
    },
    plotComponent: {
      handler: function handler() {
        this.$emit('plotComponentUpdate', this.plotComponent);
      },
      immediate: true
    }
  },
  mounted: function mounted() {
    var _this = this;

    // It is important not to use Vue.nextTick, to load all plots one after another,
    // nextTick will load all of then parallel when changing page
    setTimeout(function () {
      _this.plotVisible = true;
    }, 0);
  },
  computed: Object(objectSpread2["a" /* default */])({
    // Slot localParams merged with globalParams
    fullParams: function fullParams() {
      return this.getSlotFullParams(this.slotv.localParams);
    },

    /* Each data object specify plotComponent, we make sure all are equal and return the value or '' if not */
    plotComponent: function plotComponent() {
      var _this2 = this;

      if (!this.slotData || this.slotData.length === 0) return '';
      if (!this.slotData.every(function (d) {
        return d.plotComponent === _this2.slotData[0].plotComponent;
      })) return ''; // All not equal (todo split slot)

      if (!Object.keys(PlotsInfo.plotComponents).includes(this.slotData[0].plotComponent)) return ''; // Not supported component

      return this.slotData[0].plotComponent;
    },
    renderPlot: function renderPlot() {
      return this.plotVisible && this.plotComponent;
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['getSlotFullParams'])),
  methods: Object(objectSpread2["a" /* default */])({
    loadSlotData: function loadSlotData() {
      var _this3 = this;

      var time = this.loading = new Date().getTime();
      var promises = this.fullParams.map(function (p) {
        return _this3.query({
          params: p,
          plotType: _this3.slotv.plotType
        });
      });
      Promise.all(promises).then(function (result) {
        result = result.filter(function (r) {
          return r;
        });
        _this3.error = false; // set loading to null only when this was last promise

        if (_this3.loading === time) _this3.loading = null; // Do not update if results are the same (ex. variable param changed in FeatureImportance plot)

        if (new Set([].concat(Object(toConsumableArray["a" /* default */])(_this3.slotData), Object(toConsumableArray["a" /* default */])(result))).size === new Set(_this3.slotData).size && new Set(_this3.slotData).size === new Set(result).size && _this3.slotData.length === result.length) return;
        _this3.slotData = result;
      }).catch(function (reason) {
        // It is called when any of promises failed
        _this3.slotData = [];
        _this3.error = true; // set loading to null only when this was last promise

        if (_this3.loading === time) _this3.loading = null;
      });
    }
  }, Object(vuex_esm["b" /* mapActions */])(['query'])),
  components: PlotsInfo.plotComponents
});
// CONCATENATED MODULE: ./src/components/PlotProxy.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PlotProxyvue_type_script_lang_js_ = (PlotProxyvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/PlotProxy.vue?vue&type=style&index=0&lang=css&
var PlotProxyvue_type_style_index_0_lang_css_ = __webpack_require__("7c62");

// CONCATENATED MODULE: ./src/components/PlotProxy.vue






/* normalize component */

var PlotProxy_component = Object(componentNormalizer["a" /* default */])(
  components_PlotProxyvue_type_script_lang_js_,
  PlotProxyvue_type_template_id_5037b042_render,
  PlotProxyvue_type_template_id_5037b042_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PlotProxy = (PlotProxy_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BlockHead.vue?vue&type=template&id=c2f35396&
var BlockHeadvue_type_template_id_c2f35396_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block-head"},[_c('div',{staticClass:"main-title-box"},[(!_vm.titleEdit)?_c('span',{staticClass:"title tooltiped",on:{"dblclick":function($event){_vm.titleEdit = true}}},[_c('span',{staticClass:"tooltip"},[_vm._v("Double click to edit")]),_c('span',{staticClass:"title-text"},[_vm._v(_vm._s(_vm.slotv.name))])]):_vm._e(),(_vm.description && !_vm.titleEdit)?_c('span',{staticClass:"tooltiped plot-help-box"},[_c('span',{staticClass:"tooltip"},[_vm._v(_vm._s(_vm.description))]),_c('font-awesome-icon',{attrs:{"icon":['far', 'question-circle']}})],1):_vm._e(),(_vm.titleEdit)?_c('input',{ref:"titleInput",staticClass:"title-input",attrs:{"type":"text"},domProps:{"value":_vm.slotv.name},on:{"blur":_vm.saveTitle,"keyup":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.saveTitle($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"escape",undefined,$event.key,undefined)){ return null; }_vm.titleEdit = false}]}}):_vm._e(),_c('div',{staticClass:"subtitle",domProps:{"innerHTML":_vm._s(_vm.usedModels)}})]),_c('div',{staticClass:"locks"},[(_vm.isMerged)?_c('span',{on:{"click":function($event){return _vm.splitSlot(_vm.slotv)}}},[_vm._v("Split "),_c('font-awesome-icon',{attrs:{"icon":['far', 'clone']}})],1):_vm._e(),_vm._l((_vm.lockableParams),function(p){return _c('span',{key:p.name,staticClass:"tooltiped",on:{"click":function($event){return _vm.lockUnlockParam(p.name)},"contextmenu":function($event){$event.preventDefault();return _vm.openParamSearch(p.name, $event)}}},[_vm._m(0,true),_vm._v(" "+_vm._s(_vm._f("titleFormat")(p.value ? p.value.name : p.name))+" "+_vm._s(p.value ? '🔒' : '🔓')+" ")])}),(_vm.searchMenuParam)?_c('SearchMenu',{style:(_vm.searchManuStyle),attrs:{"paramName":_vm.searchMenuParam},on:{"close":function($event){_vm.searchMenuParam = ''},"setParam":function($event){return _vm.setSlotParam($event)}}}):_vm._e()],2)])}
var BlockHeadvue_type_template_id_c2f35396_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"tooltip"},[_vm._v("Left click to lock"),_c('br'),_vm._v("Right click to choose")])}]


// CONCATENATED MODULE: ./src/components/BlockHead.vue?vue&type=template&id=c2f35396&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SearchMenu.vue?vue&type=template&id=ea239fe2&
var SearchMenuvue_type_template_id_ea239fe2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"search-menu"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.editText),expression:"editText"}],attrs:{"type":"text"},domProps:{"value":(_vm.editText)},on:{"input":function($event){if($event.target.composing){ return; }_vm.editText=$event.target.value}}}),_vm._l((_vm.availableOptions),function(o){return _c('div',{key:o.uuid,staticClass:"entry",on:{"click":function($event){return _vm.$emit('setParam', o)}}},[_vm._v(" "+_vm._s(_vm._f("formatTitle")(o.name))+" ")])}),_c('div',{staticClass:"entry",on:{"click":function($event){return _vm.$emit('close')}}},[_vm._v("Close")])],2)}
var SearchMenuvue_type_template_id_ea239fe2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SearchMenu.vue?vue&type=template&id=ea239fe2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SearchMenu.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//



/* harmony default export */ var SearchMenuvue_type_script_lang_js_ = ({
  name: 'SearchMenu',
  props: {
    paramName: String
  },
  data: function data() {
    return {
      editText: ''
    };
  },
  computed: Object(objectSpread2["a" /* default */])({
    fuse: function fuse() {
      return new fuse_default.a(this.availableParams[this.paramName] || [], {
        keys: ['name']
      });
    },
    availableOptions: function availableOptions() {
      if (this.editText.length < 1) return (this.availableParams[this.paramName] || []).slice(0, 10);
      return this.fuse.search(this.editText).slice(0, 10);
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['availableParams'])),
  filters: {
    formatTitle: format.formatTitle
  },
  methods: {
    onClickOutside: function onClickOutside(e) {
      if (!this.$el.contains(e.target)) this.$emit('close');
    }
  },
  mounted: function mounted() {
    document.addEventListener('click', this.onClickOutside);
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('click', this.onClickOutside);
  }
});
// CONCATENATED MODULE: ./src/components/SearchMenu.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SearchMenuvue_type_script_lang_js_ = (SearchMenuvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SearchMenu.vue?vue&type=style&index=0&lang=css&
var SearchMenuvue_type_style_index_0_lang_css_ = __webpack_require__("ceb6");

// CONCATENATED MODULE: ./src/components/SearchMenu.vue






/* normalize component */

var SearchMenu_component = Object(componentNormalizer["a" /* default */])(
  components_SearchMenuvue_type_script_lang_js_,
  SearchMenuvue_type_template_id_ea239fe2_render,
  SearchMenuvue_type_template_id_ea239fe2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SearchMenu = (SearchMenu_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BlockHead.vue?vue&type=script&lang=js&











//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var BlockHeadvue_type_script_lang_js_ = ({
  name: 'BlockHead',
  props: {
    slotv: Object,
    plotComponent: String
  },
  data: function data() {
    return {
      titleEdit: false,
      searchMenuParam: '',
      searchManuStyle: {}
    };
  },
  filters: {
    titleFormat: format.formatTitle
  },
  computed: Object(objectSpread2["a" /* default */])({
    fullParams: function fullParams() {
      return this.getSlotFullParams(this.slotv.localParams);
    },
    usedModels: function usedModels() {
      var _this = this;

      return Object(toConsumableArray["a" /* default */])(new Set(this.fullParams.map(function (p) {
        return '<span style="color: ' + _this.modelsColors[p.model.uuid] + '">' + p.model.name + '</span>';
      }))).join(', ');
    },
    isMerged: function isMerged() {
      return this.slotv && this.slotv.localParams.length > 1;
    },
    lockableParams: function lockableParams() {
      var _this2 = this;

      if (this.slotv.localParams.length === 0) return [];
      var available = PlotsInfo.lockableParams[this.slotv.plotType] || []; // Use only those params, that have identical value (including undefined) in all sub plots

      var sameValueParams = available.filter(function (avail) {
        return !_this2.slotv.localParams.find(function (local) {
          return local[avail] !== _this2.slotv.localParams[0][avail];
        });
      });
      return sameValueParams.map(function (p) {
        return {
          name: p,
          value: _this2.slotv.localParams[0][p]
        };
      });
    },
    description: function description() {
      if (!this.slotv) return '';
      return PlotsInfo.getPlotDesc(this.slotv.plotType);
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['getSlotFullParams', 'modelsColors', 'availableParams'])),
  methods: Object(objectSpread2["a" /* default */])({
    saveTitle: function saveTitle() {
      this.setSlotName({
        slot: this.slotv,
        name: this.$refs.titleInput.value
      });
      this.titleEdit = false;
    },
    lockUnlockParam: function lockUnlockParam(param) {
      var isLocked = !!this.lockableParams.find(function (p) {
        return p.name === param && p.value;
      });
      isLocked ? this.unsetParam({
        slot: this.slotv,
        paramName: param
      }) : this.setParam({
        slot: this.slotv,
        paramName: param,
        paramValue: this.fullParams[0][param]
      });
    },
    openParamSearch: function openParamSearch(param, e) {
      this.searchManuStyle = {
        top: e.pointerY,
        left: e.pointerX
      };
      this.searchMenuParam = param;
    },
    setSlotParam: function setSlotParam(paramValue) {
      this.setParam({
        slot: this.slotv,
        paramName: this.searchMenuParam,
        paramValue: paramValue
      });
      this.searchMenuParam = '';
    }
  }, Object(vuex_esm["d" /* mapMutations */])(['setSlotName', 'setParam', 'unsetParam', 'splitSlot'])),
  components: {
    SearchMenu: SearchMenu
  }
});
// CONCATENATED MODULE: ./src/components/BlockHead.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_BlockHeadvue_type_script_lang_js_ = (BlockHeadvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/BlockHead.vue?vue&type=style&index=0&lang=css&
var BlockHeadvue_type_style_index_0_lang_css_ = __webpack_require__("7675");

// CONCATENATED MODULE: ./src/components/BlockHead.vue






/* normalize component */

var BlockHead_component = Object(componentNormalizer["a" /* default */])(
  components_BlockHeadvue_type_script_lang_js_,
  BlockHeadvue_type_template_id_c2f35396_render,
  BlockHeadvue_type_template_id_c2f35396_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BlockHead = (BlockHead_component.exports);
// EXTERNAL MODULE: ./node_modules/uuid/v4.js
var v4 = __webpack_require__("c64e");
var v4_default = /*#__PURE__*/__webpack_require__.n(v4);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Block.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var Blockvue_type_script_lang_js_ = ({
  name: 'Block',
  mixins: [Block_interactions],
  data: function data() {
    return {
      mode: 'normal',
      // normal, single-dropzone, dual-dropzone
      activeDropzone: 'none',
      // none, left, right, full
      zIndex: zIndexIncrementor.get(),
      plotComponent: '',
      // for legend colors
      uuid: v4_default()(),
      // should never be changed
      moving: false,
      interactable: null
    };
  },
  props: {
    slotv: Object
  },
  watch: {
    moving: function moving() {
      if (this.moving) this.zIndex = zIndexIncrementor.get();
    }
  },
  computed: {
    style: function style() {
      return {
        zIndex: this.moving ? 10000 : this.zIndex,
        transform: 'translate(' + this.slotv.positionX + 'px, ' + this.slotv.positionY + 'px)',
        width: this.slotv.width + 'px',
        height: this.slotv.height + 'px'
      };
    }
  },
  mounted: function mounted() {
    this.initInteractions();
  },
  methods: Object(objectSpread2["a" /* default */])({
    onSwapDrop: function onSwapDrop(target) {
      this.replaceSlots({
        slot1: this.slotv,
        slot2: target.slotv
      });
    },
    onMergeDrop: function onMergeDrop(target) {
      if (this.canMerge(target)) this.mergeSlots({
        slot1: this.slotv,
        slot2: target.slotv
      });
    },
    canMerge: function canMerge(target) {
      return PlotsInfo.canMerge(this.slotv, target.slotv);
    }
  }, Object(vuex_esm["d" /* mapMutations */])(['mergeSlots', 'replaceSlots'])),
  components: {
    BlockHead: BlockHead,
    PlotProxy: PlotProxy
  }
});
// CONCATENATED MODULE: ./src/components/Block.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Blockvue_type_script_lang_js_ = (Blockvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Block.vue?vue&type=style&index=0&lang=css&
var Blockvue_type_style_index_0_lang_css_ = __webpack_require__("424a");

// CONCATENATED MODULE: ./src/components/Block.vue






/* normalize component */

var Block_component = Object(componentNormalizer["a" /* default */])(
  components_Blockvue_type_script_lang_js_,
  Blockvue_type_template_id_8ab356a4_render,
  Blockvue_type_template_id_8ab356a4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Block = (Block_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Settings.vue?vue&type=template&id=3dee522a&
var Settingsvue_type_template_id_3dee522a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"settings-container"},[_c('div',{staticClass:"settings-tabs"},_vm._l((_vm.tabs),function(t){return _c('span',{key:t.name,staticClass:"tab-name"},[_c('span',{class:{ active: t.name === _vm.activeTab },on:{"click":function($event){_vm.activeTab = t.name}}},[_vm._v(_vm._s(t.name))])])}),0),_c('div',{staticClass:"close-button",on:{"click":function($event){return _vm.$emit('close')}}},[_c('font-awesome-icon',{attrs:{"icon":['far', 'times-circle']}})],1),_c(_vm.activeTabComponent,{tag:"component"})],1)}
var Settingsvue_type_template_id_3dee522a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Settings.vue?vue&type=template&id=3dee522a&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabOptions.vue?vue&type=template&id=01938490&
var SettingsTabOptionsvue_type_template_id_01938490_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"settings-tab-options settings-tab"},_vm._l((_vm.schemas),function(option){return _c('div',{key:option.name,staticClass:"option-row"},[_vm._v(" "+_vm._s(option.displayName)+" "),(option.type === 'integer')?_c('div',{staticClass:"option-input"},[_c('input',{class:{ error: _vm.errors.includes(option.name) },attrs:{"type":"text"},domProps:{"value":_vm.getOption(option.name)},on:{"change":function($event){return _vm.save(option.name, $event.target.value)}}})]):_vm._e(),(option.type === 'boolean')?_c('div',{staticClass:"option-input"},[_c('span',{staticClass:"check-symbol",on:{"click":function($event){return _vm.save(option.name, false)}}},[(_vm.getOption(option.name))?_c('span',[_c('font-awesome-icon',{attrs:{"icon":['far', 'check-square']}})],1):_vm._e()]),_c('span',{staticClass:"check-symbol",on:{"click":function($event){return _vm.save(option.name, true)}}},[(!_vm.getOption(option.name))?_c('span',[_c('font-awesome-icon',{attrs:{"icon":['far', 'square']}})],1):_vm._e()])]):_vm._e()])}),0)}
var SettingsTabOptionsvue_type_template_id_01938490_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SettingsTabOptions.vue?vue&type=template&id=01938490&

// CONCATENATED MODULE: ./src/components/OptionsSchemas.js
/* harmony default export */ var OptionsSchemas = ([{
  name: 'breakdown_max_variables',
  displayName: 'Maximum variables in Break Down',
  type: 'integer',
  default: 6,
  min: 1
}, {
  name: 'featureimportance_max_variables',
  displayName: 'Maximum variables in Feature Importance',
  type: 'integer',
  default: 7,
  min: 1
}, {
  name: 'featureimportance_boxplots',
  displayName: 'Display boxplots over Feature Importance',
  type: 'boolean',
  default: true
}, {
  name: 'shapvalues_max_variables',
  displayName: 'Maximum variables in SHAP Values',
  type: 'integer',
  default: 7,
  min: 1
}, {
  name: 'shapvalues_boxplots',
  displayName: 'Display boxplots over SHAP Values',
  type: 'boolean',
  default: false
}, {
  name: 'left_margin',
  displayName: 'Left margin for variable names',
  type: 'integer',
  default: 140,
  min: 80,
  max: 300
}, {
  name: 'left_margin_values',
  displayName: 'Left margin for variable values',
  type: 'integer',
  default: 90,
  min: 60,
  max: 300
}]);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabOptions.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var SettingsTabOptionsvue_type_script_lang_js_ = ({
  name: 'SettingsTabOptions',
  data: function data() {
    return {
      schemas: OptionsSchemas,
      errors: []
    };
  },
  methods: {
    save: function save(name, value) {
      var schema = this.schemas.find(function (s) {
        return s.name === name;
      });
      if (!schema) return;
      var error = false;
      var v = null;

      if (schema.type === 'integer') {
        v = parseInt(Number(value));
        if (isNaN(value) || v + '' !== value || isNaN(parseInt(value, 10))) error = true;
        if (schema.min && schema.min > v) error = true;
        if (schema.max && schema.max < v) error = true;
      }

      if (schema.type === 'boolean') v = !!value;
      this.errors = this.errors.filter(function (e) {
        return e !== name;
      });
      if (error) this.errors.push(name);else this.$store.commit('setOption', {
        name: name,
        value: v
      });
    }
  },
  computed: Object(vuex_esm["c" /* mapGetters */])(['getOption'])
});
// CONCATENATED MODULE: ./src/components/SettingsTabOptions.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SettingsTabOptionsvue_type_script_lang_js_ = (SettingsTabOptionsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SettingsTabOptions.vue?vue&type=style&index=0&lang=css&
var SettingsTabOptionsvue_type_style_index_0_lang_css_ = __webpack_require__("3c46");

// CONCATENATED MODULE: ./src/components/SettingsTabOptions.vue






/* normalize component */

var SettingsTabOptions_component = Object(componentNormalizer["a" /* default */])(
  components_SettingsTabOptionsvue_type_script_lang_js_,
  SettingsTabOptionsvue_type_template_id_01938490_render,
  SettingsTabOptionsvue_type_template_id_01938490_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SettingsTabOptions = (SettingsTabOptions_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabSessions.vue?vue&type=template&id=12e48ece&
var SettingsTabSessionsvue_type_template_id_12e48ece_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')}
var SettingsTabSessionsvue_type_template_id_12e48ece_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SettingsTabSessions.vue?vue&type=template&id=12e48ece&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabSessions.vue?vue&type=script&lang=js&
//
//
//
/* harmony default export */ var SettingsTabSessionsvue_type_script_lang_js_ = ({
  name: 'SettingsTabSessions'
});
// CONCATENATED MODULE: ./src/components/SettingsTabSessions.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SettingsTabSessionsvue_type_script_lang_js_ = (SettingsTabSessionsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/SettingsTabSessions.vue





/* normalize component */

var SettingsTabSessions_component = Object(componentNormalizer["a" /* default */])(
  components_SettingsTabSessionsvue_type_script_lang_js_,
  SettingsTabSessionsvue_type_template_id_12e48ece_render,
  SettingsTabSessionsvue_type_template_id_12e48ece_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SettingsTabSessions = (SettingsTabSessions_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabSources.vue?vue&type=template&id=58e8da66&
var SettingsTabSourcesvue_type_template_id_58e8da66_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"settings-tab-sources settings-tab"},[_c('div',{staticClass:"add-sources-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputURL),expression:"inputURL"}],attrs:{"type":"text","placeholder":"Enter URL here"},domProps:{"value":(_vm.inputURL)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.loadURL()},"input":function($event){if($event.target.composing){ return; }_vm.inputURL=$event.target.value}}}),_c('input',{ref:"fileinput",staticStyle:{"display":"none"},attrs:{"type":"file","multiple":""},on:{"change":_vm.loadFiles}}),_c('button',{staticClass:"add-url",on:{"click":function($event){return _vm.loadURL()}}},[_vm._v("Add URL")]),_c('button',{staticClass:"add-file",on:{"click":function($event){return _vm.$refs.fileinput.click()}}},[_vm._v("Add File")]),(_vm.addSourceError)?_c('div',{staticClass:"error"},[_vm._v(_vm._s(_vm.addSourceError))]):_vm._e(),(_vm.sourceAdded)?_c('div',{staticClass:"ok"},[_vm._v("Data loaded")]):_vm._e()]),_c('div',{staticClass:"recently-used"},[_c('span',[_vm._v("Recenty used")]),_vm._l((_vm.recentURLSources),function(s){return _c('div',{key:s.time},[_c('a',{attrs:{"href":_vm.baseURL + '/?data=' + s.url},on:{"click":function($event){$event.preventDefault();return _vm.loadURL(s.url)}}},[_vm._v(_vm._s(s.url))]),_c('span',{staticClass:"date"},[_vm._v(_vm._s(new Date(s.time).toString().split(' ').slice(0,5).join(' ')))])])})],2)])}
var SettingsTabSourcesvue_type_template_id_58e8da66_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SettingsTabSources.vue?vue&type=template&id=58e8da66&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__("3835");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// CONCATENATED MODULE: ./src/utils/config.js
/* harmony default export */ var config = ({
  examples: [{
    name: 'Apartments from 2009-2010 price per m2',
    url: 'https://gist.githubusercontent.com/piotrpiatyszek/e90d62f8896637001b9110cbe143956f/raw/15a1c75488122580dc5766e3ca7474949ba89678/data.json'
  }, {
    name: 'FIFA Players Value',
    url: 'https://gist.githubusercontent.com/piotrpiatyszek/db055c7ba325c964b22e52dc87a0019f/raw/ce3687e1d6e595d792f84bca0f07dd216f161d75/data.json'
  }, {
    name: 'Employees status classification',
    url: 'https://gist.githubusercontent.com/piotrpiatyszek/42841017d32d89e1ca9ca0c89da94b88/raw/052bbed2b8a519e833663940225f16792cf337ca/data.json'
  }],
  url: 'https://arena.drwhy.ai'
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabSources.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var SettingsTabSourcesvue_type_script_lang_js_ = ({
  name: 'SettingsTabSources',
  data: function data() {
    return {
      addSourceError: null,
      sourceAdded: false,
      inputURL: ''
    };
  },
  computed: Object(objectSpread2["a" /* default */])({
    baseURL: function baseURL() {
      return config.url;
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['recentURLSources'])),
  methods: {
    loadFiles: function loadFiles(event) {
      this.sourceAdded = false;
      this.addSourceError = null;

      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(event.target.files),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var file = _step.value;
          this.loadFile(file);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    loadFile: function loadFile(file) {
      var _this = this;

      var reader = new FileReader();

      reader.onload = function (e) {
        if (e.type !== 'load' || !e.target.result) return;

        var _e$target$result$spli = e.target.result.split(','),
            _e$target$result$spli2 = Object(slicedToArray["a" /* default */])(_e$target$result$spli, 2),
            type = _e$target$result$spli2[0],
            data = _e$target$result$spli2[1];

        if (type === 'data:application/json;base64') {
          try {
            var parsed = JSON.parse(atob(data));

            _this.$store.dispatch('loadData', {
              data: parsed,
              src: 'UPLOAD-' + file.name
            }).then(function () {
              _this.sourceAdded = true;
            });
          } catch (e) {
            _this.addSourceError = 'Cannot parse the file. Look to console for more details.';
            console.error(e);
          }
        } else {
          _this.addSourceError = 'File type is unsupported yet';
        }
      };

      reader.readAsDataURL(file);
    },
    loadURL: function loadURL(url) {
      var _this2 = this;

      this.sourceAdded = false;
      this.addSourceError = null;
      if (!url) url = this.inputURL;

      if (!url) {
        this.addSourceError = 'Empty URL';
        return;
      }

      this.$store.dispatch('loadURL', url).then(function () {
        _this2.sourceAdded = true;
      }).catch(function (e) {
        _this2.addSourceError = 'Cannot load the file. Look to console for more details.';
        console.error(e);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/SettingsTabSources.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SettingsTabSourcesvue_type_script_lang_js_ = (SettingsTabSourcesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SettingsTabSources.vue?vue&type=style&index=0&lang=css&
var SettingsTabSourcesvue_type_style_index_0_lang_css_ = __webpack_require__("7fbb");

// CONCATENATED MODULE: ./src/components/SettingsTabSources.vue






/* normalize component */

var SettingsTabSources_component = Object(componentNormalizer["a" /* default */])(
  components_SettingsTabSourcesvue_type_script_lang_js_,
  SettingsTabSourcesvue_type_template_id_58e8da66_render,
  SettingsTabSourcesvue_type_template_id_58e8da66_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SettingsTabSources = (SettingsTabSources_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Settings.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//



/* harmony default export */ var Settingsvue_type_script_lang_js_ = ({
  name: 'Settings',
  data: function data() {
    return {
      tabs: [{
        name: 'Sources',
        component: 'SettingsTabSources'
      }, {
        name: 'Sessions',
        component: 'SettingsTabSessions'
      }, {
        name: 'Options',
        component: 'SettingsTabOptions'
      }],
      activeTab: 'Options'
    };
  },
  computed: {
    activeTabComponent: function activeTabComponent() {
      var _this = this;

      return (this.tabs.find(function (t) {
        return t.name === _this.activeTab;
      }) || {}).component || '';
    }
  },
  components: {
    SettingsTabOptions: SettingsTabOptions,
    SettingsTabSessions: SettingsTabSessions,
    SettingsTabSources: SettingsTabSources
  }
});
// CONCATENATED MODULE: ./src/components/Settings.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Settingsvue_type_script_lang_js_ = (Settingsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Settings.vue?vue&type=style&index=0&lang=css&
var Settingsvue_type_style_index_0_lang_css_ = __webpack_require__("ef23");

// CONCATENATED MODULE: ./src/components/Settings.vue






/* normalize component */

var Settings_component = Object(componentNormalizer["a" /* default */])(
  components_Settingsvue_type_script_lang_js_,
  Settingsvue_type_template_id_3dee522a_render,
  Settingsvue_type_template_id_3dee522a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Settings = (Settings_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FullscreenBlock.vue?vue&type=template&id=b144df54&
var FullscreenBlockvue_type_template_id_b144df54_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fullscreen-block"},[_c('BlockHead',{attrs:{"slotv":_vm.slotv,"plotComponent":_vm.plotComponent}}),_c('PlotProxy',{attrs:{"slotv":_vm.slotv},on:{"plotComponentUpdate":function($event){_vm.plotComponent = $event}}}),_c('div',{staticClass:"close-button",on:{"click":function($event){return _vm.$emit('close')}}},[_c('font-awesome-icon',{attrs:{"icon":['far', 'times-circle']}})],1)],1)}
var FullscreenBlockvue_type_template_id_b144df54_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FullscreenBlock.vue?vue&type=template&id=b144df54&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FullscreenBlock.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//


/* harmony default export */ var FullscreenBlockvue_type_script_lang_js_ = ({
  name: 'FullscreenBlock',
  props: {
    slotv: Object
  },
  data: function data() {
    return {
      plotComponent: '' // for legend colors

    };
  },
  components: {
    PlotProxy: PlotProxy,
    BlockHead: BlockHead
  }
});
// CONCATENATED MODULE: ./src/components/FullscreenBlock.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FullscreenBlockvue_type_script_lang_js_ = (FullscreenBlockvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/FullscreenBlock.vue?vue&type=style&index=0&lang=css&
var FullscreenBlockvue_type_style_index_0_lang_css_ = __webpack_require__("51d1");

// CONCATENATED MODULE: ./src/components/FullscreenBlock.vue






/* normalize component */

var FullscreenBlock_component = Object(componentNormalizer["a" /* default */])(
  components_FullscreenBlockvue_type_script_lang_js_,
  FullscreenBlockvue_type_template_id_b144df54_render,
  FullscreenBlockvue_type_template_id_b144df54_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FullscreenBlock = (FullscreenBlock_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Preview.vue?vue&type=template&id=6d18e4c0&
var Previewvue_type_template_id_6d18e4c0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"preview-block"},[(_vm.slotv)?_c('PlotProxy',{attrs:{"slotv":_vm.slotv}}):_vm._e()],1)}
var Previewvue_type_template_id_6d18e4c0_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Preview.vue?vue&type=template&id=6d18e4c0&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Preview.vue?vue&type=script&lang=js&
//
//
//
//
//

/* harmony default export */ var Previewvue_type_script_lang_js_ = ({
  name: 'Preview',
  props: {
    slotv: Object
  },
  components: {
    PlotProxy: PlotProxy
  }
});
// CONCATENATED MODULE: ./src/components/Preview.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Previewvue_type_script_lang_js_ = (Previewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Preview.vue?vue&type=style&index=0&lang=css&
var Previewvue_type_style_index_0_lang_css_ = __webpack_require__("773a");

// CONCATENATED MODULE: ./src/components/Preview.vue






/* normalize component */

var Preview_component = Object(componentNormalizer["a" /* default */])(
  components_Previewvue_type_script_lang_js_,
  Previewvue_type_template_id_6d18e4c0_render,
  Previewvue_type_template_id_6d18e4c0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Preview = (Preview_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NameConflicts.vue?vue&type=template&id=20ac892a&
var NameConflictsvue_type_template_id_20ac892a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"name-conflicts"},[_c('span',{staticClass:"title"},[_vm._v("Names conflicts")]),_c('div',{staticClass:"params-list"},_vm._l((_vm.paramsNames),function(p){return _c('div',{key:p,staticClass:"param"},[_c('span',{staticClass:"param-title"},[_vm._v(_vm._s(_vm._f("firstUpper")(p))),_c('span',{staticClass:"c2"},[_vm._v("Already existing")]),_c('span',{staticClass:"c3"},[_vm._v("Merge")])]),_vm._l((_vm.nextNameConflicts.params[p]),function(c){return _c('div',{key:c.newParam.uuid,staticClass:"row"},[_c('span',{staticClass:"c1"},[_vm._v(_vm._s(c.newParam.name))]),_c('span',{staticClass:"c2"},[_vm._v(_vm._s(c.orginal.name))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedToMerge[c.newParam.uuid]),expression:"selectedToMerge[c.newParam.uuid]"}],staticClass:"c3",attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.selectedToMerge[c.newParam.uuid])?_vm._i(_vm.selectedToMerge[c.newParam.uuid],null)>-1:(_vm.selectedToMerge[c.newParam.uuid])},on:{"change":function($event){var $$a=_vm.selectedToMerge[c.newParam.uuid],$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.selectedToMerge, c.newParam.uuid, $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.selectedToMerge, c.newParam.uuid, $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.selectedToMerge, c.newParam.uuid, $$c)}}}})])})],2)}),0),_c('button',{staticClass:"save",on:{"click":_vm.save}},[_vm._v("Save")])])}
var NameConflictsvue_type_template_id_20ac892a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/NameConflicts.vue?vue&type=template&id=20ac892a&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NameConflicts.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var NameConflictsvue_type_script_lang_js_ = ({
  name: 'NameConflicts',
  computed: Object(objectSpread2["a" /* default */])({
    allParamsNames: function allParamsNames() {
      if (!this.nextNameConflicts) return [];
      return Object.keys(this.nextNameConflicts.params);
    },
    paramsNames: function paramsNames() {
      var _this = this;

      return this.allParamsNames.filter(function (n) {
        return _this.nextNameConflicts.params[n].length > 0;
      });
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['nextNameConflicts'])),
  data: function data() {
    return {
      selectedToMerge: {}
    };
  },
  watch: {
    nextNameConflicts: {
      handler: function handler() {
        var _this2 = this;

        this.selectedToMerge = {};
        Object.keys(this.nextNameConflicts.params).forEach(function (n) {
          _this2.nextNameConflicts.params[n].forEach(function (p) {
            return _this2.$set(_this2.selectedToMerge, p.newParam.uuid, true);
          });
        });
      },
      immediate: true
    }
  },
  created: function created() {
    if (this.paramsNames.length === 0 && this.nextNameConflicts) {
      this.nextNameConflicts.resolve({});
      this.removeNameConflicts();
    }
  },
  methods: Object(objectSpread2["a" /* default */])({
    save: function save() {
      var _this3 = this;

      var updates = {};
      this.allParamsNames.forEach(function (p) {
        _this3.nextNameConflicts.params[p].forEach(function (x) {
          if (_this3.selectedToMerge[x.newParam.uuid]) updates[x.newParam.uuid] = x.orginal;
        });
      });
      this.nextNameConflicts.resolve(updates);
      this.removeNameConflicts();
    }
  }, Object(vuex_esm["d" /* mapMutations */])(['removeNameConflicts'])),
  filters: {
    firstUpper: format.firstCharUpper
  }
});
// CONCATENATED MODULE: ./src/components/NameConflicts.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_NameConflictsvue_type_script_lang_js_ = (NameConflictsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/NameConflicts.vue?vue&type=style&index=0&lang=css&
var NameConflictsvue_type_style_index_0_lang_css_ = __webpack_require__("4859");

// CONCATENATED MODULE: ./src/components/NameConflicts.vue






/* normalize component */

var NameConflicts_component = Object(componentNormalizer["a" /* default */])(
  components_NameConflictsvue_type_script_lang_js_,
  NameConflictsvue_type_template_id_20ac892a_render,
  NameConflictsvue_type_template_id_20ac892a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var NameConflicts = (NameConflicts_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"21c6ccd6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WelcomeScreen.vue?vue&type=template&id=5eacd40b&
var WelcomeScreenvue_type_template_id_5eacd40b_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"welcome-screen-container"},[_c('div',{staticClass:"close-button",on:{"click":function($event){return _vm.$emit('close')}}},[_c('font-awesome-icon',{attrs:{"icon":['far', 'times-circle']}})],1),_c('div',{staticClass:"welcome-screen-content"},[_c('span',{staticClass:"welcome"},[_vm._v("Welcome to Arena - Interactive XAI dashboard")]),_c('h2',[_vm._v("About")]),_vm._m(0),_c('h2',[_vm._v("See demo")]),_vm._l((_vm.examples),function(e){return _c('div',{key:e.name,staticClass:"example"},[_c('a',{attrs:{"href":_vm.baseURL + '/?data=' + e.url},on:{"click":function($event){$event.preventDefault();return _vm.openExample(e.url)}}},[_vm._v(_vm._s(e.name))]),(_vm.loadingExample === e.url)?_c('span',[_vm._v(" (Loading...)")]):_vm._e()])}),_c('h2',[_vm._v("Test on your data")]),_vm._m(1),_c('h2',[_vm._v("See also")]),_vm._m(2)],2),_c('div',{staticClass:"buttons"},[_c('button',{staticClass:"close-permanent",on:{"click":function($event){return _vm.closeElement('welcome-screen')}}},[_vm._v("Do not show again")]),_c('button',{staticClass:"close",on:{"click":function($event){return _vm.$emit('close')}}},[_vm._v("Close")])])])}
var WelcomeScreenvue_type_template_id_5eacd40b_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('b',[_vm._v("Arena")]),_vm._v(" is an interactive dashboard to compare "),_c('b',[_vm._v("AI explanations")]),_vm._v(" for multiple predictive models at once. You can work with static precalculated data from one or more sources and with a live server that calculates plots on demand.")])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('a',{attrs:{"href":"https://github.com/ModelOriented/ArenaR"}},[_vm._v("Use Arena with R")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('b',[_vm._v("Arena")]),_vm._v(" is a part of "),_c('a',{attrs:{"href":"https://drwhy.ai"}},[_c('b',[_vm._v("DrWhy.AI")])]),_vm._v(" family. Check it out."),_c('br'),_vm._v(" Source code is available at "),_c('a',{attrs:{"href":"https://github.com/ModelOriented/Arena"}},[_vm._v("Github")])])}]


// CONCATENATED MODULE: ./src/components/WelcomeScreen.vue?vue&type=template&id=5eacd40b&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WelcomeScreen.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var WelcomeScreenvue_type_script_lang_js_ = ({
  name: 'WelcomeScreen',
  data: function data() {
    return {
      loadingExample: null
    };
  },
  computed: {
    baseURL: function baseURL() {
      return config.url;
    },
    examples: function examples() {
      return config.examples;
    }
  },
  methods: Object(objectSpread2["a" /* default */])({
    openExample: function openExample(url) {
      var _this = this;

      if (this.loadingExample) return;
      this.loadingExample = url;
      this.$store.dispatch('loadURL', url).then(function () {
        _this.$emit('close');
      }).catch(function (e) {
        _this.loadingExample = null;
        console.error(e);
      });
    }
  }, Object(vuex_esm["d" /* mapMutations */])(['closeElement']))
});
// CONCATENATED MODULE: ./src/components/WelcomeScreen.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_WelcomeScreenvue_type_script_lang_js_ = (WelcomeScreenvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/WelcomeScreen.vue?vue&type=style&index=0&lang=css&
var WelcomeScreenvue_type_style_index_0_lang_css_ = __webpack_require__("e53e");

// CONCATENATED MODULE: ./src/components/WelcomeScreen.vue






/* normalize component */

var WelcomeScreen_component = Object(componentNormalizer["a" /* default */])(
  components_WelcomeScreenvue_type_script_lang_js_,
  WelcomeScreenvue_type_template_id_5eacd40b_render,
  WelcomeScreenvue_type_template_id_5eacd40b_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var WelcomeScreen = (WelcomeScreen_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js&







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: 'app',
  components: {
    Block: Block,
    DeleteZone: DeleteZone,
    Sidepanel: Sidepanel,
    Navbar: Navbar,
    Settings: Settings,
    FullscreenBlock: FullscreenBlock,
    Preview: Preview,
    NameConflicts: NameConflicts,
    WelcomeScreen: WelcomeScreen
  },
  data: function data() {
    return {
      settingsVisible: false,
      fullscreenSlot: null,
      displayWelcomeScreen: true
    };
  },
  computed: Object(objectSpread2["a" /* default */])({
    welcomeScreenVisible: function welcomeScreenVisible() {
      return this.displayWelcomeScreen && !this.isElementClosed('welcome-screen');
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['visibleSlots', 'preview', 'nextNameConflicts', 'isElementClosed'])),
  created: function created() {
    var _this = this;

    // eslint-disable-next-line no-unused-expressions
    __webpack_require__.e(/* import() */ "chunk-7100a0c6").then(__webpack_require__.bind(null, "efa2"));
    this.$store.dispatch('init');
    var dataURL = new URLSearchParams(window.location.search).get('data');

    if (dataURL) {
      this.$store.dispatch('loadURL', dataURL).catch(console.error);
      this.displayWelcomeScreen = false;
    }

    window.addEventListener('storage', function (e) {
      if (e.key !== 'append' && e.newValue) return;

      _this.$store.dispatch('loadURL', e.newValue).catch(console.error);
    });
  }
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=0&lang=css&
var Appvue_type_style_index_0_lang_css_ = __webpack_require__("034f");

// CONCATENATED MODULE: ./src/App.vue






/* normalize component */

var App_component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js_,
  Appvue_type_template_id_81e275b4_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (App_component.exports);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find-index.js
var es_array_find_index = __webpack_require__("c740");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("ade3");

// EXTERNAL MODULE: ./node_modules/ajv/lib/ajv.js
var ajv = __webpack_require__("783b");
var ajv_default = /*#__PURE__*/__webpack_require__.n(ajv);

// CONCATENATED MODULE: ./src/store/datasources/jsonDatasource.js




















var jsonDatasource_ajv = new ajv_default.a();
jsonDatasource_ajv.addMetaSchema(__webpack_require__("0e0d"));
var validator = jsonDatasource_ajv.compile(__webpack_require__("6253"));
var jsonDatasource_state = {
  models: [],
  variables: [],
  observations: [],
  plotsData: []
};
var jsonDatasource_getters = {
  models: function models(state) {
    return state.models;
  },
  observations: function observations(state) {
    return state.observations;
  },
  variables: function variables(state) {
    return state.variables;
  },
  getAvailableSlots: function getAvailableSlots(state, getters, rootState, rootGetters) {
    return function (fullParams) {
      var params = {};
      params.model = state.models.find(function (m) {
        return (fullParams.model || {}).uuid === m.uuid;
      });
      params.observation = state.observations.find(function (o) {
        return (fullParams.observation || {}).uuid === o.uuid;
      });
      params.variable = state.variables.find(function (v) {
        return (fullParams.variable || {}).uuid === v.uuid;
      });
      if (!params.observation && rootGetters.availableParams.observation.length === 0) params.observation = {
        uuid: 'neverexisted'
      };
      if (!params.model || !params.observation || !params.variable) return [];
      return state.plotsData.filter(function (d) {
        return Object.keys(d.params).reduce(function (acc, x) {
          return acc && d.params[x].uuid === params[x].uuid;
        }, true);
      }).map(function (d) {
        return {
          localParams: [{
            model: d.params.model
          }],
          name: d.name,
          plotType: d.plotType,
          plotCategory: d.plotCategory
        };
      });
    };
  }
};
var mutations = {
  addModels: function addModels(state, x) {
    state.models = [].concat(Object(toConsumableArray["a" /* default */])(state.models), Object(toConsumableArray["a" /* default */])(x));
  },
  addObservations: function addObservations(state, x) {
    state.observations = [].concat(Object(toConsumableArray["a" /* default */])(state.observations), Object(toConsumableArray["a" /* default */])(x));
  },
  addVariables: function addVariables(state, x) {
    state.variables = [].concat(Object(toConsumableArray["a" /* default */])(state.variables), Object(toConsumableArray["a" /* default */])(x));
  },
  addPlotsData: function addPlotsData(state, x) {
    state.plotsData = [].concat(Object(toConsumableArray["a" /* default */])(state.plotsData), Object(toConsumableArray["a" /* default */])(x));
  }
}; // Checks if names array have unique elements, after removing special characters and in lower case

var jsonDatasource_isUnique = function isUnique(array) {
  return new Set(array.map(format.simplify)).size === array.length;
};

var validateData = function validateData(data) {
  return validator(data) && jsonDatasource_isUnique(data.observations) && jsonDatasource_isUnique(data.variables) && jsonDatasource_isUnique(data.models);
};

var actions = {
  loadData: function loadData(_ref, _ref2) {
    var state = _ref.state,
        commit = _ref.commit,
        dispatch = _ref.dispatch;
    var data = _ref2.data,
        src = _ref2.src;
    if (!validateData(data)) return false;
    var params = {
      model: data.models.map(function (a) {
        return {
          name: a,
          uuid: v4_default()()
        };
      }),
      variable: data.variables.map(function (a) {
        return {
          name: a,
          uuid: v4_default()()
        };
      }),
      observation: data.observations.map(function (a) {
        return {
          name: a,
          uuid: v4_default()()
        };
      })
    };
    return new Promise(function (resolve, reject) {
      dispatch('removeNameConflicts', params, {
        root: true
      }).then(function (updates) {
        // array of uuids of params that was merged to the already existing param
        var updated = Object.keys(updates); // We add only params, that was not merged to already existing ones

        commit('addModels', params.model.filter(function (p) {
          return !updated.includes(p.uuid);
        }));
        commit('addVariables', params.variable.filter(function (p) {
          return !updated.includes(p.uuid);
        }));
        commit('addObservations', params.observation.filter(function (p) {
          return !updated.includes(p.uuid);
        }));
        var plotsData = [];
        data.data.forEach(function (d) {
          var obj = {
            plotType: d.plotType,
            plotCategory: d.plotCategory ? d.plotCategory : 'Other',
            plotComponent: d.plotComponent,
            name: d.name ? d.name : format.firstCharUpper(d.plotType),
            plotData: d.data,
            params: {}
          }; // Firstly we search by name in not updated params

          var model = params.model.find(function (a) {
            return a.name === d.params.model;
          });
          var observation = params.observation.find(function (a) {
            return a.name === d.params.observation;
          });
          var variable = params.variable.find(function (a) {
            return a.name === d.params.variable;
          }); // Next we find merged version if exists

          var modelUpdated = updates[(model || {}).uuid || ''];
          var variableUpdated = updates[(variable || {}).uuid || ''];
          var observationUpdated = updates[(observation || {}).uuid || '']; // Set param with priority to updated version

          if (model) obj.params.model = modelUpdated || model;
          if (observation) obj.params.observation = observationUpdated || observation;
          if (variable) obj.params.variable = variableUpdated || variable;
          if (Object.values(obj).includes(undefined)) return;
          plotsData.push(obj);
        });
        commit('addPlotsData', plotsData);
        resolve(true);
      }).catch(reject);
    });
  },
  query: function query(_ref3, _ref4) {
    var state = _ref3.state;
    var params = _ref4.params,
        plotType = _ref4.plotType;
    var plotData = state.plotsData.find(function (d) {
      return d.plotType === plotType && Object.keys(d.params).reduce(function (acc, x) {
        return acc && d.params[x].uuid === params[x].uuid;
      }, true);
    });
    return plotData;
  }
};
/* harmony default export */ var jsonDatasource = ({
  state: jsonDatasource_state,
  getters: jsonDatasource_getters,
  mutations: mutations,
  actions: actions,
  namespaced: true
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__("4fad");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("53ca");

// CONCATENATED MODULE: ./src/store/datasources/arenarLiveDatasource.js


























var arenarLiveDatasource_ajv = new ajv_default.a();
arenarLiveDatasource_ajv.addMetaSchema(__webpack_require__("0e0d"));
var arenarLiveDatasource_validator = arenarLiveDatasource_ajv.compile(__webpack_require__("f437"));
var arenarLiveDatasource_state = {
  servers: []
};
var arenarLiveDatasource_getters = {
  // These can produce duplicats, index.js removes them
  models: function models(state) {
    return state.servers.map(function (s) {
      return s.models;
    }).flat();
  },
  observations: function observations(state) {
    return state.servers.map(function (s) {
      return s.observations;
    }).flat();
  },
  variables: function variables(state) {
    return state.servers.map(function (s) {
      return s.variables;
    }).flat();
  },
  getAvailableSlots: function getAvailableSlots(state, getters, rootState, rootGetters) {
    return function (fullParams) {
      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(state.servers),
          _step;

      try {
        var _loop = function _loop() {
          var server = _step.value;
          var params = {}; // we check if model is from this server

          params.model = server.models.find(function (m) {
            return (fullParams.model || {}).uuid === m.uuid;
          });
          params.observation = server.observations.find(function (o) {
            return (fullParams.observation || {}).uuid === o.uuid;
          });
          if (!params.observation && rootGetters.availableParams.observation.length === 0) params.observation = {
            uuid: -1
          };
          params.variable = server.variables.find(function (v) {
            return (fullParams.variable || {}).uuid === v.uuid;
          });
          if (!params.model || !params.observation || !params.variable) return "continue";
          return {
            v: server.availablePlots.filter(function (d) {
              return params.observation.uuid !== -1 || !d.requiredParams.includes('observation');
            }).map(function (d) {
              return {
                plotType: d.plotType,
                plotCategory: d.plotCategory ? d.plotCategory : 'Other',
                name: d.name ? d.name : format.firstCharUpper(d.plotType),
                localParams: [{
                  model: params.model
                }]
              };
            })
          };
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _ret = _loop();

          switch (_ret) {
            case "continue":
              continue;

            default:
              if (Object(esm_typeof["a" /* default */])(_ret) === "object") return _ret.v;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return [];
    };
  }
};
var arenarLiveDatasource_mutations = {
  addServer: function addServer(state, server) {
    state.servers = [].concat(Object(toConsumableArray["a" /* default */])(state.servers), [server]);
  },
  addToCache: function addToCache(state, _ref) {
    var server = _ref.server,
        slotData = _ref.slotData;
    server.cache = [].concat(Object(toConsumableArray["a" /* default */])(server.cache), [slotData]);
  },
  addWaiting: function addWaiting(state, _ref2) {
    var server = _ref2.server,
        waitingObject = _ref2.waitingObject;
    server.waiting = [].concat(Object(toConsumableArray["a" /* default */])(server.waiting), [waitingObject]);
  },
  removeWaiting: function removeWaiting(state, _ref3) {
    var server = _ref3.server,
        waitingObject = _ref3.waitingObject;
    server.waiting = server.waiting.filter(function (w) {
      return w !== waitingObject;
    });
  }
}; // Checks if names array have unique elements, after removing special characters and in lower case

var arenarLiveDatasource_isUnique = function isUnique(array) {
  return new Set(array.map(format.simplify)).size === array.length;
};

var arenarLiveDatasource_validateData = function validateData(data) {
  return arenarLiveDatasource_validator(data) && arenarLiveDatasource_isUnique(data.observations) && arenarLiveDatasource_isUnique(data.variables) && arenarLiveDatasource_isUnique(data.models);
};

var arenarLiveDatasource_actions = {
  loadData: function loadData(_ref4, _ref5) {
    var state = _ref4.state,
        commit = _ref4.commit,
        dispatch = _ref4.dispatch;
    var data = _ref5.data,
        src = _ref5.src;
    if (!arenarLiveDatasource_validateData(data)) return false;
    var params = {
      model: data.models.map(function (a) {
        return {
          name: a,
          uuid: v4_default()()
        };
      }),
      variable: data.variables.map(function (a) {
        return {
          name: a,
          uuid: v4_default()()
        };
      }),
      observation: data.observations.map(function (a) {
        return {
          name: a,
          uuid: v4_default()()
        };
      })
    };
    return new Promise(function (resolve, reject) {
      dispatch('removeNameConflicts', params, {
        root: true
      }).then(function (updates) {
        // array of uuids of params that was merged to the already existing param
        var updated = Object.keys(updates);
        var server = {
          models: params.model.map(function (p) {
            return updated.includes(p.uuid) ? Object.assign({}, updates[p.uuid], {
              orginalName: p.name
            }) : p;
          }),
          variables: params.variable.map(function (p) {
            return updated.includes(p.uuid) ? Object.assign({}, updates[p.uuid], {
              orginalName: p.name
            }) : p;
          }),
          observations: params.observation.map(function (p) {
            return updated.includes(p.uuid) ? Object.assign({}, updates[p.uuid], {
              orginalName: p.name
            }) : p;
          }),
          uuid: v4_default()(),
          timestamp: data.timestamp,
          address: src,
          availablePlots: data.availablePlots,
          cache: [],
          waiting: []
        };
        commit('addServer', server);
        resolve(true);
      }).catch(reject);
    });
  },
  query: function query(_ref6, _ref7) {
    var state = _ref6.state,
        commit = _ref6.commit;
    var params = _ref7.params,
        plotType = _ref7.plotType;

    var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(state.servers),
        _step2;

    try {
      var _loop2 = function _loop2() {
        var server = _step2.value;
        // for each server we find required params for plotType
        var plotProperties = server.availablePlots.find(function (p) {
          return p.plotType === plotType;
        });
        if (!plotProperties) return "continue"; // each param is maped to object from this server (same uuid is not enought)

        var serverParams = plotProperties.requiredParams.reduce(function (acu, paramName) {
          acu[paramName] = server[paramName + 's'].find(function (p) {
            return p.uuid === params[paramName].uuid;
          });
          return acu;
        }, {}); // one of required params is not from this server

        if (Object.values(serverParams).includes(undefined) || Object.values(serverParams).includes(null)) return "continue";
        var cached = server.cache.find(function (c) {
          return c.plotType === plotType && es6_default()(c.params, serverParams);
        });
        if (cached) return {
          v: cached
        };
        var query = Object.keys(serverParams).reduce(function (acu, p) {
          acu[p] = serverParams[p].orginalName || serverParams[p].name;
          return acu;
        }, {});
        var alreadyWaiting = server.waiting.find(function (w) {
          return w.plotType === plotType && es6_default()(w.params, serverParams);
        });
        if (alreadyWaiting) return {
          v: alreadyWaiting.promise
        };
        return {
          v: new Promise(function (resolve, reject) {
            var waitingObject = {
              promise: null,
              resolve: null,
              reject: null,
              params: serverParams,
              plotType: plotType
            };
            var waitingPromise = new Promise(function (resolve, reject) {
              waitingObject.resolve = resolve;
              waitingObject.reject = reject; // To make sure promise parameter is already set

              if (waitingObject.promise) commit('addWaiting', {
                server: server,
                waitingObject: waitingObject
              });
            });
            waitingObject.promise = waitingPromise;
            if (waitingObject.resolve) commit('addWaiting', {
              server: server,
              waitingObject: waitingObject
            });
            var queryString = Object.entries(query).map(function (e) {
              return e.map(encodeURIComponent).join('=');
            }).join('&');
            vue_runtime_esm["a" /* default */].http.get(server.address + plotType + '?' + queryString).then(function (respone) {
              var data = respone.body;
              var slotData = {
                plotType: plotType,
                params: serverParams,
                plotData: data.data,
                plotComponent: data.plotComponent
              };
              commit('addToCache', {
                server: server,
                slotData: slotData
              });
              waitingObject.resolve(slotData);
              commit('removeWaiting', {
                server: server,
                waitingObject: waitingObject
              });
              resolve(slotData);
            }).catch(function (e) {
              waitingObject.reject(e);
              reject(e);
            });
          })
        };
      };

      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _ret2 = _loop2();

        switch (_ret2) {
          case "continue":
            continue;

          default:
            if (Object(esm_typeof["a" /* default */])(_ret2) === "object") return _ret2.v;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return null;
  }
};
/* harmony default export */ var arenarLiveDatasource = ({
  state: arenarLiveDatasource_state,
  getters: arenarLiveDatasource_getters,
  mutations: arenarLiveDatasource_mutations,
  actions: arenarLiveDatasource_actions,
  namespaced: true
});
// CONCATENATED MODULE: ./src/store/index.js





























vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
var store_ajv = new ajv_default.a();
store_ajv.addMetaSchema(__webpack_require__("0e0d"));
var store_state = {
  datasources: ['jsonDatasource', 'arenarLiveDatasource'],
  globalParams: {
    model: null,
    variable: null,
    observation: null
  },
  slots: [],
  pageNumber: 0,
  preview: null,
  nameConflicts: [],
  options: {},
  manualColors: {},
  closedElements: [],
  recentURLSources: [],
  slotsInitInformation: [] // contains information required to open new slot in drag mode

};
var store_getters = {
  getOption: function getOption(srare, getters) {
    return function (name) {
      if (store_state.options[name] !== undefined) return store_state.options[name];
      return (OptionsSchemas.find(function (s) {
        return s.name === name;
      }) || {}).default;
    };
  },
  getGlobalParam: function getGlobalParam(state, getters) {
    return function (name) {
      if (state.globalParams[name]) return state.globalParams[name];
      if (getters.availableParams[name] && getters.availableParams[name].length > 0) return getters.availableParams[name][0];
      return null;
    };
  },
  globalParams: function globalParams(state, getters) {
    return Object.keys(state.globalParams).reduce(function (acu, n) {
      acu[n] = getters.getGlobalParam(n);
      return acu;
    }, {});
  },
  availableParams: function availableParams(state, getters) {
    var params = {
      model: {},
      variable: {},
      observation: {}
    };
    Object.keys(params).forEach(function (key) {
      state.datasources.forEach(function (ds) {
        getters[ds + '/' + key + 's'].forEach(function (a) {
          params[key][a.uuid] = a; // make sure we have only one param for one uuid
        });
      });
      params[key] = Object.values(params[key]); // make array from object
    });
    return params;
  },
  pageNumber: function pageNumber(state) {
    return state.pageNumber;
  },
  nextNameConflicts: function nextNameConflicts(state) {
    return state.nameConflicts.length > 0 ? state.nameConflicts[0] : null;
  },
  getAvailableSlots: function getAvailableSlots(state, getters) {
    return function (params) {
      var fullParams = Object.assign({}, getters.globalParams, params);
      var slots = [];
      state.datasources.forEach(function (ds) {
        slots = slots.concat(getters[ds + '/getAvailableSlots'](fullParams));
      });
      slots = slots.map(function (s) {
        return Object(objectSpread2["a" /* default */])({}, s, {
          uuid: v4_default()(),
          archived: false,
          positionX: 0,
          positionY: 0,
          width: 512,
          height: 384,
          pageNumber: state.pageNumber
        });
      });
      return slots;
    };
  },
  visibleSlots: function visibleSlots(state) {
    return state.slots.filter(function (s) {
      return !s.archived && s.pageNumber === state.pageNumber;
    });
  },
  archivedSlots: function archivedSlots(state) {
    return state.slots.filter(function (s) {
      return s.archived;
    });
  },
  allSlots: function allSlots(state) {
    return state.slots;
  },
  getSlotFullParams: function getSlotFullParams(state, getters) {
    return function (localParams) {
      return localParams.map(function (p) {
        return Object.assign({}, getters.globalParams, p);
      });
    };
  },
  modelsColors: function modelsColors(state, getters) {
    var colors = _palette.slice(0);

    var defaultColors = getters.availableParams.model.reduce(function (acc, m) {
      acc[m.uuid] = colors.shift() || store_color.h;
      return acc;
    }, {});
    return Object.assign({}, defaultColors, state.manualColors);
  },
  palette: function palette(state, getters) {
    return _palette;
  },
  preview: function preview(state) {
    return state.preview;
  },
  isElementClosed: function isElementClosed(state, getters) {
    return function (name) {
      return !!state.closedElements.find(function (f) {
        return f === name;
      });
    };
  },
  recentURLSources: function recentURLSources(state) {
    return state.recentURLSources;
  },
  getSlotInitInfo: function getSlotInitInfo(state) {
    return function (slot) {
      return state.slotsInitInformation.find(function (x) {
        return x.uuid === slot.uuid;
      });
    };
  }
};
var store_mutations = {
  setOption: function setOption(state, _ref) {
    var name = _ref.name,
        value = _ref.value;
    vue_runtime_esm["a" /* default */].set(state.options, name, value);
  },
  setGlobalParam: function setGlobalParam(state, _ref2) {
    var name = _ref2.name,
        value = _ref2.value;
    vue_runtime_esm["a" /* default */].set(state.globalParams, name, value);
  },
  addNameConflictsToResolve: function addNameConflictsToResolve(state, toResolve) {
    state.nameConflicts = [].concat(Object(toConsumableArray["a" /* default */])(state.nameConflicts), [toResolve]);
  },
  removeNameConflicts: function removeNameConflicts(state) {
    state.nameConflicts = state.nameConflicts.slice(1);
  },
  setPageNumber: function setPageNumber(state, n) {
    state.pageNumber = n;
  },

  /*
   * Slots
  */
  addSlot: function addSlot(state, slot) {
    if (!slot.uuid) vue_runtime_esm["a" /* default */].set(slot, 'uuid', v4_default()());
    if (slot.archived === undefined) vue_runtime_esm["a" /* default */].set(slot, 'archived', false);
    if (slot.positionX === undefined) vue_runtime_esm["a" /* default */].set(slot, 'positionX', 0);
    if (slot.positionY === undefined) vue_runtime_esm["a" /* default */].set(slot, 'positionY', 0);
    if (slot.width === undefined) vue_runtime_esm["a" /* default */].set(slot, 'width', 512);
    if (slot.height === undefined) vue_runtime_esm["a" /* default */].set(slot, 'height', 384);
    if (slot.pageNumber === undefined) vue_runtime_esm["a" /* default */].set(slot, 'pageNumber', state.pageNumber);
    state.slots = [].concat(Object(toConsumableArray["a" /* default */])(state.slots), [slot]);
  },
  unarchiveSlot: function unarchiveSlot(state, slot) {
    vue_runtime_esm["a" /* default */].set(slot, 'archived', false);
    vue_runtime_esm["a" /* default */].set(slot, 'pageNumber', state.pageNumber);
  },
  archiveSlot: function archiveSlot(state, slot) {
    vue_runtime_esm["a" /* default */].set(slot, 'archived', true);
  },
  deleteSlot: function deleteSlot(state, slot) {
    state.slots = state.slots.filter(function (s) {
      return s.uuid !== slot.uuid;
    });
  },
  addSlotInitInfo: function addSlotInitInfo(state, _ref3) {
    var slot = _ref3.slot,
        info = _ref3.info;
    state.slotsInitInformation = [].concat(Object(toConsumableArray["a" /* default */])(state.slotsInitInformation), [Object(objectSpread2["a" /* default */])({
      uuid: slot.uuid
    }, info)]);
  },
  removeSlotInitInfo: function removeSlotInitInfo(state, slot) {
    state.slotsInitInformation = state.slotsInitInformation.filter(function (x) {
      return x.uuid !== slot.uuid;
    });
  },
  splitSlot: function splitSlot(state, slot) {
    var n = -32;
    var newSlots = slot.localParams.map(function (props) {
      n += 32;
      return {
        name: slot.name,
        plotType: slot.plotType,
        plotCategory: slot.plotCategory,
        localParams: [props],
        uuid: v4_default()(),
        archived: false,
        positionX: slot.positionX + n,
        positionY: slot.positionY + n,
        width: slot.width,
        height: slot.height,
        pageNumber: slot.pageNumber
      };
    });
    state.slots = [].concat(Object(toConsumableArray["a" /* default */])(state.slots.filter(function (s) {
      return s.uuid !== slot.uuid;
    })), Object(toConsumableArray["a" /* default */])(newSlots));
  },
  setSlotName: function setSlotName(state, _ref4) {
    var slot = _ref4.slot,
        name = _ref4.name;
    if (!name || name.length === 0) return;
    vue_runtime_esm["a" /* default */].set(slot, 'name', name);
  },
  setSlotPosition: function setSlotPosition(state, _ref5) {
    var slot = _ref5.slot,
        x = _ref5.x,
        y = _ref5.y;
    vue_runtime_esm["a" /* default */].set(slot, 'positionX', x);
    vue_runtime_esm["a" /* default */].set(slot, 'positionY', y);
  },
  setSlotSize: function setSlotSize(state, _ref6) {
    var slot = _ref6.slot,
        width = _ref6.width,
        height = _ref6.height;
    vue_runtime_esm["a" /* default */].set(slot, 'width', width);
    vue_runtime_esm["a" /* default */].set(slot, 'height', height);
  },
  mergeSlots: function mergeSlots(state, _ref7) {
    var slot1 = _ref7.slot1,
        slot2 = _ref7.slot2;
    if (slot1.uuid === slot2.uuid) return;
    slot1.localParams = [].concat(Object(toConsumableArray["a" /* default */])(slot1.localParams), Object(toConsumableArray["a" /* default */])(slot2.localParams));
    state.slots = state.slots.filter(function (s) {
      return s.uuid !== slot2.uuid;
    });
  },
  setParam: function setParam(state, _ref8) {
    var slot = _ref8.slot,
        paramName = _ref8.paramName,
        paramValue = _ref8.paramValue;
    slot.localParams = slot.localParams.map(function (params) {
      return Object.assign({}, params, Object(defineProperty["a" /* default */])({}, paramName, paramValue));
    });
  },
  unsetParam: function unsetParam(state, _ref9) {
    var slot = _ref9.slot,
        paramName = _ref9.paramName;
    slot.localParams = slot.localParams.map(function (params) {
      var copy = Object(objectSpread2["a" /* default */])({}, params);

      delete copy[paramName];
      return copy;
    });
  },
  replaceSlots: function replaceSlots(state, _ref10) {
    var slot1 = _ref10.slot1,
        slot2 = _ref10.slot2;
    if (slot1.uuid === slot2.uuid) return;
    ['name', 'plotType', 'localParams'].forEach(function (v) {
      vue_runtime_esm["a" /* default */].set(slot1, v, slot2[v]);
    });
    state.slots = state.slots.filter(function (s) {
      return s.uuid !== slot2.uuid;
    });
  },
  setPreview: function setPreview(state, slot) {
    state.preview = slot;
  },
  setColor: function setColor(state, _ref11) {
    var uuid = _ref11.uuid,
        color = _ref11.color;
    vue_runtime_esm["a" /* default */].set(state.manualColors, uuid, color);
  },
  closeElement: function closeElement(state, name) {
    state.closedElements = [].concat(Object(toConsumableArray["a" /* default */])(state.closedElements.filter(function (e) {
      return e !== name;
    })), [name]);
    localStorage.setItem('closedElements', JSON.stringify(state.closedElements));
  },
  addRecentURL: function addRecentURL(state, url) {
    state.recentURLSources = [].concat(Object(toConsumableArray["a" /* default */])(state.recentURLSources.filter(function (s) {
      return s.url !== url;
    })), [{
      time: new Date().getTime(),
      url: url
    }]).sort(function (a, b) {
      return b.time - a.time;
    }).slice(0, 5); // get last 5 urls

    localStorage.setItem('recentURLSources', JSON.stringify({
      version: '1.0.0',
      sources: state.recentURLSources
    }));
  },
  loadRecentURLSources: function loadRecentURLSources(state, sources) {
    state.recentURLSources = sources;
  }
};
var store_actions = {
  init: function init(_ref12) {
    var commit = _ref12.commit,
        state = _ref12.state,
        dispatch = _ref12.dispatch;

    try {
      var closed = JSON.parse(localStorage.getItem('closedElements'));

      if (closed) {
        if (!Array.isArray(closed)) throw new Error('value is not an array');
        closed.forEach(function (name) {
          if (typeof name === 'string' || name instanceof String) commit('closeElement', name);
        });
      }
    } catch (e) {
      console.error('Failed to read closedElements from localStorage', e);
    }

    try {
      var validatorRecentURLSources = store_ajv.compile(__webpack_require__("9452"));
      var recentURLSources = JSON.parse(localStorage.getItem('recentURLSources'));

      if (validatorRecentURLSources(recentURLSources)) {
        commit('loadRecentURLSources', recentURLSources.sources);
      }
    } catch (e) {
      console.error('Failed to read recentURLSources from localStorage', e);
    }
  },
  query: function query(_ref13, _query) {
    var state = _ref13.state,
        dispatch = _ref13.dispatch;
    // array of promises and raw objects (Promise.all will handle them)
    var promises = state.datasources.map(function (ds) {
      return dispatch(ds + '/query', _query);
    });
    return Promise.all(promises).then(function (results) {
      results = results.filter(function (r) {
        return r;
      }); // filter null and undefined
      // Only one promise should return not null value. In some weird situations, when data is doubled from
      // different sources, then results length will be bigger.

      if (results.length === 0) return null;
      if (results.length >= 1) return results[0];
    });
  },
  loadURL: function loadURL(_ref14, url) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var state, dispatch, commit, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref14.state, dispatch = _ref14.dispatch, commit = _ref14.commit;
              _context.next = 3;
              return vue_runtime_esm["a" /* default */].http.get(url);

            case 3:
              response = _context.sent;
              _context.next = 6;
              return dispatch('loadData', {
                data: response.body,
                src: url
              });

            case 6:
              commit('addRecentURL', url);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  loadData: function loadData(_ref15, data) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var state, dispatch, _iterator, _step, ds;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref15.state, dispatch = _ref15.dispatch;
              _iterator = Object(createForOfIteratorHelper["a" /* default */])(state.datasources);
              _context2.prev = 2;

              _iterator.s();

            case 4:
              if ((_step = _iterator.n()).done) {
                _context2.next = 12;
                break;
              }

              ds = _step.value;
              _context2.next = 8;
              return dispatch(ds + '/loadData', data);

            case 8:
              if (!_context2.sent) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return");

            case 10:
              _context2.next = 4;
              break;

            case 12:
              _context2.next = 17;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](2);

              _iterator.e(_context2.t0);

            case 17:
              _context2.prev = 17;

              _iterator.f();

              return _context2.finish(17);

            case 20:
              console.error('Failed to load data');

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 14, 17, 20]]);
    }))();
  },
  setGlobalParamByName: function setGlobalParamByName(_ref16, _ref17) {
    var commit = _ref16.commit,
        getters = _ref16.getters;
    var paramName = _ref17.paramName,
        valueName = _ref17.valueName;
    var param = (getters.availableParams[paramName] || []).find(function (p) {
      return p.name === valueName;
    });
    if (param) commit('setGlobalParam', {
      name: paramName,
      value: param
    });
  },

  /*
   * Method called from datasources to check if there are name collisions
   * of params and resolve them.
   * @return Promise with object in which keys are uuids of params that should be replaced
   * by keys' value
   */
  removeNameConflicts: function removeNameConflicts(_ref18, params) {
    var commit = _ref18.commit,
        getters = _ref18.getters;
    var toResolve = {
      params: {}
    };
    Object.keys(params).forEach(function (paramKey) {
      if (!getters.availableParams[paramKey]) return;
      toResolve.params[paramKey] = [];
      var simplified = getters.availableParams[paramKey].map(function (p) {
        return Object(objectSpread2["a" /* default */])({
          simplified: format.simplify(p.name)
        }, p);
      });
      params[paramKey].forEach(function (p) {
        var duplicate = simplified.findIndex(function (s) {
          return s.simplified === format.simplify(p.name);
        });
        if (duplicate === -1) return;
        toResolve.params[paramKey].push({
          orginal: getters.availableParams[paramKey][duplicate],
          newParam: p
        });
      });
    });
    return new Promise(function (resolve, reject) {
      toResolve.resolve = resolve;
      toResolve.reject = reject;
      commit('addNameConflictsToResolve', toResolve);
    });
  },
  arrangeSlots: function arrangeSlots(_ref19) {
    var commit = _ref19.commit,
        getters = _ref19.getters;
    var slots = getters.visibleSlots;
    var width = Math.floor(document.getElementById('playground').offsetWidth / 32);
    var height = Math.floor(document.getElementById('playground').offsetHeight / 32);
    var ratio = height / width;
    var c = 1; // number of columns

    var r = 1; // number of rows

    while (c * r < slots.length) {
      r / c > ratio ? c += 1 : r += 1;
    }

    var slotWidth = Math.floor((width - 1) / c) - 1; // -1 for margins

    var slotHeight = Math.floor((height - 1) / r) - 1;
    if (slotWidth <= 5 || slotHeight <= 5) return;
    slots.forEach(function (slot, i) {
      var columnNumber = Math.floor(i / r);
      var rowNumber = i - columnNumber * r;
      var leftMargin = 1 + columnNumber * (slotWidth + 1);
      var topMargin = 1 + rowNumber * (slotHeight + 1);
      commit('setSlotPosition', {
        slot: slot,
        x: 32 * leftMargin,
        y: 32 * topMargin
      });
      commit('setSlotSize', {
        slot: slot,
        width: slotWidth * 32,
        height: slotHeight * 32
      });
    });
  },

  /*
   * Method called to add slot or unarchive it
   * To make slot open in drag mode over button that was pressed to open it, set interaction and x, y params
   * @param interaction interaction object from interactjs event of pressing button etc
   * @param x left position of slot center
   * @param y top position of slot center
   * @example dispatch('addSlotToPlayground', { slot, interaction: event.interaction, x: event.pageX, y: event.pageY })
   */
  addSlotToPlayground: function addSlotToPlayground(_ref20, _ref21) {
    var commit = _ref20.commit,
        getters = _ref20.getters;
    var slot = _ref21.slot,
        interaction = _ref21.interaction,
        x = _ref21.x,
        y = _ref21.y;
    if (!slot.uuid) vue_runtime_esm["a" /* default */].set(slot, 'uuid', v4_default()());
    if (interaction) commit('addSlotInitInfo', {
      slot: slot,
      info: {
        interaction: interaction,
        x: x || 0,
        y: y || 0
      }
    });
    if (slot.archived) commit('unarchiveSlot', slot);else commit('addSlot', slot);
  }
};
/* harmony default export */ var store = (new vuex_esm["a" /* default */].Store({
  modules: {
    jsonDatasource: jsonDatasource,
    arenarLiveDatasource: arenarLiveDatasource
  },
  strict: false,
  state: store_state,
  getters: store_getters,
  mutations: store_mutations,
  actions: store_actions
}));
var store_color = {
  a: '#8bdcbe',
  b: '#f05a71',
  c: '#371ea3',
  d: '#46bac2',
  e: '#ae2c87',
  f: '#ffa58c',
  g: '#4378bf',
  h: '#160e3b'
};
var _palette = [store_color.a, store_color.b, store_color.g, store_color.d, store_color.e, store_color.f, store_color.c, store_color.h];
// EXTERNAL MODULE: ./node_modules/vue-resource/dist/vue-resource.esm.js
var vue_resource_esm = __webpack_require__("28dd");

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-svg-core/index.es.js
var index_es = __webpack_require__("ecee");

// EXTERNAL MODULE: ./node_modules/@fortawesome/free-solid-svg-icons/index.es.js
var free_solid_svg_icons_index_es = __webpack_require__("c074");

// EXTERNAL MODULE: ./node_modules/@fortawesome/free-regular-svg-icons/index.es.js
var free_regular_svg_icons_index_es = __webpack_require__("b702");

// EXTERNAL MODULE: ./node_modules/@fortawesome/vue-fontawesome/index.es.js
var vue_fontawesome_index_es = __webpack_require__("ad3d");

// CONCATENATED MODULE: ./src/utils/fontAwesomeLoader.js





function loadFontAwesome() {
  index_es["c" /* library */].add(free_solid_svg_icons_index_es["e" /* faArchive */], free_solid_svg_icons_index_es["k" /* faGripVertical */], free_solid_svg_icons_index_es["o" /* faMinusSquare */], free_solid_svg_icons_index_es["q" /* faPlusSquare */], free_solid_svg_icons_index_es["i" /* faCompressArrowsAlt */], free_solid_svg_icons_index_es["l" /* faLayerGroup */], free_solid_svg_icons_index_es["j" /* faExpand */], free_solid_svg_icons_index_es["f" /* faBars */]);
  index_es["c" /* library */].add(free_solid_svg_icons_index_es["a" /* faAngleDown */], free_solid_svg_icons_index_es["g" /* faCaretDown */], free_solid_svg_icons_index_es["p" /* faPlus */], free_solid_svg_icons_index_es["n" /* faMinus */], free_solid_svg_icons_index_es["d" /* faAngleUp */], free_solid_svg_icons_index_es["s" /* faSquare */], free_solid_svg_icons_index_es["h" /* faChartBar */], free_solid_svg_icons_index_es["r" /* faPoll */], free_solid_svg_icons_index_es["m" /* faListAlt */], free_solid_svg_icons_index_es["b" /* faAngleLeft */], free_solid_svg_icons_index_es["c" /* faAngleRight */]);
  index_es["c" /* library */].add(free_regular_svg_icons_index_es["c" /* faQuestionCircle */], free_regular_svg_icons_index_es["e" /* faTimesCircle */], free_regular_svg_icons_index_es["a" /* faCheckSquare */], free_regular_svg_icons_index_es["d" /* faSquare */], free_regular_svg_icons_index_es["b" /* faClone */]);
  vue_runtime_esm["a" /* default */].component('font-awesome-icon', vue_fontawesome_index_es["a" /* FontAwesomeIcon */]);
}
// CONCATENATED MODULE: ./src/main.js















loadFontAwesome();
var appendURL = new URLSearchParams(window.location.search).get('append');

if (appendURL) {
  localStorage.setItem('append', '');
  localStorage.setItem('append', appendURL);
  document.write('You can close this window');
} else {
  vue_runtime_esm["a" /* default */].config.productionTip = false;
  vue_runtime_esm["a" /* default */].use(vue_resource_esm["a" /* default */]);
  new vue_runtime_esm["a" /* default */]({
    render: function render(h) {
      return h(App);
    },
    store: store
  }).$mount('#app');
}

/***/ }),

/***/ "5dfc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1a12");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6253":
/***/ (function(module) {

module.exports = JSON.parse("{\"$schema\":\"http://json-schema.org/draft-06/schema#\",\"title\":\"Data file\",\"description\":\"Main data structure, that should be uploaded to application as .json file\",\"type\":\"object\",\"properties\":{\"version\":{\"type\":\"string\",\"const\":\"1.0.0\"},\"models\":{\"type\":\"array\",\"title\":\"Array of models' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"variables\":{\"type\":\"array\",\"title\":\"Array of variables' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"observations\":{\"type\":\"array\",\"title\":\"Array of observations' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"data\":{\"type\":\"array\",\"title\":\"Array of plots data\",\"items\":{\"type\":\"object\",\"title\":\"Single plot object\",\"properties\":{\"plotComponent\":{\"type\":\"string\",\"title\":\"Name of vue component to plot this object\",\"description\":\"Represents how the plot is build\",\"examples\":[\"FeatureImportance\",\"LinearPartialDependency\",\"CategoricalPartialDependency\"]},\"plotType\":{\"type\":\"string\",\"title\":\"Type of plot\",\"description\":\"Represents what plot presents\",\"examples\":[\"FeatureImportance\",\"PartialDependency\"]},\"plotCategory\":{\"type\":\"string\",\"title\":\"Category of plot\",\"examples\":[\"Local\",\"Global\"]},\"name\":{\"type\":\"string\",\"title\":\"Title of plot\"},\"params\":{\"type\":\"object\",\"title\":\"Plot params\",\"description\":\"Represents what the data is related to.\",\"properties\":{\"model\":{\"type\":\"string\"},\"observation\":{\"type\":\"string\"},\"variable\":{\"type\":\"string\"}}},\"data\":{\"type\":\"object\",\"title\":\"Plot traces\",\"description\":\"This object should be formatted for specified plotComponent\"}},\"required\":[\"plotType\",\"plotComponent\",\"plotCategory\",\"params\",\"name\",\"data\"]}}},\"required\":[\"version\",\"models\",\"observations\",\"variables\",\"data\"]}");

/***/ }),

/***/ "711e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "71e8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7675":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BlockHead_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9e16");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BlockHead_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BlockHead_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BlockHead_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "773a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Preview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("525a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Preview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Preview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Preview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "774b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f533");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7c62":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlotProxy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("374f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlotProxy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlotProxy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlotProxy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7fbb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSources_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0b76");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSources_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSources_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSources_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8369":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteZone_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("dc10");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteZone_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteZone_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteZone_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "85ec":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8c4f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8ff1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d751");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9452":
/***/ (function(module) {

module.exports = JSON.parse("{\"$schema\":\"http://json-schema.org/draft-06/schema#\",\"title\":\"recentURLSources\",\"description\":\"Simple structure to save recently used source URLs\",\"type\":\"object\",\"properties\":{\"version\":{\"type\":\"string\",\"const\":\"1.0.0\"},\"sources\":{\"type\":\"array\",\"title\":\"Array of sources\",\"items\":{\"type\":\"object\",\"title\":\"Single source\",\"properties\":{\"url\":{\"type\":\"string\",\"title\":\"URL of source\"},\"time\":{\"type\":\"number\",\"title\":\"timestamp of last usage in miliseconds\"}},\"required\":[\"url\",\"time\"]}}},\"required\":[\"version\",\"sources\"]}");

/***/ }),

/***/ "9542":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlotsListElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3064");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlotsListElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlotsListElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlotsListElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9e16":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9efa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("166a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ad94":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c2d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("248e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c967":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ceb6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ad94");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "cf05":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo.1a3768b8.png";

/***/ }),

/***/ "d751":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "dc10":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e467":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e53e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WelcomeScreen_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f74a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WelcomeScreen_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WelcomeScreen_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WelcomeScreen_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ea04":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidepanel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2528");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidepanel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidepanel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidepanel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ef23":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c967");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f437":
/***/ (function(module) {

module.exports = JSON.parse("{\"$schema\":\"http://json-schema.org/draft-06/schema#\",\"title\":\"Arenar live root response\",\"description\":\"Data structure returned by arenar live server at /\",\"type\":\"object\",\"properties\":{\"version\":{\"type\":\"string\",\"const\":\"1.0.0\"},\"api\":{\"type\":\"string\",\"const\":\"arenar_api\"},\"timestamp\":{\"type\":\"number\"},\"models\":{\"type\":\"array\",\"title\":\"Array of models' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"variables\":{\"type\":\"array\",\"title\":\"Array of variables' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"observations\":{\"type\":\"array\",\"title\":\"Array of observations' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"availablePlots\":{\"type\":\"array\",\"title\":\"Array of plots that server can produce\",\"items\":{\"type\":\"object\",\"title\":\"Object with basic properties of each plot type\",\"properties\":{\"plotType\":{\"type\":\"string\",\"title\":\"Type of plot\",\"description\":\"Represents what plot presents\",\"examples\":[\"FeatureImportance\",\"PartialDependency\"]},\"plotCategory\":{\"type\":\"string\",\"title\":\"Category of plot\",\"examples\":[\"Local\",\"Global\"]},\"name\":{\"type\":\"string\",\"title\":\"Title of plot\"},\"requiredParams\":{\"type\":\"array\",\"title\":\"Params that must be provided to calculate plot\",\"items\":{\"type\":\"string\"}}},\"required\":[\"plotType\",\"plotCategory\",\"requiredParams\",\"name\"]}}},\"required\":[\"version\",\"api\",\"timestamp\",\"models\",\"observations\",\"variables\",\"availablePlots\"]}");

/***/ }),

/***/ "f533":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f5bc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f74a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ff6e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=app.1cc4715d.js.map