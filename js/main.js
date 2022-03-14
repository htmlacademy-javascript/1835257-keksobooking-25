const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    throw new Error('Недопустимое значение диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;};


// Имитация данных

const NUMBER = [1,2,3,4,5,6,7,8,9,10];

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

// Вспомогательные функции
const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

let referenceNumber;
const getRandomAvatar = () => {
  referenceNumber = getRandomArrayElement(NUMBER);
  if (referenceNumber < 10) {
    return (`img/avatars/user0${referenceNumber}.png`);
  }
  return (`img/avatars/user${referenceNumber}.png`);
};

const getRandomLocationPoint = (min, max, decimalPlaces) => {
  if (min >= max) {
    throw new Error('Недопустимое значение диапазона');
  }
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
};


const getRandomArrayElements = (arr) => {
  const maxLength = arr.length;
  const lengthOfArray = getRandomInteger(1, maxLength);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomInteger(0, maxLength - 1);
    const el = arr[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
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

// Собираем массив

const NUMBER_OF_OBJ = 10;
const objectGenerator = new Array(NUMBER_OF_OBJ).fill(null).map(createAdvertisement);

// eslint-disable-next-line no-unused-expressions
objectGenerator;
