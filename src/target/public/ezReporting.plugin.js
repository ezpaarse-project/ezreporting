/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
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
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"ezReporting": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "ezReporting.chunk." + chunkId + ".js"
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["ezReporting_bundle_jsonpfunction"] = window["ezReporting_bundle_jsonpfunction"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../../node_modules/@kbn/optimizer/target_node/worker/entry_point_creator.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/@kbn/optimizer/target_node/worker/entry_point_creator.js":
/*!**************************************************************************************************!*\
  !*** /home/kbn-dev/kibana/node_modules/@kbn/optimizer/target_node/worker/entry_point_creator.js ***!
  \**************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cache_bazel_bazel_kbn_dev_7e1cf900c62e4fff261bec40694a541b_execroot_kibana_node_modules_val_loader_dist_cjs_js_key_ezReporting_cache_bazel_bazel_kbn_dev_7e1cf900c62e4fff261bec40694a541b_execroot_kibana_bazel_out_k8_fastbuild_bin_packages_kbn_ui_shared_deps_target_node_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../.cache/bazel/_bazel_kbn-dev/7e1cf900c62e4fff261bec40694a541b/execroot/kibana/node_modules/val-loader/dist/cjs.js?key=ezReporting!../../../../../../.cache/bazel/_bazel_kbn-dev/7e1cf900c62e4fff261bec40694a541b/execroot/kibana/bazel-out/k8-fastbuild/bin/packages/kbn-ui-shared-deps/target_node/public_path_module_creator.js */ "../../node_modules/val-loader/dist/cjs.js?key=ezReporting!../../../.cache/bazel/_bazel_kbn-dev/7e1cf900c62e4fff261bec40694a541b/execroot/kibana/bazel-out/k8-fastbuild/bin/packages/kbn-ui-shared-deps/target_node/public_path_module_creator.js");
/* harmony import */ var _cache_bazel_bazel_kbn_dev_7e1cf900c62e4fff261bec40694a541b_execroot_kibana_node_modules_val_loader_dist_cjs_js_key_ezReporting_cache_bazel_bazel_kbn_dev_7e1cf900c62e4fff261bec40694a541b_execroot_kibana_bazel_out_k8_fastbuild_bin_packages_kbn_ui_shared_deps_target_node_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cache_bazel_bazel_kbn_dev_7e1cf900c62e4fff261bec40694a541b_execroot_kibana_node_modules_val_loader_dist_cjs_js_key_ezReporting_cache_bazel_bazel_kbn_dev_7e1cf900c62e4fff261bec40694a541b_execroot_kibana_bazel_out_k8_fastbuild_bin_packages_kbn_ui_shared_deps_target_node_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0__);
__kbnBundles__.define('plugin/ezReporting/public', __webpack_require__, /*require.resolve*/(/*! ../../../../../plugins/ezreporting/public */ "./public/index.ts"))
__kbnBundles__.define('plugin/ezReporting/common', __webpack_require__, /*require.resolve*/(/*! ../../../../../plugins/ezreporting/common */ "./common/index.ts"))

/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/postcss-loader/src/index.js?!../../node_modules/sass-loader/dist/cjs.js?!./public/index.scss?v8light":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/kbn-dev/kibana/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-0-1!/home/kbn-dev/kibana/node_modules/postcss-loader/src??ref--6-oneOf-0-2!/home/kbn-dev/kibana/node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-0-3!./public/index.scss?v8light ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * 1. Focus rings shouldn't be visible on scrollable regions, but a11y requires them to be focusable.\n *    Browser's supporting `:focus-visible` will still show outline on keyboard focus only.\n *    Others like Safari, won't show anything at all.\n * 2. Force the `:focus-visible` when the `tabindex=0` (is tabbable)\n */\n", "",{"version":3,"sources":["index.scss"],"names":[],"mappings":"AAAA;;;;;EAKE","file":"index.scss","sourcesContent":["/**\n * 1. Focus rings shouldn't be visible on scrollable regions, but a11y requires them to be focusable.\n *    Browser's supporting `:focus-visible` will still show outline on keyboard focus only.\n *    Others like Safari, won't show anything at all.\n * 2. Force the `:focus-visible` when the `tabindex=0` (is tabbable)\n */\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/api.js":
/*!************************************************************************!*\
  !*** /home/kbn-dev/kibana/node_modules/css-loader/dist/runtime/api.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!***********************************************************************************************!*\
  !*** /home/kbn-dev/kibana/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../../node_modules/val-loader/dist/cjs.js?key=ezReporting!../../../.cache/bazel/_bazel_kbn-dev/7e1cf900c62e4fff261bec40694a541b/execroot/kibana/bazel-out/k8-fastbuild/bin/packages/kbn-ui-shared-deps/target_node/public_path_module_creator.js":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/kbn-dev/kibana/node_modules/val-loader/dist/cjs.js?key=ezReporting!/home/kbn-dev/.cache/bazel/_bazel_kbn-dev/7e1cf900c62e4fff261bec40694a541b/execroot/kibana/bazel-out/k8-fastbuild/bin/packages/kbn-ui-shared-deps/target_node/public_path_module_creator.js ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__.p = window.__kbnPublicPath__['ezReporting']

/***/ }),

/***/ "./common/index.ts":
/*!*************************!*\
  !*** ./common/index.ts ***!
  \*************************/
/*! exports provided: PLUGIN_APP_NAME, PLUGIN_ID, PLUGIN_NAME, PLUGIN_DESCRIPTION, PLUGIN_ICON, API_URL, CATEGORY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLUGIN_APP_NAME", function() { return PLUGIN_APP_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLUGIN_ID", function() { return PLUGIN_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLUGIN_NAME", function() { return PLUGIN_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLUGIN_DESCRIPTION", function() { return PLUGIN_DESCRIPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLUGIN_ICON", function() { return PLUGIN_ICON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_URL", function() { return API_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CATEGORY", function() { return CATEGORY; });
const PLUGIN_APP_NAME = 'ezMESURE';
const PLUGIN_ID = `ezreporting`;
const PLUGIN_NAME = 'Reporting';
const PLUGIN_DESCRIPTION = `Manage your reports generated from %APP_NAME%.`;
const PLUGIN_ICON = 'reportingApp';
const API_URL = 'http://localhost:4000';
const CATEGORY = {
  id: `${PLUGIN_APP_NAME.toLowerCase()}_category`,
  label: PLUGIN_APP_NAME,
  euiIconType: '',
  order: 1001
};

/***/ }),

/***/ "./public/images/logo.png":
/*!********************************!*\
  !*** ./public/images/logo.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./public/index.scss":
/*!***************************!*\
  !*** ./public/index.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


switch (window.__kbnThemeTag__) {
  case 'v7dark':
    console.error(new Error("SASS files in [ezReporting] were not built for theme [v7dark]. Styles were compiled using the [v8light] theme instead to keep Kibana somewhat usable. Please adjust the advanced settings to make use of [v8light] or make sure the KBN_OPTIMIZER_THEMES environment variable includes [v7dark] in a comma separated list of themes you want to compile. You can also set it to \"*\" to build all themes."));
    return __webpack_require__(/*! ./index.scss?v8light */ "./public/index.scss?v8light")

  case 'v7light':
    console.error(new Error("SASS files in [ezReporting] were not built for theme [v7light]. Styles were compiled using the [v8light] theme instead to keep Kibana somewhat usable. Please adjust the advanced settings to make use of [v8light] or make sure the KBN_OPTIMIZER_THEMES environment variable includes [v7light] in a comma separated list of themes you want to compile. You can also set it to \"*\" to build all themes."));
    return __webpack_require__(/*! ./index.scss?v8light */ "./public/index.scss?v8light")

  case 'v8dark':
    console.error(new Error("SASS files in [ezReporting] were not built for theme [v8dark]. Styles were compiled using the [v8light] theme instead to keep Kibana somewhat usable. Please adjust the advanced settings to make use of [v8light] or make sure the KBN_OPTIMIZER_THEMES environment variable includes [v8dark] in a comma separated list of themes you want to compile. You can also set it to \"*\" to build all themes."));
    return __webpack_require__(/*! ./index.scss?v8light */ "./public/index.scss?v8light")

  case 'v8light':
    return __webpack_require__(/*! ./index.scss?v8light */ "./public/index.scss?v8light");
}

/***/ }),

/***/ "./public/index.scss?v8light":
/*!***********************************!*\
  !*** ./public/index.scss?v8light ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-0-1!../../../node_modules/postcss-loader/src??ref--6-oneOf-0-2!../../../node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-0-3!./index.scss?v8light */ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/postcss-loader/src/index.js?!../../node_modules/sass-loader/dist/cjs.js?!./public/index.scss?v8light");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./public/index.ts":
/*!*************************!*\
  !*** ./public/index.ts ***!
  \*************************/
/*! exports provided: plugin, EzReportingPluginSetup, EzReportingPluginStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./public/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin */ "./public/plugin.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./public/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EzReportingPluginSetup", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["EzReportingPluginSetup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EzReportingPluginStart", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["EzReportingPluginStart"]; });



// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
function plugin(initializerContext) {
  return new _plugin__WEBPACK_IMPORTED_MODULE_1__["EzReportingPlugin"](initializerContext);
}


/***/ }),

/***/ "./public/plugin.ts":
/*!**************************!*\
  !*** ./public/plugin.ts ***!
  \**************************/
/*! exports provided: EzReportingPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EzReportingPlugin", function() { return EzReportingPlugin; });
/* harmony import */ var _src_plugins_home_public__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/plugins/home/public */ "plugin/home/public");
/* harmony import */ var _src_plugins_home_public__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_plugins_home_public__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common */ "./common/index.ts");
/* harmony import */ var _images_logo_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/logo.png */ "./public/images/logo.png");
/* harmony import */ var _images_logo_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_logo_png__WEBPACK_IMPORTED_MODULE_2__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class EzReportingPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "initializerContext", void 0);

    this.initializerContext = initializerContext;
  }

  setup(core, {
    home,
    management
  }) {
    const config = this.initializerContext.config.get();
    const applicationName = config.applicationName;
    _common__WEBPACK_IMPORTED_MODULE_1__["CATEGORY"].label = applicationName;
    _common__WEBPACK_IMPORTED_MODULE_1__["CATEGORY"].euiIconType = _images_logo_png__WEBPACK_IMPORTED_MODULE_2___default.a;
    const {
      protocol,
      hostname,
      port
    } = window.location;
    const ezmesureLink = `${protocol}//${hostname}${port ? `:${port}` : ''}/`; // Back to PLUGIN_NAME link

    core.application.register({
      id: `${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ID"]}_back`,
      title: `Back to ${applicationName}`,
      euiIconType: 'editorUndo',
      category: _common__WEBPACK_IMPORTED_MODULE_1__["CATEGORY"],
      mount: () => window.location.href = ezmesureLink
    }); // ezReporting app

    core.application.register({
      id: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ID"],
      title: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"],
      icon: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ICON"],
      category: _common__WEBPACK_IMPORTED_MODULE_1__["CATEGORY"],
      mount: async params => {
        // Load application bundle
        const {
          mountApp
        } = await __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./application */ "./public/application.tsx")); // Get start services as specified in kibana.json

        const [coreStart, depsStart] = await core.getStartServices();
        const {
          chrome
        } = coreStart;
        chrome.docTitle.change(`${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]} ${applicationName}`);
        const admin = false;
        const unmountAppCallback = await mountApp({
          coreStart,
          depsStart,
          params,
          applicationName,
          admin
        }); // Render the application

        return () => {
          chrome.docTitle.reset();
          unmountAppCallback();
        };
      }
    }); // Menagement section

    if (management) {
      const managementSection = `${applicationName.toLowerCase()}`;
      console.log(managementSection);
      const appManagementSection = management.sections.register({
        id: managementSection,
        title: applicationName,
        tip: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_DESCRIPTION"].replace('%APP_NAME%', applicationName),
        order: 1000
      });
      appManagementSection.registerApp({
        id: `${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ID"]}_management`,
        title: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"],
        order: 99,
        mount: async params => {
          // Load application bundle
          const {
            mountApp
          } = await __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./application */ "./public/application.tsx")); // Get start services as specified in kibana.json

          const [coreStart, depsStart] = await core.getStartServices();
          const {
            chrome
          } = coreStart;
          chrome.docTitle.change(`Management - ${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]} ${applicationName}`);
          chrome.setBreadcrumbs([{
            text: 'Stack Management',
            href: coreStart.http.basePath.prepend('/app/management')
          }, {
            text: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_APP_NAME"]
          }, {
            text: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]
          }]);
          const admin = true;
          const unmountAppCallback = await mountApp({
            coreStart,
            depsStart,
            params,
            applicationName,
            admin
          }); // Render the application

          return () => {
            chrome.docTitle.reset();
            unmountAppCallback();
          };
        }
      });

      if (home) {
        home.featureCatalogue.register({
          id: `${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ID"]}_management`,
          title: `Management - ${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]} ${applicationName}`,
          subtitle: `Management - ${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]} ${applicationName}`,
          description: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_DESCRIPTION"].replace('%APP_NAME%', applicationName),
          icon: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ICON"],
          path: `/app/management/${managementSection}/${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ID"]}`,
          showOnHomePage: true,
          category: _src_plugins_home_public__WEBPACK_IMPORTED_MODULE_0__["FeatureCatalogueCategory"].ADMIN,
          solutionId: `${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]} ${applicationName}`,
          order: 1
        });
      }
    } // ezReporting app in home page


    if (home) {
      home.featureCatalogue.registerSolution({
        id: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ID"],
        title: `${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]} ${applicationName}`,
        subtitle: `${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]} ${applicationName}`,
        description: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_DESCRIPTION"].replace('%APP_NAME%', applicationName),
        icon: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ICON"],
        path: `/app/${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ID"]}`,
        appDescriptions: [`${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]} ${applicationName}`, _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_DESCRIPTION"].replace('%APP_NAME%', applicationName)]
      });
      home.featureCatalogue.register({
        id: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ID"],
        title: `${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]} ${applicationName}`,
        subtitle: `${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]} ${applicationName}`,
        description: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_DESCRIPTION"].replace('%APP_NAME%', applicationName),
        icon: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ICON"],
        path: `/app/${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_ID"]}`,
        showOnHomePage: true,
        category: _src_plugins_home_public__WEBPACK_IMPORTED_MODULE_0__["FeatureCatalogueCategory"].OTHER,
        solutionId: `${_common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]} ${applicationName}`
      });
    } // Return methods that should be available to other plugins


    return {};
  }

  start(core) {
    return {};
  }

  stop() {}

}

/***/ }),

/***/ "./public/types.ts":
/*!*************************!*\
  !*** ./public/types.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "@elastic/eui":
/*!***********************************************!*\
  !*** external "__kbnSharedDeps__.ElasticEui" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __kbnSharedDeps__.ElasticEui;

/***/ }),

/***/ "@kbn/i18n":
/*!********************************************!*\
  !*** external "__kbnSharedDeps__.KbnI18n" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __kbnSharedDeps__.KbnI18n;

/***/ }),

/***/ "@kbn/i18n/react":
/*!*************************************************!*\
  !*** external "__kbnSharedDeps__.KbnI18nReact" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __kbnSharedDeps__.KbnI18nReact;

/***/ }),

/***/ "lodash":
/*!*******************************************!*\
  !*** external "__kbnSharedDeps__.Lodash" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __kbnSharedDeps__.Lodash;

/***/ }),

/***/ "moment":
/*!*******************************************!*\
  !*** external "__kbnSharedDeps__.Moment" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __kbnSharedDeps__.Moment;

/***/ }),

/***/ "plugin/home/public":
/*!*******************************************!*\
  !*** @kbn/bundleRef "plugin/home/public" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {


      __webpack_require__.r(__webpack_exports__);
      var ns = __kbnBundles__.get('plugin/home/public');
      Object.defineProperties(__webpack_exports__, Object.getOwnPropertyDescriptors(ns))
    

/***/ }),

/***/ "react":
/*!******************************************!*\
  !*** external "__kbnSharedDeps__.React" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __kbnSharedDeps__.React;

/***/ }),

/***/ "react-dom":
/*!*********************************************!*\
  !*** external "__kbnSharedDeps__.ReactDom" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __kbnSharedDeps__.ReactDom;

/***/ }),

/***/ "react-router-dom":
/*!***************************************************!*\
  !*** external "__kbnSharedDeps__.ReactRouterDom" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __kbnSharedDeps__.ReactRouterDom;

/***/ })

/******/ });
//# sourceMappingURL=ezReporting.plugin.js.map