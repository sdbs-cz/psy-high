/**
 * @version 0.4
 * @twitter joshwnj, westonruter, kamilogorek
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.State = factory();
    }
}(this, function () {
    var undefined;

    var nextTick = (function () {
        return (typeof process !== 'undefined' && process.nextTick)
            ? process.nextTick
            : setTimeout;
    }());

    /**
     * Implementation of Array.indexOf which sadly is not available in IE<=8
     */
    var indexOf = Array.prototype.indexOf || function (item) {
        var i;
        var len = this.length;
        for( i = 0; i < len; i += 1 ){
            if( this[i] === item ){
                return i;
            }
        }
        return -1;
    };

    /**
     * Implementation of Array.forEach which is sadly not available in IE<=8
     */
    var forEach = Array.prototype.forEach || function (callback) {
        var i;
        var len = this.length;
        for (i = 0; i < len; i += 1) {
            callback(this[i]);
        }
    };

    var EventEmitter;
    if (typeof exports === 'object') {
        EventEmitter = require('events').EventEmitter;
    }
    else {
        // NOTE: not a true EventEmitter port, but close enough for this module
        EventEmitter = function () {
            this._listeners = [];
        };
        EventEmitter.prototype = {
            emit: function (_, data) {
                forEach.call(this._listeners, function (f) {
                    nextTick(function () {
                        f(data);
                    });
                });
            },

            on: function (_, listener) {
                // ignore duplicates
                var i = indexOf.call(this._listeners, listener);
                if(i >= 0) { return; }

                this._listeners.push(listener);
            },

            removeListener: function (_, listener) {
                var i = indexOf.call(this._listeners, listener);
                var found = (i !== -1);
                if (found) {
                    this._listeners.splice(i, 1);
                }
            }
        };
    }

    // -------------------------------------------------------------------------

    function State (value) {
        this._events = new EventEmitter();
        this._value = value;
    }

    State.prototype = {
        get: function () {
            return this._value;
        },

        set: function (value) {
            // no change: ignore
            if (value === this._value) { return; }

            this._value = value;
            this._events.emit('change', value);
        },

        toString: function(){
            return String(this.get());
        },

        /**
         * Watch for any change in value
         * @param {Function} callback
         * @return {Function} callback
         */
        watch: function (callback) {
            // if there is a value, run the callback immediately
            var value = this._value;
            if (value !== undefined) {
                nextTick(function () {
                    callback(value);
                });
            }

            // register the callback
            this._events.on('change', callback);
            return callback;
        },

        /**
         * Remove function that is watching for a change
         * @param {Function} callback initially added
         * @returns {Boolean} if the callback was removed
         */
        unwatch: function (callback) {
            this._events.removeListener('change', callback);
        },

        /**
         * Watch for a certain value.
         * Returns the watch-callback so you can unwatch at a later stage.
         * @param mixed
         * @param function
         * @return function
         */
        when: function (value, callback) {
            var watcher = function (v) {
                if (v === value) {
                    callback();
                }
            };
            this.watch(watcher);
            return watcher;
        }
    };

    return State;
}));
/*! flare.js v1.0.0 | (c) 2014 @toddmotto | https://github.com/toddmotto/flare */
//reduced for brevity

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.flare = factory();
  }
})(this, function () {

  'use strict';

  var flare = {};

  var types = {
    category: 'eventCategory',
    action: 'eventAction',
    label: 'eventLabel',
    value: 'eventValue'
  };


  flare.emit = function (trackers) {
    var track = { hitType: 'event' };
    for (var prop in trackers) {
      if (types[prop]) {
        track[types[prop]] = trackers[prop];
      }
    }
    try {
      ga('send', track);
    } catch (e) {}
  };

  return flare;

});
(function() {
  'use strict';
  if(!window.USE_JS) {
    return;
  }
;

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


var pushHash = function(newHash, replace) {
  var method = 'pushState';
  if(replace) {
    method = 'replaceState';
  }

  try
  {
    if (location.hash !== newHash) {
      window.history[method](null, null, newHash);
      return true;
    }
    return false;
  }
  catch(e) {
    return false;
  }
};


var TransitionalState = function(value) {
  'use strict';
  this._oldValue = value || undefined;
  State.apply(this, arguments);

};

TransitionalState.prototype = Object.create(State.prototype);
TransitionalState.prototype.constructor = TransitionalState;

TransitionalState.prototype.set = function(value) {
  var currentVal = this.get();
  if(currentVal === value) {
    return;
  }
  this._oldValue = currentVal;
  State.prototype.set.apply(this, arguments);
};

TransitionalState.prototype.transition = function(callback) {
  var observer = function(newValue) {
    callback(this._oldValue, newValue);
  };
  this.watch(observer.bind(this));
  return callback; // Return the original callback, not an anon function
};
/*
 * smoothScroll by Alice Lieutier
 * https://github.com/alicelieutier/smoothScroll
 *
 * Licensed under MIT License
 */


window.smoothScroll = (function(){
'use strict';
// We do not want this script to be applied in browsers that do not support those
// That means no smoothscroll on IE9 and below.
if(document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) {
  return function(){};
}

// Get the top position of an element in the document
var getTop = function(element) {
    // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
    if(element.nodeName === 'HTML')
      return -window.pageYOffset;
    return element.getBoundingClientRect().top + window.pageYOffset;
};
// ease in out function thanks to:
// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
var easeInOutCubic = function (t) { return t < 0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; };

// calculate the scroll position we should be in
// given the start and end point of the scroll
// the time elapsed from the beginning of the scroll
// and the total duration of the scroll (default 500ms)
var position = function(start, end, elapsed, duration) {
    if (elapsed > duration) return end;
    return start + (end - start) * easeInOutCubic(elapsed / duration); // <-- you can change the easing funtion there
    // return start + (end - start) * (elapsed / duration); // <-- this would give a linear scroll
};

// we use requestAnimationFrame to be called by the browser before every repaint
// if the first argument is an element then scroll to the top of this element
// if the first argument is numeric then scroll to this location
// if the callback exist, it is called when the scrolling is finished
var smoothScroll = function(el, duration, callback, direction){
    duration = duration || 500;
    var start = window.pageYOffset,
        end;

    if (typeof el === 'number') {
      end = parseInt(el);
    } else {
      end = getTop(el);
    }

    // We only want to go up
    // → start is lower than end
    if(direction === 'up' && start < end) {
      return;
    }
    // and vice versa
    if(direction === 'down' && start > end) {
      return;
    }

    var clock = Date.now();

    var step = function(){
        var elapsed = Date.now() - clock;
        window.scroll(0, position(start, end, elapsed, duration));
        if (elapsed > duration) {
            if (typeof callback === 'function') {
                callback(el);
            }
        } else {
            requestAnimationFrame(step);
        }
    };
    step();
};

// return smoothscroll API
return smoothScroll;

})();

/**
 * Lightweight content agnostic overlay.
 * You need to pass callback to resolve its content.
 *
 * Based on Avgrund by Hakim El Hattab, http://hakim.se
 * http://lab.hakim.se/avgrund
 */

var Overlay = (function(root, document){
  var exports = {};
  var defaults = {
    activeClass: 'js-active',
    overlayClass: 'overlay',
    overlayInnerClass: 'overlay-inner',
    overlayCloseClass: 'overlay-close',
    closeTitle: 'Close'
  };

  var generateCloseButton = function(settings) {
    var el = document.createElement('button');
    el.setAttribute('type', 'button');
    el.setAttribute('class', settings.overlayCloseClass);
    el.setAttribute('title', settings.closeTitle);
    el.innerHTML = '&times;';

    return el;
  };

  var generateOverlay = function(settings) {
    var overlay = document.createElement('div');
    overlay.setAttribute('class', settings.overlayClass);

    var close = generateCloseButton(settings);

    var inner = document.createElement('div');
    inner.setAttribute('class', settings.overlayInnerClass);

    overlay.appendChild(close);
    overlay.appendChild(inner);

    return {
      overlay: overlay,
      close: close,
      inner: inner
    };
  };

  var _currentState = new State();
  var _container = document.body;
  var _elements;

  // Deactivate on ESC
  var keyDeactivateHandler = function(e) {
    if(e.keyCode === 127) {
      _currentState.set(null);
    }
  };
  // var clickDeactivateHandler = function(e) {
  //   if( e.target === _elements.overlay ||
  //       e.target === _elements.close) {
  //     _currentState.set(null);
  //   }
  // };


  var activate = function() {
    document.addEventListener('keyup', keyDeactivateHandler, false );

    showElement(_elements.overlay);
  };

  var deactivate = function() {
    document.removeEventListener('keyup', keyDeactivateHandler);

    hideElement(_elements.overlay);
  };

  _currentState.watch(function(content) {
    if(!content) {
      deactivate();
      _elements.inner.innerHTML = '';
    }
    else {
      _elements.inner.innerHTML = content;
      activate();
    }
  });

  exports.init = function(settings) {
    // FIXME: merge passed settings with defaults
    _elements = generateOverlay(defaults);
    var rootEl = _elements.overlay;
    hideElement(rootEl);
    var deactivateHandler = function() {
      _currentState.set(null);
    };
    ['click', 'touchstart'].forEach(function(eType){
      _elements.overlay.addEventListener(eType, deactivateHandler, false);
      _elements.close.addEventListener(eType, deactivateHandler, false);
    });


    _container.appendChild(rootEl);

    return exports;
  };

  exports.show = function(target, contentCb) {
    return function(e) {
      e.stopPropagation();
      if(target.tagName.toLowerCase() == 'a') {
        e.preventDefault();
      }
      _currentState.set(contentCb(target));
    };
  };

  return exports;

})(window, document);

var generateEmbed = function(target) {
  var iframe = document.createElement('iframe'),
      src = target.getAttribute('data-embed'),
      height = target.getAttribute('data-height');
  iframe.setAttribute('seamless', 'seamless');
  iframe.setAttribute('class', 'js-generated-embed');
  if(height) {
    iframe.setAttribute('height', height);
  }

  iframe.src = src;
  // iframe.appendChild(target.cloneNode());
  return iframe;
};

var unloadIframe = function(frame) {
  frame.setAttribute('data-src', frame.src);
  frame.src = '';
};

var reloadIframe = function(frame) {
  var src = frame.getAttribute('data-src');
  frame.src = src;
};
var ScrollSpy = function(sections, options){
    var _sections = sections,
        _activeState = new TransitionalState();

    var update = function() {
        var scrollY = window.scrollY;
        var lastVisible;
        for (var i = 0; i < _sections.length; i++) {
            var section = _sections[i];
            // FIXME: there's something fishy because offset is always 1px off both in Fx and Chrome
            // perhaps this is some miscalculation in scrollTop?
            var offset = section.offsetTop - 1;
            if(offset <= scrollY) {
                // If the element's top edge is above
                // the viewport, store it as active
                lastVisible = section;
            }
            else {
                // Sections below may be visible too,
                // but we do not care about those
                break;
            }
        }
        if(lastVisible) {
            _activeState.set(lastVisible);
        }
    };
    var throttledUpdate = _throttle(update, 250); // TODO options

    var disable = function() {
        window.removeEventListener('scroll', throttledUpdate);
    };

    var enable = function() {
        window.addEventListener('scroll', throttledUpdate);
        update();
    };

    enable();

    return {
        state: _activeState,
        disable: disable,
        enable: enable,
        update: update
    };
};
var hideClass = 'js-hide';
var showClass = 'js-show';
var activeClass = 'js-active';

var elementToggler = function(target) {
  return function() {

  };
};

var toggleElement = function(target, force) {
  if(!target) {
    return false;
  }
  switch(force) {
    case true:
      showElement(target);
      return true;
    case false:
      hideElement(target);
      return false;
    default:
      var cls = toggleClasses(target, [hideClass, showClass]);
      return (cls == showClass);
  }
};

var toggleElements = function(targets, force) {
  forEach(targets, function(target){
    toggleElement(target, force);
  });
};

var showElement = function(target) {
  if(target) {
    target.classList.add(showClass);
    target.classList.remove(hideClass);
  }
};

var hideElement = function(target) {
  if(target) {
    target.classList.add(hideClass);
    target.classList.remove(showClass);
  }
};

var toggleActiveElement = function(target, force) {
  if(target) {
    target.classList.toggle(activeClass, force);
  }
};

var isActiveElement = function(target) {
  if(!target) {
    return false;
  }

  return target.classList.contains(activeClass);
};

var hideElements = function(elements) {
  elements.forEach(function(el){
    hideElement(el);
  });
};
(function() {
  var targets = {},
      sections = document.querySelectorAll('.js-section');

  // Collect sections based on link elements,
  // arrange links to and id => link hash
  forEach(document.querySelectorAll('.js-nav a'), function(link){
    var id = link.hash.substring(1);
    targets[id] = link;
  });

  var spy = ScrollSpy(sections);

  // Set active link in navigation
  spy.state.transition(function(oldElement, newElement){
    try {
      var oldId = oldElement.id;
      toggleActiveElement(targets[oldId], false);
    } catch(e){}
    try {
      var newId = newElement.id;
      toggleActiveElement(targets[newId], true);
    } catch(e){}
  });

  // Track a 'pageview' once new section is reached
  // (with some time threshold to prevent too much noise)
  var trackSection = _throttle(function(sectionEl){
    try {
      var trackHsh = sectionEl.getAttribute('data-trackhash');
      if(trackHsh === null) {
        trackHsh = '#' + sectionEl.id;
      }
      ga('set', 'page', location.pathname + location.search + trackHsh);
      ga('send', 'pageview');
    } catch(e){}
  }, 3000);
  spy.state.watch(trackSection);


  // Smooth scroll handler, disables scrollSpy while in progress
  var scrollLinkHandler = function(ev) {
    ev.preventDefault();
    var hash = this.hash,
        blur = this.blur.bind(this);

    pushHash(hash);
    spy.disable();
    // using the history api to solve issue #1 - back doesn't work
    // most browser don't update :target when the history api is used:
    // THIS IS A BUG FROM THE BROWSERS.
    // change the scrolling duration in this call
    smoothScroll(document.querySelector(hash), 500, function(el) {
        location.replace('#' + el.id);
        // this will cause the :target to be activated.
        blur();
        spy.enable();
    });

  };


  // We look for all the internal links in the documents and attach the smoothscroll function
  document.addEventListener('DOMContentLoaded', function () {
      var links = document.querySelectorAll('.js-scroll');
      forEach(links, function(link){
        link.addEventListener('click', scrollLinkHandler, false);
      });
  });

})();

var createToggler = function(text) {
  var btn = document.createElement('button'),
      wrapper = document.createElement('div');
  wrapper.className = 'more-toggler-wr';

  btn.setAttribute('type', 'button');
  btn.className = 'more-toggler';

  wrapper.appendChild(btn);

  return {
    button: btn,
    wrapper: wrapper
  };
};

var ShowMore = function(target) {
  var _toggleTarget = target;
  var _toggler = createToggler();
  var _btn = _toggler.button,
      _wrapper = _toggler.wrapper;

  var _label = _toggleTarget.getAttribute('data-label');

  _toggler.button.addEventListener('click', function(e){
    var shown = toggleElement(_toggleTarget),
        eTarget = e.target;
    var blurTarget = eTarget.blur.bind(eTarget);

    toggleActiveElement(_btn, shown);
    // scroll only if the target is being displayed, not hidden
    if(shown) {
      window.smoothScroll(_wrapper, 500, blurTarget);
      flare.emit({
        category: _toggleTarget.getAttribute('data-category'),
        action: 'click',
        label: _label,
      });
    }
    else {
      blurTarget();
    }
  });

  _toggleTarget.parentNode.insertBefore(_wrapper, _toggleTarget);
};

ShowMore(document.querySelector('.js-more'));

Overlay.init();
var overlayEmbedHandler = function(target) {
  var container = document.createElement('div');
  container.setAttribute('class', 'overlay-inner--embed');
  container.appendChild(generateEmbed(target));
  return container.outerHTML;
};
forEach(document.querySelectorAll('.js-overlay-embed'), function(el) {
  el.addEventListener('click', Overlay.show(el, overlayEmbedHandler), false);
});

var overlayImageHandler = function(target) {
  var image = document.createElement('img');
  image.setAttribute('src', target.getAttribute('href'));
  image.setAttribute('class', 'js-generated-image');
  var container = document.createElement('div');
  container.setAttribute('class', 'overlay-inner--embed');
  container.appendChild(image);
  return container.outerHTML;
};
forEach(document.querySelectorAll('.js-overlay-image'), function(el) {
  el.addEventListener('click', Overlay.show(el, overlayImageHandler), false);
});
// Line-up expander

var LineupExpander = function(rootEl) {
  var DEFAULT_STATE = '#lineup';
  var SEL_ITEM = '.lup-item--detail',
    SEL_CLICK_TGT = '.lup-l',
    SEL_EMBED_LINK = '.js-embed';

  var _root = rootEl;
  var _state = new State(window.location.hash);
  var _activeElement = new TransitionalState();


  // Always push location hash on state change
  _state.watch(function(hsh){
    pushHash(hsh, true);
  });

  // Track clicks on tabs
  _state.watch(function(hsh){
    if(hsh) {
      flare.emit({
        category: 'Line-up',
        action: 'click',
        label: hsh,
      });
    }
  });

  // Reset to default state, unset active element
  _state.when(DEFAULT_STATE, function(){
    _activeElement.set(null);
  });

  // When new element is selected (or unset),
  // toggle active one and manage embeds.
  _activeElement.transition(function(oldElement, newElement) {
    if(oldElement) {
      toggleActiveElement(oldElement, false);
      unloadEmbed(oldElement);
    }

    if(newElement) {
      convertEmbed(newElement) || reloadEmbed(newElement);
      toggleActiveElement(newElement, true);
    }
  });

  var unloadEmbed = function(parent) {
    var iframe = parent.querySelector('iframe');
    if(iframe) {
      unloadIframe(iframe);
    }
  };

  var reloadEmbed = function(parent) {
    var iframe = parent.querySelector('iframe');
    if(iframe) {
      reloadIframe(iframe);
      return true;
    }
    return false;
  };

  var convertEmbed = function(parent) {
    var elink = parent.querySelector(SEL_EMBED_LINK);
    if(elink) {
      var embed = generateEmbed(elink);
      elink.parentNode.replaceChild(embed, elink);
      return true;
    }
    return false;
  };

  forEach(_root.querySelectorAll(SEL_ITEM), function(item){
    var id = item.id;
    var clickTarget = item.querySelector(SEL_CLICK_TGT);

    _state.when('#' + id, function(){
      _activeElement.set(item);
      smoothScroll(item, 500, null, 'up');
    });


    clickTarget.addEventListener('click', function(ev){
      ev.preventDefault();
      this.blur();
      if(this.hash === window.location.hash) {
        _state.set(DEFAULT_STATE);
      }
      else {
        _state.set(this.hash);
      }
    }, false);
  });

};

forEach(document.querySelectorAll('.js-lup-wr'), function(lupWr) {
  LineupExpander(lupWr);
});


window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
var wrap = document.getElementById("header-bgvid");
var vid = document.getElementById("bgvid");
if (window.mobilecheck()){
  vid.outerHTML = ""; 
} else {
  var adaptVideo = function(){
    if (wrap.offsetWidth / wrap.offsetHeight > 1920/1080){
      vid.style.height = "auto";
      vid.style.width = "100%";
    } else {
      vid.style.height = "100%";
      vid.style.width = "auto";
    }
  }
  
  var toResize = false;
  window.addEventListener("resize", function(){
    toResize = true;
  });
  setInterval(function() {
      if ( toResize ) {
          toResize = false;
          adaptVideo();
      }
  }, 250);
  adaptVideo();
}
;
})();

















