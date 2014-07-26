
Overlay.init();
var overlayEmbedHandler = function(target) {
  var container = document.createElement('div');
  container.setAttribute('class', 'overlay-inner--embed');
  container.appendChild(generateEmbed(target));
  return container.outerHTML;
};
forEach(document.querySelectorAll('.js-overlay-embed'), function(el) {
  el.addEventListener('click', Overlay.show(el, overlayEmbedHandler), false);
});
