var generateEmbed = function(target) {
  var iframe = document.createElement('iframe'),
      src = target.getAttribute('data-embed');
  iframe.setAttribute('seamless', 'seamless');
  iframe.setAttribute('class', 'js-generated-embed');
  iframe.src = src;
  // iframe.appendChild(target.cloneNode());
  return iframe;
};
