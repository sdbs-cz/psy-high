var ScrollSpy = function(sections, options){
    var _sections = sections,
        _activeState = new TransitionalState();

    var update = function() {
        var scrollY = window.scrollY;
        var lastVisible;
        for (var i = 0; i < _sections.length; i++) {
            var section = _sections[i];
            // FIXME: there's something fishy because offset is always 1px off both in Fx and Chrome
            // perhaps this is some miscalculation in scrollTop?
            var offset = section.offsetTop - 1;
            if(offset <= scrollY) {
                // If the element's top edge is above
                // the viewport, store it as active
                lastVisible = section;
            }
            else {
                // Sections below may be visible too,
                // but we do not care about those
                break;
            }
        }
        if(lastVisible) {
            _activeState.set(lastVisible);
        }
    };
    var throttledUpdate = _throttle(update, 250); // TODO options

    var disable = function() {
        window.removeEventListener('scroll', throttledUpdate);
    };

    var enable = function() {
        window.addEventListener('scroll', throttledUpdate);
        update();
    };

    enable();

    return {
        state: _activeState,
        disable: disable,
        enable: enable,
        update: update
    };
};
