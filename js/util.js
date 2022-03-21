import {
  ADVERTISEMENT_COUNT,
  FEATURES,
  LAT_LIMIT_MAX,
  LAT_LIMIT_MIN,
  LNG_LIMIT_MAX,
  LNG_LIMIT_MIN,
  PHOTOS,
  TIMES,
  TYPES
} from './data.js';

//Получить случайное целое число из диапазона

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    throw new Error('Недопустимое значение диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;};

// Вспомогательные функции
const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];


const getRandomAvatar = () => {
  const referenceNumber = getRandomArrayElement(ADVERTISEMENT_COUNT);
  return referenceNumber < 10 ? `img/avatars/user0${referenceNumber}.png`: `img/avatars/user${referenceNumber}.png`;
};

const getRandomLocationPoint = (min, max, decimalPlaces) => {
  if (min >= max) {
    throw new Error('Недопустимое значение диапазона');
  }
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
};


const getRandomArrayElements = (items) => {
  const maxLength = items.length;
  const lengthOfArray = getRandomInteger(1, maxLength);
  const elements = [];

  while (elements.length < lengthOfArray) {
    const indexOfEl = getRandomInteger(0, maxLength - 1);
    const el = items[indexOfEl];

    if (!elements.includes(el)) {
      elements.push(el);
    }
  }
  return elements;
};

// Собираем объект

const createAdvertisement = () => {
  const randomLat = getRandomLocationPoint(LAT_LIMIT_MIN, LAT_LIMIT_MAX, 5);
  const randomLng = getRandomLocationPoint(LNG_LIMIT_MIN, LNG_LIMIT_MAX, 5);

  return {
    author: {
      avatar: getRandomAvatar(),
    },
    offer: {
      title: 'Продам гараж',
      address: `${randomLat}, ${randomLng}`,
      price: getRandomInteger(5000, 20000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 5),
      guest: getRandomInteger(1, 5),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArrayElements(FEATURES),
      description: 'Чудесная бетонная коробка',
      photos: getRandomArrayElements(PHOTOS),
    },
    location: {
      lat: randomLat,
      lng: randomLng,
    },
  };
};

export {createAdvertisement};
