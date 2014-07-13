var hideClass = 'js-hide';
var showClass = 'js-show';
var activeClass = 'js-active';

var elementToggler = function(target) {
  return function() {

  };
};

var toggleElement = function(target) {
  if(target) {
    toggleClasses(target, [hideClass, showClass]);
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

  target.classList.contains(activeClass);
};
