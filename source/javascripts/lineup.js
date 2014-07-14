// Line-up expander

var LineupExpander = function(rootEl) {
  var SEL_ITEM = '.lup-item',
    SEL_CLICK_TGT = '.lup-title',
    SEL_DETAIL = '.lup-det',
    SEL_DETAIL_TARGETS = '.js-det-tgt';
    // SEL_DETAIL_COPY = '.lup-det--';

  var _root = rootEl;
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
        copyContents(localDetail, copyTargets);
        _activeDetails.set(copyTargets);
      }
    });
  });

  // state observers for details
  forEach(_root.querySelectorAll(SEL_DETAIL_TARGETS), function(self){
    _activeDetails.watch(function(activeGrp){
      var isSelf = (activeGrp.indexOf(self) !== -1);
      toggleElement(self, isSelf);
    });
  });
};

forEach(document.querySelectorAll('.js-lup-wr'), function(lupWr) {
  LineupExpander(lupWr);
});


