var ScrollSpy = function(sections, options){
    var _sections = sections,
        _activeState = new TransitionalState();

    var update = function() {
        var scrollY = window.scrollY;
        var lastVisible;
        for (var i = 0; i < _sections.length; i++) {
            var section = _sections[i];
            var offset = section.offsetTop;

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

    window.addEventListener('scroll', throttledUpdate);

    var disable = function(callback) {
        window.removeEventListener('scroll', throttledUpdate);
        callback(function(){
            window.addEventListener('scroll', throttledUpdate);
            update();
        });
    };

    return {
        state: _activeState,
        disable: disable,
        update: update
    };
};
