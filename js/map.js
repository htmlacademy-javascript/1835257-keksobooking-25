import {createPopup} from './markup.js';
import {adForm, getActiveState, getDisactiveState} from './form.js';
import {advertisements} from './data.js';

const INITIAL_COORDS = {
  lat: 35.652832,
  lng: 139.839478,
};

const MAIN_MARKER_COORDS = {
  lat: 35.65283,
  lng: 139.83948,
};

getDisactiveState();

const map = L.map('map-canvas')
  .on('load', () => {
    getActiveState();
    adForm.address.value = `${INITIAL_COORDS.lat}, ${INITIAL_COORDS.lng}`;
  })
  .setView({
    lat: INITIAL_COORDS.lat,
    lng: INITIAL_COORDS.lng,
  },13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


// настройка осн маркера

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

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
  adForm.address.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
});

const renderPoints = (ads) => {
  const regularPinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
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
    regularPinMarker.addTo(map)
      .bindPopup(createPopup({author, offer}));
  });
};

renderPoints(advertisements);


