import {makeCardList} from './markup.js';
import {adForm, getActiveState} from './form.js';
import {advertisements} from './data.js';


const INITIAL_COORDS = {
  lat: 35.652832,
  lng: 139.839478,
};

const MAIN_MARKER_COORDS = {
  lat: 35.65283,
  lng: 139.83948,
};

const loadMap = L.map('map-canvas')
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
).addTo(loadMap);


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

mainPinMarker.addTo(loadMap);


mainPinMarker.on('drag', (evt) => {
  const coords = evt.target.getLatLng();
  adForm.address.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
});

const renderPoints = (array) => {
  const regularPinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  array.forEach((ad) => {
    const regularPinMarker = L.marker(
      {
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        draggable: false,
        icon: regularPinIcon,
      },
    );
    regularPinMarker.addTo(loadMap)
      .bindPopup(makeCardList(ad));
  });
};

renderPoints(advertisements);


