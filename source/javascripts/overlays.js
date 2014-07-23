
Overlay.init();
var overlayEmbedHandler = function(target) {
  return generateEmbed(target).outerHTML;
};
forEach(document.querySelectorAll('.js-overlay-embed'), function(el) {
  el.addEventListener('click', Overlay.show(el, overlayEmbedHandler), false);
});
