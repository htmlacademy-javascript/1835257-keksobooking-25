const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const translatePopupType = (data) => {

  const TYPE_ITEM = {
    'Дворец': 'palace',
    'Квартира': 'flat',
    'Дом': 'house',
    'Бунгало': 'bungalow',
    'Отель': 'hotel',
  };


  for (const key in TYPE_ITEM) {

    if (TYPE_ITEM[key] === data) {
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

  adTitle.textContent = offer.title;
  adAddress.textContent = offer.address;
  adPrice.textContent = `${offer.price} ₽/ночь`;
  adType.textContent = translatePopupType(offer.type);
  adCapacity.textContent = `${offer.rooms} комнаты для ${offer.guest} гостей`;
  adTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adDescription.textContent = offer.description ;
  makeCardPhotos(cardElement, offer.photos);
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

  return cardElement;
};

export {createPopup};
