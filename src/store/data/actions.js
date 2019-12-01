import {
  SELECT_CITY,
  AUTH_LOGIN,
  FETCH_OFFERS_SUCCESS,
} from '../../consts/actionTypes.js';

import enpoints from '../../consts/endpoints.js';
import {convertOffersToCamelCase} from '../../helpers/helpers.js';

export default ({
  selectCity: (payload) => {
    return {
      type: SELECT_CITY,
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
