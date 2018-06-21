// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

// Using Reddit API to make a search function for the application

/*
fetch() method usage NOTES
---------------------------

The "fetch()" method takes one mandatory argument, the path to the resource
you want to fetch. It returns a "Promise" that resolves to the "Response" to that
request, whether or not it is successful. You can optionally pass in an init options 
object as a second argument.

Once a "Response" is retrieved, there are a number of methods available 
to define what the body content is and how it should be handled. 

You can create a request and response directly using the "Request()" and 
"Response" constructors, but are unlikely to do this directly. These are more likely to be 
created as results of other API actions (for example, FetchEvent.respondWidth) from 
service workers).

*/

exports.default = {

    search: function search(searchTerm, searchLimit, sortBy) {
        return fetch("http://www.reddit.com/search.json?q=" + searchTerm + "&sort=" + sortBy + "&limit=" + searchLimit) // ? - allows use url para parameter, q - query
        .then(function (res) {
            return res.json();
        }) // it gives us the response, we want the response in JSON
        .then(function (data) {
            return data.data.children.map(function (data) {
                return data.data;
            });
        }) // gives us the data
        .catch(function (err) {
            return console.log(err);
        });
    }

    // solutions of problem  


};
},{}],3:[function(require,module,exports) {
'use strict';

var _redditapi = require('./redditapi');

var _redditapi2 = _interopRequireDefault(_redditapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// primary global variables 
var searchForm = document.getElementById('search-form'); // js file using reddit api

var searchInput = document.querySelector('.search-input');
var resultArea = document.getElementById('result');

// error status 
var errorStatus = false;

// 'submit' - if form is submitted, perform callback 
searchForm.addEventListener('submit', function (e) {

    // get search term
    var searchTerm = searchInput.value;
    // get radio check boxes
    var sortBy = document.querySelector('input[class="sort"]:checked').value;
    // get limit
    var searchLimit = document.getElementById('limit').value;

    // check search field is not empty
    var errMsg = 'Please add search term!';
    var errMsgClass = 'alert-messages';
    if (searchTerm === "") {
        showErrorMessage(errMsg, errMsgClass);
    } else {
        errorStatus = false;
    }

    // clear search input
    searchInput.value = "";
    e.preventDefault();

    // error status is false (no errors) then run search functionality: 
    if (errorStatus == false) {

        // search Reddit u                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            sing Reddit API, separate JS file

        // returns a promise (code in written in redditapi.js) so use .then() to get the data
        _redditapi2.default.search(searchTerm, searchLimit, sortBy).then(function (res) {
            console.log(res);
            var output = '<div id="results-title">Results</div>'; // initial output title for DOM before adding query results below

            // loop through posts 
            res.forEach(function (post) {
                var searchURL = post.url;

                // get image from reddit api
                var imageURL = '';
                if (post.preview != undefined) {
                    if (post.preview.images[0].source.url != undefined) {
                        imageURL = post.preview.images[0].source.url;
                    } else {
                        imageURL = 'https://jsdeveloper.io/wp-content/uploads/2017/10/1024px-Reddit_logo_and_wordmark.svg_.png';
                    }
                } else {
                    imageURL = 'https://jsdeveloper.io/wp-content/uploads/2017/10/1024px-Reddit_logo_and_wordmark.svg_.png';
                }

                // create output layout
                output += '\n                \n                <div class="result-wrap">\n                    <div class="title">' + cutText(post.title, 50) + ' ..</div>\n                    <div id="image-wrap"> <img class="image" src="' + imageURL + '"> </div>\n                    <div class="output">' + cutText(post.selftext, 200) + ' .. <a href="' + searchURL + '">Read More</a></div>\n                    \n                </div>\n                ';
            });

            // hide any previous errors
            var errMsgArea = document.querySelector('.' + errMsgClass);
            if (errMsgArea != null) {
                errMsgArea.classList.remove(errMsgClass);
            }

            // show results 
            resultArea.classList.add('show'); // highlight output area
            resultArea.innerHTML = output; // add finalized search results 
        });
    }

    // testing
    // console.log();
});

// function to show error message if user has not put any search terms
function showErrorMessage(message, className) {
    // remove current results if there are any 
    resultArea.classList.remove('show');

    // create div to hold message 
    var div = document.createElement('div');

    // insert error message
    div.appendChild(document.createTextNode(message));
    div.classList.add("error-message");
    // insert into DOM
    // get parent
    var errorOutput = document.getElementById('errors');

    // styling to display message
    // clear error box and put "error"
    errorOutput.innerHTML = "Error";
    // append error message into div
    errorOutput.appendChild(div);
    errorOutput.classList.add(className);
    // notify error is true so do not show results
    errorStatus = true;
}

// cuts text down into smaller parts 

function cutText(text, limit) {
    var trimmed = text.indexOf(' ', limit); // trims at the point "limit" 
    if (trimmed == -1) return text; // if indexOf not found it returns -1

    return text.substring(0, trimmed);
}
},{"./redditapi":4}],7:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '57912' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[7,3], null)
//# sourceMappingURL=/script.449b06ed.map