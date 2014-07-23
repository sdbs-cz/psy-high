
Overlay.init();

var embedDisplayHandler = function(target) {
  var iframe = document.createElement('iframe'),
      src = target.getAttribute('data-embed');
  iframe.setAttribute('seamless', null);
  iframe.src = src;
  return iframe.outerHTML;
};

forEach(document.querySelectorAll('.js-overlay-embed'), function(el) {
  el.addEventListener('click', Overlay.show(el, embedDisplayHandler), false);
});
