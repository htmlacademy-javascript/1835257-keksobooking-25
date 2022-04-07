import {sendData} from './api.js';
import {getLocationToString, INITIAL_COORDS, resetPoints} from './map.js';

const adForm = document.querySelector('.ad-form');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const adTitle = document.querySelector('#title');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const sliderPrice = document.querySelector('.ad-form__slider');
const resetButton = document.querySelector('.ad-form__reset');
const sendButton = document.querySelector('.ad-form__submit');
const resetFormButton = document.querySelector('.ad-form__reset');
const mainPinLocation = document.querySelector('#address');

const MAX_PRICE_FOR_NIGHT = 100000;

const  MIN_AD_PRICE= {
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

const pristine = new Pristine(adForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});


const validateAdTitle = (value) => value.left >= 30 && value.length <= 100;
pristine.addValidator(
  adTitle,
  validateAdTitle,
  'От 30 до 100 символов', 2, true
);


const validateAdPrice = (value) => {
  const unit = document.querySelector('#type');
  return value >= MIN_AD_PRICE[unit.value] && value <= 100000;
};

const getAdTypeErrorMessage = () => {
  const unit = document.querySelector('#type');
  return `Минимальная цена за ночь: ${MIN_AD_PRICE[unit.value]}`;
};

pristine.addValidator(
  adPrice,
  validateAdPrice,
  getAdTypeErrorMessage
);

const setMinPrice = (type, price) => {
  price.min = MIN_AD_PRICE[type.value];
  price.placeholder =  MIN_AD_PRICE[type.value];
};

const onAdTypeChange = () => {
  setMinPrice(adType, adPrice);
  pristine.validate(adPrice);
};

adType.addEventListener('change', () => {
  onAdTypeChange();
});

// Валидация количества комнат и гостей


const validateDelivery = () => ROOMS_OPTION[roomNumber.value].includes(capacity.value);
const getDeliveryErrorMessage = () => 'Выберите другое кол-во гостей :)';

pristine.addValidator(
  capacity,
  validateDelivery,
  getDeliveryErrorMessage
);

roomNumber.addEventListener('change', () => {
  pristine.validate(capacity);
});

// Валидация времени заезда и выезда

const setEqualSelectValues = (first, second) => {
  second.value = first.value;
};

timeIn.addEventListener('change', () => {
  setEqualSelectValues(timeIn, timeOut);
});

timeOut.addEventListener('change', () => {
  setEqualSelectValues(timeOut, timeIn);
});

const resetForm = (evt) => {
  evt.preventDefault();
  pristine.reset();
  adForm.reset();
  mainPinLocation.value = getLocationToString(INITIAL_COORDS, 5);
  resetPoints();
};

sendButton.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    sendData(new FormData(evt.target));
    evt.preventDefault();
    sendButton.disabled = true;
    resetForm(evt);
  }
});

resetFormButton.addEventListener('click', resetForm);

// Добавили слайдер

noUiSlider.create(sliderPrice, {
  range: {
    min: 0,
    max: MAX_PRICE_FOR_NIGHT,
  },
  start: 0,
  step: 100,
});

sliderPrice.noUiSlider.on('slide', () => {
  adPrice.value = sliderPrice.noUiSlider.get();
  pristine.validate(adPrice);
});

adPrice.addEventListener('change', () => {
  sliderPrice.noUiSlider.set(adPrice.value);
});

resetButton.addEventListener('click', () => {
  sliderPrice.noUiSlider.reset();
});
