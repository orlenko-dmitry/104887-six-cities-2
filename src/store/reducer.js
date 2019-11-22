import {
  SELECT_CITY,
} from '../consts/actionTypes.js';
import {SORT_BY} from '../consts/index.js';
import offers from '../mocks/offers.js';

export const initialState = {
  city: offers[0].city,
  offers,
  sortBy: SORT_BY.POPULAR,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SELECT_CITY:
      return Object.assign({}, state, {city: payload});
    default: return state;
  }
};


