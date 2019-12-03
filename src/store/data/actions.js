import {
  SELECT_CITY,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  GET_USER_SUCCESS,
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
  authLogin: ({userEmail, userPassword}) => (dispatch, getState, api) => {
    return api.post(enpoints.login, {
      email: userEmail,
      password: userPassword,
    }).then((response) => dispatch({
      type: SIGN_IN_SUCCESS,
      payload: response.data,
    }));
  },
  signIn: () => {
    return {
      type: SIGN_IN,
    };
  },
  getUser: () => (dispatch, getState, api) => {
    return api.get(enpoints.login)
            .then((response) => dispatch({
              type: GET_USER_SUCCESS,
              payload: response.data,
            }))
            .catch((err) => err.message);
  },
  fetchOffers: () => (dispatch, getState, api) => {
    return api.get(enpoints.offers)
            .then((response) => dispatch({
              type: FETCH_OFFERS_SUCCESS,
              payload: convertOffersToCamelCase(response.data),
            }));
  },
});
