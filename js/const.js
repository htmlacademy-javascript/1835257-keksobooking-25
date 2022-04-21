const ServerUrl = {
  GET_URL: 'https://25.javascript.pages.academy/keksobooking/data',
  POST_URL: 'https://25.javascript.pages.academy/keksobooking',
};

const Messages = {
  GET_NO_ADS: 'Не удалось получить данные с сервера :(',
  FIND_NO_ADS: 'Не удалось найти подходящие объявления',
};

const DEFAULT_VALUE = 'any';
const AVATAR_WIDTH = 40;
const AVATAR_HEIGHT = 44;
const SLIDER_STEP_PRICE = 100;
const MAX_PRICE_FOR_NIGHT = 100000;
const ADS_COUNT = 10;
const MAP_ZOOM = 13;
const NUMBER_AFTER_POINT = 5;
const RERENDER_DELAY = 500;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const BASE_IMG_CONTENT = '<img src="img/muffin-grey.svg" alt="Аватар пользователя" width="40" height="44">';

const AdsTypes = {
  PALACE: 'palace',
  FLAT: 'flat',
  HOUSE: 'house',
  BUNGALOW: 'bungalow',
  HOTEL: 'hotel',
  ANY: 'any',
};

export const adTypesToReadable = {
  [AdsTypes.PALACE]: 'Дворец',
  [AdsTypes.FLAT]: 'Квартира',
  [AdsTypes.HOUSE]: 'Дом',
  [AdsTypes.BUNGALOW]: 'Бунгало',
  [AdsTypes.HOTEL]: 'Отель',
};

const adTypesToPrice = {
  [AdsTypes.PALACE]: 10000,
  [AdsTypes.FLAT]: 1000,
  [AdsTypes.HOUSE]: 5000,
  [AdsTypes.BUNGALOW]: 0,
  [AdsTypes.HOTEL]: 3000,
};

const INITIAL_COORDS = {
  lat: 35.652832,
  lng: 139.839478,
};

const MAIN_MARKER_COORDS = {
  lat: 35.65283,
  lng: 139.83948,
};

const PriceRanges = {
  ANY: {
    minprice : 0,
    maxprice : 100000,
  },
  MIDDLE: {
    minprice : 10001,
    maxprice : 50000,
  },
  LOW: {
    minprice : 0,
    maxprice : 10000,
  },
  HIGH: {
    minprice : 50001,
    maxprice : 100000,
  },
};

const ROOMS_GUESTS_OPTIONS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};


export {ServerUrl,
  FILE_TYPES,
  BASE_IMG_CONTENT,
  PriceRanges,
  MAX_PRICE_FOR_NIGHT,
  ROOMS_GUESTS_OPTIONS,
  INITIAL_COORDS,
  NUMBER_AFTER_POINT,
  MAP_ZOOM,
  MAIN_MARKER_COORDS,
  ADS_COUNT,
  Messages,
  SLIDER_STEP_PRICE,
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
  adTypesToPrice,
  AdsTypes,
  DEFAULT_VALUE,
  RERENDER_DELAY
};
