
var NAV_EL = document.querySelector('.js-nav');


var navHeadhesive = new Headhesive(NAV_EL, {
  offset: '.wr--main',
  classes: {
    clone: 'nav--clone',
    stick: 'nav--stick',
    unstick: 'nav--unstick'
  }
});

// Scrollspy
var NavScrollSpy = function(_root) {

};