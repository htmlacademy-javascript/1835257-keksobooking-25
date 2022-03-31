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

const makeCardList = (ads) => {
  const cardElement = cardTemplate.cloneNode(true);
  const adTitle = cardElement.querySelector('.popup__title');
  adTitle.textContent = ads.offer.title;
  const adAddress = cardElement.querySelector('.popup__text--address');
  adAddress.textContent = ads.offer.address;
  const adPrice = cardElement.querySelector('.popup__text--price');
  adPrice.textContent = `${ads.offer.price} ₽/ночь`;
  const adType = cardElement.querySelector('.popup__type');
  adType.textContent = translatePopupType(ads.offer.type);
  const adCapacity = cardElement.querySelector('.popup__text--capacity');
  adCapacity.textContent = `${ads.offer.rooms} комнаты для ${ads.offer.guest} гостей`;
  const adTime = cardElement.querySelector('.popup__text--time');
  adTime.textContent = `Заезд после ${ads.offer.checkin}, выезд до ${ads.offer.checkout}`;
  const adFeatures = cardElement.querySelectorAll('.popup__features');
  makeCardFeatures(cardElement, ads.offer.features);
  const adDescription = cardElement.querySelector('.popup__description');
  adDescription.textContent = ads.offer.description ;
  makeCardPhotos(cardElement, ads.offer.photos);
  const adAvatar = cardElement.querySelector('.popup__avatar');
  adAvatar.src = ads.author.avatar;

  checkEmptyBlock(ads.offer.title, adTitle);
  checkEmptyBlock(ads.offer.address, adAddress);
  checkEmptyBlock(ads.offer.price, adPrice);
  checkEmptyBlock(ads.offer.type, adType);
  checkEmptyBlock(ads.offer.rooms, adCapacity);
  checkEmptyBlock(ads.offer.checkin, adTime);
  checkEmptyBlock(ads.offer.description, adDescription);
  checkEmptyBlock(ads.author.avatar, adAvatar);
  checkEmptyBlock(ads.offer.features, adFeatures);

  return cardElement;
};

export {makeCardList};
