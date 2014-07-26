var linkHandler = function(ev) {
    ev.preventDefault();

    if (location.hash !== this.hash) {
      window.history.pushState(null, null, this.hash);
    }
    // using the history api to solve issue #1 - back doesn't work
    // most browser don't update :target when the history api is used:
    // THIS IS A BUG FROM THE BROWSERS.
    // change the scrolling duration in this call
    smoothScroll(document.querySelector(this.hash), 500, function(el) {
        location.replace('#' + el.id);
        // this will cause the :target to be activated.
    });
};

// We look for all the internal links in the documents and attach the smoothscroll function
document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll('a[href^="#"]');
    forEach(links, function(link){
      link.addEventListener('click', linkHandler, false);
    });
});
