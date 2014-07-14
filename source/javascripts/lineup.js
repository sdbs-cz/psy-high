// Line-up expander
(function(){
  var SEL_ITEM = '.lup-item',
      SEL_TITLE = '.lup-title',
      SEL_DETAIL = '.lup-det',
      SEL_MQ_CONTAINER = '.lup-wr';


  // global state
  var lineupItems = document.querySelectorAll(SEL_ITEM);
  var _activeItem = new State();

  var currentMq = function(src) {
    getPseudoContent(src);
  };

  var nextClosestSibling = function(forId, nthName) {
    var siblingSel = '#' + forId + ' ~ .lup-det--' + nthName;
    return document.querySelector(siblingSel);
  };


  var clickHandler = function(item) {
    var desc = item.querySelector(SEL_DETAIL),
        id = item.id;

    var copyTargets = [
              nextClosestSibling(id, '2n'),
              nextClosestSibling(id, '3n')
        ];

    var targetState = new State();
    targetState.watch(function(innerHTML) {
      console.log('state changed');
      copyTargets.forEach(function(target) {
        target.innerHTML = innerHTML;
      });
    });

    return function() {
      /*var shouldHide = isActiveElement(item);
      toggleActiveElement(_activeItem, false);
      // unset active click target
      if(shouldHide){
        toggleActiveElement(item, false);
      }
      else {
        toggleActiveElement(item, true);
      }*/

      targetState.set(desc.innerHTML);

      copyTargets.forEach(function(target) {
        toggleElement(target);
      });
      toggleElement(desc);
    };
  };

  var stateHandler = function(srcItem) {

    var desc = srcItem.querySelector(SEL_DETAIL),
        id = srcItem.id;

    var copyTargets = [
              nextClosestSibling(id, '2n'),
              nextClosestSibling(id, '3n')
        ];
    var hideTargets = copyTargets.concat(desc);
    return function(newItem) {
      if(!newItem) {
        hideElements(hideTargets);
        return;
      }

      copyTargets.forEach(function(target) {
        target.innerHTML = innerHTML;
      });
    };

  };

  forEach(lineupItems, function(i, item){
    var clickTarget = item.querySelector(SEL_TITLE);
    // var toggler = elementToggler(toggleTarget);

    _activeItem.watch(function(selected){
      var isThis = (selected === item);
      toggleActiveElement(item, isThis);
    });

    _activeItem.watch(stateHandler(item));

    clickTarget.addEventListener('click', function(){
      if(isActiveElement(item)) {
        _activeItem.set(null);
      } else {
        _activeItem.set(item);
      }
    });
    // clickTarget.addEventListener('click', clickHandler(item));
      /*, function(){
      // Media query hack:
      // we have '', '2n', '3n' on parent's :before content
      var currentNth = currentMq(parent);
      // we will hide and disable previous elements
      var selectedSame = (activeItem == parent);

      var currentDesc;

      toggleElement(activeDesc);
      if(selectedSame) {
        toggleActiveElement(activeItem);
      }

      // Target is a closest sibling
      // → copy description
      if (currentNth) {
        // Get closest sibling to our current element
        var siblingSel = '#' + id + ' ~ .lup-det--' + currentNth;
        var copyTarget = document.querySelector(siblingSel);
        copyTarget.innerHTML = lupDesc.innerHTML;
        currentDesc = copyTarget;
      }
      // Target is existing .lup-det
      // → toggle the active state
      else {
        currentDesc = lupDesc;
      }

      if(!selectedSame) {
        toggleElement(currentDesc);
        toggleActiveElement(parent);
      }

      activeDesc = currentDesc;
      activeItem = parent;
    });*/
  });

})();


