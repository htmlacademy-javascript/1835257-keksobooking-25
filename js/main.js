import {ADVERTISEMENT_COUNT, createAdvertisement} from './data.js';

const advertisements = new Array(ADVERTISEMENT_COUNT).fill(null).map(createAdvertisement);

export {advertisements};
