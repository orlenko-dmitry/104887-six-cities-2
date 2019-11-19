// import actions from './actions.js';
import {DEFAULT_CITY} from './consts/index.js';
import offers from './mocks/offers.js';

const initialState = {
  city: DEFAULT_CITY,
  offers,
};

export default (state = initialState, {}) => state;


