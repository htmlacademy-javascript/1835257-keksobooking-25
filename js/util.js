import {
  FEATURES, getRandomArrayElements, getRandomAvatar, getRandomLocationPoint,
  LAT_LIMIT_MAX,
  LAT_LIMIT_MIN,
  LNG_LIMIT_MAX,
  LNG_LIMIT_MIN,
  PHOTOS,
  TIMES,
  TYPES
} from './data.js';

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    throw new Error('Недопустимое значение диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;};


const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

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

export {createAdvertisement, getRandomArrayElement, getRandomInteger};
