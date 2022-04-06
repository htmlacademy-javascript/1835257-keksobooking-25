import {showAlert} from './util.js';

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

export {getData};
