import {PriceRanges} from './const.js';

const typeSelector = document.querySelector('#housing-type');
const priceSelector = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');

const getSelectCheckboxes = () => Array.from(document.querySelectorAll('input[name="features"]:checked')).map((cb) => cb.value);

const checkArrayInclude = (first, second) => {
  for (let i = 0; i < second.length; i++){
    if (first.indexOf(second[i]) === -1) {
      return false;
    }
  }
  return true;
};

const checkType = (obj, value) => value === 'any' || value === obj.offer.type;
const checkPrice = (obj, price) => obj.offer.price <= PriceRanges[price].maxprice && obj.offer.price >= PriceRanges[price].minprice;
const checkRooms = (obj, value) => value === 'any' || value === String(obj.offer.rooms);
const checkGuests = (obj, value) => value === 'any' || value === String(obj.offer.guests);

const checkFeatures = (obj) => {
  const adFeatures = obj.offer.features;
  const selectFeatures = getSelectCheckboxes();
  if (selectFeatures.length === 0) {
    return true;
  }
  if (!adFeatures) {
    return false;
  }
  return checkArrayInclude(adFeatures, selectFeatures);
};

const checkAllFilters = (object) => {
  const type = typeSelector.value;
  const price = priceSelector.value;
  const rooms = roomsFilter.value;
  const guests = guestsFilter.value;

  return checkType(object, type) && checkPrice(object, price) && checkRooms(object, rooms) && checkGuests(object, guests) && checkFeatures(object);
};


export {checkType, checkAllFilters};
