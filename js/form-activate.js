const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const getDisactiveStateForm = () => {
  adForm.classList.add('ad-form--disabled');
  for (let i=0; i < adForm.children.length; i++) {
    adForm.children[i].disabled = true;
  }
};

const getActiveStateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (let i=0; i < adForm.children.length; i++) {
    adForm.children[i].disabled = false;
  }
};

const getDisactiveStateFilters = () => {
  mapFilters.classList.add('ad-form--disabled');
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = true;
  }
};

const getActiveStateFilters = () => {
  mapFilters.classList.remove('ad-form--disabled');
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = false;
  }
};

export{getDisactiveStateForm, getActiveStateForm, adForm, getDisactiveStateFilters, getActiveStateFilters};
