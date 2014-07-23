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
