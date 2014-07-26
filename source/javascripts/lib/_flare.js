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
