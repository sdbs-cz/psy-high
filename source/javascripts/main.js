(function() {
  'use strict';


  var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]); // passes back stuff we need
    }
  };


  /*var showMore = function(selector) {
    var $expandWrapper = $('<div class="js-hide-wr"/>');
    var $expandBtn = $('<button type="Button" class="js-hide-expander">Více</button>');
    var classToggler = function(target) {
      return function() {
        $(target).toggleClass('hide');
      };
    };
    $(selector).addClass('hide').each(function() {
      var $this = $(this);
      var $btn = $expandBtn.clone();
      $btn.click(classToggler(this));
      $(this).before($expandWrapper.append($btn));
    });
  };

  showMore('.js-hide');*/


  var hideClass = 'js-hide';
  var showClass = 'js-show';
  var activeClass = 'js-active';

  var elementToggler = function(target) {
    return function() {
      target.classList.toggle(hideClass);
      target.classList.toggle(showClass);
    };
  };

  // Line-up expander
  var lineupItems = document.querySelectorAll('.lup-item');
  forEach(lineupItems, function(i, el){
    var toggler = el.querySelector('.lup-title');
    var toggleTarget = el.querySelector('.lup-desc');
    toggler.addEventListener('click', elementToggler(toggleTarget));
  });



})();
