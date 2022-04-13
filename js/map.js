import {createPopup} from './popup.js';
import {adForm, getActiveStateForm, getDisactiveStateForm, getDisactiveStateFilters, getActiveStateFilters} from './form-activate.js';
import {getData} from './api.js';
import {debounce, showAlert} from './util.js';
import {checkAllFilters} from './filters.js';
import {ADS_COUNT, INITIAL_COORDS, MAIN_MARKER_COORDS, MAP_ZOOM, NUMBER_AFTER_POINT} from './const.js';

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

let allAds = [];
allAds = getData();

(async () => {
  allAds = await getData();
  renderPoints(allAds.slice(0, ADS_COUNT));
  getActiveStateFilters();
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

const filterForm = document.querySelector('.map__filters');

const filterAd = () => {
  markerGroup.clearLayers();

  const filteredAds = allAds.filter(({author, offer, location}) => checkAllFilters({author, offer, location}));
  renderPoints(filteredAds.slice(0, ADS_COUNT));

  if (filteredAds.length <= 0) {showAlert('Не удалось найти подходящие объявления');}
};

filterForm.addEventListener('change', debounce(filterAd));

export{resetPoints, getLocationToString, INITIAL_COORDS};
