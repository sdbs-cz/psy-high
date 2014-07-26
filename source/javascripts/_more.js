var createToggler = function(text) {
  var btn = document.createElement('button'),
      wrapper = document.createElement('div');
  wrapper.className = 'more-toggler-wr';

  btn.setAttribute('type', 'button');
  btn.className = 'more-toggler';

  wrapper.appendChild(btn);

  return {
    button: btn,
    wrapper: wrapper
  };
};

var ShowMore = function(target) {
  var _toggleTarget = target;
  var _toggler = createToggler();
  var _btn = _toggler.button,
      _wrapper = _toggler.wrapper;

  _toggler.button.addEventListener('click', function(e){
    var shown = toggleElement(_toggleTarget),
        eTarget = e.target;
    var blurTarget = eTarget.blur.bind(eTarget);

    toggleActiveElement(_btn, shown);
    // scroll only if the target is being displayed, not hidden
    if(shown) {
      window.smoothScroll(_wrapper, 500, blurTarget);
    }
    else {
      blurTarget();
    }
  });

  _toggleTarget.parentNode.insertBefore(_wrapper, _toggleTarget);
};

ShowMore(document.querySelector('.js-more'));
