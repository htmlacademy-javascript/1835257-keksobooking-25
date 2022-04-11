const adForm = document.querySelector('.ad-form');

const mapFilters = document.querySelector('.map__filters');

//неактивное состояние формы

const getDisactiveStateForm = () => {
  adForm.classList.add('ad-form--disabled');
  for (let i=0; i < adForm.children.length; i++) {
    adForm.children[i].disabled = true;
  }
};

// активное состояние формы

const getActiveStateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (let i=0; i < adForm.children.length; i++) {
    adForm.children[i].disabled = false;
  }
};

//неактивное состояние фильтров

const getDisactiveStateFilters = () => {
  mapFilters.classList.add('ad-form--disabled');
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = true;
  }
};

// активное состояние фильтров

const getActiveStateFilters = () => {
  mapFilters.classList.remove('ad-form--disabled');
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = false;
  }
};

export{getDisactiveStateForm, getActiveStateForm, adForm, getDisactiveStateFilters, getActiveStateFilters};
