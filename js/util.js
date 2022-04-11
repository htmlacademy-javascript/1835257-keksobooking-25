const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    throw new Error('Недопустимое значение диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;};


const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '300px';
  alertContainer.style.right = '50%';
  alertContainer.style.transform = 'translateX(50%)';
  //alertContainer.style.left = 0;
  alertContainer.style.top = '55px';

  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '12px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ffaa99';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

export {getRandomArrayElement, getRandomInteger, isEscapeKey, showAlert};
