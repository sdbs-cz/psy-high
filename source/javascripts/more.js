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
    e.target.blur();
  });

  _toggleTarget.parentNode.insertBefore(_toggler.wrapper, _toggleTarget);
};

ShowMore(document.querySelector('.js-more'));
