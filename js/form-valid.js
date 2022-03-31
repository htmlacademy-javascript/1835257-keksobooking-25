const form = document.querySelector('.ad-form');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const adTitle = document.querySelector('#title');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

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

const pristine = new Pristine(form, {
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

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (isValid) {
    //alert('Можно отправлять');
  } else {
    evt.preventDefault();
    //alert('Форма невалидна');
  }
});
