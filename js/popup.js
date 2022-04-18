import {getDeclination} from './util.js';
import {TYPE_ITEM} from './const.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const translatePopupType = (data) => {
  for (const key in TYPE_ITEM) {
    if (TYPE_ITEM[key] === data) {
      return key;
    }
  }
};

const makeCardFeatures = (document, data) => {

  const featureContainer = document.querySelector('.popup__features').querySelectorAll('.popup__feature');
  featureContainer.forEach((itemFeature) => {
    const isExist = data ? data.some((feature) => itemFeature.classList.contains(`popup__feature--${feature}`)) : false;

    if (!isExist) {
      itemFeature.remove();
    }
  });
};


const makeCardPhotos = (container, sources) => {
  const cardPhoto = container.querySelector('.popup__photo');
  container.innerHTML = '';

  const fragmentPhoto = document.createDocumentFragment();

  sources.forEach((source) => {
    const newPhoto = cardPhoto.cloneNode(true);
    newPhoto.src = source;
    fragmentPhoto.appendChild(newPhoto);
  });

  return fragmentPhoto;
};


const checkEmptyBlock = (data, element) => {
  if (!data) {
    element.hidden = true;
  }
};


const createPopup = ({offer, author}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const adTitle = cardElement.querySelector('.popup__title');
  const adAddress = cardElement.querySelector('.popup__text--address');
  const adPrice = cardElement.querySelector('.popup__text--price');
  const adType = cardElement.querySelector('.popup__type');
  const adCapacity = cardElement.querySelector('.popup__text--capacity');
  const adTime = cardElement.querySelector('.popup__text--time');
  const adFeatures = cardElement.querySelectorAll('.popup__features');
  const adDescription = cardElement.querySelector('.popup__description');
  const adAvatar = cardElement.querySelector('.popup__avatar');
  const photoContainer = cardElement.querySelector('.popup__photos');

  adTitle.textContent = offer.title;
  adAddress.textContent = offer.address;
  adPrice.textContent = `${offer.price} ₽/ночь`;
  adType.textContent = translatePopupType(offer.type);
  adCapacity.textContent = `${offer.rooms} ${getDeclination(offer.rooms, 'комната', 'комнаты', 'комнат')} для ${offer.guests} ${getDeclination(offer.guests, 'гостя', 'гостей', 'гостей')}`;
  adTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adDescription.textContent = offer.description ;
  makeCardFeatures(cardElement, offer.features);
  adAvatar.src = author.avatar;

  checkEmptyBlock(offer.title, adTitle);
  checkEmptyBlock(offer.address, adAddress);
  checkEmptyBlock(offer.price, adPrice);
  checkEmptyBlock(offer.type, adType);
  checkEmptyBlock(offer.rooms, adCapacity);
  checkEmptyBlock(offer.checkin, adTime);
  checkEmptyBlock(offer.description, adDescription);
  checkEmptyBlock(author.avatar, adAvatar);
  checkEmptyBlock(offer.features, adFeatures);

  if (offer.photos) {
    photoContainer.appendChild(makeCardPhotos(photoContainer, offer.photos));
  } else {
    photoContainer.remove();
  }

  return cardElement;
};

export {createPopup};
