import {
  SELECT_CITY,
  SORT_OFFERS_BY,
  OFFER_ON_HOVER,
  FETCH_OFFERS_SUCCESS,
} from '../consts/actionTypes.js';
import {SORTED_BY, APP_CITIES} from '../consts/index.js';
import nearOffers from '../mocks/nearOffers.js';
import reviews from '../mocks/reviews.js';

export const initialState = {
  city: APP_CITIES[0],
  offers: [],
  nearOffers,
  reviews,
  sortedBy: SORTED_BY.POPULAR,
  onHoverOfferId: -1,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SELECT_CITY:
      return Object.assign({}, state, {city: payload});
    case SORT_OFFERS_BY:
      return Object.assign({}, state, {sortedBy: payload});
    case OFFER_ON_HOVER:
      return Object.assign({}, state, {onHoverOfferId: payload});
    case FETCH_OFFERS_SUCCESS:
      return Object.assign({}, state, {offers: payload});
    default: return state;
  }
};


