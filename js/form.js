//неактивное состояние

const getDisactiveState = () => {
  const form = document.querySelector('.ad-form');
  form.classList.add('ad-form--disabled');
  for (let i=0; i < form.children.length; i++) {
    form.children[i].disabled = true;
  }
  const mapFilters = document.querySelector('.map__features');
  mapFilters.classList.add('ad-form--disabled');
  for (let i=0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = true;
  }
};

// активное состояние

const getActiveState = () => {
  const form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
  for (let i=0; i < form.children.length; i++) {
    form.children[i].disabled = false;
  }
  const mapFilters = document.querySelector('.map__features');
  mapFilters.classList.remove('ad-form--disabled');
  for (let i=0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = false;
  }
};

export{getDisactiveState, getActiveState};
