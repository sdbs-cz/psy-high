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

var createToggler = function(text) {
  var btn = document.createElement('button'),
      wrapper = document.createElement('div');
  wrapper.className = 'more-toggler-wr';

  btn.type = 'button';
  btn.className = 'more-toggler';

  wrapper.appendChild(btn);

  return {
    button: btn,
    wrapper: wrapper
  };
};

var ShowMore = function(target) {
  var _toggler = createToggler();
  var _btn = _toggler.button;
  var _toggleTarget = target;

  _toggler.button.addEventListener('click', function(e){
    var shown = toggleElement(_toggleTarget);
    toggleActiveElement(_btn, shown);
  });

  _toggleTarget.parentNode.insertBefore(_toggler.wrapper, _toggleTarget);
};

ShowMore(document.querySelector('.js-more'));
