import {showAlert} from './util.js';
import {openErrorSendMessage, openSuccessSendMessage} from './errors.js';
import {ServerUrl} from './const.js';

const getData = async () => {
  let response;
  try {
    response = await fetch(
      ServerUrl.GET_URL,
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    );
  }
  catch (err) {
    showAlert('Не удалось получить данные с сервера :(');
    return [];
  }

  const allAds = await response.json();
  return allAds;
};

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
