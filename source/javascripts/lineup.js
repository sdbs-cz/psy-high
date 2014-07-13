// Line-up expander
(function(){
  var SEL_ITEM = '.lup-item',
      SEL_TITLE = '.lup-title',
      SEL_DETAIL = '.lup-det',
      SEL_MQ_CONTAINER = '.lup-wr';


  // global state
  var _activeDesc, _activeItem;

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

      copyTargets.forEach(function(target) {
        target.innerHTML = desc.innerHTML;
        toggleElement(target);
      });
      toggleElement(desc);

      _activeItem = item;

    };
  };

  var lineupItems = document.querySelectorAll(SEL_ITEM);

  forEach(lineupItems, function(i, parent){
    var clickTarget = parent.querySelector(SEL_TITLE);
    // var toggler = elementToggler(toggleTarget);
    clickTarget.addEventListener('click', clickHandler(parent));

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


