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


  // Line-up expander
  var lineupItems = document.querySelectorAll('.lup-item');
  var activeDesc, activeItem;

  forEach(lineupItems, function(i, parent){
    var clickTarget = parent.querySelector('.lup-title');
    var lupDesc = parent.querySelector('.lup-det');
    // var toggler = elementToggler(toggleTarget);

    var id = parent.id;

    clickTarget.addEventListener('click', function(){
      // Media query hack:
      // we have '', '2n', '3n' on parent's :before content
      var currentNth = getPseudoContent(parent);
      // we will hide and disable previous elements
      var selectedSame = (activeItem == parent);

      var currentDesc;

      hideElement(activeDesc);
      toggleActiveElement(activeItem, false);

      // Target is a closest sibling
      // → copy description
      if (currentNth) {
        // Get closest sibling to our current element
        var siblingSel = '#' + id + ' ~ .lup-det--' + currentNth;
        var copyTarget = document.querySelector(siblingSel);
        copyTarget.innerHTML = lupDesc.innerHTML;
        currentDesc = copyTarget;
      }
      // Target is existing .lup-det
      // → toggle the active state
      else {
        currentDesc = lupDesc;
      }
      activeDesc = currentDesc;
      activeItem = parent;

      if(!selectedSame) {
        toggleElement(currentDesc);
        toggleActiveElement(parent);
      }
    });
  });

