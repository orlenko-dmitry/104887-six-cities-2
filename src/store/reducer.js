import {
  SELECT_CITY,
  SORT_OFFERS_BY,
} from '../consts/actionTypes.js';
import {SORTED_BY} from '../consts/index.js';
import offers from '../mocks/offers.js';

export const initialState = {
  city: offers[0].city,
  offers,
  sortedBy: SORTED_BY.POPULAR,
  onHoverOfferId: 1,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SELECT_CITY:
      return Object.assign({}, state, {city: payload});
    case SORT_OFFERS_BY:
      return Object.assign({}, state, {sortedBy: payload});
    default: return state;
  }
};


