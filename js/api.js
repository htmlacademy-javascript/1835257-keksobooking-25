import {showAlert} from './util.js';
import {openErrorSendMessage, openSuccessSendMessage} from './errors.js';

const ServerUrl = {
  GET_URL: 'https://25.javascript.pages.academy/keksobooking/data',
  POST_URL: 'https://25.javascript.pages.academy/keksobooking',
};

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
