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
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + "." + {"chunk-6728a27e":"1d893e68","chunk-42c51506":"9916594c"}[chunkId] + ".js"
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
/******/ 		var cssChunks = {"chunk-42c51506":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "css/" + ({}[chunkId]||chunkId) + "." + {"chunk-6728a27e":"31d6cfe0","chunk-42c51506":"83b35c86"}[chunkId] + ".css";
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

/***/ "0085":
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

/***/ "07a4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0b76":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "166a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1a12":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1b6b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1cbf":
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

/***/ "2283":
/***/ (function(module) {

module.exports = JSON.parse("{\"$schema\":\"http://json-schema.org/draft-06/schema#\",\"title\":\"Data file\",\"description\":\"Main data structure, that should be uploaded to application as .json file\",\"type\":\"object\",\"properties\":{\"version\":{\"type\":\"string\",\"const\":\"1.0.0\"},\"models\":{\"type\":\"array\",\"title\":\"Array of models' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"variables\":{\"type\":\"array\",\"title\":\"Array of variables' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"observations\":{\"type\":\"array\",\"title\":\"Array of observations' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"data\":{\"type\":\"array\",\"title\":\"Array of plots data\",\"items\":{\"type\":\"object\",\"title\":\"Single plot object\",\"properties\":{\"plotComponent\":{\"type\":\"string\",\"title\":\"Name of vue component to plot this object\",\"description\":\"Represents how the plot is build\",\"examples\":[\"FeatureImportance\",\"LinearPartialDependency\",\"CategoricalPartialDependency\"]},\"plotType\":{\"type\":\"string\",\"title\":\"Type of plot\",\"description\":\"Represents what plot presents\",\"examples\":[\"FeatureImportance\",\"PartialDependency\"]},\"plotCategory\":{\"type\":\"string\",\"title\":\"Category of plot\",\"examples\":[\"Local\",\"Global\"]},\"name\":{\"type\":\"string\",\"title\":\"Title of plot\"},\"params\":{\"type\":\"object\",\"title\":\"Plot params\",\"description\":\"Represents what the data is related to.\",\"properties\":{\"model\":{\"type\":\"string\"},\"observation\":{\"type\":\"string\"},\"variable\":{\"type\":\"string\"}}},\"data\":{\"type\":\"object\",\"title\":\"Plot traces\",\"description\":\"This object should be formatted for specified plotComponent\"}},\"required\":[\"plotType\",\"plotComponent\",\"plotCategory\",\"params\",\"name\",\"data\"]}}},\"required\":[\"version\",\"models\",\"observations\",\"variables\",\"data\"]}");

/***/ }),

/***/ "248e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2528":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "287c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FunnelMeasure_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8605");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FunnelMeasure_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FunnelMeasure_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FunnelMeasure_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "3064":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "30e7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3375":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SubsetsPerformance_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ace6");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SubsetsPerformance_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SubsetsPerformance_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SubsetsPerformance_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "374f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "396e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DistributionCounts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d7d4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DistributionCounts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DistributionCounts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DistributionCounts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "4325":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HtmlWidget_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cc4c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HtmlWidget_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HtmlWidget_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HtmlWidget_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "459e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "480f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4859":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NameConflicts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("711e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NameConflicts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NameConflicts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NameConflicts_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "4e85":
/***/ (function(module) {

module.exports = JSON.parse("{\"$schema\":\"http://json-schema.org/draft-06/schema#\",\"title\":\"recentURLSources\",\"description\":\"Simple structure to save recently used source URLs\",\"type\":\"object\",\"properties\":{\"version\":{\"type\":\"string\",\"const\":\"1.0.0\"},\"sources\":{\"type\":\"array\",\"title\":\"Array of sources\",\"items\":{\"type\":\"object\",\"title\":\"Single source\",\"properties\":{\"url\":{\"type\":\"string\",\"title\":\"URL of source\"},\"time\":{\"type\":\"number\",\"title\":\"timestamp of last usage in miliseconds\"}},\"required\":[\"url\",\"time\"]}}},\"required\":[\"version\",\"sources\"]}");

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=10c1b71a&
var Appvue_type_template_id_10c1b71a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('Navbar',{class:{ blured: _vm.settingsVisible },on:{"openSettings":function($event){_vm.settingsVisible = true}}}),_c('Sidepanel',{class:{ blured: _vm.settingsVisible },attrs:{"id":"sidepanel"}}),_c('div',{class:{ blured: _vm.settingsVisible },attrs:{"id":"playground"}},_vm._l((_vm.visibleSlots),function(slot){return _c('Block',{key:slot.uuid,attrs:{"slotv":slot},on:{"openFullscreen":function($event){_vm.fullscreenSlot = slot}}})}),1),_c('Annotations'),_c('DeleteZone'),_c('PagesBar'),(_vm.settingsVisible)?_c('div',{staticClass:"overlay",on:{"click":function($event){_vm.settingsVisible = false}}}):_vm._e(),(_vm.settingsVisible)?_c('Settings',{on:{"close":function($event){_vm.settingsVisible = false}}}):_vm._e(),(_vm.waitingParamsConflicts.length > 0)?_c('div',{staticClass:"overlay overlay-2"}):_vm._e(),(_vm.waitingParamsConflicts.length > 0)?_c('NameConflicts'):_vm._e(),(_vm.welcomeScreenVisible)?_c('div',{staticClass:"overlay",on:{"click":function($event){_vm.displayWelcomeScreen = false}}}):_vm._e(),(_vm.welcomeScreenVisible)?_c('WelcomeScreen',{on:{"close":function($event){_vm.displayWelcomeScreen = false}}}):_vm._e(),(_vm.fullscreenSlot)?_c('FullscreenBlock',{attrs:{"slotv":_vm.fullscreenSlot},on:{"close":function($event){_vm.fullscreenSlot = null}}}):_vm._e(),(_vm.preview)?_c('Preview',{attrs:{"slotv":_vm.preview}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=10c1b71a&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.parse-int.js
var es_number_parse_int = __webpack_require__("25eb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Sidepanel.vue?vue&type=template&id=4013c00a&
var Sidepanelvue_type_template_id_4013c00a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sidepanel",class:{ closed: !_vm.open }},[_c('div',{staticClass:"overlay",class:{ visible: _vm.dropzoneVisible, active: _vm.dropzoneActive }},[_c('span',{staticClass:"title"},[_c('font-awesome-icon',{attrs:{"icon":['fas', 'archive']}}),_vm._v("CLIPBOARD")],1)]),_c('div',{staticClass:"arrow-button",on:{"click":function($event){_vm.open=!_vm.open}}},[_vm._v(_vm._s(_vm.open ? "▶" : "◀"))]),(!_vm.isElementClosed('help-1'))?_c('SidepanelHelp',{attrs:{"num":1},on:{"close":function($event){return _vm.closeElement('help-1')}}}):_vm._e(),_c('span',{staticClass:"section-title"},[_c('font-awesome-icon',{attrs:{"icon":"list-alt"}}),_vm._v(" "+_vm._s(_vm.selectTitle))],1),_c('SidepanelDropdown',{on:{"updateSlotsList":function($event){_vm.slotsList = $event}}}),(!_vm.isElementClosed('help-2'))?_c('SidepanelHelp',{attrs:{"num":2},on:{"close":function($event){return _vm.closeElement('help-2')}}}):_vm._e(),_c('span',{staticClass:"section-title"},[_c('font-awesome-icon',{attrs:{"icon":"poll"}}),_vm._v(" Plots")],1),(_vm.slotsList != null)?_c('div',{staticClass:"sidepanel-list"},_vm._l((_vm.slotsCategories),function(c){return _c('div',{key:c},[_c('span',{staticClass:"category-name"},[_vm._v(_vm._s(c))]),_vm._l((_vm.slotsList.filter(function (s) { return s.plotCategory === c; })),function(slot){return _c('SlotsListElement',{key:slot.uuid,attrs:{"slotv":slot},on:{"take":function($event){return _vm.$emit('addToPlayground', $event)}}})})],2)}),0):_vm._e()],1)}
var Sidepanelvue_type_template_id_4013c00a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Sidepanel.vue?vue&type=template&id=4013c00a&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("13d5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.js
var es_set = __webpack_require__("6062");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("2909");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SlotsListElement.vue?vue&type=template&id=6620718e&
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
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SidepanelDropdown.vue?vue&type=template&id=2afa3c66&
var SidepanelDropdownvue_type_template_id_2afa3c66_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sidepanel-dropdown"},[_c('div',{staticClass:"options-list"},[_vm._l((_vm.scopes),function(g){return _c('div',{key:g,staticClass:"group"},[_c('div',{staticClass:"group-name"},[_vm._v(_vm._s(_vm._f("firstCharUpper")(g)))]),_vm._l((_vm.availableParams[g]),function(o){return _c('div',{key:o,staticClass:"option",class:{ selected: _vm.isSelected(g, o) },on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }return _vm.select(g, o)}}},[_vm._v(" "+_vm._s(_vm._f("formatTitle")(o))+" "),_c('span',{staticClass:"left-button"},[(_vm.selectedGroup === g && !_vm.isSelected(g, o))?_c('font-awesome-icon',{staticClass:"add button",attrs:{"icon":"plus"}}):_vm._e(),(_vm.selectedGroup === g && !_vm.isSelected(g, o))?_c('font-awesome-icon',{staticClass:"add button-hover",attrs:{"icon":"plus-square"},on:{"click":function($event){return _vm.addSelect(g, o)}}}):_vm._e(),(_vm.isSelected(g, o) && _vm.selectedValues.length > 1)?_c('font-awesome-icon',{staticClass:"minus button",attrs:{"icon":"minus"}}):_vm._e(),(_vm.isSelected(g, o) && _vm.selectedValues.length > 1)?_c('font-awesome-icon',{staticClass:"minus button-hover",attrs:{"icon":"minus-square"},on:{"click":function($event){return _vm.removeSelect(o)}}}):_vm._e()],1),_c('font-awesome-icon',{staticClass:"color-button",style:({ display: !_vm.isSelectorOpen(g, o) ? 'block' : 'none', color: _vm.scopesColors[g][o] }),attrs:{"icon":"square"},on:{"click":function($event){return _vm.openColorSelector(g, o)}}}),_c('div',{staticClass:"color-selector",style:({ display: _vm.isSelectorOpen(g, o) ? 'block' : 'none' })},_vm._l((_vm.palette),function(color){return _c('font-awesome-icon',{key:color,staticClass:"color-button",style:({ color: color }),attrs:{"icon":"square"},on:{"click":function($event){return _vm.setColor(g, o, color)}}})}),1)],1)})],2)}),_c('div',{staticClass:"group"},[_c('div',{staticClass:"group-name"},[_vm._v("Other")]),_c('div',{staticClass:"option",class:{ selected: _vm.isSelected('other', 'clipboard') },on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }return _vm.select('other', 'clipboard')}}},[_vm._v("Clipboard")]),_c('div',{staticClass:"option",class:{ selected: _vm.isSelected('other', 'annotate') },on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }return _vm.select('other', 'annotate')}}},[_vm._v(" Annotate "),(!_vm.isSelectorOpen('other', 'annotate'))?_c('font-awesome-icon',{staticClass:"color-button",style:({ color: _vm.annotationsColor === 'erase' ? 'black' : _vm.annotationsColor }),attrs:{"icon":_vm.annotationsColor === 'erase' ? 'eraser' : 'square'},on:{"click":function($event){return _vm.openColorSelector('other', 'annotate')}}}):_vm._e(),_c('div',{staticClass:"color-selector",style:({ display: _vm.isSelectorOpen('other', 'annotate') ? 'block' : 'none' })},[_vm._l((_vm.palette),function(color){return _c('font-awesome-icon',{key:color,staticClass:"color-button",style:({ color: color }),attrs:{"icon":"square"},on:{"click":function($event){return _vm.setAnnotationsColor(color)}}})}),_c('font-awesome-icon',{staticClass:"color-button",staticStyle:{"color":"black"},attrs:{"icon":"eraser"},on:{"click":function($event){return _vm.setAnnotationsColor('erase')}}})],2)],1)])],2)])}
var SidepanelDropdownvue_type_template_id_2afa3c66_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SidepanelDropdown.vue?vue&type=template&id=2afa3c66&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__("07ac");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("ade3");

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
    var k = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var r = round(x, 3 + k);
    if (Math.abs(2 * x) >= Math.pow(10, 6)) r = round(x / Math.pow(10, 6), 1 + k) + 'M';else if (Math.abs(2 * x) >= Math.pow(10, 3)) r = round(x / Math.pow(10, 3), 2 + k) + 'K';
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
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/Breakdown.vue?vue&type=template&id=c236520a&
var Breakdownvue_type_template_id_c236520a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"breakdown-plot"},[_c('Plotly',_vm._b({ref:"plot",on:{"plotly_click":_vm.onPlotlyClick}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false)),(_vm.selectVisible)?_c('SelectMenu',{style:(_vm.selectStyle),attrs:{"options":_vm.selectOptions},model:{value:(_vm.selectVisible),callback:function ($$v) {_vm.selectVisible=$$v},expression:"selectVisible"}}):_vm._e()],1)}
var Breakdownvue_type_template_id_c236520a_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/Breakdown.vue?vue&type=template&id=c236520a&

// EXTERNAL MODULE: ./node_modules/vue-resize-directive/dist/Vueresize.js
var Vueresize = __webpack_require__("428d");
var Vueresize_default = /*#__PURE__*/__webpack_require__.n(Vueresize);

// CONCATENATED MODULE: ./src/utils/Resize.js

/* harmony default export */ var Resize = ({
  data: function data() {
    return {
      width: 0,
      height: 0
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
      var el = this.$refs.plot;
      if (!el) return;
      if (el.$el) el = el.$el;
      if (this.$refs.plot) this.width = el.offsetWidth;
      if (this.$refs.plot) this.height = el.offsetHeight;
    }
  },
  directives: {
    resize: Vueresize_default.a
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SelectMenu.vue?vue&type=template&id=c0eb574e&
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
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
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
            plotCategory: 'Observation Level',
            scope: 'model',
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
          name: d.params.model,
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
        return v === variableName;
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
  Breakdownvue_type_template_id_c236520a_render,
  Breakdownvue_type_template_id_c236520a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Breakdown = (Breakdown_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/FeatureImportance.vue?vue&type=template&id=3e55ff7a&
var FeatureImportancevue_type_template_id_3e55ff7a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"feature-importance-plot"},[_c('Plotly',_vm._b({ref:"plot",on:{"plotly_click":_vm.onPlotlyClick}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false)),_c('div',{staticClass:"axis-type-input"},_vm._l((_vm.axisTypes),function(t){return _c('span',{key:t,class:{ active: _vm.axisType === t },on:{"click":function($event){return _vm.setAxisType(t)}}},[_vm._v(_vm._s(_vm._f("firstUpper")(t)))])}),0)],1)}
var FeatureImportancevue_type_template_id_3e55ff7a_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/FeatureImportance.vue?vue&type=template&id=3e55ff7a&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/FeatureImportance.vue?vue&type=script&lang=js&














//
//
//
//
//
//
//
//




var FeatureImportancevue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var FeatureImportancevue_type_script_lang_js_ = ({
  name: 'FeatureImportance',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data: function data() {
    return {
      selectedModel: null,
      axisType: null
    };
  },
  watch: {
    axisTypes: {
      handler: function handler() {
        if (this.customData && this.axisTypes.includes(this.customData.axisType)) {
          this.axisType = this.customData.axisType;
        } else {
          this.setAxisType(this.axisTypes[0]);
        }
      },
      immediate: true
    },
    customData: {
      handler: function handler(newValue) {
        if (!newValue) return;
        if (this.axisTypes.includes(newValue.axisType)) this.axisType = newValue.axisType;
      },
      immediate: true
    }
  },
  filters: {
    firstUpper: format.firstCharUpper
  },
  computed: Object(objectSpread2["a" /* default */])({
    customData: function customData() {
      return this.slotv.customData;
    },
    axisTypes: function axisTypes() {
      return ['dropout loss', 'difference', 'scaled'];
    },
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
    transformed: function transformed() {
      var _this2 = this;

      return this.trimmed.map(function (d) {
        var minus = _this2.axisType !== 'dropout loss' ? d.plotData.base : 0;
        var div = _this2.axisType === 'scaled' ? Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.dropout_loss)) - minus : 1;

        var mapping = function mapping(x) {
          return (x - minus) / div;
        };

        return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, d), {}, {
          plotData: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, d.plotData), {}, {
            dropout_loss: d.plotData.dropout_loss.map(mapping),
            min: d.plotData.min.map(mapping),
            max: d.plotData.max.map(mapping),
            q1: d.plotData.q1.map(mapping),
            q3: d.plotData.q3.map(mapping),
            base: d.plotData.base - minus
          })
        });
      });
    },
    traces: function traces() {
      var _this3 = this;

      return this.transformed.map(function (d, i) {
        return {
          name: d.params.model,
          type: 'bar',
          orientation: 'h',
          y: d.plotData.variables.map(function (y) {
            return format.addNewLines(y, _this3.leftMargin);
          }),
          base: d.plotData.base,
          x: d.plotData.dropout_loss.map(function (x) {
            return x - d.plotData.base;
          }),
          text: d.plotData.dropout_loss.map(function (x) {
            return format.formatValue(x - d.plotData.base, true, '  ');
          }),
          textposition: _this3.displayBoxplots ? 'inside' : 'outside',
          hovertext: d.plotData.variables,
          textfont: {
            color: _this3.displayBoxplots ? 'white' : '#371ea3'
          },
          hoverinfo: 'template',
          hovertemplate: d.plotData.dropout_loss.map(function (x, i) {
            return format.formatValue(d.plotData.base) + ' => ' + format.formatValue(x);
          }),
          hoverlabel: {
            bgcolor: _this3.scopesColors.model[d.params.model],
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          marker: {
            color: _this3.scopesColors.model[d.params.model]
          },
          insidetextanchor: 'start',
          selectedpoints: _this3.selectedModel === d.params.model || _this3.selectedModel === null ? undefined : [] // undefined - all selected, [] - all unselected

        };
      }).concat(!this.displayBoxplots ? [] : this.transformed.map(function (d, i) {
        var iqr = d.plotData.q3.map(function (x, k) {
          return x - d.plotData.q1[k];
        });
        return {
          name: d.params.model,
          type: 'box',
          orientation: 'h',
          y: d.plotData.variables.map(function (y) {
            return format.addNewLines(y, _this3.leftMargin);
          }),
          q1: d.plotData.q1,
          median: d.plotData.q1,
          // median is invisible, but need to be between q1 and q3
          q3: d.plotData.q3,
          marker: {
            color: _this3.selectedModel === d.params.model || _this3.selectedModel === null ? '#371ea3' : 'transparent'
          },
          line: {
            width: 1
          },
          fillcolor: _this3.selectedModel === d.params.model || _this3.selectedModel === null ? '#371ea3' : 'transparent',
          lowerfence: d.plotData.q1.map(function (x, k) {
            return Math.max(x - 1.5 * iqr[k], d.plotData.min[k]);
          }),
          upperfence: d.plotData.q3.map(function (x, k) {
            return Math.min(x + 1.5 * iqr[k], d.plotData.max[k]);
          }),
          showlegend: false,
          hoverinfo: 'none',
          whiskerwidth: 0.5
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
            text: '',
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
        shapes: this.transformed.map(function (d) {
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
      return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(this.transformed.map(function (d) {
        return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData.min).concat([d.plotData.base]));
      })));
    },
    maximalValue: function maximalValue() {
      return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(this.transformed.map(function (d) {
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
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
  methods: {
    setAxisType: function setAxisType(v) {
      this.$store.commit('setSlotCustomData', {
        slot: this.slotv,
        customData: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.customData), {}, {
          axisType: v
        })
      });
    },
    onPlotlyClick: function onPlotlyClick(e) {
      var _this4 = this;

      var points = e.data.points.filter(function (p) {
        return p.curveNumber < _this4.transformed.length;
      }); // Boxplots are after all bars

      if (points.length === 0) return;
      var yaxis = points[0].yaxis; // All points have the same
      // I do not know why it works, I just found this by experiments

      var barWidth = (yaxis._length - yaxis._m - yaxis._b) / (this.transformed.length * yaxis._categories.length);
      var barsTop = yaxis.d2p(points[0].y) - 0.5 * barWidth * this.transformed.length; // Center - half of widths sum

      var curveNum = Math.floor((e.data.event.pointerY - barsTop) / barWidth); // Assuming plot is at top:0

      if (curveNum >= this.transformed.length || curveNum < 0) return;
      var model = this.transformed[curveNum].params.model; // If this model is already selected, then unselect

      this.selectedModel = this.selectedModel === model ? null : model;
    }
  },
  components: {
    Plotly: FeatureImportancevue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/FeatureImportance.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_FeatureImportancevue_type_script_lang_js_ = (FeatureImportancevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/plots/FeatureImportance.vue?vue&type=style&index=0&lang=css&
var FeatureImportancevue_type_style_index_0_lang_css_ = __webpack_require__("f8e0");

// CONCATENATED MODULE: ./src/plots/FeatureImportance.vue






/* normalize component */

var FeatureImportance_component = Object(componentNormalizer["a" /* default */])(
  plots_FeatureImportancevue_type_script_lang_js_,
  FeatureImportancevue_type_template_id_3e55ff7a_render,
  FeatureImportancevue_type_template_id_3e55ff7a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FeatureImportance = (FeatureImportance_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/CategoricalDependence.vue?vue&type=template&id=5ceb1304&
var CategoricalDependencevue_type_template_id_5ceb1304_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"categorical-dependence-plot"},[_c('Plotly',_vm._b({ref:"plot"},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false))],1)}
var CategoricalDependencevue_type_template_id_5ceb1304_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/CategoricalDependence.vue?vue&type=template&id=5ceb1304&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/CategoricalDependence.vue?vue&type=script&lang=js&





//
//
//
//
//




var CategoricalDependencevue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
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
          name: d.params.model,
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
            bgcolor: _this.scopesColors.model[d.params.model],
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          marker: {
            color: _this.scopesColors.model[d.params.model]
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
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
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
  CategoricalDependencevue_type_template_id_5ceb1304_render,
  CategoricalDependencevue_type_template_id_5ceb1304_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CategoricalDependence = (CategoricalDependence_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/LinearDependence.vue?vue&type=template&id=703b893f&
var LinearDependencevue_type_template_id_703b893f_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"linear-dependence-plot"},[_c('Plotly',_vm._b({ref:"plot",on:{"plotly_click":_vm.onPlotlyClick}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout },false))],1)}
var LinearDependencevue_type_template_id_703b893f_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/LinearDependence.vue?vue&type=template&id=703b893f&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/LinearDependence.vue?vue&type=script&lang=js&



//
//
//
//
//



var LinearDependencevue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
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
          name: d.params.model + ' - ' + d.params.variable,
          type: 'scatter',
          mode: 'lines',
          x: d.plotData.x,
          y: d.plotData.y,
          hoverinfo: 'none',
          line: {
            shape: 'spline'
          },
          marker: {
            color: _this.scopesColors.model[d.params.model]
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
            text: this.data.length > 0 ? format.formatTitle(this.data[0].params.variable) : '',
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
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
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
  LinearDependencevue_type_template_id_703b893f_render,
  LinearDependencevue_type_template_id_703b893f_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var LinearDependence = (LinearDependence_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/NumericalCeterisParibus.vue?vue&type=template&id=f27248b6&
var NumericalCeterisParibusvue_type_template_id_f27248b6_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"numerical-cateris-paribus-plot"},[_c('Plotly',_vm._b({ref:"plot",on:{"plotly_click":_vm.onPlotlyClick}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout },false))],1)}
var NumericalCeterisParibusvue_type_template_id_f27248b6_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/NumericalCeterisParibus.vue?vue&type=template&id=f27248b6&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/NumericalCeterisParibus.vue?vue&type=script&lang=js&







//
//
//
//
//



var NumericalCeterisParibusvue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
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
          name: d.params.model + ' - ' + d.params.variable,
          type: 'scatter',
          mode: 'lines',
          x: [].concat(Object(toConsumableArray["a" /* default */])(d.plotData.x), [d.plotData.observation[d.plotData.variable]]),
          y: [].concat(Object(toConsumableArray["a" /* default */])(d.plotData.y), [d.plotData.observation['_yhat_']]),
          hoverinfo: 'none',
          line: {
            shape: 'spline'
          },
          marker: {
            color: _this.scopesColors.model[d.params.model]
          },
          transforms: [{
            type: 'sort',
            target: 'x',
            order: 'ascending'
          }]
        }, {
          name: d.params.model,
          type: 'scatter',
          mode: 'marker',
          x: [d.plotData.observation[d.plotData.variable]],
          y: [d.plotData.observation['_yhat_']],
          text: format.formatTitle(d.params.observation) + ': ' + format.formatValue(d.plotData.observation['_yhat_'], false, '', 3),
          hoverinfo: 'text',
          hoverlabel: {
            bgcolor: _this.scopesColors.model[d.params.model],
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          marker: {
            color: '#371ea3',
            size: 8
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
            text: this.data.length > 0 ? format.formatTitle(this.data[0].params.variable) : '',
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
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
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
  NumericalCeterisParibusvue_type_template_id_f27248b6_render,
  NumericalCeterisParibusvue_type_template_id_f27248b6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var NumericalCeterisParibus = (NumericalCeterisParibus_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/CategoricalCeterisParibus.vue?vue&type=template&id=2c22155e&
var CategoricalCeterisParibusvue_type_template_id_2c22155e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"categorical-dependence-plot"},[_c('Plotly',_vm._b({ref:"plot"},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false))],1)}
var CategoricalCeterisParibusvue_type_template_id_2c22155e_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/CategoricalCeterisParibus.vue?vue&type=template&id=2c22155e&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/CategoricalCeterisParibus.vue?vue&type=script&lang=js&





//
//
//
//
//




var CategoricalCeterisParibusvue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
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
          name: d.params.model,
          type: 'bar',
          orientation: 'h',
          base: d.plotData.observation['_yhat_'],
          y: d.plotData.x.map(function (y) {
            return format.addNewLines(y, _this.leftMargin);
          }),
          x: d.plotData.y.map(function (x) {
            return x - d.plotData.observation['_yhat_'];
          }),
          textposition: 'outside',
          textfont: {
            color: '#371ea8'
          },
          hoverinfo: 'text',
          text: d.plotData.y.map(function (x) {
            return format.formatValue(x - d.plotData.observation['_yhat_'], true);
          }),
          hoverlabel: {
            bgcolor: _this.scopesColors.model[d.params.model],
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          marker: {
            color: _this.scopesColors.model[d.params.model]
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
        hovermode: 'closest',
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
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
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
  CategoricalCeterisParibusvue_type_template_id_2c22155e_render,
  CategoricalCeterisParibusvue_type_template_id_2c22155e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CategoricalCeterisParibus = (CategoricalCeterisParibus_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/SHAPValues.vue?vue&type=template&id=35441e92&
var SHAPValuesvue_type_template_id_35441e92_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"shap-values-plot"},[_c('Plotly',_vm._b({ref:"plot",on:{"plotly_click":_vm.onPlotlyClick}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false))],1)}
var SHAPValuesvue_type_template_id_35441e92_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/SHAPValues.vue?vue&type=template&id=35441e92&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/SHAPValues.vue?vue&type=script&lang=js&












//
//
//
//
//




var SHAPValuesvue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
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
          name: d.params.model,
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
            bgcolor: _this2.scopesColors.model[d.params.model],
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          marker: {
            color: _this2.scopesColors.model[d.params.model]
          },
          insidetextanchor: 'start',
          selectedpoints: _this2.selectedModel === d.params.model || _this2.selectedModel === null ? undefined : [] // undefined - all selected, [] - all unselected

        };
      }).concat(!this.displayBoxplots ? [] : this.trimmed.map(function (d, i) {
        return {
          name: d.params.model,
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
            color: _this2.selectedModel === d.params.model || _this2.selectedModel === null ? '#371ea3' : 'transparent'
          },
          line: {
            width: 1
          },
          fillcolor: _this2.selectedModel === d.params.model || _this2.selectedModel === null ? '#371ea3' : 'transparent',
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
      var _this3 = this;

      return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(this.trimmed.map(function (d) {
        return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData[_this3.displayBoxplots ? 'min' : 'mean']).concat([0])) + d.plotData.intercept;
      })));
    },
    maximalValue: function maximalValue() {
      var _this4 = this;

      return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(this.trimmed.map(function (d) {
        return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData[_this4.displayBoxplots ? 'max' : 'mean']).concat([0])) + d.plotData.intercept;
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
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
  methods: {
    onPlotlyClick: function onPlotlyClick(e) {
      var _this5 = this;

      var points = e.data.points.filter(function (p) {
        return p.curveNumber < _this5.trimmed.length;
      }); // Boxplots are after all bars

      if (points.length === 0) return;
      var yaxis = points[0].yaxis; // All points have the same
      // I do not know why it works, I just found this by experiments

      var barWidth = (yaxis._length - yaxis._m - yaxis._b) / (this.trimmed.length * yaxis._categories.length);
      var barsTop = yaxis.d2p(points[0].y) - 0.5 * barWidth * this.trimmed.length; // Center - half of widths sum

      var curveNum = Math.floor((e.data.event.pointerY - barsTop) / barWidth); // Assuming plot is at top:0

      if (curveNum >= this.trimmed.length || curveNum < 0) return;
      var model = this.trimmed[curveNum].params.model; // If this model is already selected, then unselect

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
  SHAPValuesvue_type_template_id_35441e92_render,
  SHAPValuesvue_type_template_id_35441e92_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SHAPValues = (SHAPValues_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/HtmlWidget.vue?vue&type=template&id=1feded80&
var HtmlWidgetvue_type_template_id_1feded80_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"html-widget-plot"},[(_vm.iframeSrc)?_c('iframe',{attrs:{"srcdoc":_vm.iframeSrc}}):_vm._e()])}
var HtmlWidgetvue_type_template_id_1feded80_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/HtmlWidget.vue?vue&type=template&id=1feded80&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/HtmlWidget.vue?vue&type=script&lang=js&
//
//
//
//
//
/* harmony default export */ var HtmlWidgetvue_type_script_lang_js_ = ({
  name: 'HtmlWidget',
  props: {
    data: Array,
    plotType: String
  },
  computed: {
    iframeSrc: function iframeSrc() {
      if (this.data.length === 0) return null;
      return this.data[0].plotData.html;
    }
  }
});
// CONCATENATED MODULE: ./src/plots/HtmlWidget.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_HtmlWidgetvue_type_script_lang_js_ = (HtmlWidgetvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/plots/HtmlWidget.vue?vue&type=style&index=0&lang=css&
var HtmlWidgetvue_type_style_index_0_lang_css_ = __webpack_require__("4325");

// CONCATENATED MODULE: ./src/plots/HtmlWidget.vue






/* normalize component */

var HtmlWidget_component = Object(componentNormalizer["a" /* default */])(
  plots_HtmlWidgetvue_type_script_lang_js_,
  HtmlWidgetvue_type_template_id_1feded80_render,
  HtmlWidgetvue_type_template_id_1feded80_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var HtmlWidget = (HtmlWidget_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/ROC.vue?vue&type=template&id=43b55044&
var ROCvue_type_template_id_43b55044_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"roc-plot"},[_c('Plotly',_vm._b({ref:"plot"},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout },false))],1)}
var ROCvue_type_template_id_43b55044_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/ROC.vue?vue&type=template&id=43b55044&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/ROC.vue?vue&type=script&lang=js&



//
//
//
//
//


var ROCvue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var ROCvue_type_script_lang_js_ = ({
  name: 'ROC',
  props: {
    data: Array,
    plotType: String
  },
  computed: Object(objectSpread2["a" /* default */])({
    traces: function traces() {
      var _this = this;

      return this.data.map(function (d, i) {
        return {
          name: d.params.model,
          type: 'scatter',
          mode: 'lines',
          x: d.plotData.specifity,
          y: d.plotData.sensivity,
          text: d.plotData.cutoff,
          hovertemplate: '<b>Specifity:</b> %{x:.3f}<br><b>Sensivity:</b> %{y:.3f}<br><b>Cutoff:</b> %{text:.3f}',
          marker: {
            color: _this.scopesColors.model[d.params.model]
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
          showspikes: true,
          range: [1.01, -0.01],
          title: {
            text: 'Specifity',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          title: {
            text: 'Sensivity',
            standoff: 10
          },
          range: [-0.01, 1.01],
          gridwidth: 2,
          fixedrange: true,
          showspikes: true,
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
          t: 10,
          b: 45,
          r: 5
        },
        dragmode: 'pan',
        hovermode: 'closest',
        shapes: [{
          type: 'line',
          x0: 1,
          x1: 1,
          y0: 0,
          y1: 1,
          yref: 'y',
          xref: 'x',
          line: {
            color: 'black',
            width: 2,
            dash: 'dot'
          }
        }, {
          type: 'line',
          x0: 0,
          x1: 1,
          y0: 1,
          y1: 1,
          yref: 'y',
          xref: 'x',
          line: {
            color: 'black',
            width: 2,
            dash: 'dot'
          }
        }]
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
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
  components: {
    Plotly: ROCvue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/ROC.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_ROCvue_type_script_lang_js_ = (ROCvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/plots/ROC.vue





/* normalize component */

var ROC_component = Object(componentNormalizer["a" /* default */])(
  plots_ROCvue_type_script_lang_js_,
  ROCvue_type_template_id_43b55044_render,
  ROCvue_type_template_id_43b55044_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ROC = (ROC_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/REC.vue?vue&type=template&id=4f2cfbdb&
var RECvue_type_template_id_4f2cfbdb_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"rec-plot"},[_c('Plotly',_vm._b({ref:"plot"},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout },false))],1)}
var RECvue_type_template_id_4f2cfbdb_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/REC.vue?vue&type=template&id=4f2cfbdb&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/REC.vue?vue&type=script&lang=js&



//
//
//
//
//


var RECvue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var RECvue_type_script_lang_js_ = ({
  name: 'REC',
  props: {
    data: Array,
    plotType: String
  },
  computed: Object(objectSpread2["a" /* default */])({
    traces: function traces() {
      var _this = this;

      return this.data.map(function (d, i) {
        return {
          name: d.params.model,
          type: 'scatter',
          mode: 'lines',
          x: d.plotData.tolerance,
          y: d.plotData.quantity,
          hovertemplate: '<b>Error tolerance:</b> %{x:.2f}<br><b>Observations:</b> %{y:,.1%}',
          marker: {
            color: _this.scopesColors.model[d.params.model]
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
          showspikes: true,
          title: {
            text: 'Error tolerance',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          title: {
            text: 'Observations percentage',
            standoff: 10
          },
          range: [0, 1],
          gridwidth: 2,
          fixedrange: true,
          showspikes: true,
          zeroline: false,
          tickformat: ',.0%'
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        showlegend: false,
        margin: {
          l: 60,
          t: 10,
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
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
  components: {
    Plotly: RECvue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/REC.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_RECvue_type_script_lang_js_ = (RECvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/plots/REC.vue





/* normalize component */

var REC_component = Object(componentNormalizer["a" /* default */])(
  plots_RECvue_type_script_lang_js_,
  RECvue_type_template_id_4f2cfbdb_render,
  RECvue_type_template_id_4f2cfbdb_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var REC = (REC_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/Metrics.vue?vue&type=template&id=447145aa&
var Metricsvue_type_template_id_447145aa_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"metrics-plot"},[_c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],ref:"plot",staticClass:"plot-area"})])}
var Metricsvue_type_template_id_447145aa_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/Metrics.vue?vue&type=template&id=447145aa&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/Metrics.vue?vue&type=script&lang=js&














//
//
//
//
//
//




var Metricsvue_type_script_lang_js_Plotly = function Plotly() {
  return __webpack_require__.e(/* import() */ "chunk-6728a27e").then(__webpack_require__.t.bind(null, "030a", 7));
};

var margin = {
  l: 70,
  r: 40,
  t: 30,
  b: 40
};
/* harmony default export */ var Metricsvue_type_script_lang_js_ = ({
  name: 'Metrics',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String
  },
  watch: {
    width: 'refresh',
    height: 'refresh',
    data: 'refresh',
    scopesColors: 'refresh'
  },
  created: function created() {
    var _this = this;

    Metricsvue_type_script_lang_js_Plotly().then(function (x) {
      _this.d3 = x.d3;
      if (_this._isMounted) _this.plotChart();
    });
  },
  mounted: function mounted() {
    this.onResize();
    if (this.d3) this.plotChart();
  },
  computed: Object(objectSpread2["a" /* default */])({
    measures: function measures() {
      return Object(toConsumableArray["a" /* default */])(new Set(this.data.map(function (d) {
        return Object.keys(d.plotData);
      }).flat()));
    },
    measureRange: function measureRange() {
      var _this2 = this;

      return this.measures.reduce(function (acu, m) {
        acu[m] = _this2.getRange(m, _this2.data.map(function (d) {
          return d.plotData[m];
        }));
        return acu;
      }, {});
    },
    axes: function axes() {
      var _this3 = this;

      return this.measures.reduce(function (acu, m) {
        acu[m] = _this3.d3.scale.linear().domain(Object(toConsumableArray["a" /* default */])(_this3.measureRange[m]).reverse()).range([margin.t, _this3.height - margin.b]);
        return acu;
      }, {});
    },
    linesData: function linesData() {
      return this.data.map(function (d) {
        return Object(objectSpread2["a" /* default */])({
          name: d.params.model
        }, d.plotData);
      });
    },
    axisSpace: function axisSpace() {
      return (this.width - margin.l - margin.r) / (this.measures.length - 1);
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
  methods: {
    updateLines: function updateLines() {
      var _this4 = this;

      this.lines.attr('d', function (d) {
        return _this4.line(_this4.measures.map(function (m, i) {
          return {
            x: margin.l + _this4.axisSpace * i,
            y: _this4.axes[m](d[m])
          };
        }));
      });
    },
    refresh: function refresh() {
      if (!this.chart) return;
      this.plotChart();
    },
    customFormat: function customFormat(v) {
      if (v > Math.pow(10, 10) || v < 1 / Math.pow(10, 10)) return this.d3.format('.2g')(v);else return format.formatValue(v);
    },
    plotChart: function plotChart() {
      var _this5 = this;

      var d3 = this.d3;
      this.line = d3.svg.line().x(function (d) {
        return d.x;
      }).y(function (d) {
        return d.y;
      });
      var axis = this.axis = this.d3.svg.axis().orient('left').tickFormat(this.customFormat);
      var width = this.width;
      var height = this.height;
      d3.select(this.$refs.plot).selectAll('svg').remove();
      var chart = this.chart = d3.select(this.$refs.plot).append('svg').attr('width', width).attr('height', height);
      var lines = this.lines = chart.selectAll('path.node').data(this.linesData, function (d) {
        return d.name;
      }).enter().append('path').attr('class', 'node').style('stroke', function (d, i) {
        return _this5.scopesColors.model[_this5.data[i].params.model];
      });
      var g = this.g = chart.selectAll('g.trait').data(this.measures).enter().append('svg:g').attr('class', 'trait').attr('transform', function (d, i) {
        return 'translate(' + (margin.l + _this5.axisSpace * i) + ')';
      });
      var axes = this.axes;
      g.append('svg:g').attr('class', 'axis').each(function (d) {
        d3.select(this).call(axis.scale(axes[d]));
      }).append('svg:text').attr('class', 'title').attr('fill', function (d) {
        return '#371ea8';
      }).attr('text-anchor', 'middle').attr('y', 12).text(String);
      this.updateLines();
      var self = this;
      lines.on('mouseover', function (d) {
        d3.select(this).style('stroke-width', 6);
        chart.selectAll('g.axis').append('svg:text').attr('class', 'values').attr('y', self.height - margin.b + 25).attr('fill', d3.select(this).style('stroke')).attr('text-anchor', 'middle').text(function (m) {
          return self.customFormat(d[m]);
        });
      });
      lines.on('mouseout', function (d) {
        chart.selectAll('.values').remove();
        d3.select(this).style('stroke-width', null);
      });
    },
    getRange: function getRange(measure, values) {
      if (['f1', 'auc', 'accuracy', 'recall', 'precision'].includes(measure)) return [0, 1];else if (['r2'].includes(measure)) return [1, Math.min.apply(Math, [0].concat(Object(toConsumableArray["a" /* default */])(values)))];else return [0, Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(values)) * 1.05];
    }
  }
});
// CONCATENATED MODULE: ./src/plots/Metrics.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_Metricsvue_type_script_lang_js_ = (Metricsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/plots/Metrics.vue?vue&type=style&index=0&lang=css&
var Metricsvue_type_style_index_0_lang_css_ = __webpack_require__("82d1");

// CONCATENATED MODULE: ./src/plots/Metrics.vue






/* normalize component */

var Metrics_component = Object(componentNormalizer["a" /* default */])(
  plots_Metricsvue_type_script_lang_js_,
  Metricsvue_type_template_id_447145aa_render,
  Metricsvue_type_template_id_447145aa_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Metrics = (Metrics_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/FunnelMeasure.vue?vue&type=template&id=418a70bc&
var FunnelMeasurevue_type_template_id_418a70bc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"funnel-measure-plot"},[_c('div',{staticClass:"page-left page-button",class:{ invisible: _vm.page <= 0},on:{"click":function($event){_vm.page -= 1}}},[_c('font-awesome-icon',{attrs:{"icon":"angle-left"}}),_vm._v(" Previous ")],1),_c('div',{staticClass:"page-right page-button",class:{ invisible: _vm.page >= _vm.pagesCount - 1 },on:{"click":function($event){_vm.page += 1}}},[_vm._v(" Next "),_c('font-awesome-icon',{attrs:{"icon":"angle-right"}})],1),(_vm.error)?_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.error))]):_c('Plotly',_vm._b({ref:"plot"},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout },false))],1)}
var FunnelMeasurevue_type_template_id_418a70bc_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/FunnelMeasure.vue?vue&type=template&id=418a70bc&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__("4fad");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__("3835");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.every.js
var es_array_every = __webpack_require__("a623");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.fill.js
var es_array_fill = __webpack_require__("cb29");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// CONCATENATED MODULE: ./src/utils/lolipopAxis.js












var lolipopAxis_AxisRange = /*#__PURE__*/function () {
  function AxisRange(start, end) {
    Object(classCallCheck["a" /* default */])(this, AxisRange);

    var invert = start > end;
    this.start = invert ? end : start;
    this.end = invert ? start : end;
  }

  Object(createClass["a" /* default */])(AxisRange, [{
    key: "getRelativePoint",
    value: function getRelativePoint(alpha) {
      return this.start + this.len * alpha;
    }
  }, {
    key: "len",
    get: function get() {
      return this.end - this.start;
    }
  }, {
    key: "mid",
    get: function get() {
      return this.start + this.len * 0.5;
    }
  }], [{
    key: "fromLen",
    value: function fromLen(start, len) {
      return new AxisRange(start, start + len);
    }
  }]);

  return AxisRange;
}();

var lolipopAxis_LolipopAxis = /*#__PURE__*/function () {
  function LolipopAxis(facets, traces, groups) {
    var facetTitleSpace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.03;
    var headerSpace = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.03;
    var groupMargin = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2;

    Object(classCallCheck["a" /* default */])(this, LolipopAxis);

    if (facets.length > 20) throw new Error('Facets count limit exceeded');
    this.facets = facets;
    this.traces = traces;
    this.groups = groups;
    if (!groups.every(Array.isArray)) this.groups = Array(facets.length).fill(null).map(function (x) {
      return Object(toConsumableArray["a" /* default */])(groups);
    });
    this.facetTitleSpace = facetTitleSpace;
    this.headerSpace = headerSpace;
    this.groupMargin = groupMargin;
    this.calcAxisLength();
    this.calcFacetsOffset();
  } // Length of group is count of points in a group plus upper and bottom margin


  Object(createClass["a" /* default */])(LolipopAxis, [{
    key: "calcAxisLength",
    value: function calcAxisLength() {
      var _this = this;

      this.facetsSpaceLength = this.facets.map(function (f, i) {
        return _this.groups[i].length * _this.groupLength;
      });
      this.axisLength = 1 / this.pointsSpacePropotion * this.facetsSpaceLength.reduce(function (acu, x) {
        return acu + x;
      }, 0);
    }
  }, {
    key: "getFacetOffset",
    value: function getFacetOffset(facet) {
      return this.facetsOffset[this.facets.indexOf(facet)];
    }
  }, {
    key: "calcFacetsOffset",
    value: function calcFacetsOffset() {
      var facetTitleAbsoluteSpace = this.facetTitleSpace * this.axisLength;
      var headerAbsoluteSpace = this.headerSpace * this.axisLength;
      this.facetsOffset = this.facetsSpaceLength.reduce(function (acu, x) {
        return [].concat(Object(toConsumableArray["a" /* default */])(acu), [acu[acu.length - 1] + x + facetTitleAbsoluteSpace]);
      }, [headerAbsoluteSpace]);
    }
  }, {
    key: "getFacetTitleRange",
    value: function getFacetTitleRange(facet) {
      return lolipopAxis_AxisRange.fromLen(this.getFacetOffset(facet), this.facetTitleSpace * this.axisLength);
    }
  }, {
    key: "getFacetRange",
    value: function getFacetRange(facet) {
      var facetId = this.facets.indexOf(facet);
      return new lolipopAxis_AxisRange(this.facetsOffset[facetId], this.facetsOffset[facetId + 1]);
    }
  }, {
    key: "getGroupRange",
    value: function getGroupRange(facet, group) {
      var facetId = this.facets.indexOf(facet);
      var groupId = this.groups[facetId].indexOf(group);
      var insideOffset = groupId * this.groupLength + this.groupMargin;
      return lolipopAxis_AxisRange.fromLen(this.getFacetTitleRange(facet).end + insideOffset, this.traces.length);
    }
  }, {
    key: "getPointRange",
    value: function getPointRange(facet, group, trace) {
      var traceId = this.traces.indexOf(trace);
      return lolipopAxis_AxisRange.fromLen(this.getGroupRange(facet, group).start + traceId, 1);
    }
  }, {
    key: "getAxisRange",
    value: function getAxisRange(margin) {
      var absMargin = margin * this.axisLength;
      return [-1 * absMargin, this.axisLength + absMargin];
    }
  }, {
    key: "getHeaderRange",
    value: function getHeaderRange() {
      return new lolipopAxis_AxisRange(0, this.axisLength * this.headerSpace);
    }
  }, {
    key: "getAxisTicks",
    value: function getAxisTicks() {
      var _this2 = this;

      var tmp = this.facets.map(function (facet, facetId) {
        return {
          ticks: _this2.groups[facetId].map(function (group) {
            return _this2.getGroupRange(facet, group).mid;
          }),
          labels: _this2.groups[facetId]
        };
      });
      return {
        ticks: tmp.map(function (x) {
          return x.ticks;
        }).flat(),
        labels: tmp.map(function (x) {
          return x.labels;
        }).flat()
      };
    }
  }, {
    key: "groupLength",
    get: function get() {
      return this.traces.length + 2 * this.groupMargin;
    } // How many space is filled by poins and margins (the rest is for facets' labels)

  }, {
    key: "pointsSpacePropotion",
    get: function get() {
      return 1 - this.facets.length * this.facetTitleSpace - this.headerSpace;
    }
  }]);

  return LolipopAxis;
}();

/* harmony default export */ var utils_lolipopAxis = (lolipopAxis_LolipopAxis);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/FunnelMeasure.vue?vue&type=script&lang=js&

















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




var FunnelMeasurevue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var FunnelMeasurevue_type_script_lang_js_ = ({
  name: 'FunnelMeasure',
  props: {
    data: Array,
    plotType: String
  },
  data: function data() {
    return {
      page: 0
    };
  },
  watch: {
    data: function data() {
      this.page = 0;
    }
  },
  computed: Object(objectSpread2["a" /* default */])({
    pageSize: function pageSize() {
      return this.$store.getters.getOption('funnelmeasure_page_size');
    },
    pagesCount: function pagesCount() {
      return Math.ceil(this.variables.length / this.pageSize);
    },
    pageRange: function pageRange() {
      var first = this.page * this.pageSize;
      return [first, first + this.pageSize];
    },
    variables: function variables() {
      return Object(toConsumableArray["a" /* default */])(new Set(this.data.map(function (x) {
        return Object.keys(x.plotData.lossValues);
      }).flat()));
    },
    subsets: function subsets() {
      var _this = this;

      return this.variables.reduce(function (acu, variable) {
        acu[variable] = Object(toConsumableArray["a" /* default */])(new Set(_this.data.map(function (x) {
          return Object.keys(x.plotData.lossValues[variable]);
        }).flat()));
        return acu;
      }, {});
    },
    lolipopAxis: function lolipopAxis() {
      var _this$variables,
          _this$variables2,
          _this2 = this;

      return new utils_lolipopAxis((_this$variables = this.variables).slice.apply(_this$variables, Object(toConsumableArray["a" /* default */])(this.pageRange)), this.data.slice(1).map(function (d) {
        return d.params.model;
      }), (_this$variables2 = this.variables).slice.apply(_this$variables2, Object(toConsumableArray["a" /* default */])(this.pageRange)).map(function (v) {
        return _this2.subsets[v];
      }), 0.03, 0.03, 1000);
    },
    error: function error() {
      var _this3 = this;

      if (new Set(this.data.map(function (x) {
        return x.plotData.lossFunction;
      })).size > 1) return 'To plot Funnel Measure all models must use the same loss function';
      if (this.data.length < 2) return 'To plot Funnel Measure you need at least two models';
      if (this.data.filter(function (x) {
        return Object.keys(x.plotData.lossValues).length !== _this3.variables.length;
      }).length > 0) return 'Selected models use incompatible variables';

      var testVariableSubsets = function testVariableSubsets(x, variable) {
        return Object.keys(x.plotData.lossValues[variable]).length !== _this3.subsets[variable].length;
      };

      if (this.data.filter(function (x) {
        return _this3.variables.filter(function (v) {
          return testVariableSubsets(x, v);
        }) > 0;
      }) > 0) return 'Selected models have incompatible variables\' subsets';
      return null;
    },
    transformed: function transformed() {
      var _this4 = this;

      if (this.error) return [];
      var ref = this.data[0].plotData.lossValues;
      return this.data.slice(1).map(function (x) {
        var _Object$entries;

        var variables = (_Object$entries = Object.entries(x.plotData.lossValues)).slice.apply(_Object$entries, Object(toConsumableArray["a" /* default */])(_this4.pageRange));

        var points = variables.map(function (_ref) {
          var _ref2 = Object(slicedToArray["a" /* default */])(_ref, 2),
              variable = _ref2[0],
              subsets = _ref2[1];

          return Object.entries(subsets).map(function (_ref3) {
            var _ref4 = Object(slicedToArray["a" /* default */])(_ref3, 2),
                subset = _ref4[0],
                loss = _ref4[1];

            var point = {
              y: _this4.lolipopAxis.getPointRange(variable, subset, x.params.model).mid,
              x: loss - ref[variable][subset],
              label: subset
            };
            point.xref = point.x / ref[variable][subset];
            return point;
          });
        }).flat();
        return {
          data: x,
          x: points.map(function (p) {
            return p.x;
          }),
          y: points.map(function (p) {
            return p.y;
          }),
          label: points.map(function (p) {
            return p.label;
          }),
          xref: points.map(function (p) {
            return p.xref;
          })
        };
      });
    },
    traces: function traces() {
      var _this5 = this;

      return this.transformed.map(function (d) {
        return {
          name: d.data.params.model,
          type: 'scatter',
          mode: 'markers',
          x: d.x,
          y: d.y,
          customdata: d.xref,
          text: d.label,
          hovertemplate: '<b>%{text}</b><br>' + d.data.plotData.lossFunction + ': %{x:+.2f} (%{customdata:+.0%})',
          hoverlabel: {
            bgcolor: _this5.scopesColors.model[d.data.params.model],
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          marker: {
            color: _this5.scopesColors.model[d.data.params.model],
            size: 8
          }
        };
      });
    },
    lolipopLines: function lolipopLines() {
      var _this6 = this;

      return this.transformed.map(function (d) {
        return d.x.map(function (x, i) {
          return {
            type: 'line',
            x0: 0,
            x1: x,
            xref: 'x',
            y0: d.y[i],
            y1: d.y[i],
            yref: 'y',
            line: {
              color: _this6.scopesColors.model[d.data.params.model],
              width: 1,
              dash: 'line'
            },
            layer: 'below'
          };
        });
      }).flat();
    },
    layout: function layout() {
      var _Object$values,
          _this7 = this,
          _this$variables3;

      return {
        xaxis: {
          type: 'linear',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          showspikes: true,
          title: {
            text: 'Loss difference',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          range: this.lolipopAxis.getAxisRange(0.01).reverse(),
          gridwidth: 2,
          fixedrange: true,
          showspikes: false,
          zeroline: false,
          visible: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        showlegend: false,
        margin: {
          l: 5,
          t: 10,
          b: 45,
          r: 5
        },
        dragmode: 'pan',
        hovermode: 'closest',
        shapes: (_Object$values = Object.values(this.variables)).slice.apply(_Object$values, Object(toConsumableArray["a" /* default */])(this.pageRange)).map(function (v) {
          return _this7.lolipopAxis.getFacetTitleRange(v);
        }).map(function (range) {
          return {
            type: 'line',
            x0: 0,
            x1: 1,
            xref: 'paper',
            y0: range.mid,
            y1: range.mid,
            yref: 'y',
            line: {
              color: '#371ea3',
              width: 1,
              dash: 'dash'
            }
          };
        }).concat([{
          type: 'line',
          x0: 0,
          x1: 0,
          xref: 'x',
          y0: this.lolipopAxis.getHeaderRange().end,
          y1: this.lolipopAxis.axisLength,
          yref: 'y',
          line: {
            color: this.scopesColors.model[this.data[0].params.model],
            width: 2,
            dash: 'line'
          }
        }]).concat(this.lolipopLines),
        annotations: (_this$variables3 = this.variables).slice.apply(_this$variables3, Object(toConsumableArray["a" /* default */])(this.pageRange)).map(function (v) {
          return {
            x: 0.05,
            y: _this7.lolipopAxis.getFacetTitleRange(v).getRelativePoint(0.6),
            yanchor: 'middle',
            bgcolor: 'white',
            text: ' ' + format.formatTitle(v) + ' ',
            yref: 'y',
            xref: 'paper',
            showarrow: false
          };
        }).concat([{
          x: 0,
          y: this.lolipopAxis.getHeaderRange().mid,
          ay: 0,
          ax: 0,
          xanchor: 'middle',
          yanchor: 'middle',
          xref: 'x',
          yref: 'y',
          text: this.data[0].params.model,
          font: {
            color: this.scopesColors.model[this.data[0].params.model]
          }
        }])
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
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
  components: {
    Plotly: FunnelMeasurevue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/FunnelMeasure.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_FunnelMeasurevue_type_script_lang_js_ = (FunnelMeasurevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/plots/FunnelMeasure.vue?vue&type=style&index=0&lang=css&
var FunnelMeasurevue_type_style_index_0_lang_css_ = __webpack_require__("287c");

// CONCATENATED MODULE: ./src/plots/FunnelMeasure.vue






/* normalize component */

var FunnelMeasure_component = Object(componentNormalizer["a" /* default */])(
  plots_FunnelMeasurevue_type_script_lang_js_,
  FunnelMeasurevue_type_template_id_418a70bc_render,
  FunnelMeasurevue_type_template_id_418a70bc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FunnelMeasure = (FunnelMeasure_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/Fairness.vue?vue&type=template&id=828ace92&
var Fairnessvue_type_template_id_828ace92_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fairness-plot"},[_c('div',{staticClass:"options-container"},[_c('span',{staticClass:"label"},[_vm._v("Choose plot type")]),_vm._l((_vm.subplots),function(s){return _c('div',{key:s.name,staticClass:"subplot-input"},[_c('div',{staticClass:"checkboxes"},[(_vm.subplot === s)?_c('font-awesome-icon',{attrs:{"icon":['fas', 'check-circle']}}):_c('font-awesome-icon',{attrs:{"icon":['far', 'circle']},on:{"click":function($event){return _vm.setSubplot(s)}}})],1),_c('span',{staticClass:"label"},[_vm._v(_vm._s(s.name))])])}),_c('span',{staticClass:"label"},[_vm._v("Choose privileged variable and set cutoffs")]),_vm._l((_vm.cutoffs),function(s){return _c('div',{key:s.subgroup,staticClass:"cutoff-input"},[_c('span',{staticClass:"label"},[_vm._v(_vm._s(s.subgroup))]),_c('div',{staticClass:"checkboxes"},[(_vm.privileged === s.subgroup)?_c('font-awesome-icon',{attrs:{"icon":['fas', 'check-circle']}}):_c('font-awesome-icon',{attrs:{"icon":['far', 'circle']},on:{"click":function($event){return _vm.setPrivileged(s.subgroup)}}})],1),(_vm.selectedCutoffs)?_c('Slider',{attrs:{"min":0,"max":1,"start":_vm.selectedCutoffs[s.subgroup],"values":s.cutoffs},on:{"update":function($event){return _vm.setCutoff(s.subgroup, $event)}}}):_vm._e()],1)})],2),_c(_vm.subplot.component,_vm._b({tag:"component",staticClass:"plotly-container"},'component',{ data: _vm.data, metrics: _vm.metrics, privileged: _vm.privileged },false))],1)}
var Fairnessvue_type_template_id_828ace92_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/Fairness.vue?vue&type=template&id=828ace92&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.parse-float.js
var es_number_parse_float = __webpack_require__("c35a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Slider.vue?vue&type=template&id=0f734eb4&
var Slidervue_type_template_id_0f734eb4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"slider",class:{ active: _vm.active }},[_c('div',{ref:"rangeline",staticClass:"range-line"}),_c('div',{ref:"dot",staticClass:"dot",style:(_vm.dotStyle)}),_c('span',{staticClass:"value"},[_vm._v(_vm._s(_vm._f("formatValue")(this.position)))])])}
var Slidervue_type_template_id_0f734eb4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Slider.vue?vue&type=template&id=0f734eb4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Slider.vue?vue&type=script&lang=js&







//
//
//
//
//
//
//


/* harmony default export */ var Slidervue_type_script_lang_js_ = ({
  name: 'Slider',
  props: {
    min: Number,
    max: Number,
    start: Number,
    values: Array
  },
  data: function data() {
    return {
      position: 0,
      range: [0, 1],
      sliderWidth: 0,
      points: [],
      active: false,
      startClientX: 0
    };
  },
  watch: {
    position: function position() {
      this.$emit('update', this.position);
    }
  },
  created: function created() {
    this.range = this.min > this.max ? [0, 1] : [this.min, this.max];
    this.position = this.start >= this.min && this.start <= this.max ? this.start : this.min;
    this.points = this.values ? this.values : this.range;
  },
  filters: {
    formatValue: format.formatValue
  },
  mounted: function mounted() {
    this.sliderWidth = this.$refs.rangeline.offsetWidth;
    this.$refs.dot.addEventListener('pointerdown', this.handlePointerDown);
    document.addEventListener('pointerup', this.handlePointerUp);
    document.addEventListener('pointercancel', this.handlePointerUp);
    document.addEventListener('pointermove', this.handlePointerMove);
  },
  computed: {
    rangeLength: function rangeLength() {
      return this.range[1] - this.range[0];
    },
    dotStyle: function dotStyle() {
      var size = this.active ? 15 : 10;
      return {
        left: Math.round((this.position - this.range[0]) / this.rangeLength * this.sliderWidth) + 'px',
        width: size + 'px',
        height: size + 'px'
      };
    }
  },
  methods: {
    handlePointerDown: function handlePointerDown(event) {
      this.active = true;
      this.startClientX = event.clientX - Number.parseInt(this.dotStyle.left);
      event.stopPropagation();
    },
    handlePointerUp: function handlePointerUp(event) {
      if (!this.active) return;
      this.active = false;
    },
    handlePointerMove: function handlePointerMove(event) {
      if (!this.active) return;
      var scaled = this.rangeLength * (event.clientX - this.startClientX) / this.sliderWidth + this.range[0];
      var dist = this.points.map(function (p) {
        return Math.abs(p - scaled);
      });
      var index = dist.indexOf(Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(dist)));
      if (index !== -1) this.position = this.points[index];
    },
    onResize: function onResize() {
      if (this._isMounted) this.sliderWidth = this.$refs.rangeline.offsetWidth;
    }
  },
  directives: {
    resize: Vueresize_default.a
  }
});
// CONCATENATED MODULE: ./src/components/Slider.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Slidervue_type_script_lang_js_ = (Slidervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Slider.vue?vue&type=style&index=0&lang=css&
var Slidervue_type_style_index_0_lang_css_ = __webpack_require__("b511");

// CONCATENATED MODULE: ./src/components/Slider.vue






/* normalize component */

var Slider_component = Object(componentNormalizer["a" /* default */])(
  components_Slidervue_type_script_lang_js_,
  Slidervue_type_template_id_0f734eb4_render,
  Slidervue_type_template_id_0f734eb4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Slider = (Slider_component.exports);
// CONCATENATED MODULE: ./src/utils/streams.js




/* harmony default export */ var streams = ({
  mapChildren: function mapChildren(obj, f) {
    return Object.keys(obj).reduce(function (acu, key) {
      acu[key] = obj[key].map(f);
      return acu;
    }, {});
  },
  filterChildren: function filterChildren(obj, f) {
    return Object.keys(obj).reduce(function (acu, key) {
      acu[key] = obj[key].filter(f);
      return acu;
    }, {});
  },
  runOnChildren: function runOnChildren(obj, f) {
    return Object.keys(obj).reduce(function (acu, key) {
      acu[key] = f(obj[key], key);
      return acu;
    }, {});
  },
  findIndexAll: function findIndexAll(arr, f) {
    return arr.reduce(function (acu, x, index) {
      if (f(x)) acu.push(index);
      return acu;
    }, []);
  },
  createObjectWithArrays: function createObjectWithArrays(keys) {
    return keys.reduce(function (acu, key) {
      acu[key] = [];
      return acu;
    }, {});
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/FairnessSubplotRelative.vue?vue&type=template&id=0ced9902&
var FairnessSubplotRelativevue_type_template_id_0ced9902_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"fairness-subplot-relative"},[(_vm.traces.length > 0)?_c('Plotly',_vm._b({ref:"plot",on:{"plotly_hover":_vm.onHover}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout },false)):_vm._e()],1)}
var FairnessSubplotRelativevue_type_template_id_0ced9902_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/FairnessSubplotRelative.vue?vue&type=template&id=0ced9902&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/FairnessSubplotRelative.vue?vue&type=script&lang=js&
















//
//
//
//
//






var FairnessSubplotRelativevue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
};

var epsilon = 0.1;
var scoring = [{
  name: 'Statistical parity difference  (TP + FP)/(TP + FP + TN + FN)',
  key: 'STP'
}, {
  name: 'Equal opportynity difference    TP/(TP + FN)',
  key: 'TPR'
}, {
  name: 'Predictive equality difference  FP/(FP + TN)',
  key: 'FPR'
}, {
  name: 'Predictive parity difference    TP/(TP + FP)',
  key: 'PPV'
}, {
  name: 'Accuracy equality difference   (TP + TN)/(TP + FP + TN + FN)',
  key: 'ACC'
}];
/* harmony default export */ var FairnessSubplotRelativevue_type_script_lang_js_ = ({
  name: 'FairnessSubplotRelative',
  mixins: [Resize],
  props: {
    data: Array,
    metrics: Array,
    privileged: String
  },
  computed: Object(objectSpread2["a" /* default */])({
    subgroupsNames: function subgroupsNames() {
      return Object(toConsumableArray["a" /* default */])(new Set(this.data.map(function (d) {
        return Object.keys(d.plotData.subgroups);
      }).flat()));
    },
    lolipopAxis: function lolipopAxis() {
      var _this = this;

      return new utils_lolipopAxis(scoring.map(function (s) {
        return s.name;
      }), this.data.map(function (d) {
        return d.params.model;
      }), this.subgroupsNames.filter(function (s) {
        return s !== _this.privileged;
      }), 0.03, 0.03, 1);
    },
    scaledMetrics: function scaledMetrics() {
      var _this2 = this;

      if (!this.metrics) return null;
      return this.metrics.map(function (m) {
        return Object.entries(m).reduce(function (acu, _ref) {
          var _ref2 = Object(slicedToArray["a" /* default */])(_ref, 2),
              subgroup = _ref2[0],
              metrics = _ref2[1];

          acu[subgroup] = streams.runOnChildren(metrics, function (value, metricName) {
            return value - m[_this2.privileged][metricName];
          });
          return acu;
        }, {});
      });
    },
    reformated: function reformated() {
      var _this3 = this;

      if (!this.scaledMetrics) return [];
      return scoring.map(function (scoring, i) {
        return _this3.subgroupsNames.filter(function (subgroup) {
          return subgroup !== _this3.privileged;
        }).map(function (subgroup) {
          return _this3.scaledMetrics.map(function (x, k) {
            return {
              scoring: scoring.name,
              value: x[subgroup][scoring.key],
              subgroup: subgroup,
              model: _this3.data[k].params.model
            };
          });
        }).flat();
      }).flat();
    },
    lolipopLines: function lolipopLines() {
      var _this4 = this;

      return this.reformated.map(function (d) {
        return {
          type: 'line',
          x0: 0,
          x1: d.value,
          xref: 'x',
          y0: _this4.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid,
          y1: _this4.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid,
          yref: 'y',
          line: {
            color: _this4.scopesColors.model[d.model],
            width: 1,
            dash: 'line'
          },
          layer: 'below'
        };
      });
    },
    traces: function traces() {
      var _this5 = this;

      return this.reformated.map(function (d) {
        return {
          name: d.model,
          type: 'scatter',
          orientation: 'h',
          hovertemplate: '%{x:+.2f}',
          y: [_this5.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid],
          x: [d.value],
          marker: {
            color: _this5.scopesColors.model[d.model],
            size: 8
          }
        };
      });
    },
    layout: function layout() {
      var _this6 = this;

      var layout = {
        xaxis: {
          type: 'linear',
          title: {
            text: 'score',
            standoff: 10
          },
          range: [-1, 1],
          fixedrange: true,
          gridwidth: 2,
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
          l: 90,
          t: 0,
          b: 45,
          r: 5,
          pad: 10
        },
        dragmode: 'pan',
        shapes: scoring.map(function (s, i) {
          return [
          /* Score name line */
          {
            type: 'line',
            x0: 0,
            x1: 1,
            xref: 'paper',
            y0: _this6.lolipopAxis.getFacetTitleRange(s.name).mid,
            y1: _this6.lolipopAxis.getFacetTitleRange(s.name).mid,
            yref: 'y',
            line: {
              color: '#371ea3',
              width: 1,
              dash: 'dash'
            }
          },
          /* Unfair space */
          {
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: -1,
            y0: _this6.lolipopAxis.getFacetTitleRange(s.name).end,
            x1: -1 * epsilon,
            y1: _this6.lolipopAxis.getFacetRange(s.name).end,
            fillcolor: '#f05a71',
            opacity: 0.03,
            layer: 'below',
            line: {
              width: 0
            }
          }, {
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: epsilon,
            y0: _this6.lolipopAxis.getFacetTitleRange(s.name).end,
            x1: 1,
            y1: _this6.lolipopAxis.getFacetRange(s.name).end,
            fillcolor: '#f05a71',
            opacity: 0.03,
            layer: 'below',
            line: {
              width: 0
            }
          },
          /* Unfair space border */
          {
            type: 'line',
            xref: 'x',
            yref: 'y',
            x0: epsilon,
            y0: _this6.lolipopAxis.getFacetTitleRange(s.name).end,
            x1: epsilon,
            y1: _this6.lolipopAxis.getFacetRange(s.name).end,
            layer: 'below',
            line: {
              color: '#f05a71',
              width: 1,
              dash: 'dash'
            }
          }, {
            type: 'line',
            xref: 'x',
            yref: 'y',
            x0: -1 * epsilon,
            y0: _this6.lolipopAxis.getFacetTitleRange(s.name).end,
            x1: -1 * epsilon,
            y1: _this6.lolipopAxis.getFacetRange(s.name).end,
            layer: 'below',
            line: {
              color: '#f05a71',
              width: 1,
              dash: 'dash'
            }
          }];
        }).flat().concat(this.lolipopLines),
        annotations: scoring.map(function (s, i) {
          return {
            x: 0.05,
            y: _this6.lolipopAxis.getFacetTitleRange(s.name).getRelativePoint(0.6),
            bgcolor: 'white',
            text: ' ' + format.formatTitle(s.name) + ' ',
            xref: 'paper',
            yref: 'y',
            showarrow: false
          };
        }),
        yaxis: {
          type: 'linear',
          range: this.lolipopAxis.getAxisRange(0.01).reverse(),
          showgrid: false,
          tickvals: this.lolipopAxis.getAxisTicks().ticks,
          ticktext: this.lolipopAxis.getAxisTicks().labels.map(function (x) {
            return format.addNewLines(format.formatTitle(x), 90);
          }),
          fixedrange: true,
          showspikes: false,
          zeroline: false,
          visible: true
        }
      };
      return layout;
    },
    config: function config() {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      };
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
  methods: {
    onHover: function onHover(event) {
      if (!event || !event.data || !event.data.points || event.data.points.length === 0) return;
      var curveNumber = event.data.points[0].curveNumber;
      var model = this.reformated[curveNumber].model;
      var subgroup = this.reformated[curveNumber].subgroup;
      var toHover = this.reformated.map(function (r) {
        return r.model === model && r.subgroup === subgroup;
      }).map(function (x, i) {
        return x ? i : null;
      }).filter(function (x) {
        return x !== null;
      }).map(function (curveNumber) {
        return {
          curveNumber: curveNumber,
          pointNumber: 0
        };
      });
      event.plotly.Fx.hover(event.plot, toHover);
    }
  },
  components: {
    Plotly: FairnessSubplotRelativevue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/FairnessSubplotRelative.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_FairnessSubplotRelativevue_type_script_lang_js_ = (FairnessSubplotRelativevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/plots/FairnessSubplotRelative.vue





/* normalize component */

var FairnessSubplotRelative_component = Object(componentNormalizer["a" /* default */])(
  plots_FairnessSubplotRelativevue_type_script_lang_js_,
  FairnessSubplotRelativevue_type_template_id_0ced9902_render,
  FairnessSubplotRelativevue_type_template_id_0ced9902_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FairnessSubplotRelative = (FairnessSubplotRelative_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/FairnessSubplotAbsolute.vue?vue&type=template&id=481d98da&
var FairnessSubplotAbsolutevue_type_template_id_481d98da_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"fairness-subplot-absolute"},[(_vm.traces.length > 0)?_c('Plotly',_vm._b({ref:"plot",on:{"plotly_hover":_vm.onHover}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout },false)):_vm._e()],1)}
var FairnessSubplotAbsolutevue_type_template_id_481d98da_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/FairnessSubplotAbsolute.vue?vue&type=template&id=481d98da&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.math.sign.js
var es_math_sign = __webpack_require__("2af1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/FairnessSubplotAbsolute.vue?vue&type=script&lang=js&














//
//
//
//
//





var FairnessSubplotAbsolutevue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
};

var FairnessSubplotAbsolutevue_type_script_lang_js_scoring = [{
  name: 'STP   (TP + FP)/(TP + FP + TN + FN)',
  key: 'STP'
}, {
  name: 'TPR   TP/(TP + FN)',
  key: 'TPR'
}, {
  name: 'Accuracy    (TP + TN)/(TP + FP + TN + FN)',
  key: 'ACC'
}];
/* harmony default export */ var FairnessSubplotAbsolutevue_type_script_lang_js_ = ({
  name: 'FairnessSubplotAbsolute',
  mixins: [Resize],
  props: {
    data: Array,
    metrics: Array,
    privileged: String
  },
  computed: Object(objectSpread2["a" /* default */])({
    subgroupsNames: function subgroupsNames() {
      return Object(toConsumableArray["a" /* default */])(new Set(this.data.map(function (d) {
        return Object.keys(d.plotData.subgroups);
      }).flat()));
    },
    lolipopAxis: function lolipopAxis() {
      var _this = this;

      return new utils_lolipopAxis(FairnessSubplotAbsolutevue_type_script_lang_js_scoring.map(function (s) {
        return s.name;
      }), this.data.map(function (d) {
        return d.params.model;
      }), this.subgroupsNames.filter(function (s) {
        return s !== _this.privileged;
      }), 0.03, 0.03, 1);
    },
    reformated: function reformated() {
      var _this2 = this;

      if (!this.metrics) return [];
      return FairnessSubplotAbsolutevue_type_script_lang_js_scoring.map(function (scoring, i) {
        return _this2.subgroupsNames.filter(function (subgroup) {
          return subgroup !== _this2.privileged;
        }).map(function (subgroup) {
          return _this2.metrics.map(function (x, k) {
            return {
              scoring: scoring.name,
              value: x[subgroup][scoring.key],
              privilegedValue: x[_this2.privileged][scoring.key],
              subgroup: subgroup,
              model: _this2.data[k].params.model
            };
          });
        }).flat();
      }).flat();
    },
    lolipopLines: function lolipopLines() {
      var _this3 = this;

      return this.reformated.map(function (d) {
        return {
          type: 'line',
          x0: d.privilegedValue,
          x1: d.value,
          xref: 'x',
          y0: _this3.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid,
          y1: _this3.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid,
          yref: 'y',
          line: {
            color: _this3.scopesColors.model[d.model],
            width: 1,
            dash: 'line'
          },
          layer: 'below'
        };
      });
    },
    pointAnnotations: function pointAnnotations() {
      var _this4 = this;

      return this.reformated.map(function (d) {
        return {
          x: d.value + 0.01 * Math.sign(d.value - d.privilegedValue),
          y: _this4.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid,
          text: format.formatTitle(d.subgroup),
          xref: 'x',
          yref: 'y',
          showarrow: false,
          xanchor: d.value > d.privilegedValue ? 'left' : 'right',
          font: {
            size: 10
          }
        };
      });
    },
    traces: function traces() {
      var _this5 = this;

      return this.reformated.map(function (d, i) {
        return {
          name: d.subgroup,
          type: 'scatter',
          orientation: 'h',
          hovertemplate: '%{x:.2f}',
          y: [_this5.lolipopAxis.getPointRange(d.scoring, d.subgroup, d.model).mid],
          x: [d.value],
          marker: {
            color: _this5.scopesColors.model[d.model],
            size: 8
          }
        };
      });
    },
    layout: function layout() {
      var _this6 = this;

      var layout = {
        xaxis: {
          type: 'linear',
          title: {
            text: 'score',
            standoff: 10
          },
          range: [0, 1],
          fixedrange: true,
          gridwidth: 2,
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
          l: 90,
          t: 0,
          b: 45,
          r: 5,
          pad: 10
        },
        dragmode: 'pan',
        shapes: FairnessSubplotAbsolutevue_type_script_lang_js_scoring.map(function (s, i) {
          return [
          /* Score name line */
          {
            type: 'line',
            x0: 0,
            x1: 1,
            xref: 'paper',
            y0: _this6.lolipopAxis.getFacetTitleRange(s.name).mid,
            y1: _this6.lolipopAxis.getFacetTitleRange(s.name).mid,
            yref: 'y',
            line: {
              color: '#371ea3',
              width: 1,
              dash: 'dash'
            }
          }].concat(_this6.data.map(function (d, k) {
            return {
              type: 'line',
              x0: _this6.metrics[k][_this6.privileged][s.key],
              x1: _this6.metrics[k][_this6.privileged][s.key],
              xref: 'x',
              y0: _this6.lolipopAxis.getFacetTitleRange(s.name).end,
              y1: _this6.lolipopAxis.getFacetRange(s.name).end,
              yref: 'y',
              layer: 'below',
              line: {
                color: _this6.scopesColors.model[d.params.model],
                width: 2
              }
            };
          }));
        }).flat().concat(this.lolipopLines),
        annotations: FairnessSubplotAbsolutevue_type_script_lang_js_scoring.map(function (s, i) {
          return {
            x: 0.05,
            y: _this6.lolipopAxis.getFacetTitleRange(s.name).getRelativePoint(0.6),
            bgcolor: 'white',
            text: ' ' + format.formatTitle(s.name) + ' ',
            xref: 'paper',
            yref: 'y',
            showarrow: false
          };
        }),
        yaxis: {
          type: 'linear',
          range: this.lolipopAxis.getAxisRange(0.01).reverse(),
          tickvals: this.lolipopAxis.getAxisTicks().ticks,
          ticktext: this.lolipopAxis.getAxisTicks().labels.map(function (x) {
            return format.addNewLines(format.formatTitle(x), 90);
          }),
          showgrid: false,
          fixedrange: true,
          showspikes: false,
          zeroline: false,
          visible: true
        }
      };
      return layout;
    },
    config: function config() {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      };
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
  methods: {
    onHover: function onHover(event) {
      if (!event || !event.data || !event.data.points || event.data.points.length === 0) return;
      var curveNumber = event.data.points[0].curveNumber;
      var model = this.reformated[curveNumber].model;
      var subgroup = this.reformated[curveNumber].subgroup;
      var toHover = this.reformated.map(function (r) {
        return r.subgroup === subgroup && r.model === model;
      }).map(function (x, i) {
        return x ? i : null;
      }).filter(function (x) {
        return x !== null;
      }).map(function (curveNumber) {
        return {
          curveNumber: curveNumber,
          pointNumber: 0
        };
      });
      event.plotly.Fx.hover(event.plot, toHover);
    }
  },
  components: {
    Plotly: FairnessSubplotAbsolutevue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/FairnessSubplotAbsolute.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_FairnessSubplotAbsolutevue_type_script_lang_js_ = (FairnessSubplotAbsolutevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/plots/FairnessSubplotAbsolute.vue





/* normalize component */

var FairnessSubplotAbsolute_component = Object(componentNormalizer["a" /* default */])(
  plots_FairnessSubplotAbsolutevue_type_script_lang_js_,
  FairnessSubplotAbsolutevue_type_template_id_481d98da_render,
  FairnessSubplotAbsolutevue_type_template_id_481d98da_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FairnessSubplotAbsolute = (FairnessSubplotAbsolute_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/Fairness.vue?vue&type=script&lang=js&






















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




var _subplots = [{
  name: 'Fairness Check',
  component: 'FairnessSubplotRelative'
}, {
  name: 'Metric Scores',
  component: 'FairnessSubplotAbsolute'
}];
/* harmony default export */ var Fairnessvue_type_script_lang_js_ = ({
  name: 'Fairness',
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data: function data() {
    return {
      privileged: null,
      selectedCutoffs: null,
      subplot: _subplots[0]
    };
  },
  watch: {
    cutoffs: {
      handler: function handler() {
        var _this = this;

        if (!this.cutoffs) this.selectedCutoffs = {};

        if (this.customData && this.customData.cutoffs && Object.entries(this.customData.cutoffs).every(function (_ref) {
          var _ref2 = Object(slicedToArray["a" /* default */])(_ref, 2),
              subgroup = _ref2[0],
              cutoff = _ref2[1];

          return _this.cutoffs.find(function (c) {
            return c.subgroup === subgroup && c.cutoffs.includes(cutoff);
          });
        }) && this.cutoffs.every(function (c) {
          return Object.keys(_this.customData.cutoffs).includes(c.subgroup);
        })) {
          this.selectedCutoffs = this.customData.cutoffs;
        } else {
          var selectedCutoffs = this.cutoffs.reduce(function (acu, s) {
            var diffs = s.cutoffs.map(function (cutoff) {
              return Math.abs(cutoff - 0.5);
            });
            acu[s.subgroup] = s.cutoffs[diffs.indexOf(Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(diffs)))];
            return acu;
          }, {});
          this.setSelectedCutoffs(selectedCutoffs);
        }
      },
      immediate: true
    },
    subgroupsNames: {
      handler: function handler() {
        if (this.customData && this.subgroupsNames.includes(this.customData.privileged)) {
          this.privileged = this.customData.privileged;
        } else {
          this.setPrivileged(this.subgroupsNames[0]);
        }
      },
      immediate: true
    },
    subplots: {
      handler: function handler() {
        if (this.customData && this.subplots.includes(this.customData.subplot)) {
          this.subplot = this.customData.subplot;
        } else {
          this.setSubplot(this.subplots[0]);
        }
      },
      immediate: true
    },
    customData: {
      handler: function handler(newValue) {
        var _this2 = this;

        if (!newValue) return;
        if (this.subplots.includes(newValue.subplot)) this.subplot = newValue.subplot;
        if (this.subgroupsNames.includes(newValue.privileged)) this.privileged = newValue.privileged;

        if (this.customData.cutoffs && Object.entries(this.customData.cutoffs).every(function (_ref3) {
          var _ref4 = Object(slicedToArray["a" /* default */])(_ref3, 2),
              subgroup = _ref4[0],
              cutoff = _ref4[1];

          return _this2.cutoffs.find(function (c) {
            return c.subgroup === subgroup && c.cutoffs.includes(cutoff);
          });
        }) && this.cutoffs.every(function (c) {
          return Object.keys(_this2.customData.cutoffs).includes(c.subgroup);
        })) {
          this.selectedCutoffs = this.customData.cutoffs;
        }
      },
      immediate: true
    }
  },
  computed: {
    subplots: function subplots() {
      return _subplots;
    },
    customData: function customData() {
      return this.slotv.customData;
    },
    subgroupsNames: function subgroupsNames() {
      return Object(toConsumableArray["a" /* default */])(new Set(this.data.map(function (d) {
        return Object.keys(d.plotData.subgroups);
      }).flat()));
    },
    error: function error() {
      return false;
    },
    cutoffs: function cutoffs() {
      var _this3 = this;

      return this.subgroupsNames.map(function (subgroup) {
        return {
          cutoffs: _this3.data.map(function (d) {
            return Object.keys(d.plotData.subgroups[subgroup]);
          }).reduce(function (acu, x) {
            return acu.filter(function (y) {
              return x.includes(y);
            });
          }).map(function (x) {
            return Number.parseFloat(x);
          }).sort(),
          subgroup: subgroup
        };
      });
    },
    metrics: function metrics() {
      var _this4 = this;

      if (!this.privileged || !this.selectedCutoffs) return null;
      return this.data.map(function (d) {
        return streams.runOnChildren(d.plotData.subgroups, function (arr, key) {
          return arr[_this4.selectedCutoffs[key]];
        });
      });
    }
  },
  methods: {
    setCutoff: function setCutoff(subgroup, value) {
      this.setSelectedCutoffs(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.selectedCutoffs), {}, Object(defineProperty["a" /* default */])({}, subgroup, value)));
    },
    setPrivileged: function setPrivileged(v) {
      this.$store.commit('setSlotCustomData', {
        slot: this.slotv,
        customData: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.customData), {}, {
          privileged: v
        })
      });
    },
    setSubplot: function setSubplot(v) {
      this.$store.commit('setSlotCustomData', {
        slot: this.slotv,
        customData: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.customData), {}, {
          subplot: v
        })
      });
    },
    setSelectedCutoffs: function setSelectedCutoffs(v) {
      this.$store.commit('setSlotCustomData', {
        slot: this.slotv,
        customData: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.customData), {}, {
          cutoffs: v
        })
      });
    }
  },
  components: {
    Slider: Slider,
    FairnessSubplotRelative: FairnessSubplotRelative,
    FairnessSubplotAbsolute: FairnessSubplotAbsolute
  }
});
// CONCATENATED MODULE: ./src/plots/Fairness.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_Fairnessvue_type_script_lang_js_ = (Fairnessvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/plots/Fairness.vue?vue&type=style&index=0&lang=css&
var Fairnessvue_type_style_index_0_lang_css_ = __webpack_require__("bd2c");

// CONCATENATED MODULE: ./src/plots/Fairness.vue






/* normalize component */

var Fairness_component = Object(componentNormalizer["a" /* default */])(
  plots_Fairnessvue_type_script_lang_js_,
  Fairnessvue_type_template_id_828ace92_render,
  Fairnessvue_type_template_id_828ace92_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Fairness = (Fairness_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/SubsetsPerformance.vue?vue&type=template&id=11320f0e&
var SubsetsPerformancevue_type_template_id_11320f0e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"subsets-performance-plot"},[_c('div',{staticClass:"score-function-input"},_vm._l((_vm.scoreFunctions),function(f){return _c('span',{key:f,class:{ active: _vm.scoreFunctionSafe === f },on:{"click":function($event){return _vm.setScoreFunction(f)}}},[_vm._v(_vm._s(f))])}),0),_c('div',{staticClass:"page-left page-button",class:{ invisible: _vm.page <= 0},on:{"click":function($event){_vm.page -= 1}}},[_c('font-awesome-icon',{attrs:{"icon":"angle-left"}}),_vm._v(" Previous ")],1),_c('div',{staticClass:"page-right page-button",class:{ invisible: _vm.page >= _vm.pagesCount - 1 },on:{"click":function($event){_vm.page += 1}}},[_vm._v(" Next "),_c('font-awesome-icon',{attrs:{"icon":"angle-right"}})],1),(_vm.error)?_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.error))]):_c('Plotly',_vm._b({ref:"plot"},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout },false))],1)}
var SubsetsPerformancevue_type_template_id_11320f0e_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/SubsetsPerformance.vue?vue&type=template&id=11320f0e&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/SubsetsPerformance.vue?vue&type=script&lang=js&



















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




var SubsetsPerformancevue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var SubsetsPerformancevue_type_script_lang_js_ = ({
  name: 'SubsetsPerformace',
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data: function data() {
    return {
      page: 0,
      scoreFunction: ''
    };
  },
  watch: {
    data: function data() {
      this.page = 0;
    },
    scoreFunctions: {
      handler: function handler() {
        if (this.customData && this.scoreFunctions.includes(this.customData.scoreFunction)) {
          this.scoreFunction = this.customData.scoreFunction;
        } else {
          this.setScoreFunction(this.scoreFunctions[0]);
        }
      },
      immediate: true
    },
    customData: {
      handler: function handler(newValue) {
        if (!newValue) return;
        if (this.scoreFunctions.includes(newValue.scoreFunction)) this.scoreFunction = newValue.scoreFunction;
      },
      immediate: true
    }
  },
  methods: {
    setScoreFunction: function setScoreFunction(v) {
      this.$store.commit('setSlotCustomData', {
        slot: this.slotv,
        customData: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.customData), {}, {
          scoreFunction: v
        })
      });
    }
  },
  computed: Object(objectSpread2["a" /* default */])({
    customData: function customData() {
      return this.slotv.customData;
    },
    pageSize: function pageSize() {
      return this.$store.getters.getOption('subsetsperformance_page_size');
    },
    pagesCount: function pagesCount() {
      return Math.ceil(this.variables.length / this.pageSize);
    },
    scoreFunctionSafe: function scoreFunctionSafe() {
      return this.scoreFunctions.includes(this.scoreFunction) ? this.scoreFunction : this.scoreFunctions[0];
    },
    pageRange: function pageRange() {
      var first = this.page * this.pageSize;
      return [first, first + this.pageSize];
    },
    variables: function variables() {
      var _this = this;

      return Object(toConsumableArray["a" /* default */])(new Set(this.data.map(function (x) {
        return Object.keys(x.plotData[_this.scoreFunctionSafe].scoreValues);
      }).flat()));
    },
    subsets: function subsets() {
      var _this2 = this;

      return this.variables.reduce(function (acu, variable) {
        acu[variable] = Object(toConsumableArray["a" /* default */])(new Set(_this2.data.map(function (x) {
          return Object.keys(x.plotData[_this2.scoreFunctionSafe].scoreValues[variable]);
        }).flat()));
        return acu;
      }, {});
    },
    lolipopAxis: function lolipopAxis() {
      var _this$variables,
          _this$variables2,
          _this3 = this;

      return new utils_lolipopAxis((_this$variables = this.variables).slice.apply(_this$variables, Object(toConsumableArray["a" /* default */])(this.pageRange)), this.data.map(function (d) {
        return d.params.model;
      }), (_this$variables2 = this.variables).slice.apply(_this$variables2, Object(toConsumableArray["a" /* default */])(this.pageRange)).map(function (v) {
        return _this3.subsets[v];
      }));
    },
    scoreFunctions: function scoreFunctions() {
      return this.data.map(function (d) {
        return Object.keys(d.plotData);
      }).reduce(function (acu, f) {
        return acu.filter(function (f2) {
          return f.includes(f2);
        });
      });
    },
    error: function error() {
      var _this4 = this;

      if (this.scoreFunctions.length === 0) return 'To plot Funnel Measure all models must have common score function';
      if (this.data.filter(function (x) {
        return Object.keys(x.plotData[_this4.scoreFunctionSafe].scoreValues).length !== _this4.variables.length;
      }).length > 0) return 'Selected models use incompatible variables';

      var testVariableSubsets = function testVariableSubsets(x, variable) {
        return Object.keys(x.plotData[_this4.scoreFunctionSafe].scoreValues[variable]).length !== _this4.subsets[variable].length;
      };

      if (this.data.filter(function (x) {
        return _this4.variables.filter(function (v) {
          return testVariableSubsets(x, v);
        }) > 0;
      }) > 0) return 'Selected models have incompatible variables\' subsets';
      return null;
    },
    transformed: function transformed() {
      var _this5 = this;

      if (this.error) return [];
      return this.data.map(function (x) {
        var _Object$entries;

        var variables = (_Object$entries = Object.entries(x.plotData[_this5.scoreFunctionSafe].scoreValues)).slice.apply(_Object$entries, Object(toConsumableArray["a" /* default */])(_this5.pageRange));

        var base = x.plotData[_this5.scoreFunctionSafe].base;
        var points = variables.map(function (_ref) {
          var _ref2 = Object(slicedToArray["a" /* default */])(_ref, 2),
              variable = _ref2[0],
              subsets = _ref2[1];

          return Object.entries(subsets).map(function (_ref3) {
            var _ref4 = Object(slicedToArray["a" /* default */])(_ref3, 2),
                subset = _ref4[0],
                score = _ref4[1];

            var point = {
              y: _this5.lolipopAxis.getPointRange(variable, subset, x.params.model).mid,
              x: score,
              label: subset
            };
            point.xref = (point.x - base) / base;
            return point;
          });
        }).flat();
        return {
          data: x,
          x: points.map(function (p) {
            return p.x;
          }),
          y: points.map(function (p) {
            return p.y;
          }),
          label: points.map(function (p) {
            return p.label;
          }),
          xref: points.map(function (p) {
            return p.xref;
          }),
          base: base
        };
      });
    },
    traces: function traces() {
      var _this6 = this;

      return this.transformed.map(function (d) {
        return {
          name: d.data.params.model,
          type: 'scatter',
          mode: 'markers',
          x: d.x,
          y: d.y,
          customdata: d.xref,
          text: d.label,
          hovertemplate: '<b>%{text}</b><br>' + _this6.scoreFunctionSafe + ': %{x:.2f} (%{customdata:+.0%})',
          hoverlabel: {
            bgcolor: _this6.scopesColors.model[d.data.params.model],
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          marker: {
            color: _this6.scopesColors.model[d.data.params.model],
            size: 8
          }
        };
      });
    },
    lolipopLines: function lolipopLines() {
      var _this7 = this;

      return this.transformed.map(function (d) {
        return d.x.map(function (x, i) {
          return {
            type: 'line',
            x0: d.base,
            x1: x,
            xref: 'x',
            y0: d.y[i],
            y1: d.y[i],
            yref: 'y',
            line: {
              color: _this7.scopesColors.model[d.data.params.model],
              width: 1,
              dash: 'line'
            },
            layer: 'below'
          };
        });
      }).flat();
    },
    layout: function layout() {
      var _Object$values,
          _this8 = this,
          _this$variables3;

      return {
        xaxis: {
          type: 'linear',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          showspikes: true,
          title: {
            text: '',
            standoff: 10
          }
        },
        yaxis: {
          type: 'linear',
          range: this.lolipopAxis.getAxisRange(0.01).reverse(),
          gridwidth: 2,
          fixedrange: true,
          showspikes: false,
          zeroline: false,
          visible: false
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        showlegend: false,
        margin: {
          l: 5,
          t: 10,
          b: 45,
          r: 5
        },
        dragmode: 'pan',
        hovermode: 'closest',
        shapes: (_Object$values = Object.values(this.variables)).slice.apply(_Object$values, Object(toConsumableArray["a" /* default */])(this.pageRange)).map(function (v) {
          return _this8.lolipopAxis.getFacetTitleRange(v);
        }).map(function (range) {
          return {
            type: 'line',
            x0: 0,
            x1: 1,
            xref: 'paper',
            y0: range.mid,
            y1: range.mid,
            yref: 'y',
            line: {
              color: '#371ea3',
              width: 1,
              dash: 'dash'
            }
          };
        }).concat(this.data.map(function (d) {
          return {
            type: 'line',
            x0: d.plotData[_this8.scoreFunctionSafe].base,
            x1: d.plotData[_this8.scoreFunctionSafe].base,
            xref: 'x',
            y0: _this8.lolipopAxis.getHeaderRange().end,
            y1: _this8.lolipopAxis.axisLength,
            yref: 'y',
            line: {
              color: _this8.scopesColors.model[d.params.model],
              width: 2,
              dash: 'line'
            }
          };
        })).concat(this.lolipopLines),
        annotations: (_this$variables3 = this.variables).slice.apply(_this$variables3, Object(toConsumableArray["a" /* default */])(this.pageRange)).map(function (v) {
          return {
            x: 0.05,
            y: _this8.lolipopAxis.getFacetTitleRange(v).getRelativePoint(0.6),
            yanchor: 'middle',
            bgcolor: 'white',
            text: ' ' + format.formatTitle(v) + ' ',
            xref: 'paper',
            yref: 'y',
            showarrow: false
          };
        }).concat(this.data.map(function (d) {
          return {
            x: d.plotData[_this8.scoreFunctionSafe].base,
            y: _this8.lolipopAxis.getHeaderRange().mid,
            ay: 0,
            ax: 0,
            xanchor: 'middle',
            yanchor: 'middle',
            xref: 'x',
            yref: 'y',
            text: d.params.model,
            font: {
              color: _this8.scopesColors.model[d.params.model]
            }
          };
        }))
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
  }, Object(vuex_esm["c" /* mapGetters */])(['scopesColors'])),
  components: {
    Plotly: SubsetsPerformancevue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/SubsetsPerformance.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_SubsetsPerformancevue_type_script_lang_js_ = (SubsetsPerformancevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/plots/SubsetsPerformance.vue?vue&type=style&index=0&lang=css&
var SubsetsPerformancevue_type_style_index_0_lang_css_ = __webpack_require__("3375");

// CONCATENATED MODULE: ./src/plots/SubsetsPerformance.vue






/* normalize component */

var SubsetsPerformance_component = Object(componentNormalizer["a" /* default */])(
  plots_SubsetsPerformancevue_type_script_lang_js_,
  SubsetsPerformancevue_type_template_id_11320f0e_render,
  SubsetsPerformancevue_type_template_id_11320f0e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SubsetsPerformance = (SubsetsPerformance_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/Message.vue?vue&type=template&id=dc98668c&
var Messagevue_type_template_id_dc98668c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"message-plot"},[_vm._l((_vm.errorMessages),function(m){return _c('span',{key:m,staticClass:"msg",staticStyle:{"color":"#f05a71"}},[_vm._v(_vm._s(m))])}),_vm._l((_vm.infoMessages),function(m){return _c('span',{key:m,staticClass:"msg",staticStyle:{"color":"#371ea8"}},[_vm._v(_vm._s(m))])})],2)}
var Messagevue_type_template_id_dc98668c_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/Message.vue?vue&type=template&id=dc98668c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/Message.vue?vue&type=script&lang=js&







//
//
//
//
//
//
/* harmony default export */ var Messagevue_type_script_lang_js_ = ({
  name: 'Message',
  props: {
    data: Array,
    plotType: String
  },
  computed: {
    errorMessages: function errorMessages() {
      return Object(toConsumableArray["a" /* default */])(new Set(this.data.map(function (data) {
        return data.plotData;
      }).filter(function (d) {
        return d.type === 'error';
      }).map(function (d) {
        return d.message;
      })));
    },
    infoMessages: function infoMessages() {
      return Object(toConsumableArray["a" /* default */])(new Set(this.data.map(function (data) {
        return data.plotData;
      }).filter(function (d) {
        return d.type === 'info';
      }).map(function (d) {
        return d.message;
      })));
    }
  }
});
// CONCATENATED MODULE: ./src/plots/Message.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_Messagevue_type_script_lang_js_ = (Messagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/plots/Message.vue?vue&type=style&index=0&lang=css&
var Messagevue_type_style_index_0_lang_css_ = __webpack_require__("6acd");

// CONCATENATED MODULE: ./src/plots/Message.vue






/* normalize component */

var Message_component = Object(componentNormalizer["a" /* default */])(
  plots_Messagevue_type_script_lang_js_,
  Messagevue_type_template_id_dc98668c_render,
  Messagevue_type_template_id_dc98668c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Message = (Message_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/DistributionCounts.vue?vue&type=template&id=6a7db5e8&
var DistributionCountsvue_type_template_id_6a7db5e8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"distribution-counts-plot"},[_c('Plotly',_vm._b({ref:"plot"},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false)),_c('div',{staticClass:"axis-type-input"},_vm._l((_vm.axisTypes),function(t){return _c('span',{key:t,class:{ active: _vm.axisType === t },on:{"click":function($event){return _vm.setAxisType(t)}}},[_vm._v(_vm._s(_vm._f("firstUpper")(t)))])}),0)],1)}
var DistributionCountsvue_type_template_id_6a7db5e8_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/DistributionCounts.vue?vue&type=template&id=6a7db5e8&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/DistributionCounts.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//



var DistributionCountsvue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var DistributionCountsvue_type_script_lang_js_ = ({
  name: 'DistributionCounts',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data: function data() {
    return {
      axisType: ''
    };
  },
  watch: {
    axisTypes: {
      handler: function handler() {
        if (this.customData && this.axisTypes.includes(this.customData.axisType)) {
          this.axisType = this.customData.axisType;
        } else {
          this.setAxisType(this.axisTypes[0]);
        }
      },
      immediate: true
    },
    customData: {
      handler: function handler(newValue) {
        if (!newValue) return;
        if (this.axisTypes.includes(newValue.axisType)) this.axisType = newValue.axisType;
      },
      immediate: true
    }
  },
  filters: {
    firstUpper: format.firstCharUpper
  },
  computed: {
    customData: function customData() {
      return this.slotv.customData;
    },
    axisTypes: function axisTypes() {
      return ['count', 'density'];
    },
    colors: function colors() {
      return this.$store.getters.scopesColors['dataset'];
    },
    traces: function traces() {
      var _this = this;

      if (!this.axisType) return [];
      return this.data.map(function (d, i) {
        return {
          name: d.params.dataset,
          type: 'bar',
          orientation: 'h',
          y: d.plotData.names.map(function (y) {
            return format.addNewLines(y, _this.leftMargin);
          }),
          x: d.plotData[_this.axisType],
          text: d.plotData[_this.axisType].map(function (x) {
            return format.formatValue(x, false, ' ');
          }),
          textposition: 'outside',
          hoverinfo: 'template',
          hovertemplate: d.plotData[_this.axisType].map(function (x) {
            return format.formatValue(x, false);
          }),
          hoverlabel: {
            bgcolor: _this.colors[d.params.dataset],
            font: {
              family: 'FiraSansBold',
              size: 16,
              color: 'white'
            }
          },
          marker: {
            color: _this.colors[d.params.dataset]
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
            text: '',
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
            x0: 0,
            x1: 0,
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
      return 0;
    },
    maximalValue: function maximalValue() {
      var _this2 = this;

      return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(this.data.map(function (d) {
        return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(d.plotData[_this2.axisType]));
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
  },
  methods: {
    setAxisType: function setAxisType(v) {
      this.$store.commit('setSlotCustomData', {
        slot: this.slotv,
        customData: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.customData), {}, {
          axisType: v
        })
      });
    }
  },
  components: {
    Plotly: DistributionCountsvue_type_script_lang_js_Plotly
  }
});
// CONCATENATED MODULE: ./src/plots/DistributionCounts.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_DistributionCountsvue_type_script_lang_js_ = (DistributionCountsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/plots/DistributionCounts.vue?vue&type=style&index=0&lang=css&
var DistributionCountsvue_type_style_index_0_lang_css_ = __webpack_require__("396e");

// CONCATENATED MODULE: ./src/plots/DistributionCounts.vue






/* normalize component */

var DistributionCounts_component = Object(componentNormalizer["a" /* default */])(
  plots_DistributionCountsvue_type_script_lang_js_,
  DistributionCountsvue_type_template_id_6a7db5e8_render,
  DistributionCountsvue_type_template_id_6a7db5e8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DistributionCounts = (DistributionCounts_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/DistributionHistogram.vue?vue&type=template&id=9c3ebfc2&
var DistributionHistogramvue_type_template_id_9c3ebfc2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"distribution-histogram-plot"},[_c('div',{staticClass:"slider"},[_c('Slider',{attrs:{"min":_vm.availableBinsNumber[0],"max":_vm.availableBinsNumber[_vm.availableBinsNumber.length - 1],"start":_vm.nbins,"values":_vm.availableBinsNumber},on:{"update":function($event){return _vm.setBinsNumber($event)}}})],1),_c('div',{staticClass:"axis-type-input"},_vm._l((_vm.axisTypes),function(t){return _c('span',{key:t,class:{ active: _vm.axisType === t },on:{"click":function($event){return _vm.setAxisType(t)}}},[_vm._v(_vm._s(_vm._f("firstUpper")(t)))])}),0),_c('Plotly',_vm._b({ref:"plot",on:{"plotly_hover":_vm.onHover,"plotly_unhover":_vm.onUnhover}},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout, layoutPatches: _vm.layoutPatches },false))],1)}
var DistributionHistogramvue_type_template_id_9c3ebfc2_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/DistributionHistogram.vue?vue&type=template&id=9c3ebfc2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/DistributionHistogram.vue?vue&type=script&lang=js&















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




var DistributionHistogramvue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var DistributionHistogramvue_type_script_lang_js_ = ({
  name: 'DistributionHistogram',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data: function data() {
    return {
      nbins: 3,
      axisType: ''
    };
  },
  watch: {
    availableBinsNumber: function availableBinsNumber() {
      if (this.customData && this.availableBinsNumber.includes(this.customData.bins)) {
        this.nbins = this.customData.bins;
      } else {
        this.setBinsNumber(this.availableBinsNumber[0]);
      }
    },
    axisTypes: {
      handler: function handler() {
        if (this.customData && this.axisTypes.includes(this.customData.axisType)) {
          this.axisType = this.customData.axisType;
        } else {
          this.setAxisType(this.axisTypes[0]);
        }
      },
      immediate: true
    },
    customData: {
      handler: function handler(newValue) {
        if (!newValue) return;
        if (this.availableBinsNumber.includes(newValue.bins)) this.nbins = newValue.bins;
        if (this.axisTypes.includes(newValue.axisType)) this.axisType = newValue.axisType;
      },
      immediate: true
    }
  },
  filters: {
    firstUpper: format.firstCharUpper
  },
  computed: {
    colors: function colors() {
      return this.$store.getters.scopesColors['dataset'];
    },
    axisTypes: function axisTypes() {
      return ['count', 'density'];
    },
    availableBinsNumber: function availableBinsNumber() {
      return this.data.map(function (d) {
        return Object.keys(d.plotData);
      }).reduce(function (acu, x) {
        return acu.filter(function (y) {
          return x.includes(y);
        });
      }).map(function (x) {
        return Number.parseFloat(x);
      }).sort(function (a, b) {
        return a - b;
      });
    },
    transformed: function transformed() {
      var _this = this;

      return this.data.map(function (d) {
        var tmp = d.plotData[_this.nbins + ''];
        return {
          params: d.params,
          breaks: tmp.breaks,
          mids: tmp.mids,
          count: tmp.counts,
          density: tmp.density
        };
      });
    },
    breaks: function breaks() {
      if (this.transformed.length === 0) return [];
      return this.transformed[0].breaks;
    },
    traces: function traces() {
      var _this2 = this;

      if (!this.axisType) return [];

      if (this.transformed.length > 1) {
        return this.transformed.map(function (d, i) {
          var start = {
            x: d.breaks[0],
            y: 0
          };
          var end = {
            x: d.breaks[d.breaks.length - 1],
            y: 0
          };
          return {
            name: d.params.dataset,
            type: 'lines',
            x: [start.x].concat(Object(toConsumableArray["a" /* default */])(d.mids.map(function (m, j) {
              return [d.breaks[j], d.breaks[j + 1]];
            }).flat()), [end.x]),
            y: [start.y].concat(Object(toConsumableArray["a" /* default */])(d[_this2.axisType].map(function (y) {
              return [y, y];
            }).flat()), [end.y]),
            hoverinfo: 'template',
            hovertemplate: [''].concat(Object(toConsumableArray["a" /* default */])(d[_this2.axisType].map(function (x) {
              return format.formatValue(x, false);
            }).map(function (x) {
              return [x, x];
            }).flat()), ['']),
            hoverlabel: {
              bgcolor: _this2.colors[d.params.dataset],
              font: {
                family: 'FiraSansBold',
                size: 16,
                color: 'white'
              }
            },
            marker: {
              color: _this2.colors[d.params.dataset],
              opacity: 1
            }
          };
        });
      } else {
        return this.transformed.map(function (d, i) {
          return {
            name: d.params.dataset,
            type: 'bar',
            orientation: 'v',
            x: d.mids,
            y: d[_this2.axisType],
            hoverinfo: 'template',
            hovertemplate: d[_this2.axisType].map(function (x) {
              return format.formatValue(x, false);
            }),
            hoverlabel: {
              bgcolor: _this2.colors[d.params.dataset],
              font: {
                family: 'FiraSansBold',
                size: 16,
                color: 'white'
              }
            },
            marker: {
              color: _this2.colors[d.params.dataset],
              opacity: 1
            }
          };
        });
      }
    },
    layout: function layout() {
      return {
        xaxis: {
          type: 'linear',
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          range: this.range,
          tickvals: this.breaks,
          ticktext: this.breaks.map(function (v) {
            return format.formatValue(v, false);
          })
        },
        yaxis: {
          type: 'linear',
          title: {
            text: '',
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
        bargap: 0,
        barmode: 'overlay',
        hovermode: 'closest',
        showlegend: false,
        margin: {
          l: 60,
          t: 0,
          b: 45,
          r: 5
        },
        dragmode: 'pan',
        shapes: this.data.map(function (d) {
          return {
            type: 'line',
            x0: 0,
            x1: 1,
            y0: 0,
            y1: 0,
            xref: 'paper',
            yref: 'x',
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
      return Math.min.apply(Math, Object(toConsumableArray["a" /* default */])(this.breaks));
    },
    maximalValue: function maximalValue() {
      return Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(this.breaks));
    },
    range: function range() {
      var len = this.maximalValue - this.minimalValue; // margin = 0.5 * totalMarginInPixels * rangeInScale / ( rangeInPixels = width - totalMarginInPixels - plotlyMargin )

      var margin = 0.5 * 80 * len / (this.width - 80 - 60 - 5);
      return [this.minimalValue - margin, this.maximalValue + margin];
    },
    layoutPatches: function layoutPatches() {
      return {
        'xaxis.range': this.range
      };
    },
    customData: function customData() {
      return this.slotv.customData;
    }
  },
  methods: {
    setBinsNumber: function setBinsNumber(v) {
      this.$store.commit('setSlotCustomData', {
        slot: this.slotv,
        customData: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.customData), {}, {
          bins: v
        })
      });
    },
    setAxisType: function setAxisType(v) {
      this.$store.commit('setSlotCustomData', {
        slot: this.slotv,
        customData: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.customData), {}, {
          axisType: v
        })
      });
    },
    onHover: function onHover(event) {
      if (!event || !event.data || !event.data.points || event.data.points.length === 0) return;
      var point = event.data.points[0].pointNumber;
      var curve = event.data.points[0].curveNumber;
      var update = {
        marker: {
          opacity: this.breaks.slice(1).map(function (x, i) {
            return i === point ? 1 : 0.5;
          }),
          color: this.colors[this.transformed[curve].params.dataset]
        }
      };
      event.plotly.restyle(event.plot, update, curve);
    },
    onUnhover: function onUnhover(event) {
      var curve = event.data.points[0].curveNumber;
      var update = {
        marker: {
          opacity: 1,
          color: this.colors[this.transformed[curve].params.dataset]
        }
      };
      event.plotly.restyle(event.plot, update, curve);
    }
  },
  components: {
    Plotly: DistributionHistogramvue_type_script_lang_js_Plotly,
    Slider: Slider
  }
});
// CONCATENATED MODULE: ./src/plots/DistributionHistogram.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_DistributionHistogramvue_type_script_lang_js_ = (DistributionHistogramvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/plots/DistributionHistogram.vue?vue&type=style&index=0&lang=css&
var DistributionHistogramvue_type_style_index_0_lang_css_ = __webpack_require__("c2d2");

// CONCATENATED MODULE: ./src/plots/DistributionHistogram.vue






/* normalize component */

var DistributionHistogram_component = Object(componentNormalizer["a" /* default */])(
  plots_DistributionHistogramvue_type_script_lang_js_,
  DistributionHistogramvue_type_template_id_9c3ebfc2_render,
  DistributionHistogramvue_type_template_id_9c3ebfc2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DistributionHistogram = (DistributionHistogram_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/VariableAgainstAnother.vue?vue&type=template&id=36dfe1c4&
var VariableAgainstAnothervue_type_template_id_36dfe1c4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"variable-against-another-plot"},[_c('Plotly',_vm._b({ref:"plot"},'Plotly',{ traces: _vm.traces, config: _vm.config, layout: _vm.layout },false)),(_vm.axisVariable)?_c('PlotDropdown',{staticClass:"axis-dropdown",attrs:{"start":_vm.axisVariable,"values":_vm.variables},on:{"update":function($event){return _vm.setSecondaryVariable($event)}}}):_vm._e()],1)}
var VariableAgainstAnothervue_type_template_id_36dfe1c4_staticRenderFns = []


// CONCATENATED MODULE: ./src/plots/VariableAgainstAnother.vue?vue&type=template&id=36dfe1c4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PlotDropdown.vue?vue&type=template&id=7808d39c&
var PlotDropdownvue_type_template_id_7808d39c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"plot-dropdown",class:{ active: _vm.active }},[_c('div',{staticClass:"selected",on:{"click":function($event){_vm.active = !_vm.active},"contextmenu":function($event){$event.preventDefault();_vm.active = !_vm.active}}},[_c('span',{staticClass:"value"},[_vm._v(_vm._s(_vm._f("formatTitle")(_vm.value)))])]),_c('font-awesome-icon',{staticClass:"caret",attrs:{"icon":"angle-down"}}),(_vm.active)?_c('div',{staticClass:"values"},_vm._l((_vm.values),function(v){return _c('div',{key:v,staticClass:"value",on:{"click":function($event){return _vm.setValue(v)}}},[_vm._v(_vm._s(_vm._f("formatTitle")(v)))])}),0):_vm._e()],1)}
var PlotDropdownvue_type_template_id_7808d39c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/PlotDropdown.vue?vue&type=template&id=7808d39c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PlotDropdown.vue?vue&type=script&lang=js&
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

/* harmony default export */ var PlotDropdownvue_type_script_lang_js_ = ({
  name: 'PlotDropdown',
  props: {
    start: String,
    values: Array
  },
  data: function data() {
    return {
      active: false,
      value: String
    };
  },
  watch: {
    value: function value() {
      this.$emit('update', this.value);
    },
    start: function start() {
      if (this.value !== this.start) this.value = this.start;
    }
  },
  created: function created() {
    this.value = this.start;
  },
  filters: {
    formatTitle: format.formatTitle
  },
  mounted: function mounted() {
    document.addEventListener('pointerdown', this.handlePointerDown);
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('pointerdown', this.handlePointerDown);
  },
  computed: {},
  methods: {
    handlePointerDown: function handlePointerDown(event) {
      if (!this.$el.contains(event.target)) this.active = false;
    },
    setValue: function setValue(v) {
      this.value = v;
      this.active = false;
    }
  }
});
// CONCATENATED MODULE: ./src/components/PlotDropdown.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PlotDropdownvue_type_script_lang_js_ = (PlotDropdownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/PlotDropdown.vue?vue&type=style&index=0&lang=css&
var PlotDropdownvue_type_style_index_0_lang_css_ = __webpack_require__("e3a2");

// CONCATENATED MODULE: ./src/components/PlotDropdown.vue






/* normalize component */

var PlotDropdown_component = Object(componentNormalizer["a" /* default */])(
  components_PlotDropdownvue_type_script_lang_js_,
  PlotDropdownvue_type_template_id_7808d39c_render,
  PlotDropdownvue_type_template_id_7808d39c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PlotDropdown = (PlotDropdown_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/plots/VariableAgainstAnother.vue?vue&type=script&lang=js&











//
//
//
//
//
//




var VariableAgainstAnothervue_type_script_lang_js_Plotly = function Plotly() {
  return Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
};

/* harmony default export */ var VariableAgainstAnothervue_type_script_lang_js_ = ({
  name: 'VariableAgainstAnother',
  mixins: [Resize],
  props: {
    data: Array,
    plotType: String,
    slotv: Object
  },
  data: function data() {
    return {
      axisVariable: null
    };
  },
  watch: {
    variables: {
      handler: function handler() {
        if (!this.variables.includes(this.axisVariable)) this.axisVariable = this.variables[0];
      },
      immediate: true
    },
    customData: {
      handler: function handler(newValue) {
        if (!newValue) return;
        if (this.variables.includes(newValue.secondaryVariable)) this.axisVariable = newValue.secondaryVariable;
      },
      immediate: true
    }
  },
  computed: {
    variables: function variables() {
      if (this.data.length === 0) return [];
      return Object.keys(this.data[0].plotData);
    },
    firstVariable: function firstVariable() {
      if (this.data.length === 0) return '';
      return this.data[0].params.variable;
    },
    subdata: function subdata() {
      if (this.data.length === 0 || !this.axisVariable) return null;
      return this.data[0].plotData[this.axisVariable];
    },
    colors: function colors() {
      return this.$store.getters.scopesColors['dataset'];
    },
    axisTypes: function axisTypes() {
      if (!this.subdata) return ['linear', 'linear'];

      if (this.subdata.type === 'boxplots') {
        if (this.subdata.numerical === 'first') return ['linear', 'category'];else return ['category', 'linear'];
      } else if (this.subdata.type === 'table') {
        return ['category', 'category'];
      }

      return ['linear', 'linear'];
    },
    xAxisMargin: function xAxisMargin() {
      if (this.axisTypes[1] === 'linear') return 40;
      return 40 + Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(this.traces[0].x.map(function (x) {
        return x.split('<br>').length;
      }))) * 16;
    },
    traces: function traces() {
      var _this = this;

      if (!this.subdata) return [];
      var d = this.data[0];
      var trace = {};

      if (this.subdata.type === 'boxplots') {
        var firstNumerical = this.subdata.numerical === 'first';
        var numerical = this.subdata[firstNumerical ? 'first' : 'secondary'];
        var categorical = this.subdata[firstNumerical ? 'secondary' : 'first'];
        trace = {
          name: d.params.dataset,
          type: 'box',
          orientation: firstNumerical ? 'v' : 'h',
          q1: numerical.map(function (x) {
            return x.q1;
          }),
          q3: numerical.map(function (x) {
            return x.q3;
          }),
          median: numerical.map(function (x) {
            return x.median;
          }),
          line: {
            width: 1,
            color: this.colors[d.params.dataset]
          },
          lowerfence: numerical.map(function (x) {
            return x.lf;
          }),
          upperfence: numerical.map(function (x) {
            return x.uf;
          }),
          showlegend: false
        };

        if (firstNumerical) {
          trace['x'] = categorical.map(function (x) {
            return format.addNewLines(x, 0.7 * _this.width / _this.subdata.secondary.length);
          });
        } else {
          trace['y'] = categorical.map(function (x) {
            return format.addNewLines(x, 100);
          });
        } // trace[firstNumerical ? 'y' : 'x'] = numerical.map(x => x.outliers)

      } else if (this.subdata.type === 'table') {
        trace = {
          name: d.params.dataset,
          z: this.subdata.counts,
          x: this.subdata.secondary.map(function (x) {
            return format.addNewLines(x, 0.7 * _this.width / _this.subdata.secondary.length);
          }),
          y: this.subdata.first.map(function (x) {
            return format.addNewLines(x, 100);
          }),
          type: 'heatmap',
          hovertemplate: format.formatTitle(this.axisVariable) + ': %{x}<br>' + format.formatTitle(this.firstVariable) + ': %{y}<br>Count: <b>%{z}</b><extra></extra>',
          hoverongaps: false,
          colorscale: [[0, '#c7f5bf'], [0.25, '#8bdcbe'], [0.5, '#46bac2'], [0.75, '#4378bf'], [1, '#371ea3']]
        };
      } else if (this.subdata.type === 'scatter') {
        trace = {
          x: this.subdata.secondary,
          y: this.subdata.first,
          type: 'scatter',
          mode: 'markers',
          hovertemplate: format.formatTitle(this.axisVariable) + ': %{x}<br>' + format.formatTitle(this.firstVariable) + ': %{y}<extra></extra>',
          marker: {
            width: 1,
            color: this.colors[d.params.dataset]
          }
        };
      }

      return [trace];
    },
    heatmapAnnotations: function heatmapAnnotations() {
      var _this2 = this;

      if (!this.subdata || this.subdata.type !== 'table') return [];
      var max = Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(this.subdata.counts.flat()));
      return this.subdata.first.map(function (y, yi) {
        return _this2.subdata.secondary.map(function (x, xi) {
          return {
            xref: 'x',
            yref: 'y',
            x: format.addNewLines(x, 0.7 * _this2.width / _this2.subdata.secondary.length),
            y: format.addNewLines(y, 100),
            text: _this2.subdata.counts[yi][xi],
            showarrow: false,
            font: {
              color: _this2.subdata.counts[yi][xi] > 0.7 * max ? '#8bdcbe' : '#371ea8'
            }
          };
        });
      }).flat();
    },
    layout: function layout() {
      return {
        yaxis: {
          type: this.axisTypes[0],
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          title: {
            text: format.formatTitle(this.firstVariable),
            standoff: 10
          }
        },
        xaxis: {
          type: this.axisTypes[1],
          title: {
            text: '',
            standoff: 10
          },
          gridwidth: 2,
          fixedrange: true,
          zeroline: false,
          tickangle: 0
        },
        font: {
          family: 'FiraSansBold',
          size: 14,
          color: '#371ea3'
        },
        hovermode: 'closest',
        showlegend: false,
        margin: {
          l: this.axisTypes[0] === 'linear' ? 45 : 130,
          t: 0,
          b: this.xAxisMargin,
          r: 5
        },
        dragmode: 'pan',
        annotations: this.heatmapAnnotations
      };
    },
    customData: function customData() {
      return this.slotv.customData;
    },
    config: function config() {
      return {
        displaylogo: false,
        displayModeBar: false,
        staticPlot: false,
        modeBarButtonsToRemove: ['lasso2d', 'autoScale2d', 'select2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toImage']
      };
    }
  },
  methods: {
    setSecondaryVariable: function setSecondaryVariable(v) {
      this.$store.commit('setSlotCustomData', {
        slot: this.slotv,
        customData: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.customData), {}, {
          secondaryVariable: v
        })
      });
    }
  },
  components: {
    Plotly: VariableAgainstAnothervue_type_script_lang_js_Plotly,
    PlotDropdown: PlotDropdown
  }
});
// CONCATENATED MODULE: ./src/plots/VariableAgainstAnother.vue?vue&type=script&lang=js&
 /* harmony default export */ var plots_VariableAgainstAnothervue_type_script_lang_js_ = (VariableAgainstAnothervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/plots/VariableAgainstAnother.vue?vue&type=style&index=0&lang=css&
var VariableAgainstAnothervue_type_style_index_0_lang_css_ = __webpack_require__("ae66");

// CONCATENATED MODULE: ./src/plots/VariableAgainstAnother.vue






/* normalize component */

var VariableAgainstAnother_component = Object(componentNormalizer["a" /* default */])(
  plots_VariableAgainstAnothervue_type_script_lang_js_,
  VariableAgainstAnothervue_type_template_id_36dfe1c4_render,
  VariableAgainstAnothervue_type_template_id_36dfe1c4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VariableAgainstAnother = (VariableAgainstAnother_component.exports);
// CONCATENATED MODULE: ./src/configuration/PlotsInfo.js


























/* harmony default export */ var PlotsInfo = ({
  plotComponents: {
    Breakdown: Breakdown,
    FeatureImportance: FeatureImportance,
    CategoricalDependence: CategoricalDependence,
    LinearDependence: LinearDependence,
    NumericalCeterisParibus: NumericalCeterisParibus,
    CategoricalCeterisParibus: CategoricalCeterisParibus,
    SHAPValues: SHAPValues,
    HtmlWidget: HtmlWidget,
    ROC: ROC,
    REC: REC,
    Metrics: Metrics,
    FunnelMeasure: FunnelMeasure,
    Fairness: Fairness,
    SubsetsPerformance: SubsetsPerformance,
    Message: Message,
    DistributionCounts: DistributionCounts,
    DistributionHistogram: DistributionHistogram,
    VariableAgainstAnother: VariableAgainstAnother
  },
  canMerge: function canMerge(slot1, slot2) {
    if (!slot1 || !slot2 || slot1 === slot2 || slot1.plotType !== slot2.plotType) return false;
    var type = slot1.plotType;

    var testSameParamName = function testSameParamName(paramType) {
      return new Set([].concat(Object(toConsumableArray["a" /* default */])(slot1.localParams), Object(toConsumableArray["a" /* default */])(slot2.localParams)).map(function (params) {
        return params[paramType];
      })).size === 1;
    };

    var sameVariable = testSameParamName('variable');
    var sameObservation = testSameParamName('observation');
    if (type === 'PartialDependence' || type === 'AccumulatedDependence' || type === 'CeterisParibus' || type === 'Fairness') return sameVariable;
    if (type === 'FeatureImportance') return true;
    if (type === 'SHAPValues') return sameObservation;
    if (type === 'ROC') return true;
    if (type === 'REC') return true;
    if (type === 'Metrics') return true;
    if (type === 'FunnelMeasure') return true;
    if (type === 'SubsetsPerformance') return true;
    if (type === 'VariableDistribution') return sameVariable;
    return false;
  },
  lockableParams: {
    // for each plotType
    Breakdown: ['observation'],
    FeatureImportance: [],
    PartialDependence: ['variable'],
    AccumulatedDependence: ['variable'],
    CeterisParibus: ['variable', 'observation'],
    SHAPValues: ['observation'],
    Fairness: ['variable'],
    VariableDistribution: ['variable'],
    VariableAgainstAnother: ['variable']
  },
  isLinear: function isLinear(plotComponent) {
    return ['LinearDependence', 'NumericalCeterisParibus', 'ROC', 'REC'].includes(plotComponent);
  },
  isBars: function isBars(plotComponent) {
    return ['FeatureImportance', 'CategoricalDependence', 'CategoricalCeterisParibus', 'SHAPValues'].includes(plotComponent);
  },
  getPlotDesc: function getPlotDesc(plotType) {
    if (plotType === 'Breakdown') return 'Break Down shows contributions of every variable to a final prediction';
    if (plotType === 'ROC') return 'Receiver Operating Characterstic Curve is a plot of the Sensivity against the Specifity for the different thresholds. It is useful for measuring and comparing the accuracy of the classificators.';
    if (plotType === 'REC') return 'On the x axis of the plot there is an error tolerance and on the y axis there is a percentage of observations predicted within the given tolerance.';
    if (plotType === 'FunnelMeasure') return 'Shows difference in performance in models across partitioned dataset';
    return '';
  }
});
// CONCATENATED MODULE: ./src/configuration/config.js
/* harmony default export */ var config = ({
  examples: [{
    name: 'Warsaw apartments',
    url: 'https://gist.githubusercontent.com/piotrpiatyszek/fe8fcce96ebd46012a9e53aa3910fc69/raw/39e488d1299e763a29c083395b4c7da8fde62c23/data.json',
    session: 'https://gist.githubusercontent.com/piotrpiatyszek/af2f1c4ad85bc48ca8641d9b31f73dfc/raw/71a74f086c7576f912f469e5d910c18eec847d3e/session.json'
  }, {
    name: 'FIFA Players Value',
    url: 'https://gist.githubusercontent.com/piotrpiatyszek/adb844f8f353502548bc335a3f28bcf2/raw/b1268cf8c791a9ce9aaadfeef3a7c0aeaa8d7d75/data.json',
    session: 'https://gist.githubusercontent.com/piotrpiatyszek/fca4ca239036f5d946a6b90fe92db818/raw/4b9eb4c305798d4e2dd08111f0ca2f0b8db6e7c5/session.json'
  }, {
    name: 'Employees status classification',
    url: 'https://gist.githubusercontent.com/piotrpiatyszek/82b6eadfd1d932ec79ad783ae74bf1a2/raw/cfaadd9752d7cfeb62766910a9e4c1099fe466c8/data.json',
    session: 'https://gist.githubusercontent.com/piotrpiatyszek/0765dfca6af874494eeda8e53ffb812d/raw/03707b3dc04024911d9d3dc4883e581f6909bef3/session.json'
  }],
  url: 'https://arena.drwhy.ai',
  // All params used in app
  params: ['variable', 'observation', 'model', 'dataset'],
  scopes: ['model', 'dataset'],
  helpMessages: {
    1: 'Select one or more models to create plots for them',
    2: 'Hold any of generated plots to open it',
    3: 'Change parameters to manipulete plots'
  },
  // Plots that are generated after holding a value in SearchDropdown for auxilary params.
  searchDropdownPlots: {
    variable: {
      name: 'Partial Dependence',
      plotType: 'PartialDependence',
      plotCategory: 'Dataset Level',
      scope: 'model'
    },
    observation: {
      name: 'Break Down',
      plotType: 'Breakdown',
      plotCategory: 'Observation Level',
      scope: 'model'
    }
  },
  githubClientId: 'd7d96eec80f68c16954b',
  githubAuthorizeServer: 'https://arena.mini.pw.edu.pl/github',
  telemetryServer: 'https://arena.mini.pw.edu.pl/telemetry'
});
// EXTERNAL MODULE: ./node_modules/fast-deep-equal/es6/index.js
var es6 = __webpack_require__("9f6a");
var es6_default = /*#__PURE__*/__webpack_require__.n(es6);

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
      selectedGroup: config.scopes[0],
      selectedValues: [],
      colorSelectorGroup: null,
      colorSelectorValue: null
    };
  },
  watch: {
    availableSlots: function availableSlots() {
      this.$emit('updateSlotsList', this.availableSlots);
    },
    'availableSelectedGroupParams': function availableSelectedGroupParams(newValue, oldValue) {
      // filter params that are not available anymore
      this.selectedValues = this.selectedValues.filter(function (sel) {
        return newValue.includes(sel);
      });
      if (this.selectedValues.length === 0) this.selectedValues = newValue.slice(0, 1);
    },
    selectedValues: function selectedValues() {
      this.$store.commit('setAnnotationsActive', this.selectedGroup === 'other' && this.selectedValues.find(function (v) {
        return v === 'annotate';
      }));
    }
  },
  computed: Object(objectSpread2["a" /* default */])({
    displayedValue: function displayedValue() {
      return this.selectedValues.map(function (v) {
        return v || '';
      }).map(format.formatTitle).join(', ');
    },
    displayedGroup: function displayedGroup() {
      return format.firstCharUpper(this.selectedGroup);
    },
    scopes: function scopes() {
      var _this = this;

      return config.scopes.filter(function (s) {
        return _this.availableParams[s].length > 0;
      });
    },

    /* Slots for selected params, will be emitted to Sidepanel */
    availableSlots: function availableSlots() {
      var _this2 = this;

      // it forces refreshing slots id, when any slot is added to playground
      if (!this.allSlots) return [];

      if (config.scopes.includes(this.selectedGroup)) {
        var plotTypes = this.selectedValues.map(function (m) {
          return _this2.getAvailableSlots(Object(defineProperty["a" /* default */])({}, _this2.selectedGroup, m), _this2.selectedGroup);
        }).flat().reduce(function (acu, slot) {
          // if there are no slot of that plotType in accumulator that set current one
          // in other case just append localParams
          if (!acu[slot.plotType]) acu[slot.plotType] = slot;else {
            if (!PlotsInfo.canMerge(acu[slot.plotType], slot)) return acu; // get all localParams from slot that do not exist already in accumulator (removing duplications)

            var newLocalParams = slot.localParams.filter(function (a) {
              return !acu[slot.plotType].localParams.find(function (b) {
                return es6_default()(a, b);
              });
            });
            acu[slot.plotType].localParams = [].concat(Object(toConsumableArray["a" /* default */])(acu[slot.plotType].localParams), Object(toConsumableArray["a" /* default */])(newLocalParams));
          }
          return acu;
        }, {});
        return Object.values(plotTypes).filter(function (slot) {
          return slot.localParams.length >= _this2.selectedValues.length;
        });
      } else if (this.selectedGroup === 'other' && this.selectedValues.includes('clipboard')) {
        return this.archivedSlots;
      }

      return [];
    },
    availableSelectedGroupParams: function availableSelectedGroupParams() {
      if (this.selectedGroup === 'other') return ['clipboard', 'annotate'];
      if (!config.scopes.includes(this.selectedGroup)) return [];
      return this.availableParams[this.selectedGroup];
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['availableParams', 'getGlobalParam', 'palette', 'archivedSlots', 'getAvailableSlots', 'allSlots', 'annotationsColor', 'scopesColors'])),
  filters: {
    formatTitle: format.formatTitle,
    firstCharUpper: format.firstCharUpper
  },
  methods: {
    isSelectorOpen: function isSelectorOpen(group, value) {
      return this.colorSelectorGroup === group && this.colorSelectorValue === value;
    },
    isSelected: function isSelected(group, value) {
      return this.selectedGroup === group && this.selectedValues.includes(value);
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
        return s !== value;
      });
    },
    openColorSelector: function openColorSelector(group, value) {
      this.colorSelectorGroup = group;
      this.colorSelectorValue = value;
    },
    setColor: function setColor(scope, paramName, color) {
      this.colorSelectorGroup = null;
      this.colorSelectorValue = null;
      this.$store.commit('setColor', {
        scope: scope,
        paramName: paramName,
        color: color
      });
    },
    setAnnotationsColor: function setAnnotationsColor(color) {
      this.colorSelector = null;
      this.colorSelectorValue = null;
      this.$store.commit('setAnnotationsColor', color);
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
  SidepanelDropdownvue_type_template_id_2afa3c66_render,
  SidepanelDropdownvue_type_template_id_2afa3c66_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SidepanelDropdown = (SidepanelDropdown_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SidepanelHelp.vue?vue&type=template&id=32c4bfc1&
var SidepanelHelpvue_type_template_id_32c4bfc1_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sidepanel-help"},[_c('span',{staticClass:"big-number"},[_vm._v(_vm._s(_vm.num))]),_c('div',{staticClass:"desc"},[_vm._v(_vm._s(_vm.text))]),_c('font-awesome-icon',{staticClass:"close-button",attrs:{"icon":['far', 'times-circle']},on:{"click":function($event){return _vm.$emit('close')}}})],1)}
var SidepanelHelpvue_type_template_id_32c4bfc1_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SidepanelHelp.vue?vue&type=template&id=32c4bfc1&

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
    num: Number
  },
  computed: {
    text: function text() {
      return config.helpMessages[this.num];
    }
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
  SidepanelHelpvue_type_template_id_32c4bfc1_render,
  SidepanelHelpvue_type_template_id_32c4bfc1_staticRenderFns,
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
    },
    selectTitle: function selectTitle() {
      return format.firstCharUpper(config.scopes[0] + 's');
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
  Sidepanelvue_type_template_id_4013c00a_render,
  Sidepanelvue_type_template_id_4013c00a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Sidepanel = (Sidepanel_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Navbar.vue?vue&type=template&id=55ce6767&
var Navbarvue_type_template_id_55ce6767_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"navbar"},[_c('div',{staticClass:"nav-item left options-toggle",on:{"click":function($event){return _vm.$emit('openSettings')}}},[_c('font-awesome-icon',{attrs:{"icon":"bars"}})],1),_c('img',{staticClass:"nav-item left logo",attrs:{"src":__webpack_require__("cf05")}}),_c('div',{staticClass:"nav-item left title"},[_vm._v("Arena |")]),_c('div',{staticClass:"nav-item left session-name"},[(!_vm.editTitle)?_c('span',[_vm._v(_vm._s(_vm.sessionName || 'Untitled project'))]):_vm._e(),(!_vm.editTitle)?_c('span',{staticClass:"edit-icon",on:{"click":function($event){_vm.editTitle=true}}},[_c('font-awesome-icon',{attrs:{"icon":['far', 'edit']}})],1):_vm._e(),(!_vm.editTitle)?_c('span',{staticClass:"save-status"},[_vm._v(" "+_vm._s(_vm.sessionLastSaved ? 'Saved ' + new Date(_vm.sessionLastSaved).toString().split(' ').slice(0,5).join(' ') : ( _vm.sessionName ? 'Not saved yet' : 'Name project to enable auto-save' ))+" ")]):_vm._e(),_c('input',{class:{ visible: _vm.editTitle },attrs:{"type":"text"},domProps:{"value":_vm.sessionName},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.saveSessionName($event)}}})]),_vm._l((_vm.auxiliaryParams),function(p){return _c('SearchDropdown',{key:p,staticClass:"right",attrs:{"paramName":p}})}),(!_vm.isElementClosed('help-3'))?_c('NavbarHelp',{staticClass:"right",attrs:{"num":3},on:{"close":function($event){return _vm.closeElement('help-3')}}}):_vm._e(),_c('div',{staticClass:"nav-item right button",staticStyle:{"margin-right":"10px"},on:{"click":function($event){return _vm.$store.dispatch('arrangeSlots')}}},[_c('span',{staticClass:"label"},[_vm._v("Auto arrange")])])],2)}
var Navbarvue_type_template_id_55ce6767_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Navbar.vue?vue&type=template&id=55ce6767&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SearchDropdown.vue?vue&type=template&id=eb520442&
var SearchDropdownvue_type_template_id_eb520442_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"search-dropdown",class:{ open: _vm.open },on:{"click":function($event){_vm.open = true}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.editText),expression:"editText"}],attrs:{"type":"text"},domProps:{"value":(_vm.editText)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"escape",undefined,$event.key,undefined)){ return null; }_vm.open = false},"input":function($event){if($event.target.composing){ return; }_vm.editText=$event.target.value}}}),_c('span',{staticClass:"param-name"},[_vm._v(_vm._s(_vm.displayedParamName))]),_c('span',{staticClass:"param-value"},[_vm._v(_vm._s(_vm.displayedValue))]),_c('font-awesome-icon',{staticClass:"caret",attrs:{"icon":"angle-down"}}),(_vm.open && _vm.availableOptions.length > 0)?_c('div',{staticClass:"options-list"},[_vm._l((_vm.availableOptions),function(o){return _c('SearchDropdownElement',{key:o,attrs:{"paramName":_vm.paramName,"paramValue":o},on:{"setParam":function($event){return _vm.setParam(o)}}})}),(_vm.pagesCount > 1)?_c('div',{staticClass:"page-row"},[_c('div',{staticClass:"page-left page-button",class:{ invisible: _vm.page <= 0},on:{"click":function($event){_vm.page -= 1}}},[_c('font-awesome-icon',{attrs:{"icon":"angle-left"}}),_vm._v(" Previous ")],1),_vm._v(" Page "+_vm._s(_vm.page + 1)+" of "+_vm._s(_vm.pagesCount)+" "),_c('div',{staticClass:"page-right page-button",class:{ invisible: _vm.page >= _vm.pagesCount },on:{"click":function($event){_vm.page += 1}}},[_vm._v(" Next "),_c('font-awesome-icon',{attrs:{"icon":"angle-right"}})],1)]):_vm._e()],2):_vm._e()],1)}
var SearchDropdownvue_type_template_id_eb520442_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SearchDropdown.vue?vue&type=template&id=eb520442&

// EXTERNAL MODULE: ./node_modules/fuse.js/dist/fuse.js
var dist_fuse = __webpack_require__("ffe7");
var fuse_default = /*#__PURE__*/__webpack_require__.n(dist_fuse);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SearchDropdownElement.vue?vue&type=template&id=1d23b3a8&
var SearchDropdownElementvue_type_template_id_1d23b3a8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"search-dropdown-element",class:{ active: _vm.isActive }},[_vm._v(" "+_vm._s(_vm._f("formatTitle")(_vm.paramValue))+" ")])}
var SearchDropdownElementvue_type_template_id_1d23b3a8_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SearchDropdownElement.vue?vue&type=template&id=1d23b3a8&

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
    paramValue: String
  },
  data: function data() {
    return {
      initInfo: null
    };
  },
  computed: Object(objectSpread2["a" /* default */])({
    isActive: function isActive() {
      return this.paramValue && this.getGlobalParam(this.paramName) === this.paramValue;
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['getGlobalParam'])),
  methods: {},
  mounted: function mounted() {
    var _this = this;

    interact_min_default()(this.$el).pointerEvents({
      holdDuration: 250
    }).on('hold', function (event) {
      var _ref;

      event.preventDefault();

      var slot = Object(objectSpread2["a" /* default */])({}, config.searchDropdownPlots[_this.paramName]);

      var mainParamValue = _this.getGlobalParam(slot.scope);

      if (!mainParamValue || !slot) return;
      slot.localParams = [(_ref = {}, Object(defineProperty["a" /* default */])(_ref, _this.paramName, _this.paramValue), Object(defineProperty["a" /* default */])(_ref, slot.scope, mainParamValue), _ref)];

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
  SearchDropdownElementvue_type_template_id_1d23b3a8_render,
  SearchDropdownElementvue_type_template_id_1d23b3a8_staticRenderFns,
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
      var valueName = this.getGlobalParam(this.paramName) || '<Empty list>';
      return format.formatTitle(valueName || '');
    },
    displayedParamName: function displayedParamName() {
      return format.firstCharUpper(this.paramName);
    },
    fuse: function fuse() {
      return new fuse_default.a(this.availableParams[this.paramName] || [], {});
    },
    allAvailableOptions: function allAvailableOptions() {
      var _this = this;

      if (this.editText.length < 1) return this.availableParams[this.paramName] || [];
      return this.fuse.search(this.editText).map(function (i) {
        return _this.availableParams[_this.paramName][i];
      });
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
  SearchDropdownvue_type_template_id_eb520442_render,
  SearchDropdownvue_type_template_id_eb520442_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SearchDropdown = (SearchDropdown_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NavbarHelp.vue?vue&type=template&id=74bfcf2c&
var NavbarHelpvue_type_template_id_74bfcf2c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"navbar-help"},[_c('span',{staticClass:"big-number"},[_vm._v(_vm._s(_vm.num))]),_c('div',{staticClass:"desc"},[_vm._v(_vm._s(_vm.text))]),_c('font-awesome-icon',{staticClass:"close-button",attrs:{"icon":['far', 'times-circle']},on:{"click":function($event){return _vm.$emit('close')}}})],1)}
var NavbarHelpvue_type_template_id_74bfcf2c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/NavbarHelp.vue?vue&type=template&id=74bfcf2c&

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
    num: Number
  },
  computed: {
    text: function text() {
      return config.helpMessages[this.num];
    }
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
  NavbarHelpvue_type_template_id_74bfcf2c_render,
  NavbarHelpvue_type_template_id_74bfcf2c_staticRenderFns,
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
//
//
//
//
//
//




/* harmony default export */ var Navbarvue_type_script_lang_js_ = ({
  name: 'Navbar',
  data: function data() {
    return {
      editTitle: false
    };
  },
  computed: Object(objectSpread2["a" /* default */])({
    auxiliaryParams: function auxiliaryParams() {
      return config.params.filter(function (p) {
        return !config.scopes.includes(p);
      });
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['availableParams', 'getGlobalParam', 'isElementClosed', 'sessionName', 'sessionLastSaved'])),
  mounted: function mounted() {
    document.addEventListener('pointerdown', this.onClickOutside);
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('pointerdown', this.onClickOutside);
  },
  methods: Object(objectSpread2["a" /* default */])({
    saveSessionName: function saveSessionName(e) {
      this.editTitle = false;
      this.setSessionName(e.target.value);
    },
    onClickOutside: function onClickOutside(e) {
      if (!this.$el.contains(e.target)) this.editTitle = false;
    }
  }, Object(vuex_esm["d" /* mapMutations */])(['setGlobalParam', 'closeElement', 'setSessionName'])),
  components: {
    SearchDropdown: SearchDropdown,
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
  Navbarvue_type_template_id_55ce6767_render,
  Navbarvue_type_template_id_55ce6767_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Navbar = (Navbar_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DeleteZone.vue?vue&type=template&id=6438120e&
var DeleteZonevue_type_template_id_6438120e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"deletezone",class:{ active: _vm.active, visible: _vm.visible },style:({ zIndex: _vm.zIndex })},[_c('span',{staticClass:"title"},[_vm._v("Delete")])])}
var DeleteZonevue_type_template_id_6438120e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/DeleteZone.vue?vue&type=template&id=6438120e&

// CONCATENATED MODULE: ./src/utils/zIndexIncrementor.js
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
  DeleteZonevue_type_template_id_6438120e_render,
  DeleteZonevue_type_template_id_6438120e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DeleteZone = (DeleteZone_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Block.vue?vue&type=template&id=069c8d5f&
var Blockvue_type_template_id_069c8d5f_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"block",staticClass:"block",class:{ moving: _vm.moving, dropzone: _vm.mode.indexOf('dropzone') != -1 },style:(_vm.style)},[_c('div',{staticClass:"overlay full",class:{ visible: _vm.singleDropzone, active: _vm.activeDropzone === 'full' }},[_c('span',{staticClass:"overlay-title"},[_c('font-awesome-icon',{attrs:{"icon":"compress-arrows-alt"}}),_c('br'),_vm._v("REPLACE")],1)]),_c('div',{ref:"leftdropzone",staticClass:"overlay left",class:{ visible: _vm.dualDropzone, active: _vm.activeDropzone === 'left' }},[_c('span',{staticClass:"overlay-title"},[_c('font-awesome-icon',{attrs:{"icon":"layer-group"}}),_c('br'),_vm._v("MERGE")],1)]),_c('div',{ref:"rightdropzone",staticClass:"overlay right",class:{ visible: _vm.dualDropzone, active: _vm.activeDropzone === 'right' }},[_c('span',{staticClass:"overlay-title"},[_c('font-awesome-icon',{attrs:{"icon":"compress-arrows-alt"}}),_c('br'),_vm._v("REPLACE")],1)]),_c('BlockHead',{attrs:{"slotv":_vm.slotv,"plotComponent":_vm.plotComponent}}),_c('PlotProxy',{ref:"plot",attrs:{"slotv":_vm.slotv},on:{"plotComponentUpdate":function($event){_vm.plotComponent = $event}}}),_c('span',{staticClass:"fullscreen-toggle tooltiped",on:{"click":function($event){return _vm.$emit('openFullscreen')}}},[_c('span',{staticClass:"tooltip"},[_vm._v("Fullscreen")]),_c('span',[_c('font-awesome-icon',{attrs:{"icon":"expand"}})],1)]),_c('div',{staticClass:"handle handle-left"}),_c('div',{staticClass:"handle handle-top"}),_c('div',{staticClass:"handle handle-right"}),_c('div',{staticClass:"handle handle-bottom"}),_c('div',{staticClass:"handle handle-left handle-top"}),_c('div',{staticClass:"handle handle-left handle-bottom"}),_c('div',{staticClass:"handle handle-right handle-top"}),_c('div',{staticClass:"handle handle-right handle-bottom"})],1)}
var Blockvue_type_template_id_069c8d5f_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Block.vue?vue&type=template&id=069c8d5f&

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
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PlotProxy.vue?vue&type=template&id=6c662eca&
var PlotProxyvue_type_template_id_6c662eca_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"plot-proxy"},[(_vm.loading || _vm.waitingForRender)?_c('span',{staticClass:"msg"},[_vm._v("Loading...")]):_vm._e(),(!_vm.renderPlot && !_vm.error && !_vm.loading && _vm.slotData.length === 0 && !_vm.waitingForRender)?_c('span',{staticClass:"msg"},[_vm._v("Cannot load plot data!")]):_vm._e(),(!_vm.plotComponent && !_vm.renderPlot && !_vm.error && !_vm.loading && _vm.slotData.length > 0 && !_vm.waitingForRender)?_c('span',{staticClass:"msg"},[_vm._v(" Cannot load plot data. Plot type is probably not supported for thease params. ")]):_vm._e(),(!_vm.renderPlot && _vm.error && !_vm.loading)?_c('span',{staticClass:"msg error"},[_vm._v("Error occured during loading plot data!")]):_vm._e(),(_vm.renderPlot)?_c(_vm.plotComponent,{ref:"plot",tag:"component",staticClass:"plot",attrs:{"data":_vm.slotData,"plotType":_vm.slotv.plotType,"slotv":_vm.slotv}}):_vm._e()],1)}
var PlotProxyvue_type_template_id_6c662eca_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/PlotProxy.vue?vue&type=template&id=6c662eca&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PlotProxy.vue?vue&type=script&lang=js&













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
      waitingForRender: false,
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

        var getPlotData = function getPlotData(slotData) {
          return slotData.plotData;
        };

        if (new Set([].concat(Object(toConsumableArray["a" /* default */])(_this3.slotData.map(getPlotData)), Object(toConsumableArray["a" /* default */])(result.map(getPlotData)))).size === new Set(_this3.slotData).size && new Set(_this3.slotData.map(getPlotData)).size === new Set(result.map(getPlotData)).size && _this3.slotData.length === result.length) return;
        _this3.waitingForRender = true;
        setTimeout(function () {
          _this3.slotData = result;
          _this3.waitingForRender = false;
        }, 0);
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
  PlotProxyvue_type_template_id_6c662eca_render,
  PlotProxyvue_type_template_id_6c662eca_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PlotProxy = (PlotProxy_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BlockHead.vue?vue&type=template&id=8a844128&
var BlockHeadvue_type_template_id_8a844128_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block-head"},[_c('div',{staticClass:"main-title-box"},[(!_vm.titleEdit)?_c('span',{staticClass:"title tooltiped",on:{"dblclick":function($event){_vm.titleEdit = true}}},[_c('span',{staticClass:"tooltip"},[_vm._v("Double click to edit")]),_c('span',{staticClass:"title-text"},[_vm._v(_vm._s(_vm.slotv.name))])]):_vm._e(),(_vm.description && !_vm.titleEdit)?_c('span',{staticClass:"tooltiped plot-help-box"},[_c('span',{staticClass:"tooltip"},[_vm._v(_vm._s(_vm.description))]),_c('font-awesome-icon',{attrs:{"icon":['far', 'question-circle']}})],1):_vm._e(),(_vm.titleEdit)?_c('input',{ref:"titleInput",staticClass:"title-input",attrs:{"type":"text"},domProps:{"value":_vm.slotv.name},on:{"blur":_vm.saveTitle,"keyup":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.saveTitle($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"escape",undefined,$event.key,undefined)){ return null; }_vm.titleEdit = false}]}}):_vm._e(),_c('div',{staticClass:"subtitle",domProps:{"innerHTML":_vm._s(_vm.usedModels)}})]),_c('div',{staticClass:"locks"},[(_vm.isMerged)?_c('span',{on:{"click":function($event){return _vm.splitSlot(_vm.slotv)}}},[_vm._v("Split "),_c('font-awesome-icon',{attrs:{"icon":['far', 'clone']}})],1):_vm._e(),_vm._l((_vm.lockableParams),function(p){return _c('span',{key:p.name,staticClass:"tooltiped",on:{"click":function($event){return _vm.lockUnlockParam(p.name)},"contextmenu":function($event){$event.preventDefault();return _vm.openParamSearch(p.name, $event)}}},[_vm._m(0,true),_vm._v(" "+_vm._s(_vm._f("titleFormat")(p.value ? p.value : p.name))+" "+_vm._s(p.value ? '🔒' : '🔓')+" ")])}),(_vm.searchMenuParam)?_c('SearchMenu',{style:(_vm.searchManuStyle),attrs:{"paramName":_vm.searchMenuParam},on:{"close":function($event){_vm.searchMenuParam = ''},"setParam":function($event){return _vm.setSlotParam($event)}}}):_vm._e()],2)])}
var BlockHeadvue_type_template_id_8a844128_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"tooltip"},[_vm._v("Left click to lock"),_c('br'),_vm._v("Right click to choose")])}]


// CONCATENATED MODULE: ./src/components/BlockHead.vue?vue&type=template&id=8a844128&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SearchMenu.vue?vue&type=template&id=9f316266&
var SearchMenuvue_type_template_id_9f316266_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"search-menu"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.editText),expression:"editText"}],attrs:{"type":"text"},domProps:{"value":(_vm.editText)},on:{"input":function($event){if($event.target.composing){ return; }_vm.editText=$event.target.value}}}),_vm._l((_vm.availableOptions),function(o){return _c('div',{key:o,staticClass:"entry",on:{"click":function($event){return _vm.$emit('setParam', o)}}},[_vm._v(" "+_vm._s(_vm._f("formatTitle")(o))+" ")])}),_c('div',{staticClass:"entry",on:{"click":function($event){return _vm.$emit('close')}}},[_vm._v("Close")])],2)}
var SearchMenuvue_type_template_id_9f316266_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SearchMenu.vue?vue&type=template&id=9f316266&

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
      return new fuse_default.a(this.availableParams[this.paramName] || [], {});
    },
    availableOptions: function availableOptions() {
      var _this = this;

      if (this.editText.length < 1) return (this.availableParams[this.paramName] || []).slice(0, 10);
      return this.fuse.search(this.editText).slice(0, 10).map(function (i) {
        return _this.availableParams[_this.paramName][i];
      });
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
  SearchMenuvue_type_template_id_9f316266_render,
  SearchMenuvue_type_template_id_9f316266_staticRenderFns,
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

      var scope = this.slotv.scope;
      return Object(toConsumableArray["a" /* default */])(new Set(this.fullParams.map(function (p, i) {
        return '<span style="color: ' + _this.scopesColors[scope][p[scope]] + '">' + p[scope] + '</span>';
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
  }, Object(vuex_esm["c" /* mapGetters */])(['getSlotFullParams', 'availableParams', 'scopesColors'])),
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
  BlockHeadvue_type_template_id_8a844128_render,
  BlockHeadvue_type_template_id_8a844128_staticRenderFns,
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
  Blockvue_type_template_id_069c8d5f_render,
  Blockvue_type_template_id_069c8d5f_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Block = (Block_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Settings.vue?vue&type=template&id=47ae88be&
var Settingsvue_type_template_id_47ae88be_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"settings-container"},[_c('div',{staticClass:"settings-tabs"},_vm._l((_vm.tabs),function(t){return _c('span',{key:t.name,staticClass:"tab-name"},[_c('span',{class:{ active: t.name === _vm.activeTab },on:{"click":function($event){_vm.activeTab = t.name}}},[_vm._v(_vm._s(t.name))])])}),0),_c('div',{staticClass:"close-button",on:{"click":function($event){return _vm.$emit('close')}}},[_c('font-awesome-icon',{attrs:{"icon":['far', 'times-circle']}})],1),_c(_vm.activeTabComponent,{tag:"component"})],1)}
var Settingsvue_type_template_id_47ae88be_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Settings.vue?vue&type=template&id=47ae88be&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabOptions.vue?vue&type=template&id=09974d94&
var SettingsTabOptionsvue_type_template_id_09974d94_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"settings-tab-options settings-tab"},_vm._l((_vm.schemas),function(option){return _c('div',{key:option.name,staticClass:"option-row"},[_vm._v(" "+_vm._s(option.displayName)+" "),(option.type === 'integer')?_c('div',{staticClass:"option-input"},[_c('input',{class:{ error: _vm.errors.includes(option.name) },attrs:{"type":"text"},domProps:{"value":_vm.getOption(option.name)},on:{"change":function($event){return _vm.save(option.name, $event.target.value)}}})]):_vm._e(),(option.type === 'boolean')?_c('div',{staticClass:"option-input"},[_c('span',{staticClass:"check-symbol",on:{"click":function($event){return _vm.save(option.name, false)}}},[(_vm.getOption(option.name))?_c('span',[_c('font-awesome-icon',{attrs:{"icon":['far', 'check-square']}})],1):_vm._e()]),_c('span',{staticClass:"check-symbol",on:{"click":function($event){return _vm.save(option.name, true)}}},[(!_vm.getOption(option.name))?_c('span',[_c('font-awesome-icon',{attrs:{"icon":['far', 'square']}})],1):_vm._e()])]):_vm._e()])}),0)}
var SettingsTabOptionsvue_type_template_id_09974d94_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SettingsTabOptions.vue?vue&type=template&id=09974d94&

// CONCATENATED MODULE: ./src/configuration/OptionsSchemas.js
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
  name: 'funnelmeasure_page_size',
  displayName: 'Maximum variables in one page of Funnel Plot',
  type: 'integer',
  default: 6,
  min: 1
}, {
  name: 'subsetsperformance_page_size',
  displayName: 'Maximum variables in one page of Subset Performance',
  type: 'integer',
  default: 6,
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
  SettingsTabOptionsvue_type_template_id_09974d94_render,
  SettingsTabOptionsvue_type_template_id_09974d94_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SettingsTabOptions = (SettingsTabOptions_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabSessions.vue?vue&type=template&id=690c4bb2&
var SettingsTabSessionsvue_type_template_id_690c4bb2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"settings-tab-sessions settings-tab"},[_c('div',{staticClass:"current-session"},[_c('button',{staticClass:"download",on:{"click":_vm.save}},[_vm._v("Download current session")]),_c('input',{ref:"fileinput",staticStyle:{"display":"none"},attrs:{"type":"file"},on:{"change":_vm.loadFiles}}),_c('button',{staticClass:"upload",on:{"click":function($event){return _vm.$refs.fileinput.click()}}},[_vm._v("Load session from file")]),_c('button',{staticClass:"share",on:{"click":_vm.share}},[_vm._v("Share using Github Gist")]),_c('button',{staticClass:"share-peer",on:{"click":_vm.sharePeer}},[_vm._v("Share using P2P")])]),(_vm.message)?_c('span',{staticClass:"message",style:({ color: _vm.message.error ? '#f05a71' : '#46bac2' })},[_vm._v(_vm._s(_vm.message.text))]):_vm._e(),_c('div',{staticClass:"recently-used"},[_c('span',[_vm._v("Recent sessions")]),_vm._l((_vm.recentSessions),function(s){return _c('div',{key:s.time},[_c('a',{attrs:{"href":_vm.baseURL + '/?session_uuid=' + s.uuid},on:{"click":function($event){$event.preventDefault();return _vm.loadSession(s)}}},[_vm._v(_vm._s(s.name || 'Unnamed'))]),_c('span',{staticClass:"date"},[_vm._v(_vm._s(new Date(s.time).toString().split(' ').slice(0,5).join(' ')))]),_c('span',{staticClass:"option",on:{"click":function($event){return _vm.downloadSession(s)}}},[_c('font-awesome-icon',{attrs:{"icon":"file-download"}})],1),_c('span',{staticClass:"option",on:{"click":function($event){return _vm.deleteSession(s)}}},[_c('font-awesome-icon',{staticStyle:{"color":"red"},attrs:{"icon":['far', 'times-circle']}})],1)])})],2)])}
var SettingsTabSessionsvue_type_template_id_690c4bb2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SettingsTabSessions.vue?vue&type=template&id=690c4bb2&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/file-saver/dist/FileSaver.min.js
var FileSaver_min = __webpack_require__("21a6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabSessions.vue?vue&type=script&lang=js&







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



/* harmony default export */ var SettingsTabSessionsvue_type_script_lang_js_ = ({
  name: 'SettingsTabSessions',
  computed: Object(objectSpread2["a" /* default */])({
    baseURL: function baseURL() {
      return config.url;
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['recentSessions'])),
  data: function data() {
    return {
      message: null
    };
  },
  methods: {
    loadSession: function loadSession(session) {
      this.$store.dispatch('importSession', session);
    },
    downloadSession: function downloadSession(session) {
      var json = JSON.stringify(session);
      Object(FileSaver_min["saveAs"])(new Blob([json], {
        type: 'application/json',
        name: 'session-' + session.time + '.json'
      }), 'session-' + session.time + '.json');
    },
    deleteSession: function deleteSession(session) {
      var _this = this;

      // nextTick to suppress loop warning
      this.$nextTick(function () {
        _this.$store.dispatch('deleteSession', session.uuid);
      });
    },
    save: function save() {
      var _this2 = this;

      this.$store.dispatch('exportSession').then(function (session) {
        _this2.downloadSession(session);
      });
    },
    share: function share() {
      var _this3 = this;

      this.$store.dispatch('shareSession').then(function (url) {
        _this3.message = {
          text: _this3.baseURL + '/?session=' + url
        };
      }).catch(function (e) {
        console.error(e);
        _this3.message = {
          text: 'Failed to share session',
          error: true
        };
      });
    },
    sharePeer: function sharePeer() {
      var _this4 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var id;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this4.message = {
                  text: 'Connecting...',
                  error: false
                };
                _context.next = 3;
                return _this4.$store.dispatch('initPeerServer');

              case 3:
                id = _this4.$store.getters.peer.id;
                _this4.message = {
                  text: _this4.baseURL + '/?peer_server=' + id,
                  error: false
                };

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    loadFiles: function loadFiles(event) {
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
      var _this5 = this;

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

            _this5.$store.dispatch('importSession', parsed);
          } catch (e) {
            console.error('Cannot parse the file. Look to console for more details.');
            console.error(e);
          }
        } else {
          console.error('File type is unsupported yet');
        }
      };

      reader.readAsDataURL(file);
    }
  }
});
// CONCATENATED MODULE: ./src/components/SettingsTabSessions.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SettingsTabSessionsvue_type_script_lang_js_ = (SettingsTabSessionsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SettingsTabSessions.vue?vue&type=style&index=0&lang=css&
var SettingsTabSessionsvue_type_style_index_0_lang_css_ = __webpack_require__("de0a");

// CONCATENATED MODULE: ./src/components/SettingsTabSessions.vue






/* normalize component */

var SettingsTabSessions_component = Object(componentNormalizer["a" /* default */])(
  components_SettingsTabSessionsvue_type_script_lang_js_,
  SettingsTabSessionsvue_type_template_id_690c4bb2_render,
  SettingsTabSessionsvue_type_template_id_690c4bb2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SettingsTabSessions = (SettingsTabSessions_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabSources.vue?vue&type=template&id=a9944e6a&
var SettingsTabSourcesvue_type_template_id_a9944e6a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"settings-tab-sources settings-tab"},[_c('div',{staticClass:"add-sources-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputURL),expression:"inputURL"}],attrs:{"type":"text","placeholder":"Enter URL here"},domProps:{"value":(_vm.inputURL)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.loadURL()},"input":function($event){if($event.target.composing){ return; }_vm.inputURL=$event.target.value}}}),_c('input',{ref:"fileinput",staticStyle:{"display":"none"},attrs:{"type":"file","multiple":""},on:{"change":_vm.loadFiles}}),_c('button',{staticClass:"add-url",on:{"click":function($event){return _vm.loadURL()}}},[_vm._v("Add URL")]),_c('button',{staticClass:"add-file",on:{"click":function($event){return _vm.$refs.fileinput.click()}}},[_vm._v("Add File")]),(_vm.addSourceError)?_c('div',{staticClass:"error"},[_vm._v(_vm._s(_vm.addSourceError))]):_vm._e(),(_vm.sourceAdded)?_c('div',{staticClass:"ok"},[_vm._v("Data loaded")]):_vm._e()]),_c('div',{staticClass:"recently-used"},[_c('span',[_vm._v("Recenty used")]),_vm._l((_vm.recentURLSources),function(s){return _c('div',{key:s.time},[_c('a',{attrs:{"href":_vm.baseURL + '/?data=' + s.url},on:{"click":function($event){$event.preventDefault();return _vm.loadURL(s.url)}}},[_vm._v(_vm._s(s.url))]),_c('span',{staticClass:"date"},[_vm._v(_vm._s(new Date(s.time).toString().split(' ').slice(0,5).join(' ')))]),_c('span',{staticClass:"option",on:{"click":function($event){return _vm.deleteRecentSource(s)}}},[_c('font-awesome-icon',{staticStyle:{"color":"red"},attrs:{"icon":['far', 'times-circle']}})],1)])})],2)])}
var SettingsTabSourcesvue_type_template_id_a9944e6a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SettingsTabSources.vue?vue&type=template&id=a9944e6a&

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
  methods: Object(objectSpread2["a" /* default */])({
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
  }, Object(vuex_esm["d" /* mapMutations */])(['deleteRecentSource']))
});
// CONCATENATED MODULE: ./src/components/SettingsTabSources.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SettingsTabSourcesvue_type_script_lang_js_ = (SettingsTabSourcesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SettingsTabSources.vue?vue&type=style&index=0&lang=css&
var SettingsTabSourcesvue_type_style_index_0_lang_css_ = __webpack_require__("7fbb");

// CONCATENATED MODULE: ./src/components/SettingsTabSources.vue






/* normalize component */

var SettingsTabSources_component = Object(componentNormalizer["a" /* default */])(
  components_SettingsTabSourcesvue_type_script_lang_js_,
  SettingsTabSourcesvue_type_template_id_a9944e6a_render,
  SettingsTabSourcesvue_type_template_id_a9944e6a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SettingsTabSources = (SettingsTabSources_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabPrivacy.vue?vue&type=template&id=788579cc&
var SettingsTabPrivacyvue_type_template_id_788579cc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"settings-tab-privacy settings-tab"},[_c('span',{staticClass:"header"},[_vm._v("Stored items")]),_vm._v(" Arena store some useful information on your browser's local storage. You can remove any of them below. "),_vm._l((_vm.storedItems),function(item){return _c('div',{key:item.key,staticClass:"stored-item"},[_c('span',{staticClass:"remove-item",on:{"click":function($event){return _vm.removeStoredItem(item.key)}}},[_c('font-awesome-icon',{staticStyle:{"color":"red"},attrs:{"icon":['far', 'times-circle']}})],1),_vm._v(" "+_vm._s(item.name)+" ")])}),_c('span',{staticClass:"header"},[_vm._v("Telemetry")]),_vm._v(" Telemetry allows us to check how users are using Arena. Anonimized data about plot types and features are sent to us. All parameters' names are replaced and your dataset is safe. "),_c('div',{staticClass:"option-row"},[_vm._v(" Disable telemetry "),_c('div',{staticClass:"option-input"},[_c('span',{staticClass:"check-symbol",on:{"click":function($event){return _vm.setTelemetry(false)}}},[(_vm.disableTelemetry)?_c('span',[_c('font-awesome-icon',{attrs:{"icon":['far', 'check-square']}})],1):_vm._e()]),_c('span',{staticClass:"check-symbol",on:{"click":function($event){return _vm.setTelemetry(true)}}},[(!_vm.disableTelemetry)?_c('span',[_c('font-awesome-icon',{attrs:{"icon":['far', 'square']}})],1):_vm._e()])])])],2)}
var SettingsTabPrivacyvue_type_template_id_788579cc_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SettingsTabPrivacy.vue?vue&type=template&id=788579cc&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SettingsTabPrivacy.vue?vue&type=script&lang=js&


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
// import { mapGetters } from 'vuex'
// import config from '@/configuration/config.js'
/* harmony default export */ var SettingsTabPrivacyvue_type_script_lang_js_ = ({
  name: 'SettingsTabPrivacy',
  computed: {},
  data: function data() {
    return {
      storedItems: [],
      disableTelemetry: false
    };
  },
  created: function created() {
    this.load();
  },
  methods: {
    removeStoredItem: function removeStoredItem(key) {
      localStorage.removeItem(key);
      this.load();
    },
    setTelemetry: function setTelemetry(v) {
      localStorage.setItem('disableTelemetry', v ? true : '');
      this.load();
    },
    load: function load() {
      var names = {
        githubToken: 'Github authorization token',
        recentURLSources: 'Recently used sources\' URLs',
        recentSessions: 'Recently used sessions',
        closedElements: 'Closed help messages',
        append: 'Address of last append source',
        disableTelemetry: 'Telemetry status'
      };
      this.storedItems = Object.keys(localStorage).map(function (key) {
        return {
          key: key,
          name: names[key] || key
        };
      });
      this.disableTelemetry = !!localStorage.getItem('disableTelemetry');
    }
  }
});
// CONCATENATED MODULE: ./src/components/SettingsTabPrivacy.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SettingsTabPrivacyvue_type_script_lang_js_ = (SettingsTabPrivacyvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/SettingsTabPrivacy.vue?vue&type=style&index=0&lang=css&
var SettingsTabPrivacyvue_type_style_index_0_lang_css_ = __webpack_require__("98e4");

// CONCATENATED MODULE: ./src/components/SettingsTabPrivacy.vue






/* normalize component */

var SettingsTabPrivacy_component = Object(componentNormalizer["a" /* default */])(
  components_SettingsTabPrivacyvue_type_script_lang_js_,
  SettingsTabPrivacyvue_type_template_id_788579cc_render,
  SettingsTabPrivacyvue_type_template_id_788579cc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SettingsTabPrivacy = (SettingsTabPrivacy_component.exports);
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
      }, {
        name: 'Privacy',
        component: 'SettingsTabPrivacy'
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
    SettingsTabSources: SettingsTabSources,
    SettingsTabPrivacy: SettingsTabPrivacy
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
  Settingsvue_type_template_id_47ae88be_render,
  Settingsvue_type_template_id_47ae88be_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Settings = (Settings_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FullscreenBlock.vue?vue&type=template&id=b144df54&
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
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Preview.vue?vue&type=template&id=6d18e4c0&
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
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NameConflicts.vue?vue&type=template&id=4b5591e5&
var NameConflictsvue_type_template_id_4b5591e5_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"name-conflicts"},[_c('span',{staticClass:"title"},[_vm._v("Found conflict in "),_c('b',[_vm._v(_vm._s(_vm.nextParamType))]),_vm._v(" name")]),_c('span',{staticClass:"desc"},[_vm._v(" "+_vm._s(_vm._f("firstUpper")(_vm.nextParamType))+" "),_c('b',[_vm._v(_vm._s(_vm.nextParamName))]),_vm._v(" looks too similar to "),_c('b',[_vm._v(_vm._s(_vm.nextParamConflict))]),_vm._v(". If it's the same "+_vm._s(_vm.nextParamType)+", then "),_c('b',[_vm._v("merge")]),_vm._v(" it. You can also "),_c('b',[_vm._v("rename")]),_vm._v(" it, to remove conflict. ")]),_c('div',{staticClass:"buttons"},[_c('button',{staticClass:"merge",on:{"click":_vm.merge}},[_vm._v("Merge")]),_c('button',{staticClass:"merge-all",on:{"click":_vm.mergeAll}},[_vm._v("Merge for all "+_vm._s(_vm.nextParamType + 's'))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.renameInput),expression:"renameInput"}],staticClass:"rename-input",class:{ error: _vm.renameError, disabled: !_vm.renameInput },attrs:{"type":"text","placeholder":"Enter new name here"},domProps:{"value":(_vm.renameInput)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.tryToRename($event)},"input":function($event){if($event.target.composing){ return; }_vm.renameInput=$event.target.value}}}),_c('button',{staticClass:"rename-button",class:{ disabled: _vm.renameError || !_vm.renameInput },on:{"click":_vm.tryToRename}},[_vm._v("Rename")])])])}
var NameConflictsvue_type_template_id_4b5591e5_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/NameConflicts.vue?vue&type=template&id=4b5591e5&

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



/* harmony default export */ var NameConflictsvue_type_script_lang_js_ = ({
  name: 'NameConflicts',
  computed: Object(objectSpread2["a" /* default */])({
    nextParamType: function nextParamType() {
      return Object.keys(this.paramsConflict.params)[this.paramTypeIndex] || '';
    },
    nextParamName: function nextParamName() {
      return this.nextParam.paramName || '';
    },
    nextParamsOfSameType: function nextParamsOfSameType() {
      var _this = this;

      return (this.paramsConflict.params[this.nextParamType] || []).filter(function (x, i) {
        return i >= _this.paramNameIndex;
      });
    },
    nextParam: function nextParam() {
      return this.nextParamsOfSameType[0] || {};
    },
    nextParamConflict: function nextParamConflict() {
      return this.nextParam.conflictedWith || '';
    },
    renameError: function renameError() {
      return format.simplify(this.renameInput) === format.simplify(this.nextParamConflict) || !this.isRenameCorrect(this.paramsConflict.uuid, this.nextParamType, this.renameInput);
    },
    paramsConflict: function paramsConflict() {
      return this.waitingParamsConflicts[0];
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['waitingParamsConflicts', 'isRenameCorrect'])),
  data: function data() {
    return {
      renameInput: '',
      paramTypeIndex: 0,
      paramNameIndex: 0,
      translations: null // will be set in watcher

    };
  },
  watch: {
    paramsConflict: {
      handler: function handler(newValue) {
        if (!newValue) return;
        this.translations = {
          uuid: newValue.uuid,
          // source uuid
          // Object with param types as keys and empty objects as values
          params: config.params.reduce(function (acu, paramType) {
            acu[paramType] = {};
            return acu;
          }, {})
        };
        this.paramTypeIndex = 0;
        this.paramNameIndex = 0;
      },
      immediate: true
    },
    paramTypeIndex: {
      handler: function handler(newValue) {
        if (!this.paramsConflict) return;

        if (Object.keys(this.paramsConflict.params).length <= this.paramTypeIndex && this.translations) {
          this.addTranslations(this.translations);
          this.paramTypeIndex = 0;
          this.paramNameIndex = 0;
          return;
        }

        this.paramNameIndex = 0;
      },
      immediate: true
    },
    paramNameIndex: {
      handler: function handler(newValue) {
        if (!this.paramsConflict) return;
        if (this.paramsConflict.params[this.nextParamType].length <= this.paramNameIndex) this.paramTypeIndex += 1;
      },
      immediate: true
    }
  },
  methods: Object(objectSpread2["a" /* default */])({
    tryToRename: function tryToRename() {
      if (this.renameError) return false;
      this.translations.params[this.nextParamType][this.nextParamName] = this.renameInput;
      this.paramNameIndex += 1;
    },
    merge: function merge() {
      this.translations.params[this.nextParamType][this.nextParamName] = this.nextParamConflict;
      this.paramNameIndex += 1;
    },
    mergeAll: function mergeAll() {
      var _this2 = this;

      this.nextParamsOfSameType.forEach(function (p) {
        _this2.translations.params[_this2.nextParamType][p.paramName] = p.conflictedWith;
      });
      this.paramTypeIndex += 1;
    }
  }, Object(vuex_esm["d" /* mapMutations */])(['addTranslations'])),
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
  NameConflictsvue_type_template_id_4b5591e5_render,
  NameConflictsvue_type_template_id_4b5591e5_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var NameConflicts = (NameConflicts_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WelcomeScreen.vue?vue&type=template&id=be504ff4&
var WelcomeScreenvue_type_template_id_be504ff4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"welcome-screen-container"},[_c('div',{staticClass:"close-button",on:{"click":function($event){return _vm.$emit('close')}}},[_c('font-awesome-icon',{attrs:{"icon":['far', 'times-circle']}})],1),_c('div',{staticClass:"welcome-screen-content"},[_c('span',{staticClass:"welcome"},[_vm._v("Welcome to Arena - Interactive XAI dashboard")]),_c('h2',[_vm._v("About")]),_vm._m(0),_c('h2',[_vm._v("See demo")]),_vm._l((_vm.examples),function(e){return _c('div',{key:e.name,staticClass:"example"},[_c('a',{attrs:{"href":e.href},on:{"click":function($event){$event.preventDefault();return _vm.openExample(e)}}},[_vm._v(_vm._s(e.name))]),(_vm.loadingExample === e)?_c('span',[_vm._v(" (Loading...)")]):_vm._e()])}),_c('h2',[_vm._v("Test on your data")]),_vm._m(1),_c('h2',[_vm._v("See also")]),_vm._m(2)],2),_c('div',{staticClass:"buttons"},[_c('button',{staticClass:"close-permanent",on:{"click":function($event){return _vm.closeElement('welcome-screen')}}},[_vm._v("Do not show again")]),_c('button',{staticClass:"close",on:{"click":function($event){return _vm.$emit('close')}}},[_vm._v("Close")])])])}
var WelcomeScreenvue_type_template_id_be504ff4_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('b',[_vm._v("Arena")]),_vm._v(" is an interactive dashboard to compare "),_c('b',[_vm._v("AI explanations")]),_vm._v(" for multiple predictive models at once. You can work with static precalculated data from one or more sources and with a live server that calculates plots on demand.")])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('a',{attrs:{"href":"https://github.com/ModelOriented/ArenaR"}},[_vm._v("Use Arena with R")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('b',[_vm._v("Arena")]),_vm._v(" is a part of "),_c('a',{attrs:{"href":"https://drwhy.ai"}},[_c('b',[_vm._v("DrWhy.AI")])]),_vm._v(" family. Check it out."),_c('br'),_vm._v(" Source code is available at "),_c('a',{attrs:{"href":"https://github.com/ModelOriented/Arena"}},[_vm._v("Github")])])}]


// CONCATENATED MODULE: ./src/components/WelcomeScreen.vue?vue&type=template&id=be504ff4&

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
      var _this = this;

      return config.examples.map(function (e) {
        return {
          name: e.name,
          href: _this.baseURL + (e.session ? '/?session=' + e.session : '/?data=' + e.url),
          url: e.session || e.url,
          action: e.session ? 'loadSessionURL' : 'loadURL'
        };
      });
    }
  },
  methods: Object(objectSpread2["a" /* default */])({
    openExample: function openExample(e) {
      var _this2 = this;

      if (this.loadingExample) return;
      this.loadingExample = e;
      this.$store.dispatch(e.action, e.url).then(function () {
        _this2.$emit('close');
      }).catch(function (error) {
        _this2.loadingExample = null;
        console.error(error);
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
  WelcomeScreenvue_type_template_id_be504ff4_render,
  WelcomeScreenvue_type_template_id_be504ff4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var WelcomeScreen = (WelcomeScreen_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Annotations.vue?vue&type=template&id=71f0f118&
var Annotationsvue_type_template_id_71f0f118_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize",rawName:"v-resize:throttle.100",value:(_vm.onResize),expression:"onResize",arg:"throttle",modifiers:{"100":true}}],staticClass:"annotations",class:{ active: _vm.annotationsActive }},[_c('canvas',{ref:"canvas"})])}
var Annotationsvue_type_template_id_71f0f118_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Annotations.vue?vue&type=template&id=71f0f118&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Annotations.vue?vue&type=script&lang=js&







//
//
//
//
//


/* harmony default export */ var Annotationsvue_type_script_lang_js_ = ({
  name: 'Annotations',
  data: function data() {
    return {
      context: null,
      lineWidth: 5,
      width: 0,
      height: 0,
      cursor: null,
      paths: []
    };
  },
  watch: {
    annotations: function annotations() {
      this.paths = this.annotations.paths;
      this.refresh();
    }
  },
  computed: Object(objectSpread2["a" /* default */])({
    effectiveLineWidth: function effectiveLineWidth() {
      return this.lineWidth + (this.annotationsColor === 'erase' ? 15 : 0);
    },
    annotations: function annotations() {
      return this.getAnnotations(this.pageNumber);
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['annotationsActive', 'annotationsColor', 'getAnnotations', 'pageNumber'])),
  mounted: function mounted() {
    var _this = this;

    if (this.$refs.canvas.getContext) this.context = this.$refs.canvas.getContext('2d');
    this.onResize();
    this.$refs.canvas.addEventListener('pointermove', function (e) {
      _this.cursor = {
        x: e.clientX,
        y: e.clientY
      };

      if (e.buttons === 1 && _this.annotationsColor !== 'erase') {
        // left click
        _this.addPath({
          from: {
            x: e.clientX - e.movementX,
            y: e.clientY - e.movementY
          },
          to: {
            x: e.clientX,
            y: e.clientY
          },
          color: _this.annotationsColor,
          width: Math.round(_this.lineWidth)
        });
      } else if (e.buttons === 1) {
        var dist = function dist(point) {
          return Math.sqrt(Math.pow(point.x - e.clientX, 2) + Math.pow(point.y - e.clientY, 2));
        };

        _this.paths = _this.paths.filter(function (p) {
          return dist(p.from) > _this.effectiveLineWidth / 2;
        }).filter(function (p) {
          return dist(p.to) > _this.effectiveLineWidth / 2;
        });
      }

      _this.refresh();
    });
    this.$refs.canvas.addEventListener('wheel', function (e) {
      _this.lineWidth *= 1 + e.deltaY / 100;
      _this.lineWidth = Math.min(Math.max(_this.lineWidth, 1), 30);

      _this.refresh();
    });
    this.$refs.canvas.addEventListener('pointerleave', function (e) {
      _this.cursor = null;

      _this.updateStore();

      _this.refresh();
    });
    this.$refs.canvas.addEventListener('pointercancel', function (e) {
      _this.cursor = null;

      _this.updateStore();

      _this.refresh();
    });
    this.$refs.canvas.addEventListener('pointerup', function (e) {
      _this.updateStore();
    });
  },
  methods: {
    onResize: function onResize() {
      // canvas size can be only increased
      this.width = Math.max(this.$el.offsetWidth, this.width);
      this.height = Math.max(this.$el.offsetHeight, this.height);

      if (this.$refs.canvas) {
        this.$refs.canvas.width = this.width;
        this.$refs.canvas.height = this.height;
      }

      this.refresh();
    },
    plotPath: function plotPath(path) {
      this.context.beginPath();
      this.context.moveTo(path.from.x, path.from.y);
      this.context.lineTo(path.to.x, path.to.y);
      this.context.lineWidth = path.width;
      this.context.strokeStyle = path.color;
      this.context.stroke(); // ends

      if (path.width > 2) {
        this.context.beginPath();
        this.context.fillStyle = path.color;
        this.context.arc(path.from.x, path.from.y, Math.floor(path.width / 2), 0, 2 * Math.PI);
        this.context.arc(path.to.x, path.to.y, Math.floor(path.width / 2), 0, 2 * Math.PI);
        this.context.fill();
      }
    },
    plotCursor: function plotCursor() {
      if (!this.cursor || !this.annotationsActive) return;
      this.context.beginPath();
      this.context.fillStyle = this.annotationsColor === 'erase' ? 'white' : this.annotationsColor;
      this.context.arc(this.cursor.x, this.cursor.y, this.effectiveLineWidth / 2, 0, 2 * Math.PI);
      this.context.fill();

      if (this.annotationsColor === 'erase') {
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'black';
        this.context.stroke();
      }
    },
    refresh: function refresh() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.paths.forEach(this.plotPath);
      this.plotCursor();
    },
    splitPath: function splitPath(path) {
      var dist = Math.sqrt(Math.pow(path.from.x - path.to.x, 2) + Math.pow(path.from.y - path.to.y, 2));
      var k = Math.ceil(dist / 10); // div by max size for a one segment in px

      if (k <= 1) return [path];
      var diff = {
        x: (path.to.x - path.from.x) / k,
        y: (path.to.y - path.from.y) / k
      };
      var paths = [];

      for (var i = 0; i < k; i++) {
        paths.push({
          from: {
            x: path.from.x + diff.x * i,
            y: path.from.y + diff.y * i
          },
          to: {
            x: path.from.x + diff.x * (i + 1),
            y: path.from.y + diff.y * (i + 1)
          },
          color: path.color,
          width: path.width
        });
      }

      return paths;
    },
    addPath: function addPath(path) {
      this.paths = [].concat(Object(toConsumableArray["a" /* default */])(this.paths), Object(toConsumableArray["a" /* default */])(this.splitPath(path)));
    },
    updateStore: function updateStore() {
      this.$store.commit('setAnnotations', Object.assign({}, this.annotations, {
        paths: this.paths
      }));
    }
  },
  directives: {
    resize: Vueresize_default.a
  }
});
// CONCATENATED MODULE: ./src/components/Annotations.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Annotationsvue_type_script_lang_js_ = (Annotationsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Annotations.vue?vue&type=style&index=0&lang=css&
var Annotationsvue_type_style_index_0_lang_css_ = __webpack_require__("8dd3");

// CONCATENATED MODULE: ./src/components/Annotations.vue






/* normalize component */

var Annotations_component = Object(componentNormalizer["a" /* default */])(
  components_Annotationsvue_type_script_lang_js_,
  Annotationsvue_type_template_id_71f0f118_render,
  Annotationsvue_type_template_id_71f0f118_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Annotations = (Annotations_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4e464a2c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PagesBar.vue?vue&type=template&id=fb6439ba&
var PagesBarvue_type_template_id_fb6439ba_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"pages-bar"},[_vm._l((_vm.pages),function(i){return _c('div',{key:i,staticClass:"page-button",class:{ active: _vm.pageNumber === i },style:(_vm.scrollStyle),on:{"click":function($event){return _vm.setPageNumber(i)}}},[_c('div',{staticClass:"left-triangle"}),_c('div',{staticClass:"content"},[_vm._v(" Page "+_vm._s(i)+" ")]),_c('div',{staticClass:"right-triangle"})])}),_c('div',{staticClass:"page-button",style:(_vm.scrollStyle),on:{"click":function($event){_vm.n += 1}}},[_c('div',{staticClass:"left-triangle"}),_c('div',{staticClass:"content"},[_c('font-awesome-icon',{attrs:{"icon":"plus"}})],1),_c('div',{staticClass:"right-triangle"})])],2)}
var PagesBarvue_type_template_id_fb6439ba_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/PagesBar.vue?vue&type=template&id=fb6439ba&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PagesBar.vue?vue&type=script&lang=js&




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

/* harmony default export */ var PagesBarvue_type_script_lang_js_ = ({
  name: 'PagesBar',
  data: function data() {
    return {
      n: 1,
      scroll: 0
    };
  },
  computed: Object(objectSpread2["a" /* default */])({
    maxPages: function maxPages() {
      return Math.max(this.n, this.lastPage + 1, this.lastPageAnnotations + 1);
    },
    pages: function pages() {
      return Object(toConsumableArray["a" /* default */])(Array(this.maxPages).keys());
    },
    scrollStyle: function scrollStyle() {
      return {
        left: this.boundedScroll + 'px'
      };
    },
    boundedScroll: function boundedScroll() {
      if (!this.$el) return this.scroll;
      var scroll = Math.min(0, this.scroll);
      return Math.max(-1 * this.$el.scrollWidth + this.$el.offsetWidth, scroll);
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['lastPage', 'pageNumber', 'lastPageAnnotations'])),
  methods: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["d" /* mapMutations */])(['setPageNumber'])),
  mounted: function mounted() {
    var _this = this;

    this.$el.addEventListener('wheel', function (e) {
      var diff = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      _this.scroll -= diff * 1.3;
    });
  }
});
// CONCATENATED MODULE: ./src/components/PagesBar.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PagesBarvue_type_script_lang_js_ = (PagesBarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/PagesBar.vue?vue&type=style&index=0&lang=css&
var PagesBarvue_type_style_index_0_lang_css_ = __webpack_require__("5ea2");

// CONCATENATED MODULE: ./src/components/PagesBar.vue






/* normalize component */

var PagesBar_component = Object(componentNormalizer["a" /* default */])(
  components_PagesBarvue_type_script_lang_js_,
  PagesBarvue_type_template_id_fb6439ba_render,
  PagesBarvue_type_template_id_fb6439ba_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PagesBar = (PagesBar_component.exports);
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
    WelcomeScreen: WelcomeScreen,
    Annotations: Annotations,
    PagesBar: PagesBar
  },
  data: function data() {
    return {
      settingsVisible: false,
      fullscreenSlot: null,
      displayWelcomeScreen: true
    };
  },
  watch: {
    waitingParamsCorrect: function waitingParamsCorrect(newValue) {
      if (newValue.length === 0) return;
      this.$store.commit('removeParamsFromWaitingList', newValue[0]);
    },
    globalParams: function globalParams() {
      this.$store.dispatch('globalParamsUpdated');
    }
  },
  computed: Object(objectSpread2["a" /* default */])({
    welcomeScreenVisible: function welcomeScreenVisible() {
      return this.displayWelcomeScreen && !this.isElementClosed('welcome-screen');
    }
  }, Object(vuex_esm["c" /* mapGetters */])(['visibleSlots', 'preview', 'isElementClosed', 'waitingParamsCorrect', 'waitingParamsConflicts', 'recentSessions', 'globalParams'])),
  created: function created() {
    var _this = this;

    console.log({"time":1600733678400,"branch":"master","commit":"7510caab09db18c7514b798f58dc6d005a28191c","buildurl":"https://travis-ci.org/ModelOriented/Arena/builds/729164135"}); // eslint-disable-next-line no-unused-expressions

    Promise.all(/* import() */[__webpack_require__.e("chunk-6728a27e"), __webpack_require__.e("chunk-42c51506")]).then(__webpack_require__.bind(null, "efa2"));
    this.$store.dispatch('init').then(function () {
      var dataURL = new URLSearchParams(window.location.search).get('data');
      var demo = new URLSearchParams(window.location.search).get('demo');
      var sessionUUID = new URLSearchParams(window.location.search).get('session_uuid');
      var sessionURL = new URLSearchParams(window.location.search).get('session');
      var debug = new URLSearchParams(window.location.search).get('debug');
      var githubCode = new URLSearchParams(window.location.search).get('code');
      var githubState = new URLSearchParams(window.location.search).get('state');
      var peerServer = new URLSearchParams(window.location.search).get('peer_server');

      if (debug) {
        _this.$store.commit('setDebug', true);
      }

      if (githubCode && githubState) {
        _this.$http.get(config.githubAuthorizeServer + '?code=' + githubCode + '&state=' + githubState).then(function (response) {
          var token = response.body;

          _this.$store.dispatch('loadGithubToken', token).then(function () {
            return window.close();
          });
        }).catch(console.error);
      }

      if (peerServer) {
        _this.$store.dispatch('initPeerClient', peerServer);
      }

      if (demo) {
        try {
          var nr = Number.parseInt(demo);
          dataURL = config.examples[nr].url;
          sessionURL = config.examples[nr].session;
        } catch (e) {
          console.error('Failed to load demo', e);
        }
      }

      if (sessionURL) {
        _this.$store.dispatch('loadSessionURL', sessionURL).catch(console.error);

        _this.displayWelcomeScreen = false;
      } else if (sessionUUID) {
        var session = _this.recentSessions.find(function (s) {
          return s.uuid === sessionUUID;
        });

        if (session) {
          _this.$store.dispatch('importSession', session);

          _this.displayWelcomeScreen = false;
        }
      } else if (dataURL) {
        _this.$store.dispatch('loadURL', dataURL).catch(console.error);

        _this.displayWelcomeScreen = false;
      }

      if (!localStorage.getItem('disableTelemetry')) {
        if (!config.telemetryServer) return;

        _this.$http.post(config.telemetryServer + '/session', {
          application: 'Arena',
          application_version: {"time":1600733678400,"branch":"master","commit":"7510caab09db18c7514b798f58dc6d005a28191c","buildurl":"https://travis-ci.org/ModelOriented/Arena/builds/729164135"}.branch,
          data: JSON.stringify({
            commit: {"time":1600733678400,"branch":"master","commit":"7510caab09db18c7514b798f58dc6d005a28191c","buildurl":"https://travis-ci.org/ModelOriented/Arena/builds/729164135"}.commit,
            startDemo: !!demo,
            startEmpty: _this.displayWelcomeScreen,
            windowWidth: _this.$el.offsetWidth,
            windowHeight: _this.$el.offsetHeight
          })
        }).then(function (response) {
          if (typeof response.body === 'string' || response.body instanceof String) _this.$store.commit('setTelemetryUUID', response.body);
        }).catch(console.error);
      }

      window.addEventListener('storage', function (e) {
        if (e.key === 'append' && e.newValue) _this.$store.dispatch('loadURL', e.newValue).catch(console.error);
        if (e.key === 'githubToken' && e.newValue) _this.$store.dispatch('loadGithubToken', e.newValue).catch(console.error);
      });
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
  Appvue_type_template_id_10c1b71a_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (App_component.exports);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find-index.js
var es_array_find_index = __webpack_require__("c740");

// CONCATENATED MODULE: ./src/store/params.js






























var params_state = {
  globalParams: {},
  nameConflicts: [],
  manualColors: config.scopes.reduce(function (acu, scope) {
    return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, acu), {}, Object(defineProperty["a" /* default */])({}, scope, {}));
  }, {}),
  waitingParams: [],
  translations: []
};
var params_getters = {
  getSlotFullParams: function getSlotFullParams(state, getters) {
    return function (localParams) {
      return localParams.map(function (p) {
        return Object.assign({}, getters.globalParams, p);
      });
    };
  },
  getGlobalParam: function getGlobalParam(state, getters) {
    return function (paramType) {
      if (state.globalParams[paramType]) return state.globalParams[paramType];
      if (getters.availableParams[paramType] && getters.availableParams[paramType].length > 0) return getters.availableParams[paramType][0];
      return null;
    };
  },
  globalParams: function globalParams(state, getters) {
    return config.params.reduce(function (acu, paramType) {
      acu[paramType] = getters.getGlobalParam(paramType);
      return acu;
    }, {});
  },
  availableParams: function availableParams(state, getters) {
    return config.params.reduce(function (acu, paramType) {
      acu[paramType] = Object(toConsumableArray["a" /* default */])(new Set(getters.dataSources.map(function (ds) {
        return getters[ds + '/availableParams'][paramType];
      }).flat()));
      return acu;
    }, {});
  },
  nextNameConflicts: function nextNameConflicts(state) {
    return state.nameConflicts.length > 0 ? state.nameConflicts[0] : null;
  },
  scopesColors: function scopesColors(state, getters) {
    return config.scopes.reduce(function (acu, scope) {
      return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, acu), {}, Object(defineProperty["a" /* default */])({}, scope, getters.getScopeColors(scope)));
    }, {});
  },
  getScopeColors: function getScopeColors(state, getters) {
    return function (scope) {
      var colors = _palette.slice(0);

      var defaultColors = getters.availableParams[scope].reduce(function (acc, m) {
        acc[m] = colors.shift() || params_color.h;
        return acc;
      }, {});
      return Object.assign({}, defaultColors, state.manualColors[scope]);
    };
  },
  manualColors: function manualColors(state) {
    return state.manualColors;
  },
  palette: function palette(state, getters) {
    return _palette;
  },
  translations: function translations(state) {
    return state.translations.reduce(function (acu, t) {
      acu[t.uuid] = t.params;
      return acu;
    }, {});
  },

  /* For collision checks only */
  simplifiedNames: function simplifiedNames(state, getters) {
    return streams.mapChildren(getters.availableParams, format.simplify);
  },

  /* Returns if rename input for source specified by uuid is correct. */
  isRenameCorrect: function isRenameCorrect(state, getters) {
    return function (uuid, paramType, paramName) {
      if (!paramName || !uuid) return false;
      var simplified = format.simplify(paramName); // if new name already is used

      if (getters.simplifiedNames[paramType].includes(simplified)) return false;
      var translations = ((getters.translations[uuid] || {}).params || {})[paramType] || {}; // if user already used that name in translation for waiting params

      if (Object.entries(translations).find(function (_ref) {
        var _ref2 = Object(slicedToArray["a" /* default */])(_ref, 2),
            from = _ref2[0],
            to = _ref2[1];

        return format.simplify(to) === simplified && from !== paramName;
      })) return false;
      return true;
    };
  },
  waitingParamsConflicts: function waitingParamsConflicts(state, getters) {
    return state.waitingParams.map(function (wp) {
      var result = {
        uuid: wp.uuid,
        params: {}
      };
      var params = wp.params;
      config.params.forEach(function (paramType) {
        if (!params[paramType]) return; // Get translations object for given source and param type

        var translations = (getters.translations[wp.uuid] || {})[paramType] || {};
        var conflicts = [];
        params[paramType].forEach(function (name) {
          var translated = translations[name];
          var conflictedIndex = getters.simplifiedNames[paramType].indexOf(format.simplify(translated || name));
          if (conflictedIndex === -1) return;
          var conflicted = getters.availableParams[paramType][conflictedIndex];
          if (translated === conflicted) return; // merged to already existing

          conflicts.push({
            paramName: name,
            conflictedWith: conflicted
          });
        });
        if (conflicts.length > 0) result.params[paramType] = conflicts;
      });
      return result;
    });
  },
  waitingParamsCorrect: function waitingParamsCorrect(state, getters) {
    return getters.waitingParamsConflicts.filter(function (result) {
      return Object.keys(result.params).length === 0;
    }).map(function (result) {
      return result.uuid;
    });
  },
  canPublishParams: function canPublishParams(state, getters) {
    return function (uuid) {
      return !state.waitingParams.find(function (wp) {
        return wp.uuid === uuid;
      });
    };
  }
};
var mutations = {
  setGlobalParam: function setGlobalParam(state, _ref3) {
    var name = _ref3.name,
        value = _ref3.value;
    vue_runtime_esm["a" /* default */].set(state.globalParams, name, value);
  },
  addNameConflictsToResolve: function addNameConflictsToResolve(state, toResolve) {
    vue_runtime_esm["a" /* default */].set(state, 'nameConflicts', [].concat(Object(toConsumableArray["a" /* default */])(state.nameConflicts), [toResolve]));
  },
  removeNameConflicts: function removeNameConflicts(state) {
    vue_runtime_esm["a" /* default */].set(state, 'nameConflicts', state.nameConflicts.slice(1));
  },
  setColor: function setColor(state, _ref4) {
    var scope = _ref4.scope,
        paramName = _ref4.paramName,
        color = _ref4.color;
    vue_runtime_esm["a" /* default */].set(state.manualColors[scope], paramName, color);
  },
  loadManualColors: function loadManualColors(stete, manualColors) {
    var colors = config.scopes.reduce(function (acu, scope) {
      return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, acu), {}, Object(defineProperty["a" /* default */])({}, scope, manualColors[scope] || {}));
    }, {});
    vue_runtime_esm["a" /* default */].set(params_state, 'manualColors', colors);
  },
  removeParamsFromWaitingList: function removeParamsFromWaitingList(state, uuid) {
    vue_runtime_esm["a" /* default */].set(state, 'waitingParams', state.waitingParams.filter(function (wp) {
      return wp.uuid !== uuid;
    }));
  },
  addWaitingParams: function addWaitingParams(state, _ref5) {
    var params = _ref5.params,
        uuid = _ref5.uuid;
    vue_runtime_esm["a" /* default */].set(state, 'waitingParams', [].concat(Object(toConsumableArray["a" /* default */])(state.waitingParams), [{
      params: params,
      uuid: uuid
    }]));
  },
  addTranslations: function addTranslations(state, translation) {
    // Get already existing translation for same source
    var currentTranslations = state.translations.find(function (t) {
      return t.uuid === translation.uuid;
    }) || {
      params: {}
    };
    var newTranslations = {
      uuid: translation.uuid,
      params: {}
    };
    config.params.forEach(function (paramType) {
      // apply new translations over the old one
      newTranslations.params[paramType] = Object.assign({}, currentTranslations.params[paramType], translation.params[paramType]); // check if translations are unique, if not, then abort for that paramType

      var uniqueTranslations = new Set(Object.values(newTranslations.params[paramType]).map(format.simplify));
      if (uniqueTranslations.size < Object.keys(newTranslations.params[paramType]).length) newTranslations.params[paramType] = currentTranslations.params[paramType] || {};
    });
    vue_runtime_esm["a" /* default */].set(state, 'translations', [].concat(Object(toConsumableArray["a" /* default */])(state.translations.filter(function (t) {
      return t.uuid !== translation.uuid;
    })), [newTranslations]));
  },
  clearTranslations: function clearTranslations(state) {
    vue_runtime_esm["a" /* default */].set(state, 'translations', []);
  }
};
var actions = {
  /*
   * Method called from data sources to check if there are name collisions
   * of params and resolve them.
   * @return Promise with object in which keys are uuids of params that should be replaced
   * by keys' value
   */
  removeNameConflicts: function removeNameConflicts(_ref6, params) {
    var commit = _ref6.commit,
        getters = _ref6.getters;
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
  }
};
/* harmony default export */ var store_params = ({
  state: params_state,
  getters: params_getters,
  mutations: mutations,
  actions: actions,
  namespaced: false
});
var params_color = {
  a: '#8bdcbe',
  b: '#f05a71',
  c: '#371ea3',
  d: '#46bac2',
  e: '#ae2c87',
  f: '#ffa58c',
  g: '#4378bf',
  h: '#160e3b'
};
var _palette = [params_color.a, params_color.b, params_color.g, params_color.d, params_color.e, params_color.f, params_color.c, params_color.h];
// CONCATENATED MODULE: ./src/store/slots.js












var slots_state = {
  slots: [],
  pageNumber: 0,
  slotsInitInformation: [],
  // contains information required to open new slot in drag mode
  preview: null
};
var slots_getters = {
  pageNumber: function pageNumber(state) {
    return state.pageNumber;
  },
  preview: function preview(state) {
    return state.preview;
  },
  getAvailableSlots: function getAvailableSlots(state, getters) {
    return function (params, scope) {
      // for auxilary params overwrite null with global params
      var fullParams = Object.assign({}, getters.globalParams, params);
      var slots = [];
      getters.dataSources.forEach(function (ds) {
        slots = slots.concat(getters[ds + '/getAvailableSlots'](fullParams, scope));
      });
      slots = slots.map(function (s) {
        return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, s), {}, {
          uuid: v4_default()(),
          archived: false,
          positionX: 0,
          positionY: 0,
          width: 512,
          height: 384,
          scope: scope,
          pageNumber: getters.pageNumber,
          customData: null
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
  lastPage: function lastPage(state) {
    var _Math$max;

    return (_Math$max = Math.max).call.apply(_Math$max, [null].concat(Object(toConsumableArray["a" /* default */])(state.slots.map(function (s) {
      return s.pageNumber;
    }))));
  },
  getSlotInitInfo: function getSlotInitInfo(state) {
    return function (slot) {
      return state.slotsInitInformation.find(function (x) {
        return x.uuid === slot.uuid;
      });
    };
  }
};
var slots_mutations = {
  setPageNumber: function setPageNumber(state, n) {
    state.pageNumber = n;
  },
  addSlot: function addSlot(state, slot) {
    if (!slot.uuid) vue_runtime_esm["a" /* default */].set(slot, 'uuid', v4_default()());
    if (slot.archived === undefined) vue_runtime_esm["a" /* default */].set(slot, 'archived', false);
    if (slot.positionX === undefined) vue_runtime_esm["a" /* default */].set(slot, 'positionX', 0);
    if (slot.positionY === undefined) vue_runtime_esm["a" /* default */].set(slot, 'positionY', 0);
    if (slot.width === undefined) vue_runtime_esm["a" /* default */].set(slot, 'width', 512);
    if (slot.height === undefined) vue_runtime_esm["a" /* default */].set(slot, 'height', 384);
    if (slot.pageNumber === undefined) vue_runtime_esm["a" /* default */].set(slot, 'pageNumber', state.pageNumber);
    if (slot.customData === undefined) vue_runtime_esm["a" /* default */].set(slot, 'customData', null);
    state.slots = [].concat(Object(toConsumableArray["a" /* default */])(state.slots), [slot]);
  },
  clearSlots: function clearSlots(state) {
    vue_runtime_esm["a" /* default */].set(state, 'slots', []);
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
  addSlotInitInfo: function addSlotInitInfo(state, _ref) {
    var slot = _ref.slot,
        info = _ref.info;
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
        pageNumber: slot.pageNumber,
        scope: slot.scope,
        customData: slot.customData
      };
    });
    state.slots = [].concat(Object(toConsumableArray["a" /* default */])(state.slots.filter(function (s) {
      return s.uuid !== slot.uuid;
    })), Object(toConsumableArray["a" /* default */])(newSlots));
  },
  setSlotName: function setSlotName(state, _ref2) {
    var slot = _ref2.slot,
        name = _ref2.name;
    if (!name || name.length === 0) return;
    vue_runtime_esm["a" /* default */].set(slot, 'name', name);
  },
  setSlotPosition: function setSlotPosition(state, _ref3) {
    var slot = _ref3.slot,
        x = _ref3.x,
        y = _ref3.y;
    vue_runtime_esm["a" /* default */].set(slot, 'positionX', x);
    vue_runtime_esm["a" /* default */].set(slot, 'positionY', y);
  },
  setSlotSize: function setSlotSize(state, _ref4) {
    var slot = _ref4.slot,
        width = _ref4.width,
        height = _ref4.height;
    vue_runtime_esm["a" /* default */].set(slot, 'width', width);
    vue_runtime_esm["a" /* default */].set(slot, 'height', height);
  },
  mergeSlots: function mergeSlots(state, _ref5) {
    var slot1 = _ref5.slot1,
        slot2 = _ref5.slot2;
    if (slot1.uuid === slot2.uuid) return;
    slot1.localParams = [].concat(Object(toConsumableArray["a" /* default */])(slot1.localParams), Object(toConsumableArray["a" /* default */])(slot2.localParams));
    state.slots = state.slots.filter(function (s) {
      return s.uuid !== slot2.uuid;
    });
  },
  setParam: function setParam(state, _ref6) {
    var slot = _ref6.slot,
        paramName = _ref6.paramName,
        paramValue = _ref6.paramValue;
    slot.localParams = slot.localParams.map(function (params) {
      return Object.assign({}, params, Object(defineProperty["a" /* default */])({}, paramName, paramValue));
    });
  },
  unsetParam: function unsetParam(state, _ref7) {
    var slot = _ref7.slot,
        paramName = _ref7.paramName;
    slot.localParams = slot.localParams.map(function (params) {
      var copy = Object(objectSpread2["a" /* default */])({}, params);

      delete copy[paramName];
      return copy;
    });
  },
  replaceSlots: function replaceSlots(state, _ref8) {
    var slot1 = _ref8.slot1,
        slot2 = _ref8.slot2;
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
  setSlotCustomData: function setSlotCustomData(state, _ref9) {
    var slot = _ref9.slot,
        customData = _ref9.customData;
    vue_runtime_esm["a" /* default */].set(slot, 'customData', customData);
  }
};
var slots_actions = {
  /*
   * Method called to add slot or unarchive it
   * To make slot open in drag mode over button that was pressed to open it, set interaction and x, y params
   * @param interaction interaction object from interactjs event of pressing button etc
   * @param x left position of slot center
   * @param y top position of slot center
   * @example dispatch('addSlotToPlayground', { slot, interaction: event.interaction, x: event.pageX, y: event.pageY })
   */
  addSlotToPlayground: function addSlotToPlayground(_ref10, _ref11) {
    var commit = _ref10.commit,
        getters = _ref10.getters;
    var slot = _ref11.slot,
        interaction = _ref11.interaction,
        x = _ref11.x,
        y = _ref11.y;
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
  },
  arrangeSlots: function arrangeSlots(_ref12) {
    var commit = _ref12.commit,
        getters = _ref12.getters;
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
  refreshSlots: function refreshSlots(_ref13) {
    var commit = _ref13.commit,
        getters = _ref13.getters;
    var n = getters.pageNumber;
    commit('setPageNumber', -1);
    vue_runtime_esm["a" /* default */].nextTick(function () {
      return commit('setPageNumber', n);
    });
  }
};
/* harmony default export */ var store_slots = ({
  state: slots_state,
  getters: slots_getters,
  mutations: slots_mutations,
  actions: slots_actions,
  namespaced: false
});
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("53ca");

// EXTERNAL MODULE: ./node_modules/ajv/lib/ajv.js
var ajv = __webpack_require__("783b");
var ajv_default = /*#__PURE__*/__webpack_require__.n(ajv);

// CONCATENATED MODULE: ./src/store/datasources/dataSourceCommon.js

















var dataSourceCommon_state = function state() {
  return {
    sources: []
  };
};

var dataSourceCommon_getters = {
  availableParams: function availableParams(state, getters) {
    return getters.sources.reduce(function (acu, s) {
      config.params.forEach(function (paramType) {
        acu[paramType] = [].concat(Object(toConsumableArray["a" /* default */])(acu[paramType]), Object(toConsumableArray["a" /* default */])(getters.translatedAvailableParams[s.uuid][paramType] || []));
      });
      return acu;
    }, streams.createObjectWithArrays(config.params));
  },
  translatedAvailableParams: function translatedAvailableParams(state, getters, rootState, rootGetters) {
    return state.sources.reduce(function (acu, s) {
      acu[s.uuid] = {};
      config.params.forEach(function (paramType) {
        var translation = (rootGetters.translations[s.uuid] || {})[paramType] || {};
        acu[s.uuid][paramType] = s.availableParams[paramType].map(function (paramName) {
          return translation[paramName] || paramName;
        });
      });
      return acu;
    }, {});
  },
  translateIfPossible: function translateIfPossible(state, getters, rootState, rootGetters) {
    return function (uuid, paramType, paramName) {
      return ((rootGetters.translations[uuid] || {})[paramType] || {})[paramName] || paramName;
    };
  },
  // Published sources
  sources: function sources(state, getters, rootState, rootGetters) {
    return state.sources.filter(function (s) {
      return rootGetters.canPublishParams(s.uuid);
    });
  },
  validateParams: function validateParams(state, getters, rootState, rootGetters) {
    return function (source, fullParams) {
      if (!rootGetters.canPublishParams(source.uuid)) return {};
      return config.params.reduce(function (acu, paramType) {
        acu[paramType] = getters.translatedAvailableParams[source.uuid][paramType].includes(fullParams[paramType]) ? fullParams[paramType] : null;
        return acu;
      }, {});
    };
  },
  translateBackParams: function translateBackParams(state, getters, rootState, rootGetters) {
    return function (source, fullParams) {
      if (!rootGetters.canPublishParams(source.uuid)) return {};
      return config.params.reduce(function (acu, paramType) {
        var index = getters.translatedAvailableParams[source.uuid][paramType].indexOf(fullParams[paramType]);
        acu[paramType] = index === -1 ? null : source.availableParams[paramType][index];
        return acu;
      }, {});
    };
  },
  translateParams: function translateParams(state, getters) {
    return function (source, params) {
      return Object.keys(params).reduce(function (acu, paramType) {
        acu[paramType] = getters.translateIfPossible(source.uuid, paramType, params[paramType]);
        return acu;
      }, {});
    };
  }
};
var dataSourceCommon_mutations = {
  addSource: function addSource(state, source) {
    if (!source.timestamp) vue_runtime_esm["a" /* default */].set(source, 'timestamp', new Date().getTime());
    vue_runtime_esm["a" /* default */].set(state, 'sources', [].concat(Object(toConsumableArray["a" /* default */])(state.sources), [source]));
  },
  expandSource: function expandSource(state, source) {
    if (!source.uuid) return;
    var original = state.sources.find(function (s) {
      return s.uuid === source.uuid;
    });
    if (!original) return;
    state.sources = [].concat(Object(toConsumableArray["a" /* default */])(state.sources.filter(function (s) {
      return s.uuid !== source.uuid;
    })), [Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, original), source)]);
  },
  removeSource: function removeSource(state, source) {
    vue_runtime_esm["a" /* default */].set(state, 'sources', state.sources.filter(function (s) {
      return s !== source && s.uuid !== source;
    }));
  },
  clearSources: function clearSources(state) {
    vue_runtime_esm["a" /* default */].set(state, 'sources', []);
  }
};
/* harmony default export */ var dataSourceCommon = ({
  getNew: function getNew() {
    return {
      state: dataSourceCommon_state(),
      getters: Object(objectSpread2["a" /* default */])({}, dataSourceCommon_getters),
      mutations: Object(objectSpread2["a" /* default */])({}, dataSourceCommon_mutations),
      namespaced: false
    };
  }
});
// CONCATENATED MODULE: ./src/store/datasources/jsonDatasource.js


























var jsonDatasource_ajv = new ajv_default.a();
jsonDatasource_ajv.addMetaSchema(__webpack_require__("0e0d"));
/* eslint-disable camelcase */

var validator_1_0_0 = jsonDatasource_ajv.compile(__webpack_require__("2283"));
var validator_1_1_0 = jsonDatasource_ajv.compile(__webpack_require__("c5d4"));
/* eslint-enable camelcase */

var jsonDatasource_state = {};
var jsonDatasource_getters = {
  getAvailableSlots: function getAvailableSlots(state, getters) {
    return function (fullParams, scope) {
      return getters.sources.map(function (source) {
        var params = getters.translateBackParams(source, fullParams);
        if (params[scope] === null) return [];
        return source.plotsData.filter(function (d) {
          // for each single plot data we check if params of a plot are same in fullParams
          return Object.keys(d.params).reduce(function (acc, paramType) {
            return acc && d.params[paramType] === params[paramType];
          }, true) && Object.keys(d.params).includes(scope);
        }).map(function (d) {
          return {
            localParams: [Object(defineProperty["a" /* default */])({}, scope, fullParams[scope])],
            name: d.name,
            plotType: d.plotType,
            plotCategory: d.plotCategory
          };
        });
      }).flat();
    };
  }
};
var jsonDatasource_mutations = {}; // Checks if names array have unique elements, after removing special characters and in lower case

var jsonDatasource_isUnique = function isUnique(array) {
  return new Set(array.map(format.simplify)).size === array.length;
};

var jsonDatasource_actions = {
  loadData: function loadData(_ref2, _ref3) {
    var state = _ref2.state,
        commit = _ref2.commit,
        dispatch = _ref2.dispatch,
        rootGetters = _ref2.rootGetters;
    var data = _ref3.data,
        src = _ref3.src,
        uuid = _ref3.uuid;
    var params = null;

    if (validator_1_0_0(data)) {
      params = config.params.reduce(function (acu, paramType) {
        acu[paramType] = data[paramType + 's'] || [];
        return acu;
      }, {});
    } else if (validator_1_1_0(data)) {
      params = data.availableParams;
    } else {
      return false;
    }

    if (!config.params.reduce(function (acu, p) {
      return acu && jsonDatasource_isUnique(params[p]);
    }, true)) return false;
    var source = {
      availableParams: params,
      uuid: uuid || v4_default()(),
      address: src,
      plotsData: []
    };
    data.data.forEach(function (d) {
      var obj = {
        plotType: d.plotType,
        plotCategory: d.plotCategory ? d.plotCategory : 'Other',
        plotComponent: d.plotComponent,
        name: d.name ? d.name : format.firstCharUpper(d.plotType),
        plotData: d.data,
        params: d.params
      };
      if (Object.values(obj).includes(undefined)) return;
      source.plotsData.push(obj);
    });
    var waitingParams = {
      uuid: source.uuid,
      params: source.availableParams
    };
    commit('addWaitingParams', waitingParams, {
      root: true
    });
    commit('addSource', source);
    return true;
  },
  query: function query(_ref4, _ref5) {
    var state = _ref4.state,
        getters = _ref4.getters;
    var params = _ref5.params,
        plotType = _ref5.plotType;

    var _iterator = Object(createForOfIteratorHelper["a" /* default */])(getters.sources),
        _step;

    try {
      var _loop = function _loop() {
        var source = _step.value;
        // translate params back to original names
        var queryParams = getters.translateBackParams(source, params);
        var plotData = source.plotsData.find(function (d) {
          return d.plotType === plotType && Object.keys(d.params).reduce(function (acc, paramType) {
            return acc && d.params[paramType] === queryParams[paramType];
          }, true);
        });
        if (plotData) return {
          v: Object(objectSpread2["a" /* default */])({
            params: getters.translateParams(source, plotData.params)
          }, plotData)
        };
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _ret = _loop();

        if (Object(esm_typeof["a" /* default */])(_ret) === "object") return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return null;
  },
  init: function init() {}
};
/* harmony default export */ var jsonDatasource = ({
  state: jsonDatasource_state,
  getters: jsonDatasource_getters,
  mutations: jsonDatasource_mutations,
  actions: jsonDatasource_actions,
  modules: {
    dataSourceCommon: dataSourceCommon.getNew()
  },
  namespaced: true
});
// CONCATENATED MODULE: ./src/store/datasources/arenarLiveDatasource.js





























var arenarLiveDatasource_ajv = new ajv_default.a();
arenarLiveDatasource_ajv.addMetaSchema(__webpack_require__("0e0d"));
/* eslint-disable camelcase */

var arenarLiveDatasource_validator_1_0_0 = arenarLiveDatasource_ajv.compile(__webpack_require__("8c3e"));
var arenarLiveDatasource_validator_1_1_0 = arenarLiveDatasource_ajv.compile(__webpack_require__("88ff"));
/* eslint-enable camelcase */

var arenarLiveDatasource_state = {};
var arenarLiveDatasource_getters = {
  getAvailableSlots: function getAvailableSlots(state, getters) {
    return function (fullParams, scope) {
      return getters.sources.map(function (source) {
        var params = getters.translateBackParams(source, fullParams);
        if (!params[scope]) return [];
        return source.availablePlots.filter(function (d) {
          // check if all required params are available from that source (not null in params variable)
          return d.requiredParams.reduce(function (acu, paramType) {
            return acu && params[paramType];
          }, true) && d.requiredParams.includes(scope);
        }).map(function (d) {
          return {
            plotType: d.plotType,
            plotCategory: d.plotCategory ? d.plotCategory : 'Other',
            name: d.name ? d.name : format.firstCharUpper(d.plotType),
            localParams: [Object(defineProperty["a" /* default */])({}, scope, fullParams[scope])]
          };
        });
      }).flat();
    };
  }
};
var arenarLiveDatasource_mutations = {
  addToCache: function addToCache(state, _ref2) {
    var source = _ref2.source,
        slotData = _ref2.slotData;
    vue_runtime_esm["a" /* default */].set(source, 'cache', [].concat(Object(toConsumableArray["a" /* default */])(source.cache), [slotData]));
  },
  addPendingRequest: function addPendingRequest(state, _ref3) {
    var source = _ref3.source,
        pendingRequest = _ref3.pendingRequest;
    vue_runtime_esm["a" /* default */].set(source, 'pendingRequests', [].concat(Object(toConsumableArray["a" /* default */])(source.pendingRequests), [pendingRequest]));
  },
  removePendingRequest: function removePendingRequest(state, _ref4) {
    var source = _ref4.source,
        pendingRequest = _ref4.pendingRequest;
    vue_runtime_esm["a" /* default */].set(source, 'pendingRequests', source.pendingRequests.filter(function (w) {
      return w !== pendingRequest;
    }));
  }
}; // Checks if names array have unique elements, after removing special characters and in lower case

var arenarLiveDatasource_isUnique = function isUnique(array) {
  return new Set(array.map(format.simplify)).size === array.length;
};

var arenarLiveDatasource_actions = {
  loadData: function loadData(_ref5, _ref6) {
    var state = _ref5.state,
        commit = _ref5.commit,
        dispatch = _ref5.dispatch,
        rootGetters = _ref5.rootGetters;
    var data = _ref6.data,
        src = _ref6.src,
        uuid = _ref6.uuid;
    var params = null;

    if (arenarLiveDatasource_validator_1_0_0(data)) {
      params = config.params.reduce(function (acu, paramType) {
        acu[paramType] = data[paramType + 's'] || [];
        return acu;
      }, {});
    } else if (arenarLiveDatasource_validator_1_1_0(data)) {
      params = data.availableParams;
    } else {
      return false;
    }

    if (!config.params.reduce(function (acu, p) {
      return acu && arenarLiveDatasource_isUnique(params[p]);
    }, true)) return false;
    var source = {
      availableParams: params,
      availablePlots: data.availablePlots,
      uuid: uuid || v4_default()(),
      address: src,
      timestamp: data.timestamp,
      cache: [],
      pendingRequests: []
    };
    var waitingParams = {
      uuid: source.uuid,
      params: source.availableParams
    };
    commit('addWaitingParams', waitingParams, {
      root: true
    });
    commit('addSource', source);
    return true;
  },
  query: function query(_ref7, _ref8) {
    var state = _ref7.state,
        commit = _ref7.commit,
        getters = _ref7.getters;
    var params = _ref8.params,
        plotType = _ref8.plotType;

    var _iterator = Object(createForOfIteratorHelper["a" /* default */])(getters.sources),
        _step;

    try {
      var _loop = function _loop() {
        var source = _step.value;
        // translate params back to original names
        var queryParams = getters.translateBackParams(source, params); // for each source we find required params for plotType

        var plotProperties = source.availablePlots.find(function (p) {
          return p.plotType === plotType;
        });
        if (!plotProperties) return "continue"; // check if all required params are not null

        if (!plotProperties.requiredParams.reduce(function (acu, plotType) {
          return acu && queryParams[plotType];
        }, true)) return "continue";
        queryParams = plotProperties.requiredParams.reduce(function (acu, plotType) {
          acu[plotType] = queryParams[plotType];
          return acu;
        }, {}); // check if response for same query is not cached

        var cached = source.cache.find(function (c) {
          return c.plotType === plotType && es6_default()(c.params, queryParams);
        });
        if (cached) return {
          v: cached
        }; // check it there is already pending request for same query

        var pendingRequest = source.pendingRequests.find(function (w) {
          return w.plotType === plotType && es6_default()(w.params, queryParams);
        });
        if (pendingRequest) return {
          v: pendingRequest.promise
        };
        return {
          v: new Promise(function (resolve, reject) {
            var pendingRequest = {
              promise: null,
              resolve: null,
              reject: null,
              params: queryParams,
              plotType: plotType
            };
            var pendingRequestPromise = new Promise(function (resolve, reject) {
              pendingRequest.resolve = resolve;
              pendingRequest.reject = reject; // To make sure promise parameter is already set

              if (pendingRequest.promise) commit('addPendingRequest', {
                source: source,
                pendingRequest: pendingRequest
              });
            });
            pendingRequest.promise = pendingRequestPromise;
            if (pendingRequest.resolve) commit('addPendingRequest', {
              source: source,
              pendingRequest: pendingRequest
            });
            var queryString = Object.entries(queryParams).map(function (e) {
              return e.map(encodeURIComponent).join('=');
            }).join('&');
            vue_runtime_esm["a" /* default */].http.get(source.address + plotType + '?' + queryString).then(function (respone) {
              var data = respone.body;
              var slotData = {
                plotType: plotType,
                params: getters.translateParams(source, queryParams),
                plotData: data.data,
                plotComponent: data.plotComponent
              };
              commit('addToCache', {
                source: source,
                slotData: slotData
              });
              pendingRequest.resolve(slotData);
              commit('removePendingRequest', {
                source: source,
                pendingRequest: pendingRequest
              });
              resolve(slotData);
            }).catch(function (e) {
              pendingRequest.reject(e);
              reject(e);
            });
          })
        };
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _ret = _loop();

        if (_ret === "continue") continue;
        if (Object(esm_typeof["a" /* default */])(_ret) === "object") return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return null;
  },
  updateSource: function updateSource(_ref9, source) {
    var getters = _ref9.getters,
        commit = _ref9.commit,
        dispatch = _ref9.dispatch;
    vue_runtime_esm["a" /* default */].http.get(source.address).then(function (response) {
      commit('removeSource', source);
      dispatch('loadData', {
        data: response.body,
        src: source.address,
        uuid: source.uuid
      });
      dispatch('refreshSlots', null, {
        root: true
      });
    }).catch(console.error);
  },
  refresh: function refresh(_ref10) {
    var getters = _ref10.getters,
        commit = _ref10.commit,
        dispatch = _ref10.dispatch;
    getters.sources.forEach(function (source) {
      vue_runtime_esm["a" /* default */].http.get(source.address + 'timestamp').then(function (response) {
        var timestamp = response.body.timestamp;
        if (timestamp > source.timestamp) dispatch('updateSource', source);
      }).catch(console.error);
    });
  },
  init: function init(_ref11) {
    var dispatch = _ref11.dispatch;
    setInterval(function () {
      return dispatch('refresh');
    }, 5000);
  }
};
/* harmony default export */ var arenarLiveDatasource = ({
  state: arenarLiveDatasource_state,
  getters: arenarLiveDatasource_getters,
  mutations: arenarLiveDatasource_mutations,
  actions: arenarLiveDatasource_actions,
  modules: {
    dataSourceCommon: dataSourceCommon.getNew()
  },
  namespaced: true
});
// CONCATENATED MODULE: ./src/store/datasources/peerDatasource.js

























var requestCounter = 1;

var getRequestId = function getRequestId() {
  return requestCounter++;
};

var peerDatasource_state = {
  requestPromises: [],
  availableSlots: []
};
var peerDatasource_ajv = new ajv_default.a();
peerDatasource_ajv.addMetaSchema(__webpack_require__("0e0d"));
/* eslint-disable camelcase */

var validatorSession_1_0_0 = peerDatasource_ajv.compile(__webpack_require__("686f"));
var validatorSession_1_1_0 = peerDatasource_ajv.compile(__webpack_require__("b455"));
/* eslint-enable camelcase */

var peerDatasource_getters = {
  getAvailableSlots: function getAvailableSlots(state, getters) {
    return function (fullParams, scope) {
      return getters.sources.map(function (source) {
        var params = getters.translateBackParams(source, fullParams);
        if (!params[scope]) return [];
        return (getters.availableSlots.find(function (s) {
          return s.uuid === source.uuid && s.scope === scope;
        }) || {}).slots || [];
      }).flat();
    };
  },
  availableSlots: function availableSlots(state) {
    return state.availableSlots;
  },
  getRequestPromise: function getRequestPromise(state) {
    return function (id) {
      return state.requestPromises.find(function (d) {
        return d.id === id;
      });
    };
  }
};
var peerDatasource_mutations = {
  addRequestPromise: function addRequestPromise(state, data) {
    state.requestPromises = [].concat(Object(toConsumableArray["a" /* default */])(state.requestPromises), [data]);
  },
  removeRequestPromise: function removeRequestPromise(state, id) {
    state.requestPromises = state.requestPromises.filter(function (d) {
      return d.id !== id;
    });
  },
  clearAvailableSlots: function clearAvailableSlots(state) {
    vue_runtime_esm["a" /* default */].set(state, 'availableSlots', []);
  },
  addAvailableSlots: function addAvailableSlots(state, slots) {
    vue_runtime_esm["a" /* default */].set(state, 'availableSlots', [].concat(Object(toConsumableArray["a" /* default */])(state.availableSlots.filter(function (s) {
      return s.uuid !== slots.uuid || s.scope !== slots.scope;
    })), [slots]));
  },
  addToCache: function addToCache(state, _ref) {
    var source = _ref.source,
        slotData = _ref.slotData;
    vue_runtime_esm["a" /* default */].set(source, 'cache', [].concat(Object(toConsumableArray["a" /* default */])(source.cache), [slotData]));
  }
};
var peerDatasource_actions = {
  doRequest: function doRequest(_ref2, _ref3) {
    var commit = _ref2.commit,
        dispatch = _ref2.dispatch,
        rootGetters = _ref2.rootGetters;
    var request = _ref3.request,
        conn = _ref3.conn;
    request = Object(objectSpread2["a" /* default */])({
      id: getRequestId()
    }, request);
    var promise = new Promise(function (resolve, reject) {
      commit('addRequestPromise', {
        id: request.id,
        resolve: resolve,
        reject: reject
      });
      conn.send(request);
    });
    return promise;
  },
  loadData: function loadData(_ref4, _ref5) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var state, commit, dispatch, rootGetters, getters, data, uuid, conn;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref4.state, commit = _ref4.commit, dispatch = _ref4.dispatch, rootGetters = _ref4.rootGetters, getters = _ref4.getters;
              data = _ref5.data, uuid = _ref5.uuid;

              if (!(data.type !== 'peer' || !data.peerId)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", false);

            case 4:
              if (rootGetters.peer) {
                _context2.next = 7;
                break;
              }

              _context2.next = 7;
              return dispatch('initPeer', {
                root: true
              });

            case 7:
              conn = rootGetters.peer.connect(data.peerId);
              conn.on('open', function () {
                var source = {
                  availableParams: streams.createObjectWithArrays(config.params),
                  uuid: uuid || v4_default()(),
                  address: null,
                  cache: [],
                  conn: conn
                };
                commit('addSource', source);
                conn.on('close', function () {
                  return commit('remoiveSource', source.uuid);
                });
                conn.on('error', function (e) {
                  console.error(e);
                  commit('remoiveSource', source.uuid);
                });
                conn.on('data', /*#__PURE__*/function () {
                  var _ref6 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(d) {
                    var mySource, promise;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!(validatorSession_1_1_0(d) || validatorSession_1_0_0(d))) {
                              _context.next = 7;
                              break;
                            }

                            d.sources = [];
                            mySource = getters.sources.find(function (s) {
                              return s.uuid === source.uuid;
                            });
                            _context.next = 5;
                            return dispatch('importSession', d, {
                              root: true
                            });

                          case 5:
                            commit('addSource', mySource);
                            return _context.abrupt("return");

                          case 7:
                            promise = getters.getRequestPromise(d.id);

                            if (promise) {
                              _context.next = 10;
                              break;
                            }

                            return _context.abrupt("return");

                          case 10:
                            if (d.error) promise.reject(d.response);else promise.resolve(d.response);
                            commit('removeRequestPromise', d.id);

                          case 12:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref6.apply(this, arguments);
                  };
                }());
                dispatch('doRequest', {
                  conn: conn,
                  request: {
                    type: 'getParams'
                  }
                }).then(function (params) {
                  commit('expandSource', {
                    uuid: source.uuid,
                    availableParams: params
                  });
                  var waitingParams = {
                    uuid: source.uuid,
                    params: params
                  };
                  commit('addWaitingParams', waitingParams, {
                    root: true
                  });
                });
              });
              return _context2.abrupt("return", true);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  query: function query(_ref7, _ref8) {
    var state = _ref7.state,
        commit = _ref7.commit,
        getters = _ref7.getters,
        dispatch = _ref7.dispatch;
    var params = _ref8.params,
        plotType = _ref8.plotType;
    var promises = [];

    var _iterator = Object(createForOfIteratorHelper["a" /* default */])(getters.sources),
        _step;

    try {
      var _loop = function _loop() {
        var source = _step.value;
        // translate params back to original names
        var queryParams = getters.translateBackParams(source, params);
        var cached = source.cache.find(function (d) {
          return d.plotType === plotType && Object.keys(d.params).reduce(function (acc, paramType) {
            return acc && d.params[paramType] === queryParams[paramType];
          }, true);
        });
        if (cached) return {
          v: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, cached), {}, {
            params: getters.translateParams(source, cached.params)
          })
        };
        var promise = dispatch('doRequest', {
          conn: source.conn,
          request: {
            type: 'getPlot',
            params: queryParams,
            plotType: plotType
          }
        }).then(function (slotData) {
          if (slotData) commit('addToCache', {
            source: source,
            slotData: slotData
          });else return null;
          return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, slotData), {}, {
            params: getters.translateParams(source, slotData.params)
          });
        });
        promises.push(promise);
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _ret = _loop();

        if (Object(esm_typeof["a" /* default */])(_ret) === "object") return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return Promise.all(promises).then(function (list) {
      return list.find(function (x) {
        return x;
      });
    });
  },
  globalParamsUpdated: function globalParamsUpdated(_ref9) {
    var commit = _ref9.commit,
        rootGetters = _ref9.rootGetters,
        getters = _ref9.getters,
        dispatch = _ref9.dispatch;
    commit('clearAvailableSlots');
    getters.sources.forEach(function (source) {
      config.scopes.forEach(function (scope) {
        dispatch('doRequest', {
          conn: source.conn,
          request: {
            type: 'getAvailableSlots',
            params: rootGetters.globalParams,
            scope: scope
          }
        }).then(function (slots) {
          commit('addAvailableSlots', {
            uuid: source.uuid,
            scope: scope,
            slots: slots
          });
        });
      });
    });
  }
};
/* harmony default export */ var peerDatasource = ({
  state: peerDatasource_state,
  getters: peerDatasource_getters,
  mutations: peerDatasource_mutations,
  actions: peerDatasource_actions,
  modules: {
    dataSourceCommon: dataSourceCommon.getNew()
  },
  namespaced: true
});
// EXTERNAL MODULE: ./node_modules/peerjs/dist/peerjs.min.js
var peerjs_min = __webpack_require__("a0bc");
var peerjs_min_default = /*#__PURE__*/__webpack_require__.n(peerjs_min);

// CONCATENATED MODULE: ./src/store/dataSources.js

























var dataSources_ajv = new ajv_default.a();
dataSources_ajv.addMetaSchema(__webpack_require__("0e0d"));
/* eslint-disable camelcase */

var dataSources_validatorSession_1_0_0 = dataSources_ajv.compile(__webpack_require__("686f"));
var dataSources_validatorSession_1_1_0 = dataSources_ajv.compile(__webpack_require__("b455"));
/* eslint-enable camelcase */

var dataSources_state = {
  dataSources: ['jsonDatasource', 'arenarLiveDatasource', 'peerDatasource'],
  recentURLSources: [],
  recentSessions: [],
  sessionUUID: v4_default()(),
  // uuid of active session
  sessionName: '',
  sessionLastSaved: null,
  debug: false,
  tokenCallback: null,
  // promise resolve function waiting for token
  peer: null
};
var dataSources_getters = {
  dataSources: function dataSources(state) {
    return state.dataSources;
  },
  recentURLSources: function recentURLSources(state) {
    return state.recentURLSources;
  },
  sessionUUID: function sessionUUID(state) {
    return state.sessionUUID;
  },
  sessionName: function sessionName(state) {
    return state.sessionName;
  },
  sessionLastSaved: function sessionLastSaved(state) {
    return state.sessionLastSaved;
  },
  recentSessions: function recentSessions(state) {
    return state.recentSessions;
  },
  debug: function debug(state) {
    return state.debug;
  },
  tokenCallback: function tokenCallback(state) {
    return state.tokenCallback;
  },
  peer: function peer(state) {
    return state.peer;
  }
};
var dataSources_mutations = {
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
  deleteRecentSource: function deleteRecentSource(state, source) {
    vue_runtime_esm["a" /* default */].set(state, 'recentURLSources', state.recentURLSources.filter(function (s) {
      return s !== source;
    }));
    localStorage.setItem('recentURLSources', JSON.stringify({
      version: '1.0.0',
      sources: state.recentURLSources
    }));
  },
  loadRecentURLSources: function loadRecentURLSources(state, sources) {
    state.recentURLSources = sources;
  },
  setRecentSessions: function setRecentSessions(state, sessions) {
    vue_runtime_esm["a" /* default */].set(state, 'recentSessions', sessions);
  },
  setSessionName: function setSessionName(state, name) {
    vue_runtime_esm["a" /* default */].set(state, 'sessionName', name);
  },
  resetSession: function resetSession(state) {
    vue_runtime_esm["a" /* default */].set(state, 'sessionUUID', v4_default()());
    vue_runtime_esm["a" /* default */].set(state, 'sessionName', '');
    vue_runtime_esm["a" /* default */].set(state, 'sessionLastSaved', null);
  },
  setSaveTime: function setSaveTime(state, time) {
    vue_runtime_esm["a" /* default */].set(state, 'sessionLastSaved', time);
  },
  setDebug: function setDebug(state, v) {
    vue_runtime_esm["a" /* default */].set(state, 'debug', !!v);
  },
  setTokenCallback: function setTokenCallback(state, f) {
    vue_runtime_esm["a" /* default */].set(state, 'tokenCallback', f);
  },
  clearTokenCallback: function clearTokenCallback(state) {
    vue_runtime_esm["a" /* default */].set(state, 'tokenCallback', null);
  },
  setPeer: function setPeer(state, peer) {
    vue_runtime_esm["a" /* default */].set(state, 'peer', peer);
  }
};
var dataSources_actions = {
  initDataSources: function initDataSources(_ref) {
    var commit = _ref.commit,
        getters = _ref.getters,
        dispatch = _ref.dispatch;

    try {
      var validatorRecentURLSources = dataSources_ajv.compile(__webpack_require__("4e85"));
      var recentURLSources = JSON.parse(localStorage.getItem('recentURLSources'));

      if (validatorRecentURLSources(recentURLSources)) {
        commit('loadRecentURLSources', recentURLSources.sources);
      }
    } catch (e) {
      console.error('Failed to read recentURLSources from localStorage', e);
    }

    setInterval(function () {
      return dispatch('saveSession');
    }, 30 * 1000);
    dispatch('loadRecentSessions');
    window.addEventListener('storage', function (e) {
      if (e.key !== 'recentSessions' && e.newValue) return;
      dispatch('loadRecentSessions');
    });
    getters.dataSources.forEach(function (ds) {
      dispatch(ds + '/init');
    });
  },
  query: function query(_ref2, _query) {
    var dispatch = _ref2.dispatch,
        getters = _ref2.getters;
    // array of promises and raw objects (Promise.all will handle them)
    var promises = getters.dataSources.map(function (ds) {
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
  loadURL: function loadURL(_ref3, url) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var dispatch, commit, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref3.dispatch, commit = _ref3.commit;
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
  loadData: function loadData(_ref4, data) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var dispatch, getters, _iterator, _step, ds;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch = _ref4.dispatch, getters = _ref4.getters;
              _iterator = Object(createForOfIteratorHelper["a" /* default */])(getters.dataSources);
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
  exportSession: function exportSession(_ref5) {
    var getters = _ref5.getters;
    var sources = getters.dataSources.map(function (ds) {
      return getters[ds + '/sources'];
    }).flat().sort(function (a, b) {
      return a.timestamp - b.timestamp;
    }).map(function (source) {
      return {
        address: source.address,
        translations: getters.translations[source.uuid] || {},
        uuid: source.uuid
      };
    });
    var slots = getters.allSlots;
    var colors = getters.manualColors;
    var annotations = getters.annotations;
    var options = getters.allOptions;
    return {
      sources: sources,
      slots: slots,
      colors: colors,
      annotations: annotations,
      options: options,
      version: '1.1.0',
      name: getters.sessionName,
      uuid: getters.sessionUUID,
      time: new Date().getTime()
    };
  },
  importSession: function importSession(_ref6, session) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var getters, commit, dispatch, _iterator2, _step2, _loop, _ret;

      return regeneratorRuntime.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              getters = _ref6.getters, commit = _ref6.commit, dispatch = _ref6.dispatch;

              if (!dataSources_validatorSession_1_0_0(session)) {
                _context4.next = 5;
                break;
              }

              session.slots = session.slots.map(function (s) {
                return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, s), {}, {
                  scope: config.scopes[0]
                });
              });
              _context4.next = 9;
              break;

            case 5:
              if (!dataSources_validatorSession_1_1_0(session)) {
                _context4.next = 8;
                break;
              }

              _context4.next = 9;
              break;

            case 8:
              throw new Error('Invalid session file');

            case 9:
              commit('resetSession');
              getters.dataSources.forEach(function (ds) {
                return commit(ds + '/clearSources');
              });
              commit('clearTranslations');
              commit('clearOptions');
              commit('setSessionName', session.name || '');
              session.options.forEach(function (o) {
                return commit('setOption', o);
              });
              commit('loadManualColors', session.colors);
              commit('loadAnnotations', session.annotations || []);
              _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(session.sources);
              _context4.prev = 18;
              _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                var source;
                return regeneratorRuntime.wrap(function _loop$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        source = _step2.value;

                        if (source.address) {
                          _context3.next = 3;
                          break;
                        }

                        return _context3.abrupt("return", "continue");

                      case 3:
                        if (source.translations) commit('addTranslations', {
                          uuid: source.uuid,
                          params: source.translations
                        });
                        _context3.next = 6;
                        return vue_runtime_esm["a" /* default */].http.get(source.address).then(function (response) {
                          return dispatch('loadData', {
                            data: response.body,
                            src: source.address,
                            uuid: source.uuid
                          });
                        }).catch(function (e) {
                          return console.error('Failed to load source ' + source.uuid + ' from ' + source.address, e);
                        });

                      case 6:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _loop);
              });

              _iterator2.s();

            case 21:
              if ((_step2 = _iterator2.n()).done) {
                _context4.next = 28;
                break;
              }

              return _context4.delegateYield(_loop(), "t0", 23);

            case 23:
              _ret = _context4.t0;

              if (!(_ret === "continue")) {
                _context4.next = 26;
                break;
              }

              return _context4.abrupt("continue", 26);

            case 26:
              _context4.next = 21;
              break;

            case 28:
              _context4.next = 33;
              break;

            case 30:
              _context4.prev = 30;
              _context4.t1 = _context4["catch"](18);

              _iterator2.e(_context4.t1);

            case 33:
              _context4.prev = 33;

              _iterator2.f();

              return _context4.finish(33);

            case 36:
              commit('clearSlots');
              session.slots.forEach(function (slot) {
                return commit('addSlot', slot);
              });

            case 38:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3, null, [[18, 30, 33, 36]]);
    }))();
  },
  loadRecentSessions: function loadRecentSessions(_ref7) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var commit, recentSessions;
      return regeneratorRuntime.wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              commit = _ref7.commit;
              _context5.prev = 1;
              recentSessions = JSON.parse(localStorage.getItem('recentSessions'));

              if (!Array.isArray(recentSessions)) {
                _context5.next = 6;
                break;
              }

              commit('setRecentSessions', recentSessions);
              return _context5.abrupt("return", recentSessions);

            case 6:
              _context5.next = 11;
              break;

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](1);
              console.error('Failed to read recentSessions from localStorage', _context5.t0);

            case 11:
              return _context5.abrupt("return", []);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4, null, [[1, 8]]);
    }))();
  },
  saveSession: function saveSession(_ref8) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var dispatch, getters, commit, recentSessions, exported, newValue;
      return regeneratorRuntime.wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              dispatch = _ref8.dispatch, getters = _ref8.getters, commit = _ref8.commit;
              _context6.prev = 1;

              if (getters.sessionName) {
                _context6.next = 4;
                break;
              }

              return _context6.abrupt("return");

            case 4:
              _context6.next = 6;
              return dispatch('loadRecentSessions');

            case 6:
              recentSessions = _context6.sent;
              _context6.next = 9;
              return dispatch('exportSession');

            case 9:
              exported = _context6.sent;
              newValue = [].concat(Object(toConsumableArray["a" /* default */])(recentSessions.filter(function (s) {
                return s.uuid !== exported.uuid;
              })), [exported]).slice(-10);
              localStorage.setItem('recentSessions', JSON.stringify(newValue));
              commit('setRecentSessions', newValue);
              commit('setSaveTime', exported.time);
              _context6.next = 19;
              break;

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6["catch"](1);
              console.error('Failed to save session', _context6.t0);

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee5, null, [[1, 16]]);
    }))();
  },
  deleteSession: function deleteSession(_ref9, uuid) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var dispatch, commit, recentSessions, newValue;
      return regeneratorRuntime.wrap(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              dispatch = _ref9.dispatch, commit = _ref9.commit;
              _context7.prev = 1;
              _context7.next = 4;
              return dispatch('loadRecentSessions');

            case 4:
              recentSessions = _context7.sent;
              newValue = recentSessions.filter(function (s) {
                return s.uuid !== uuid;
              });
              localStorage.setItem('recentSessions', JSON.stringify(newValue));
              commit('setRecentSessions', newValue);
              _context7.next = 13;
              break;

            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](1);
              console.error('Failed to delete session from localStorage', _context7.t0);

            case 13:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee6, null, [[1, 10]]);
    }))();
  },
  authorize: function authorize(_ref10) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var commit, token;
      return regeneratorRuntime.wrap(function _callee7$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              commit = _ref10.commit;
              token = localStorage.getItem('githubToken');

              if (token) {
                _context8.next = 6;
                break;
              }

              return _context8.abrupt("return", new Promise(function (resolve, reject) {
                commit('setTokenCallback', resolve);
                window.open('https://github.com/login/oauth/authorize?client_id=' + config.githubClientId + '&state=' + v4_default()() + '&scope=gist');
              }));

            case 6:
              return _context8.abrupt("return", token);

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee7);
    }))();
  },
  shareSession: function shareSession(_ref11) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var dispatch, commit, getters, exported, token, json;
      return regeneratorRuntime.wrap(function _callee8$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              dispatch = _ref11.dispatch, commit = _ref11.commit, getters = _ref11.getters;
              _context9.next = 3;
              return dispatch('exportSession');

            case 3:
              exported = _context9.sent;
              _context9.next = 6;
              return dispatch('authorize');

            case 6:
              token = _context9.sent;
              json = JSON.stringify(exported);
              return _context9.abrupt("return", vue_runtime_esm["a" /* default */].http.post('https://api.github.com/gists', {
                public: false,
                description: exported.name || 'Arena session',
                files: {
                  'session.json': {
                    content: json
                  }
                }
              }, {
                headers: {
                  'Authorization': 'token ' + token
                }
              }).then(function (response) {
                return (((response.body || {}).files || {})['session.json'] || {}).raw_url;
              }));

            case 9:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee8);
    }))();
  },
  loadGithubToken: function loadGithubToken(_ref12, token) {
    var getters = _ref12.getters,
        commit = _ref12.commit;
    if (localStorage.getItem('githubToken') !== token) localStorage.setItem('githubToken', token);
    if (getters.tokenCallback) getters.tokenCallback(token);
    commit('clearTokenCallback');
  },
  loadSessionURL: function loadSessionURL(_ref13, url) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var dispatch, commit, response;
      return regeneratorRuntime.wrap(function _callee9$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              dispatch = _ref13.dispatch, commit = _ref13.commit;
              _context10.next = 3;
              return vue_runtime_esm["a" /* default */].http.get(url);

            case 3:
              response = _context10.sent;
              _context10.next = 6;
              return dispatch('importSession', response.body);

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee9);
    }))();
  },
  initPeer: function initPeer(_ref14) {
    var commit = _ref14.commit,
        getters = _ref14.getters;
    var peer = new peerjs_min_default.a();
    return new Promise(function (resolve, reject) {
      peer.on('open', function () {
        commit('setPeer', peer);
        resolve();
      });
      peer.on('error', function (e) {
        commit('setPeer', null);
        reject(e);
      });
      peer.on('close', function () {
        commit('setPeer', null);
      });
    });
  },
  initPeerServer: function initPeerServer(_ref15) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      var commit, getters, dispatch;
      return regeneratorRuntime.wrap(function _callee11$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              commit = _ref15.commit, getters = _ref15.getters, dispatch = _ref15.dispatch;

              if (getters.peer) {
                _context12.next = 4;
                break;
              }

              _context12.next = 4;
              return dispatch('initPeer');

            case 4:
              getters.peer.on('connection', function (conn) {
                conn.on('data', /*#__PURE__*/function () {
                  var _ref16 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(data) {
                    var parsed, response;
                    return regeneratorRuntime.wrap(function _callee10$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            _context11.prev = 0;
                            parsed = data;

                            if (!(!parsed.id || !parsed.type)) {
                              _context11.next = 4;
                              break;
                            }

                            return _context11.abrupt("return");

                          case 4:
                            response = {
                              ok: true,
                              id: parsed.id
                            };

                            if (!(parsed.type === 'getParams')) {
                              _context11.next = 9;
                              break;
                            }

                            response.response = getters.availableParams;
                            _context11.next = 19;
                            break;

                          case 9:
                            if (!(parsed.type === 'getPlot' && parsed.params && parsed.plotType)) {
                              _context11.next = 18;
                              break;
                            }

                            console.log('query request');
                            console.log(parsed);
                            _context11.next = 14;
                            return dispatch('query', {
                              params: parsed.params,
                              plotType: parsed.plotType
                            });

                          case 14:
                            response.response = _context11.sent;
                            console.log(response);
                            _context11.next = 19;
                            break;

                          case 18:
                            if (parsed.type === 'getAvailableSlots' && parsed.params && parsed.scope) {
                              response.response = getters.getAvailableSlots(parsed.params, parsed.scope);
                            } else {
                              response.ok = false;
                            }

                          case 19:
                            conn.send(response);
                            _context11.next = 25;
                            break;

                          case 22:
                            _context11.prev = 22;
                            _context11.t0 = _context11["catch"](0);
                            console.error(_context11.t0);

                          case 25:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    }, _callee10, null, [[0, 22]]);
                  }));

                  return function (_x) {
                    return _ref16.apply(this, arguments);
                  };
                }());
                conn.on('open', function () {
                  dispatch('exportSession').then(function (s) {
                    return conn.send(s);
                  }).catch(console.error);
                });
              });

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee11);
    }))();
  },
  initPeerClient: function initPeerClient(_ref17, peerId) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var commit, getters, dispatch;
      return regeneratorRuntime.wrap(function _callee12$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              commit = _ref17.commit, getters = _ref17.getters, dispatch = _ref17.dispatch;

              if (getters.peer) {
                _context13.next = 4;
                break;
              }

              _context13.next = 4;
              return dispatch('initPeer');

            case 4:
              dispatch('loadData', {
                data: {
                  type: 'peer',
                  peerId: peerId
                }
              });

            case 5:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee12);
    }))();
  },
  globalParamsUpdated: function globalParamsUpdated(_ref18) {
    var dispatch = _ref18.dispatch;
    dispatch('peerDatasource/globalParamsUpdated');
  }
};
/* harmony default export */ var dataSources = ({
  state: dataSources_state,
  getters: dataSources_getters,
  mutations: dataSources_mutations,
  actions: dataSources_actions,
  modules: {
    jsonDatasource: jsonDatasource,
    arenarLiveDatasource: arenarLiveDatasource,
    peerDatasource: peerDatasource
  },
  namespaced: false
});
// CONCATENATED MODULE: ./src/store/miscellaneous.js










var miscellaneous_state = {
  options: {},
  closedElements: [],
  annotationsActive: false,
  annotationsColor: '#371ea8',
  annotations: []
};
var miscellaneous_getters = {
  getOption: function getOption(state, getters) {
    return function (name) {
      if (state.options[name] !== undefined) return state.options[name];
      return (OptionsSchemas.find(function (s) {
        return s.name === name;
      }) || {}).default;
    };
  },
  allOptions: function allOptions(state, getters) {
    return OptionsSchemas.map(function (s) {
      return {
        name: s.name,
        value: getters.getOption(s.name)
      };
    });
  },
  isElementClosed: function isElementClosed(state, getters) {
    return function (name) {
      return !!state.closedElements.find(function (f) {
        return f === name;
      });
    };
  },
  annotationsActive: function annotationsActive(state) {
    return state.annotationsActive;
  },
  annotationsColor: function annotationsColor(state) {
    return state.annotationsColor;
  },
  getAnnotations: function getAnnotations(state) {
    return function (pageNumber) {
      return Object.assign({
        paths: [],
        pageNumber: pageNumber
      }, state.annotations.find(function (a) {
        return a.pageNumber === pageNumber;
      }));
    };
  },
  annotations: function annotations(state) {
    return state.annotations;
  },
  lastPageAnnotations: function lastPageAnnotations(state) {
    var _Math$max;

    return (_Math$max = Math.max).call.apply(_Math$max, [null].concat(Object(toConsumableArray["a" /* default */])(state.annotations.map(function (a) {
      return a.pageNumber;
    }))));
  }
};
var miscellaneous_mutations = {
  setOption: function setOption(state, _ref) {
    var name = _ref.name,
        value = _ref.value;
    vue_runtime_esm["a" /* default */].set(state.options, name, value);
  },
  closeElement: function closeElement(state, name) {
    state.closedElements = [].concat(Object(toConsumableArray["a" /* default */])(state.closedElements.filter(function (e) {
      return e !== name;
    })), [name]);
    localStorage.setItem('closedElements', JSON.stringify(state.closedElements));
  },
  setAnnotationsActive: function setAnnotationsActive(state, active) {
    vue_runtime_esm["a" /* default */].set(state, 'annotationsActive', !!active);
  },
  setAnnotationsColor: function setAnnotationsColor(state, color) {
    vue_runtime_esm["a" /* default */].set(state, 'annotationsColor', color);
  },
  setAnnotations: function setAnnotations(state, annotations) {
    vue_runtime_esm["a" /* default */].set(state, 'annotations', [].concat(Object(toConsumableArray["a" /* default */])(state.annotations.filter(function (a) {
      return a.pageNumber !== annotations.pageNumber;
    })), [annotations]));
  },
  loadAnnotations: function loadAnnotations(state, annotations) {
    vue_runtime_esm["a" /* default */].set(state, 'annotations', annotations);
  },
  clearOptions: function clearOptions(state) {
    vue_runtime_esm["a" /* default */].set(state, 'options', {});
  }
};
var miscellaneous_actions = {
  initMiscellaneous: function initMiscellaneous(_ref2) {
    var commit = _ref2.commit,
        dispatch = _ref2.dispatch;

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
  }
};
/* harmony default export */ var miscellaneous = ({
  state: miscellaneous_state,
  getters: miscellaneous_getters,
  mutations: miscellaneous_mutations,
  actions: miscellaneous_actions,
  namespaced: false
});
// CONCATENATED MODULE: ./src/store/telemetry.js








var telemetry_state = {
  lastActivity: new Date().getTime(),
  lastActivitySended: 0,
  telemetryUUID: null
};
var telemetry_getters = {
  telemetryUUID: function telemetryUUID(state) {
    return state.telemetryUUID;
  },
  lastActivity: function lastActivity(state) {
    return state.lastActivity;
  },
  lastActivitySended: function lastActivitySended(state) {
    return state.lastActivitySended;
  }
};
var telemetry_mutations = {
  updateLastActivity: function updateLastActivity(state) {
    vue_runtime_esm["a" /* default */].set(state, 'lastActivity', new Date().getTime());
  },
  setLastActivitySended: function setLastActivitySended(state, time) {
    vue_runtime_esm["a" /* default */].set(state, 'lastActivitySended', time);
  },
  setTelemetryUUID: function setTelemetryUUID(state, v) {
    vue_runtime_esm["a" /* default */].set(state, 'telemetryUUID', v);
  }
};
var telemetry_actions = {
  getSimplifiedTelemetryState: function getSimplifiedTelemetryState(_ref) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var getters, pages, paramsCount;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              getters = _ref.getters;
              pages = getters.allSlots.reduce(function (agg, slot) {
                agg[slot.pageNumber] = [].concat(Object(toConsumableArray["a" /* default */])(agg[slot.pageNumber] || []), [slot.plotType]);
                return agg;
              }, {});
              paramsCount = streams.runOnChildren(getters.availableParams, function (x) {
                return x.length;
              });
              return _context.abrupt("return", {
                pages: pages,
                page: getters.pageNumber,
                paramsCount: paramsCount
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  initTelemetry: function initTelemetry(_ref2) {
    var commit = _ref2.commit,
        getters = _ref2.getters,
        dispatch = _ref2.dispatch;
    document.addEventListener('pointerdown', function () {
      commit('updateLastActivity');
    });
    setInterval( /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!localStorage.getItem('disableTelemetry')) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (!(getters.lastActivity <= getters.lastActivitySended)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return");

            case 4:
              if (getters.telemetryUUID) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return");

            case 6:
              _context2.t0 = vue_runtime_esm["a" /* default */].http;
              _context2.t1 = config.telemetryServer + '/state';
              _context2.t2 = getters.telemetryUUID;
              _context2.t3 = JSON;
              _context2.next = 12;
              return dispatch('getSimplifiedTelemetryState');

            case 12:
              _context2.t4 = _context2.sent;
              _context2.t5 = _context2.t3.stringify.call(_context2.t3, _context2.t4);
              _context2.t6 = {
                uuid: _context2.t2,
                type: 'simple',
                data: _context2.t5
              };

              _context2.t0.post.call(_context2.t0, _context2.t1, _context2.t6).catch(console.error);

              commit('setLastActivitySended', getters.lastActivity);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })), 1000 * 60 * 1);
  }
};
/* harmony default export */ var telemetry = ({
  state: telemetry_state,
  getters: telemetry_getters,
  mutations: telemetry_mutations,
  actions: telemetry_actions,
  namespaced: false
});
// CONCATENATED MODULE: ./src/store/index.js


/* Vuex Modules */






vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
var store_actions = {
  init: function init(_ref) {
    var commit = _ref.commit,
        dispatch = _ref.dispatch;
    dispatch('initMiscellaneous');
    dispatch('initDataSources');
    dispatch('initTelemetry');
  }
};
/* harmony default export */ var store = (new vuex_esm["a" /* default */].Store({
  modules: {
    params: store_params,
    slots: store_slots,
    dataSources: dataSources,
    miscellaneous: miscellaneous,
    telemetry: telemetry
  },
  strict: false,
  actions: store_actions
}));
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
  index_es["c" /* library */].add(free_solid_svg_icons_index_es["e" /* faArchive */], free_solid_svg_icons_index_es["n" /* faGripVertical */], free_solid_svg_icons_index_es["r" /* faMinusSquare */], free_solid_svg_icons_index_es["t" /* faPlusSquare */], free_solid_svg_icons_index_es["j" /* faCompressArrowsAlt */], free_solid_svg_icons_index_es["o" /* faLayerGroup */], free_solid_svg_icons_index_es["l" /* faExpand */], free_solid_svg_icons_index_es["f" /* faBars */]);
  index_es["c" /* library */].add(free_solid_svg_icons_index_es["a" /* faAngleDown */], free_solid_svg_icons_index_es["g" /* faCaretDown */], free_solid_svg_icons_index_es["s" /* faPlus */], free_solid_svg_icons_index_es["q" /* faMinus */], free_solid_svg_icons_index_es["d" /* faAngleUp */], free_solid_svg_icons_index_es["v" /* faSquare */], free_solid_svg_icons_index_es["h" /* faChartBar */], free_solid_svg_icons_index_es["u" /* faPoll */], free_solid_svg_icons_index_es["p" /* faListAlt */], free_solid_svg_icons_index_es["b" /* faAngleLeft */], free_solid_svg_icons_index_es["c" /* faAngleRight */]);
  index_es["c" /* library */].add(free_solid_svg_icons_index_es["m" /* faFileDownload */], free_solid_svg_icons_index_es["k" /* faEraser */], free_solid_svg_icons_index_es["i" /* faCheckCircle */]);
  index_es["c" /* library */].add(free_regular_svg_icons_index_es["e" /* faQuestionCircle */], free_regular_svg_icons_index_es["g" /* faTimesCircle */], free_regular_svg_icons_index_es["a" /* faCheckSquare */], free_regular_svg_icons_index_es["f" /* faSquare */], free_regular_svg_icons_index_es["c" /* faClone */], free_regular_svg_icons_index_es["d" /* faEdit */], free_regular_svg_icons_index_es["b" /* faCircle */]);
  vue_runtime_esm["a" /* default */].component('font-awesome-icon', vue_fontawesome_index_es["a" /* FontAwesomeIcon */]);
}
// CONCATENATED MODULE: ./src/main.js















loadFontAwesome();
var appendURL = new URLSearchParams(window.location.search).get('append');
var clearStorage = new URLSearchParams(window.location.search).get('clear_storage');

if (clearStorage) {
  localStorage.clear();
  document.write('Local Storage is now clear');
} else if (appendURL) {
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

/***/ "5e11":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "5e11";

/***/ }),

/***/ "5ea2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PagesBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("647e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PagesBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PagesBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PagesBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "647e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "686f":
/***/ (function(module) {

module.exports = JSON.parse("{\"$schema\":\"http://json-schema.org/draft-06/schema#\",\"title\":\"Session file\",\"type\":\"object\",\"properties\":{\"version\":{\"type\":\"string\",\"const\":\"1.0.0\"},\"sources\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"address\":{\"type\":\"string\"},\"translations\":{\"type\":\"object\"},\"uuid\":{\"type\":\"string\"}},\"required\":[\"address\",\"translations\",\"uuid\"]}},\"slots\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"},\"plotType\":{\"type\":\"string\"},\"plotCategory\":{\"type\":\"string\"},\"uuid\":{\"type\":\"string\"},\"localParams\":{\"type\":\"array\",\"items\":{\"type\":\"object\"}},\"positionX\":{\"type\":\"number\"},\"positionY\":{\"type\":\"number\"},\"width\":{\"type\":\"number\"},\"height\":{\"type\":\"number\"},\"pageNumber\":{\"type\":\"number\"},\"archived\":{\"type\":\"boolean\"}},\"required\":[\"name\",\"plotType\",\"plotCategory\",\"localParams\",\"uuid\",\"positionX\",\"positionY\",\"width\",\"height\",\"pageNumber\",\"archived\"]}},\"colors\":{\"type\":\"object\"},\"annotations\":{\"type\":\"array\"},\"name\":{\"type\":\"string\"},\"uuid\":{\"type\":\"string\"},\"time\":{\"type\":\"number\"},\"options\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"}},\"required\":[\"name\",\"value\"]}}},\"required\":[\"version\",\"sources\",\"slots\",\"colors\",\"annotations\",\"name\",\"uuid\",\"time\",\"options\"]}");

/***/ }),

/***/ "6acd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Message_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0085");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Message_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Message_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Message_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "7f25":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7fbb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSources_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0b76");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSources_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSources_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSources_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "82d1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Metrics_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e412");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Metrics_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Metrics_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Metrics_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "8605":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "88ff":
/***/ (function(module) {

module.exports = JSON.parse("{\"$schema\":\"http://json-schema.org/draft-06/schema#\",\"title\":\"Arenar live root response\",\"description\":\"Data structure returned by arenar live server at /\",\"type\":\"object\",\"properties\":{\"version\":{\"type\":\"string\",\"const\":\"1.1.0\"},\"api\":{\"type\":\"string\",\"const\":\"arenar_api\"},\"timestamp\":{\"type\":\"number\"},\"availableParams\":{\"type\":\"object\",\"properties\":{\"variable\":{\"type\":\"array\",\"title\":\"Array of variables' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"model\":{\"type\":\"array\",\"title\":\"Array of models' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"observation\":{\"type\":\"array\",\"title\":\"Array of observations' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"dataset\":{\"type\":\"array\",\"title\":\"Array of observations' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true}},\"required\":[\"variable\",\"model\",\"observation\",\"dataset\"]},\"availablePlots\":{\"type\":\"array\",\"title\":\"Array of plots that server can produce\",\"items\":{\"type\":\"object\",\"title\":\"Object with basic properties of each plot type\",\"properties\":{\"plotType\":{\"type\":\"string\",\"title\":\"Type of plot\",\"description\":\"Represents what plot presents\",\"examples\":[\"FeatureImportance\",\"PartialDependency\"]},\"plotCategory\":{\"type\":\"string\",\"title\":\"Category of plot\",\"examples\":[\"Local\",\"Global\"]},\"name\":{\"type\":\"string\",\"title\":\"Title of plot\"},\"requiredParams\":{\"type\":\"array\",\"title\":\"Params that must be provided to calculate plot\",\"items\":{\"type\":\"string\"}}},\"required\":[\"plotType\",\"plotCategory\",\"requiredParams\",\"name\"]}}},\"required\":[\"version\",\"api\",\"timestamp\",\"availableParams\",\"availablePlots\"]}");

/***/ }),

/***/ "8c3e":
/***/ (function(module) {

module.exports = JSON.parse("{\"$schema\":\"http://json-schema.org/draft-06/schema#\",\"title\":\"Arenar live root response\",\"description\":\"Data structure returned by arenar live server at /\",\"type\":\"object\",\"properties\":{\"version\":{\"type\":\"string\",\"const\":\"1.0.0\"},\"api\":{\"type\":\"string\",\"const\":\"arenar_api\"},\"timestamp\":{\"type\":\"number\"},\"models\":{\"type\":\"array\",\"title\":\"Array of models' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"variables\":{\"type\":\"array\",\"title\":\"Array of variables' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"observations\":{\"type\":\"array\",\"title\":\"Array of observations' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"availablePlots\":{\"type\":\"array\",\"title\":\"Array of plots that server can produce\",\"items\":{\"type\":\"object\",\"title\":\"Object with basic properties of each plot type\",\"properties\":{\"plotType\":{\"type\":\"string\",\"title\":\"Type of plot\",\"description\":\"Represents what plot presents\",\"examples\":[\"FeatureImportance\",\"PartialDependency\"]},\"plotCategory\":{\"type\":\"string\",\"title\":\"Category of plot\",\"examples\":[\"Local\",\"Global\"]},\"name\":{\"type\":\"string\",\"title\":\"Title of plot\"},\"requiredParams\":{\"type\":\"array\",\"title\":\"Params that must be provided to calculate plot\",\"items\":{\"type\":\"string\"}}},\"required\":[\"plotType\",\"plotCategory\",\"requiredParams\",\"name\"]}}},\"required\":[\"version\",\"api\",\"timestamp\",\"models\",\"observations\",\"variables\",\"availablePlots\"]}");

/***/ }),

/***/ "8c4f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8dd3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Annotations_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("480f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Annotations_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Annotations_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Annotations_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8ff1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d751");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidepanelHelp_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9542":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlotsListElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3064");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlotsListElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlotsListElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlotsListElement_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "98e4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabPrivacy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("459e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabPrivacy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabPrivacy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabPrivacy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "ace6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ad94":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ade7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ae66":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VariableAgainstAnother_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ade7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VariableAgainstAnother_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VariableAgainstAnother_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VariableAgainstAnother_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b455":
/***/ (function(module) {

module.exports = JSON.parse("{\"$schema\":\"http://json-schema.org/draft-06/schema#\",\"title\":\"Session file\",\"type\":\"object\",\"properties\":{\"version\":{\"type\":\"string\",\"const\":\"1.1.0\"},\"sources\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"address\":{\"type\":\"string\"},\"translations\":{\"type\":\"object\"},\"uuid\":{\"type\":\"string\"}},\"required\":[\"address\",\"translations\",\"uuid\"]}},\"slots\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"},\"plotType\":{\"type\":\"string\"},\"plotCategory\":{\"type\":\"string\"},\"uuid\":{\"type\":\"string\"},\"localParams\":{\"type\":\"array\",\"items\":{\"type\":\"object\"}},\"positionX\":{\"type\":\"number\"},\"positionY\":{\"type\":\"number\"},\"width\":{\"type\":\"number\"},\"height\":{\"type\":\"number\"},\"pageNumber\":{\"type\":\"number\"},\"archived\":{\"type\":\"boolean\"},\"scope\":{\"type\":\"string\"},\"customData\":{\"type\":[\"object\",\"null\"]}},\"required\":[\"name\",\"plotType\",\"plotCategory\",\"localParams\",\"uuid\",\"positionX\",\"positionY\",\"width\",\"height\",\"pageNumber\",\"archived\",\"scope\",\"customData\"]}},\"colors\":{\"type\":\"object\"},\"annotations\":{\"type\":\"array\"},\"name\":{\"type\":\"string\"},\"uuid\":{\"type\":\"string\"},\"time\":{\"type\":\"number\"},\"options\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"}},\"required\":[\"name\",\"value\"]}}},\"required\":[\"version\",\"sources\",\"slots\",\"colors\",\"annotations\",\"name\",\"uuid\",\"time\",\"options\"]}");

/***/ }),

/***/ "b511":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Slider_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1cbf");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Slider_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Slider_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Slider_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "bd2c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Fairness_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("30e7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Fairness_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Fairness_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Fairness_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c0f0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c2d2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DistributionHistogram_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1b6b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DistributionHistogram_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DistributionHistogram_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DistributionHistogram_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c2d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("248e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectMenu_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c5d4":
/***/ (function(module) {

module.exports = JSON.parse("{\"$schema\":\"http://json-schema.org/draft-06/schema#\",\"title\":\"Data file\",\"description\":\"Main data structure, that should be uploaded to application as .json file\",\"type\":\"object\",\"properties\":{\"version\":{\"type\":\"string\",\"const\":\"1.1.0\"},\"availableParams\":{\"type\":\"object\",\"properties\":{\"variable\":{\"type\":\"array\",\"title\":\"Array of variables' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"model\":{\"type\":\"array\",\"title\":\"Array of models' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"observation\":{\"type\":\"array\",\"title\":\"Array of observations' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true},\"dataset\":{\"type\":\"array\",\"title\":\"Array of observations' names used in this data file\",\"items\":{\"type\":\"string\"},\"uniqueItems\":true}},\"required\":[\"variable\",\"model\",\"observation\",\"dataset\"]},\"data\":{\"type\":\"array\",\"title\":\"Array of plots data\",\"items\":{\"type\":\"object\",\"title\":\"Single plot object\",\"properties\":{\"plotComponent\":{\"type\":\"string\",\"title\":\"Name of vue component to plot this object\",\"description\":\"Represents how the plot is build\",\"examples\":[\"FeatureImportance\",\"LinearPartialDependency\",\"CategoricalPartialDependency\"]},\"plotType\":{\"type\":\"string\",\"title\":\"Type of plot\",\"description\":\"Represents what plot presents\",\"examples\":[\"FeatureImportance\",\"PartialDependency\"]},\"plotCategory\":{\"type\":\"string\",\"title\":\"Category of plot\",\"examples\":[\"Local\",\"Global\"]},\"name\":{\"type\":\"string\",\"title\":\"Title of plot\"},\"params\":{\"type\":\"object\",\"title\":\"Plot params\",\"description\":\"Represents what the data is related to.\",\"properties\":{\"model\":{\"type\":\"string\"},\"observation\":{\"type\":\"string\"},\"variable\":{\"type\":\"string\"}}},\"data\":{\"type\":\"object\",\"title\":\"Plot traces\",\"description\":\"This object should be formatted for specified plotComponent\"}},\"required\":[\"plotType\",\"plotComponent\",\"plotCategory\",\"params\",\"name\",\"data\"]}}},\"required\":[\"version\",\"availableParams\",\"data\"]}");

/***/ }),

/***/ "c967":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cc4c":
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

/***/ "d7d4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "dc10":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "de0a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSessions_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7f25");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSessions_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSessions_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsTabSessions_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e3a2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlotDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c0f0");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlotDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlotDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PlotDropdown_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e412":
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

/***/ "f8e0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureImportance_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("07a4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureImportance_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureImportance_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FeatureImportance_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ff6e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=app.3c434fd7.js.map