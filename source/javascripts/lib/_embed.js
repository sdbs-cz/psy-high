
var generateEmbed = function(target) {
  var iframe = document.createElement('iframe'),
      src = target.getAttribute('data-embed'),
      height = target.getAttribute('data-height');
  iframe.setAttribute('seamless', 'seamless');
  iframe.setAttribute('class', 'js-generated-embed');
  if(height) {
    iframe.setAttribute('height', height);
  }

  iframe.src = src;
  // iframe.appendChild(target.cloneNode());
  return iframe;
};

var unloadIframe = function(frame) {
  frame.setAttribute('data-src', frame.src);
  frame.src = '';
};

var reloadIframe = function(frame) {
  var src = frame.getAttribute('data-src');
  frame.src = src;
};
