
// Matches polyfill
// https://gist.github.com/jonathantneal/3062955
window.Element && function(ElementPrototype) {
  ElementPrototype.matches = ElementPrototype.matches ||
    ElementPrototype.matchesSelector ||
    ElementPrototype.mozMatchesSelector ||
    ElementPrototype.msMatchesSelector ||
    ElementPrototype.oMatchesSelector ||
    ElementPrototype.webkitMatchesSelector ||
    function(selector) {
      var node = this,
        nodes = (node.parentNode || node.document).querySelectorAll(selector),
        i = -1;

      while (nodes[++i] && nodes[i] != node);

      return !!nodes[i];
    };
}(Element.prototype);

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
