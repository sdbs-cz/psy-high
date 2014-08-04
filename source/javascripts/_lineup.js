// Line-up expander



var ActiveElementState = function() {
  var _activeElement;

  return function(newElement) {
    toggleActiveElement(_activeElement, false);
    _activeElement = newElement;
    toggleActiveElement(newElement, true);
  };
};

var LineupExpander = function(rootEl) {
  var DEFAULT_STATE = '#lineup';
  var SEL_ITEM = '.lup-item',
    SEL_CLICK_TGT = '.lup-l',
    SEL_DETAIL = '.lup-det',
    SEL_DETAIL_TARGETS = '.js-det-tgt',
    SEL_EMBED_LINK = '.js-embed';

  var _root = rootEl;
  var _state = new State(window.location.hash);


  var setActiveElement = ActiveElementState();

  // Always push location hash on state change
  _state.watch(function(hsh){
    pushHash(hsh, true);
  });

  _state.when(DEFAULT_STATE, function(){
    setActiveElement(null);
  });

  forEach(_root.querySelectorAll(SEL_ITEM), function(item){

    var id = item.id;
    var clickTarget = item.querySelector(SEL_CLICK_TGT);

    _state.when('#' + id, function(){
      setActiveElement(item);
      smoothScroll(item, 500, null, 'up');
    });


    clickTarget.addEventListener('click', function(ev){
      ev.preventDefault();
      if(this.hash === window.location.hash) {
        _state.set(DEFAULT_STATE);
      }
      else {
        _state.set(this.hash);
      }
    }, false);
  });

    // SEL_DETAIL_COPY = '.lup-det--';
    /*
  var _activeItem = new State();
  var _activeDetails = new State();

  var nextClosestSibling = function(forId, nthName) {
    var siblingSel = '#' + forId + ' ~ .lup-det--' + nthName;
    return document.querySelector(siblingSel);
  };

  var closestSiblings = function(forEl) {
    var id = forEl.id;
    var siblings = [
      nextClosestSibling(id, '2n'),
      nextClosestSibling(id, '3n')
    ];
    // Remove null
    return siblings.filter(function(e) {
      return e !== null;
    });
  };

  var copyContents = function(from, to) {
    forEach(to, function(target) {
      target.innerHTML = from.innerHTML;
    });
  };

  var convertEmbeds = function(parent) {
    var elink = parent.querySelector(SEL_EMBED_LINK);
    if(elink) {
      var embed = generateEmbed(elink);
      elink.parentNode.replaceChild(embed, elink);
    }
  };

  // click handlers and state observer for individual items
  forEach(_root.querySelectorAll(SEL_ITEM), function(item){
    var clickTarget = item.querySelector(SEL_CLICK_TGT),
        localDetail = item.querySelector(SEL_DETAIL),
        copyTargets = closestSiblings(item);
    // var hideTargets = copyTargets.concat(localDetail);

    clickTarget.addEventListener('click', function(){
      if(isActiveElement(item)) {
        _activeItem.set(null);
        _activeDetails.set([]);
      } else {
        _activeItem.set(item);
      }
    });

    _activeItem.watch(function(selected){
      var isThis = (selected === item);

      toggleActiveElement(item, isThis);
      if(isThis) {
        convertEmbeds(localDetail);
        copyContents(localDetail, copyTargets);
        _activeDetails.set(copyTargets);
        smoothScroll(item, 500, null, 'up');
      }
    });
  });

  // state observers for details
  forEach(_root.querySelectorAll(SEL_DETAIL_TARGETS), function(self){
    _activeDetails.watch(function(activeGrp){
      var isSelf = (activeGrp.indexOf(self) !== -1);
      toggleElement(self, isSelf);
    });
  });*/
};

forEach(document.querySelectorAll('.js-lup-wr'), function(lupWr) {
  LineupExpander(lupWr);
});


