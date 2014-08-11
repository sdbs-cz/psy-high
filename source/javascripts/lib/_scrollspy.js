var ScrollSpy = function(links){
    var self = Object.create(ScrollSpy.prototype);

    var _targets = {},
        _sections = [],
        _activeTarget = new TransitionalState();
    forEach(links, function(anchor){
        var id = anchor.hash.substring(1);
        var section = document.getElementById(id);
        _sections.push(section);
        _targets[id] = anchor;
    });

    _activeTarget.transition(function(oldElement, newElement){
        console.log('transition', newElement);
        toggleActiveElement(oldElement, false);
        toggleActiveElement(newElement, true);
    });


    var update = function() {
        var scrollY = window.scrollY;
        var lastVisible;
        for (var i = 0; i < _sections.length; i++) {
            var section = _sections[i];
            var offset = section.offsetTop;

            // If the element's top edge is above
            // the viewport, store it as active
            if(offset <= scrollY) {
                lastVisible = section;
            }
            else {
                break;
            }
        }
        if(lastVisible) {
            var target = _targets[lastVisible.id];
            _activeTarget.set(target);
        }
        else {
            console.log('nope');
        }
    };
    var throttledUpdate = _throttle(update, 250);

    window.addEventListener('scroll', throttledUpdate);
};
