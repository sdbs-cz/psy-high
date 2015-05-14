(function(){

var CLS_FLASH_OK = 'flash-success',
    CLS_FLASH_ERROR = 'flash-error',
    API_BASE = 'http://progrestinate.com/ticketpro',
    LOW_COUNT = 50;

var setFlashMessage = function(flashContainer, state) {
  var flashContainer,
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

var TicketsForm = function(form, flashElm) {

  var _form = form;

  var _submitBtn = _form.querySelector('.js-submit');

  var setFlash = function(state) {
    return setFlashMessage(flashElm, state);
  }

  var responseLoad = function() {
    var data = JSON.parse(this.responseText);

    switch (data.result) {
      case 'ok':
        setFlash('ok');
        break;
      case 'invalidparams':
        setFlash('invalid');
        break;
      case 'soldout':
        setFlash('soldout');
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

  var sendStart = function() {
    _submitBtn.disabled = true;
  };

  var sendStop = function() {
    _submitBtn.disabled = false;
    _submitBtn.blur();
  };

  var responseError = function() {
    setFlash('error');
    flare.emit({
      category: 'Tickets',
      action: 'response',
      label: 'XHRError',
      value: this.statusText,
    });
    sendStop();
  };

  var sendForm = function(e) {
    e.preventDefault();
    sendStart();

    var data = new FormData(_form);
    data.append('ajax', 1);

    var targetUrl = form.action;

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

function ticketsCount(cb) {
  var ENDPOINT = API_BASE + '/ticketCounter.php';

  var xhr = new XMLHttpRequest();
  xhr.onerror = function() {
    cb(this.statusText);
  };
  xhr.onload = function() {
    var data = JSON.parse(this.responseText);
    var tickets = data.available;
    cb(null, tickets);
  };
  xhr.open('GET', ENDPOINT, true);
  //.setRequestHeader("Content-type","application/x-www-form-urlencoded")
  xhr.send();
}

var $form = document.getElementById('tickets-f');
var $fieldset = document.getElementById('tickets-f-set');
var $flashElm = $form.querySelector('.js-flash');

// On load: Hit API server to check if any tickets are available
ticketsCount(function(err, result) {
  if(result > 0) {
    TicketsForm($form, $flashElm);
  }
  else {
    $fieldset.setAttribute('disabled', true);
    setFlashMessage($flashElm, 'soldout');
  }
})

}());
