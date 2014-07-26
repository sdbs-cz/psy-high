/*
 * smoothScroll by Alice Lieutier
 * https://github.com/alicelieutier/smoothScroll
 *
 * Licensed under MIT License
 */

window.smoothScroll = (function(){
'use strict';
// We do not want this script to be applied in browsers that do not support those
// That means no smoothscroll on IE9 and below.
if(document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) {
  return function(){};
}

// Get the top position of an element in the document
var getTop = function(element) {
    // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
    if(element.nodeName === 'HTML')
      return -window.pageYOffset;
    return element.getBoundingClientRect().top + window.pageYOffset;
};
// ease in out function thanks to:
// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
var easeInOutCubic = function (t) { return t < 0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; };

// calculate the scroll position we should be in
// given the start and end point of the scroll
// the time elapsed from the beginning of the scroll
// and the total duration of the scroll (default 500ms)
var position = function(start, end, elapsed, duration) {
    if (elapsed > duration) return end;
    return start + (end - start) * easeInOutCubic(elapsed / duration); // <-- you can change the easing funtion there
    // return start + (end - start) * (elapsed / duration); // <-- this would give a linear scroll
};

// we use requestAnimationFrame to be called by the browser before every repaint
// if the first argument is an element then scroll to the top of this element
// if the first argument is numeric then scroll to this location
// if the callback exist, it is called when the scrolling is finished
var smoothScroll = function(el, duration, callback, direction){
    duration = duration || 500;
    var start = window.pageYOffset,
        end;

    if (typeof el === 'number') {
      end = parseInt(el);
    } else {
      end = getTop(el);
    }

    // We only want to go up
    // → start is lower than end
    if(direction === 'up' && start < end) {
      return;
    }
    // and vice versa
    if(direction === 'down' && start > end) {
      return;
    }

    var clock = Date.now();

    var step = function(){
        var elapsed = Date.now() - clock;
        window.scroll(0, position(start, end, elapsed, duration));
        if (elapsed > duration) {
            if (typeof callback === 'function') {
                callback(el);
            }
        } else {
            requestAnimationFrame(step);
        }
    };
    step();
};

// return smoothscroll API
return smoothScroll;

})();

