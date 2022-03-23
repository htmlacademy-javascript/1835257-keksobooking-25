import {advertisements} from './main';

const translatePopupType = (data) => {

  const typeItem = {
    'Дворец': 'palace',
    'Квартира': 'flat',
    'Дом': 'house',
    'Бунгало': 'bungalow',
    'Отель': 'hotel',
  };


  for (const key in typeItem) {

    if (typeItem[key] === data) {
      return key;
    }

  }
};

const makeCardFeatures = (document, data) => {
  const featureContainer = document.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  const modifiers = data.map((dataItem) => `'.popup__feature--'${ dataItem}`);

  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });
};


const makeCardPhotos = (document, photos) => {
  for (let i = 0; i<photos.length; i++) {
    document.querySelector('.popup__photos').src = photos[i];
    return;
  }
};

const checkEmptyBlock = (document) => {
  const popup = document.querySelector('.popup');
  for (let i=0; i<popup.children.length; i++) {
    if (popup.children[i].textContent ==='') {
      popup.children[i].classList.add('hidden');
    }
  }
};


const cardTemplate = document.querySelector('#card');

const popupFragment = document.createDocumentFragment();

const makeCardList = () => {
  advertisements.forEach(({author, offer}) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
    cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    cardElement.querySelector('.popup__type').textContent = translatePopupType(offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    makeCardFeatures(cardElement, offer.features);
    cardElement.querySelector('.popup__description').textContent = offer.description ;
    makeCardPhotos(cardElement, offer.photos);
    cardElement.querySelector('.popup__avatar').src = author.avatar;
    checkEmptyBlock(cardElement);
    popupFragment.appendChild(cardElement);
  });
  return popupFragment;
};

const mapCanvas = document.querySelector('#map-canvas');
const cardList = makeCardList();
const firstCardItem = cardList.querySelectorAll('.popup');
mapCanvas.appendChild(firstCardItem[0]);
