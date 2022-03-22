import {getRandomArrayElement, getRandomInteger} from './util';

const ADVERTISEMENT_COUNT = 10;

const LAT_LIMIT_MIN = 35.65000;
const LAT_LIMIT_MAX = 35.70000;
const LNG_LIMIT_MIN = 139.70000;
const LNG_LIMIT_MAX = 139.80000;

const TYPES  = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const TIMES = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

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

export {ADVERTISEMENT_COUNT, LAT_LIMIT_MIN, LAT_LIMIT_MAX, LNG_LIMIT_MIN, LNG_LIMIT_MAX, FEATURES, PHOTOS, TIMES, TYPES, getRandomArrayElements, getRandomLocationPoint, getRandomAvatar };
