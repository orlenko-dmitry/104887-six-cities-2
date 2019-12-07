import {
  SELECT_CITY,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  GET_USER_SUCCESS,
  FETCH_OFFERS_SUCCESS,
  FETCH_COMMENTS_SUCCESS,
  POST_COMMENTS_PENDING,
  POST_COMMENTS_SUCCES,
  POST_COMMENTS_ERROR,
} from '../../consts/actionTypes.js';
import {toast} from 'react-toastify';

import enpoints from '../../consts/endpoints.js';
import {convertOffersToCamelCase, convertCommentsToCamelCase} from '../../helpers/helpers.js';

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
    }))
    .catch((err) => err.message);
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
            }))
            .catch((err) => err.message);
  },
  fetchComments: (offerId) => (dispatch, getState, api) => {
    return api.get(enpoints.comments(offerId))
            .then((response) => dispatch({
              type: FETCH_COMMENTS_SUCCESS,
              payload: convertCommentsToCamelCase(response.data),
            }));
  },
  postComment: ({offerId, rating, comment}) => (dispatch, getState, api) => {
    dispatch({type: POST_COMMENTS_PENDING});
    return api.post(enpoints.comments(offerId), {rating, comment})
            .then((response) => dispatch({
              type: POST_COMMENTS_SUCCES,
              payload: convertCommentsToCamelCase(response.data),
            }))
            .catch((err) => {
              toast.error(err.message);
              dispatch({
                type: POST_COMMENTS_ERROR,
              });
            });
  },
});
