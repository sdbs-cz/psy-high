
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, array[i], i); // passes back stuff we need
  }
};

var getPseudoContent = function(target) {
  return window.getComputedStyle(target, ':before')
    .getPropertyValue('content')
    .replace( /"/g, '' );
};

var toggleClasses = function(target, classes) {
  var lastClass;
  classes.some(function (className) {
    // toggle returns true if class was added and vice versa
    lastClass = className;
    return target.classList.toggle(className);
  });
  return lastClass;
};

var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function(fn){window.setTimeout(fn, 15);};

var addListeners = function(target, events, handler) {
  events.forEach(function(e){
    target.addEventListener(e, handler, false);
  });
};

/**
 * Taken from Headhesive helpers
 */

/**
 * _mergeObj
 * @description Merge objects
 */
var _mergeObj = function(to, from) {
    for (var p in from) {
        if (from.hasOwnProperty(p)) {
            to[p] = (typeof from[p] === 'object') ? _mergeObj(to[p], from[p]) : from[p];
        }
    }
    return to;
};


/**
 * _throttle
 * @description Borrowed from Underscore.js
 */
var _throttle = function(func, wait) {
    var _now =  Date.now || function() { return new Date().getTime(); };
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function() {
      previous = _now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
        var now = _now();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            context = args = null;
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};


/**
 * _getElemY
 * @description Get Y posistion of an element
 */
function _getElemY(elem) {
    var top = 0;
    while(elem) {
        top += elem.offsetTop;
        elem = elem.offsetParent;
    }
    return top;
}

