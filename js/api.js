import {showAlert} from './util.js';

const getData = (onSuccess, count) => () => fetch(
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
    data.slice(0, count).forEach((ads) => {
      onSuccess(ads);
    });
  })
  .catch(() => {
    showAlert('Не удалось получить данные с сервера :(');
  });

export {getData};
