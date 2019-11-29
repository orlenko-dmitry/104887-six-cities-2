import {
  SELECT_CITY,
  SORT_OFFERS_BY,
  OFFER_ON_HOVER,
  AUTH_LOGIN,
  FETCH_OFFERS_SUCCESS,
} from '../consts/actionTypes.js';

import enpoints from '../consts/endpoints.js';
import {convertOffersToCamelCase} from '../helpers/helpers.js';

export default ({
  selectCity: (payload) => {
    return {
      type: SELECT_CITY,
      payload,
    };
  },
  sortBy: (payload) => {
    return {
      type: SORT_OFFERS_BY,
      payload,
    };
  },
  getOfferId: (payload) => {
    return {
      type: OFFER_ON_HOVER,
      payload,
    };
  },
  authLogin: () => {
    return {
      type: AUTH_LOGIN,
    };
  },
  fetchOffers: () => (dispatch, getState, api) => {
    return api.get(enpoints.offers)
    .then((response) => dispatch({
      type: FETCH_OFFERS_SUCCESS,
      payload: convertOffersToCamelCase(response.data),
    }));
  },
});
