const ServerUrl = {
  GET_URL: 'https://25.javascript.pages.academy/keksobooking/data',
  POST_URL: 'https://25.javascript.pages.academy/keksobooking',
};

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const BASE_IMG_CONTENT = '<img src="img/muffin-grey.svg" alt="Аватар пользователя" width="40" height="44">';

const INITIAL_COORDS = {
  lat: 35.652832,
  lng: 139.839478,
};

const MAIN_MARKER_COORDS = {
  lat: 35.65283,
  lng: 139.83948,
};

const ADS_COUNT = 10;

const MAP_ZOOM =13;

const NUMBER_AFTER_POINT = 5;

const PriceRanges = {
  any: {
    minprice : 0,
    maxprice : 100000,
  },
  middle: {
    minprice : 10001,
    maxprice : 50000,
  },
  low: {
    minprice : 0,
    maxprice : 10000,
  },
  high: {
    minprice : 50001,
    maxprice : 100000,
  },
};

const MAX_PRICE_FOR_NIGHT = 100000;

const  MIN_AD_PRICE = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const ROOMS_OPTION = {
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
  MIN_AD_PRICE,
  ROOMS_OPTION,
  INITIAL_COORDS,
  NUMBER_AFTER_POINT,
  MAP_ZOOM,
  MAIN_MARKER_COORDS,
  ADS_COUNT};
