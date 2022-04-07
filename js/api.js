import {showAlert} from './util.js';
import {openErrorSendMessage, openSuccessSendMessage} from './errors.js';

const getData = (onSuccess) => fetch(
  'https://25.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

  })
  .then((data) => {
    onSuccess(data);
  })
  .catch(() => {
    showAlert('Не удалось получить данные с сервера :(');
  });

const sendData = (body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        openSuccessSendMessage();
      } else {
        openErrorSendMessage();
      }
    })
    .catch(() => {
      openErrorSendMessage();
    });
};

export {getData, sendData};
