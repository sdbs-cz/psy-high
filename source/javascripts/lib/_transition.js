

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
