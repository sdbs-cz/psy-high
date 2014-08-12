(function() {
  var sections = [],
      targets = {};

  // Collect sections based on link elements,
  // arrange links to and id => link hash
  forEach(document.querySelectorAll('.js-nav a'), function(link){
    var id = link.hash.substring(1);
    var section = document.getElementById(id);
    targets[id] = link;
    sections.push(section);
  });

  var spy = ScrollSpy(sections);

  // Set active link in navigation
  spy.state.transition(function(oldElement, newElement){
    try {
      var oldId = oldElement.id;
      toggleActiveElement(targets[oldId], false);
    } catch(e){}
    try {
      var newId = newElement.id;
      toggleActiveElement(targets[newId], true);
    } catch(e){}
  });

  // Track a 'pageview' once new section is reached
  // (with some time threshold to prevent too much noise)
  var trackSection = _throttle(function(sectionEl){
    try {
      var id = sectionEl.id;
      ga('send', 'pageview', {
       'page': location.pathname + location.search  + '#' + id
      });
    } catch(e){}
  }, 3000);
  spy.state.watch(trackSection);


  // Smooth scroll handler, disables scrollSpy while in progress
  var scrollLinkHandler = function(ev) {
    ev.preventDefault();
    var hash = this.hash,
        blur = this.blur.bind(this);

    pushHash(hash);
    spy.disable();
    // using the history api to solve issue #1 - back doesn't work
    // most browser don't update :target when the history api is used:
    // THIS IS A BUG FROM THE BROWSERS.
    // change the scrolling duration in this call
    smoothScroll(document.querySelector(hash), 500, function(el) {
        location.replace('#' + el.id);
        // this will cause the :target to be activated.
        blur();
        spy.enable();
    });

  };


// We look for all the internal links in the documents and attach the smoothscroll function
document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll('.js-scroll');
    forEach(links, function(link){
      link.addEventListener('click', scrollLinkHandler, false);
    });
});

})();

