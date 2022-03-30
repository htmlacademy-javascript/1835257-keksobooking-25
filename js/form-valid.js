const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const adTitle = document.querySelector('#title');
const validateAdTitle = (value) => value.left >= 30 && value.length <= 100;
pristine.addValidator(
  adTitle,
  validateAdTitle,
  'От 30 до 100 символов', 2, true
);

const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const minAdPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const validateAdPrice = (value) => {
  const unit = document.querySelector('#type');
  return value >= minAdPrice[unit.value] && value <= 100000;
};

const getAdTypeErrorMessage = () => {
  const unit = document.querySelector('#type');
  return `Минимальная цена за ночь: ${minAdPrice[unit.value]}`;
};

pristine.addValidator(
  adPrice,
  validateAdPrice,
  getAdTypeErrorMessage
);

const setMinPrice = (type, price) => {
  price.min = minAdPrice[type.value];
  price.placeholder =  minAdPrice[type.value];
};

const onAdTypeChange = () => {
  setMinPrice(adType, adPrice);
  pristine.validate(adPrice);
};

adType.addEventListener('change', () => {
  onAdTypeChange();
});

// Валидация количества комнат и гостей
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const roomsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const validateDelivery = () => roomsOption[roomNumber.value].includes(capacity.value);
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

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

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
