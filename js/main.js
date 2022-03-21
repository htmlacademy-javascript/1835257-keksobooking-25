import {createAdvertisement} from './util.js';
import {ADVERTISEMENT_COUNT} from './data.js';

const advertisements = new Array(ADVERTISEMENT_COUNT).fill(null).map(createAdvertisement);

console.log(advertisements);
