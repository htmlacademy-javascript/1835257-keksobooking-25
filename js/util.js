const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    throw new Error('Недопустимое значение диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;};


const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

export {getRandomArrayElement, getRandomInteger};
