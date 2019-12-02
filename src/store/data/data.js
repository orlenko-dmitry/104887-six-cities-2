import {
  SELECT_CITY,
  FETCH_OFFERS_SUCCESS,
  SIGN_IN,
} from '../../consts/actionTypes.js';
import {
  APP_CITIES,
  ASYNC_STATUSES,
} from '../../consts/index.js';
import nearOffers from '../../mocks/nearOffers.js';
import reviews from '../../mocks/reviews.js';

export const initialState = {
  city: APP_CITIES[0],
  offers: [],
  nearOffers,
  reviews,
  isAuthorizationRequired: false,
  status: ASYNC_STATUSES.PENDING,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SELECT_CITY:
      return Object.assign({}, state, {city: payload});
    case FETCH_OFFERS_SUCCESS:
      return Object.assign({}, state, {offers: payload, status: ASYNC_STATUSES.SUCCESS});
    case SIGN_IN:
      return Object.assign({}, state, {isAuthorizationRequired: !state.isAuthorizationRequired});
    default: return state;
  }
};
