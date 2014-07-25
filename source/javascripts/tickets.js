
var TicketsForm = function(form) {

  var _form = form;

  var _submitBtn = _form.querySelector('.js-submit');

  var CLS_FLASH_OK = 'flash-success',
      CLS_FLASH_ERROR = 'flash-error';

  var setFlash = function(state) {
    var flashContainer = _form.querySelector('.js-flash'),
        cssClass = CLS_FLASH_OK,
        msg;

    if(state !== 'ok') {
      cssClass = CLS_FLASH_ERROR;
    }
    flashContainer.classList.add(cssClass);
    msg = flashContainer.getAttribute('data-' + state);
    flashContainer.innerHTML = msg;

    showElement(flashContainer);
  };

  var responseLoad = function() {
    var data = JSON.parse(this.responseText);

    switch (data.result) {
      case 'ok':
        setFlash('ok');
        break;
      case 'invalidparams':
        setFlash('invalid');
        break;
      default:
        setFlash('error');
    }
    _submitBtn.disabled = false;

    flare.emit({
      category: 'Tickets',
      action: 'response',
      value: data.result || 'unknown',
    });
  };

  var responseError = function() {
    setFlash('error');
    _submitBtn.disabled = false;
  };

  var sendForm = function(e) {
    _submitBtn.disabled = true;

    e.preventDefault();

    var data = new FormData(_form);
    data.append('ajax', 1);

    // var targetUrl = 'https://cors-test.appspot.com/test';
    var targetUrl = form.target;

    flare.emit({
      category: "Tickets",
      action: "submit",
      label: "Amount",
      value: _form.elements.ticket_amount.value,
    });

    var xhr = new XMLHttpRequest();
    xhr.onload = responseLoad;
    xhr.onerror = responseError;
    xhr.open('POST', targetUrl, true);
    //.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    xhr.send(data);

    //e.preventDefault();
    return false;
  };

  _form.addEventListener('submit', sendForm, false);
};

TicketsForm(document.getElementById('tickets-f'));
