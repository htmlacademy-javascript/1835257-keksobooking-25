const adForm = document.querySelector('.ad-form');

const mapFilters = document.querySelector('.map__filters');

//неактивное состояние

const getDisactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  for (let i=0; i < adForm.children.length; i++) {
    adForm.children[i].disabled = true;
  }
  mapFilters.classList.add('ad-form--disabled');
  for (let i=0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = true;
  }
};

// активное состояние

const getActiveState = () => {
  adForm.classList.remove('ad-form--disabled');
  for (let i=0; i < adForm.children.length; i++) {
    adForm.children[i].disabled = false;

  }
  mapFilters.classList.remove('ad-form--disabled');
  for (let i=0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = false;
  }
};

export{getDisactiveState, getActiveState, adForm};
