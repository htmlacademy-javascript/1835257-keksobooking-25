import {sendData} from './api.js';
import {getLocationToString, INITIAL_COORDS, resetPoints} from './map.js';
import {resetImages} from './avatar.js';
import {
  adTypesToPrice,
  MAX_PRICE_FOR_NIGHT,
  NUMBER_AFTER_POINT,
  ROOMS_GUESTS_OPTIONS, SLIDER_STEP_PRICE
} from './const.js';
import {adForm} from './form-activate.js';
import {openMessage} from './errors.js';

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const sliderPrice = document.querySelector('.ad-form__slider');
const resetButton = document.querySelector('.ad-form__reset');
const sendButton = document.querySelector('.ad-form__submit');
const resetFormButton = document.querySelector('.ad-form__reset');
const mainPinLocation = document.querySelector('#address');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const pristine = new Pristine(adForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const validateAdPrice = (value) => value >= adTypesToPrice[adType.value] && value <= MAX_PRICE_FOR_NIGHT;
const getAdTypeErrorMessage = () => `Минимальная цена за ночь: ${adTypesToPrice[adType.value]}`;

pristine.addValidator(
  adPrice,
  validateAdPrice,
  getAdTypeErrorMessage
);

const onAdTypeChange = () => {
  adPrice.min = adTypesToPrice[adType.value];
  adPrice.placeholder =  adTypesToPrice[adType.value];
  if (adPrice.value) {
    pristine.validate(adPrice);
  }
};

adType.addEventListener('change', () => {
  onAdTypeChange();
});


const validateDelivery = () => ROOMS_GUESTS_OPTIONS[roomNumber.value].includes(capacity.value);
const getDeliveryErrorMessage = () => 'Выберите другое кол-во гостей :)';

pristine.addValidator(
  capacity,
  validateDelivery,
  getDeliveryErrorMessage
);

roomNumber.addEventListener('change', () => {
  pristine.validate(capacity);
});

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
  mainPinLocation.value = getLocationToString(INITIAL_COORDS, NUMBER_AFTER_POINT);
  resetPoints();
  resetImages();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    sendData(new FormData(evt.target),
      () => resetForm(evt),
      () => openMessage(successTemplate, false),
      () => openMessage(errorTemplate, true),
    );
    sendButton.disabled = true;
  }
});

const onClickResetButton = (evt) => {
  resetForm(evt);
};

resetFormButton.addEventListener('click', onClickResetButton);

noUiSlider.create(sliderPrice, {
  range: {
    min: adTypesToPrice[adType.value],
    max: MAX_PRICE_FOR_NIGHT,
  },
  start: adPrice.placeholder,
  step: SLIDER_STEP_PRICE,
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
