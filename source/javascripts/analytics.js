var analyticsDecorator = function(e) {
  try {
    ga('linker:decorate', e.target);
  }
  catch (ex) {}
};

forEach(document.querySelectorAll('.js-decorate'), function(target){
  addListeners(target, ['mousedown','keydown','touchstart'], analyticsDecorator);
});
