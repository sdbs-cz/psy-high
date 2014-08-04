// Line-up expander



var ActiveElementState = function() {
  var _state = new State();
  var _oldValue;

  return {
    set: function(value) {
      _oldValue = _state.get();
      _state.set(value);
    },
    transition: function(callback) {
      _state.watch(function(newValue) {
        callback(_oldValue, newValue);
      });
    }

  };

};

var LineupExpander = function(rootEl) {
  var DEFAULT_STATE = '#lineup';
  var SEL_ITEM = '.lup-item',
    SEL_CLICK_TGT = '.lup-l',
    SEL_EMBED_LINK = '.js-embed';

  var _root = rootEl;
  var _state = new State(window.location.hash);
  var _activeElement = ActiveElementState();


  // Always push location hash on state change
  _state.watch(function(hsh){
    pushHash(hsh, true);
  });

  // Track clicks on tabs
  _state.watch(function(hsh){
    if(hsh) {
      flare.emit({
        category: 'Line-up',
        action: 'click',
        label: hsh,
      });
    }
  });

  // Reset to default state, unset active element
  _state.when(DEFAULT_STATE, function(){
    _activeElement.set(null);
  });

  // When new element is selected (or unset),
  // toggle active one and manage embeds.
  _activeElement.transition(function(oldElement, newElement) {
    if(oldElement) {
      toggleActiveElement(oldElement, false);
      unloadEmbed(oldElement);
    }

    if(newElement) {
      convertEmbed(newElement) || reloadEmbed(newElement);
      toggleActiveElement(newElement, true);
    }
  });

  var unloadEmbed = function(parent) {
    var iframe = parent.querySelector('iframe');
    if(iframe) {
      unloadIframe(iframe);
    }
  };

  var reloadEmbed = function(parent) {
    var iframe = parent.querySelector('iframe');
    if(iframe) {
      reloadIframe(iframe);
      return true;
    }
    return false;
  };

  var convertEmbed = function(parent) {
    var elink = parent.querySelector(SEL_EMBED_LINK);
    if(elink) {
      var embed = generateEmbed(elink);
      elink.parentNode.replaceChild(embed, elink);
      return true;
    }
    return false;
  };

  forEach(_root.querySelectorAll(SEL_ITEM), function(item){
    var id = item.id;
    var clickTarget = item.querySelector(SEL_CLICK_TGT);

    _state.when('#' + id, function(){
      _activeElement.set(item);
      smoothScroll(item, 500, null, 'up');
    });


    clickTarget.addEventListener('click', function(ev){
      ev.preventDefault();
      this.blur();
      if(this.hash === window.location.hash) {
        _state.set(DEFAULT_STATE);
      }
      else {
        _state.set(this.hash);
      }
    }, false);
  });

};

forEach(document.querySelectorAll('.js-lup-wr'), function(lupWr) {
  LineupExpander(lupWr);
});


