import './markup.js';
import './form-valid.js';
import {getActiveState, getDisactiveState} from './form.js';
import {advertisements} from './data.js';
import {makeCardList} from './markup.js';

getDisactiveState();

setTimeout(getActiveState, 2000);

document.querySelector('#map-canvas').appendChild(makeCardList(advertisements[0]));
