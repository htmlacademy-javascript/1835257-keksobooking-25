import {ServerUrl} from './const.js';

const getData = async (onError) => {
  let response;
  try {
    response = await fetch(
      ServerUrl.GET_URL,
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    );
    return await response.json();
  }
  catch (err) {
    onError();
    return [];
  }
};

const sendData = (body, reset, onSuccess, onError) => {
  fetch(
    ServerUrl.POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        reset();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
