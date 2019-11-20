import {
  SELECT_CITY,
} from './consts/actionTypes.js';
import offers from './mocks/offers.js';

const initialState = {
  city: offers[0].city,
  offers,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SELECT_CITY:
      return Object.assign({}, state, {city: payload});
    default: return state;
  }
};


