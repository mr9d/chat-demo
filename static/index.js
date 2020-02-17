(function () {
  const UPDATE_INTERVAL = 3000;

  const messageTemplate = document.querySelector('#message-template').content;
  const mainElement = document.querySelector('.main');

  const nameFormPopupElement = document.querySelector('.name-form-popup');
  const nameForm = nameFormPopupElement.querySelector('form');
  const nameInput = nameForm.querySelector('input');

  const messageForm = document.querySelector('.send-message-form');
  const messageInput = messageForm.querySelector('.message-area');

  const messageTitleNameElement = document.querySelector('.message-title-name');

  let name = localStorage.getItem('name');

  let lastUpdateTime = null;

  const showMessage = (message) => {
    messageElement = messageTemplate.cloneNode(true);
    messageElement.querySelector('.message-title').innerText = message.name;
    messageElement.querySelector('.message-text').innerText = message.message;
    if(message.name === name) {
      messageElement.querySelector('.message').classList.add('message-my');
    }
    mainElement.insertBefore(messageElement, messageForm.nextSibling);
  };

  const updateMessages = () => {
    const url = '/msg' + (lastUpdateTime ? '?since=' + lastUpdateTime : '');
    fetch(url)
      .then(response => response.json())
      .then(messages => {
        console.log(messages);
        if(messages.length > 0) {
          lastUpdateTime = messages[messages.length - 1].date;
          messages.forEach(showMessage);
        }
        setTimeout(updateMessages, UPDATE_INTERVAL);
      });
  };

  const updateMessageTitleName = () => {
    messageTitleNameElement.innerHTML = name;
  };

  const messageTitleNameClickHandler = () => {
    showNameForm();
  };

  const initMessageTitleName = () => {
    updateMessageTitleName();
    messageTitleNameElement.addEventListener('click', messageTitleNameClickHandler);
  };

  const messageFormSubmitHandler = (evt) => {
    evt.preventDefault();
    messageForm.setAttribute('disabled', 'disabled');
    fetch('/msg', {
      method: 'POST',
      body: JSON.stringify({ name: name, message: messageInput.value }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      messageInput.value = '';
      messageForm.classList.remove('message-submit_off');
      messageForm.removeAttribute('disabled');
    });
  };

  const initMessageForm = () => {
    messageForm.addEventListener('submit', messageFormSubmitHandler);
  }

  const showNameForm = () => {
    nameInput.value = name;
    nameFormPopupElement.classList.add('name-form-popup-visible');
  };

  const hideNameForm = () => {
    nameFormPopupElement.classList.remove('name-form-popup-visible');
  };

  const nameFormSubmitHandler = (evt) => {
    evt.preventDefault();
    localStorage.setItem('name', nameInput.value);
    name = nameInput.value;
    updateMessageTitleName();
    hideNameForm();
  };

  const initNameForm = () => {
    if (!name) {
      showNameForm();
    }
    nameForm.addEventListener('submit', nameFormSubmitHandler);
  };

  const init = () => {
    initNameForm();
    initMessageForm();
    initMessageTitleName();
    updateMessages();
  };

  init();

})();
