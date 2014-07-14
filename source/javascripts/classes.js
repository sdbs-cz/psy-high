var hideClass = 'js-hide';
var showClass = 'js-show';
var activeClass = 'js-active';

var elementToggler = function(target) {
  return function() {

  };
};

var toggleElement = function(target, force) {
  if(target) {
    switch(force) {
      case true:
        showElement(target);
        break;
      case false:
        hideElement(target);
        break;
      default:
        toggleClasses(target, [hideClass, showClass]);
    }
  }
};

var toggleElements = function(targets, force) {
  forEach(targets, function(target){
    console.log(target);
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
