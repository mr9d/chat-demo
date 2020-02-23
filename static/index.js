(function () {
  const UPDATE_INTERVAL = 3000;

  const messageTemplate = document.querySelector('#message-template').content;
  const messagesElement = document.querySelector('.messages');

  const namePopup = document.querySelector('.name-popup');
  const infoPopup = document.querySelector('.info-popup');

  const nameForm = namePopup.querySelector('form');
  const nameInput = nameForm.querySelector('input');
  const infoPopupButton = infoPopup.querySelector('button');

  const messageForm = document.querySelector('.message-form');
  const messageInput = messageForm.querySelector('input');

  const userButton = document.querySelector('.user-button');
  const infoButton = document.querySelector('.info-button');

  let name = localStorage.getItem('name');

  let lastUpdateTime = null;

  const showMessage = (message) => {
    messageElement = messageTemplate.cloneNode(true);
    messageElement.querySelector('.message-title').innerText = message.name;
    messageElement.querySelector('.message-text').innerText = message.message;
    if(message.name === name) {
      messageElement.querySelector('.message').classList.add('message-my');
    }
    messagesElement.prepend(messageElement);
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
      messageForm.removeAttribute('disabled');
    });
  };

  const initMessageForm = () => {
    messageForm.addEventListener('submit', messageFormSubmitHandler);
  }

  const showNamePopup = () => {
    nameInput.value = name;
    namePopup.classList.add('popup-visible');
  };

  const hideNamePopup = () => {
    namePopup.classList.remove('popup-visible');
  };

  const showInfoPopup = () => {
    infoPopup.classList.add('popup-visible');
  };

  const hideInfoPopup = () => {
    infoPopup.classList.remove('popup-visible');
  };

  const nameFormSubmitHandler = (evt) => {
    evt.preventDefault();
    localStorage.setItem('name', nameInput.value);
    name = nameInput.value;
    hideNamePopup();
  };

  const initNamePopup = () => {
    if (!name) {
      showNamePopup();
    }
    nameForm.addEventListener('submit', nameFormSubmitHandler);
  };

  const initInfoPopup = () => {
    infoPopupButton.addEventListener('click', hideInfoPopup);
  };

  userButtonClickHandler = evt => {
    evt.preventDefault();
    showNamePopup();
  };

  infoButtonClickHandler = evt => {
    evt.preventDefault();
    showInfoPopup();
  };

  const initControl = () => {
    userButton.addEventListener('click', userButtonClickHandler);
    infoButton.addEventListener('click', infoButtonClickHandler);
  };

  const init = () => {
    initNamePopup();
    initInfoPopup();
    initMessageForm();
    initControl();
    updateMessages();
  };

  init();

})();
