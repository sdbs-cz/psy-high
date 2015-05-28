
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

var overlayImageHandler = function(target) {
  var image = document.createElement('img');
  image.setAttribute('src', target.getAttribute('href'));
  image.setAttribute('class', 'js-generated-image');
  var container = document.createElement('div');
  container.setAttribute('class', 'overlay-inner--embed');
  container.appendChild(image);
  return container.outerHTML;
};
forEach(document.querySelectorAll('.js-overlay-image'), function(el) {
  el.addEventListener('click', Overlay.show(el, overlayImageHandler), false);
});
