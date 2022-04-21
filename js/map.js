import {createPopup} from './popup.js';
import {adForm, getActiveStateForm, getDisactiveStateForm, getDisactiveStateFilters, getActiveStateFilters} from './form-activate.js';
import {getData} from './api.js';
import {debounce, showAlert} from './util.js';
import {checkAllFilters} from './filters.js';
import {
  ADS_COUNT,
  INITIAL_COORDS,
  MAIN_MARKER_COORDS,
  MAP_ZOOM,
  Messages,
  NUMBER_AFTER_POINT, RERENDER_DELAY,
} from './const.js';

const allAds = [];

const filterForm = document.querySelector('.map__filters');

getDisactiveStateForm();
getDisactiveStateFilters();

const map = L.map('map-canvas')
  .on('load', () => {
    adForm.address.value = `${INITIAL_COORDS.lat}, ${INITIAL_COORDS.lng}`;
    getActiveStateForm();
  })
  .setView({
    lat: INITIAL_COORDS.lat,
    lng: INITIAL_COORDS.lng,
  },MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const regularPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// настройка осн маркера

const mainPinMarker = L.marker(
  {
    lat: MAIN_MARKER_COORDS.lat,
    lng: MAIN_MARKER_COORDS.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);


mainPinMarker.on('drag', (evt) => {
  const coords = evt.target.getLatLng();
  adForm.address.value = `${coords.lat.toFixed(NUMBER_AFTER_POINT)}, ${coords.lng.toFixed(NUMBER_AFTER_POINT)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const renderPoints = (ads) => {
  ads.forEach(({author, offer, location}) => {
    const regularPinMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        draggable: false,
        icon: regularPinIcon,
      },
    );
    regularPinMarker.addTo(markerGroup)
      .bindPopup(createPopup({author, offer}));
  });
};

(async () => {
  const fetchedAds = await getData(() => showAlert(`${Messages.GET_NO_ADS}`));
  allAds.push(...fetchedAds);
  renderPoints(allAds.slice(0, ADS_COUNT));
  if (allAds.length === 0) {
    getDisactiveStateFilters();
  } else {
    getActiveStateFilters();
  }
})();


const resetPoints = () => {
  mainPinMarker.setLatLng({
    lat: MAIN_MARKER_COORDS.lat,
    lng: MAIN_MARKER_COORDS.lng,
  });
  map.setView({
    lat: INITIAL_COORDS.lat,
    lng: INITIAL_COORDS.lng,
  }, MAP_ZOOM);
  map.closePopup();
};

const getLocationToString = (obj, number) => {
  let {lat, lng} = obj;
  lat = Number(lat.toFixed(number));
  lng = Number(lng.toFixed(number));
  return `${lat}, ${lng}`;
};

const filterAd = (ads) => {
  markerGroup.clearLayers();
  const filteredAds = [];
  for (const element of ads) {
    if (checkAllFilters(element)) {
      filteredAds.push(element);
    }
    if (filteredAds.length >= ADS_COUNT) {
      break;
    }
  }
  renderPoints(filteredAds);
  if (filteredAds.length <= 0) {
    showAlert(`${Messages.FIND_NO_ADS}`);
  }
};

const onFilterChange = (cb) => filterForm.addEventListener('change', cb);

onFilterChange(debounce(() => filterAd(allAds), RERENDER_DELAY));

export{resetPoints, getLocationToString, INITIAL_COORDS};
