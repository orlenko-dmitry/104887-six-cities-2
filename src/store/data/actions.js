import {
  SELECT_CITY,
  SIGN_IN_SUCCESS,
  GET_USER_SUCCESS,
  FETCH_OFFERS_PENDING,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_ERROR,
  FETCH_COMMENTS_PENDING,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_ERROR,
  POST_COMMENTS_PENDING,
  POST_COMMENTS_SUCCESS,
  POST_COMMENTS_ERROR,
  POST_FAVORITE_PENDING,
  POST_FAVORITE_SUCCESS,
  POST_FAVORITE_ERROR,
  FETCH_FAVORITE_PENDING,
  FETCH_FAVORITE_SUCCESS,
  FETCH_FAVORITE_ERROR,
} from '../../consts/actionTypes.js';
import {toast} from 'react-toastify';

import endpoints from '../../consts/endpoints.js';
import {
  convertOffersToCamelCase,
  convertOfferToCamelCase,
  convertCommentsToCamelCase,
} from '../../helpers/helpers.js';
import history from '../../history.js';
import {ROUTES} from '../../consts/index.js';

export default ({
  selectCity: (payload) => {
    return {
      type: SELECT_CITY,
      payload,
    };
  },
  authLogin: ({userEmail, userPassword}) => (dispatch, getState, api) => {
    return api.post(endpoints.login, {
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: response.data,
      });
      history.push(ROUTES.ROOT);
    })
    .catch((err) => {
      toast.error(err);
    });
  },
  getUser: () => (dispatch, getState, api) => {
    return api.get(endpoints.login)
            .then((response) => dispatch({
              type: GET_USER_SUCCESS,
              payload: response.data,
            }))
            .catch(() => {});
  },
  fetchOffers: () => (dispatch, getState, api) => {
    dispatch({type: FETCH_OFFERS_PENDING});
    return api.get(endpoints.getOffers)
            .then((response) => dispatch({
              type: FETCH_OFFERS_SUCCESS,
              payload: convertOffersToCamelCase(response.data),
            }))
            .catch((err) => {
              toast.error(err);
              dispatch({
                type: FETCH_OFFERS_ERROR,
              });
            });
  },
  fetchComments: (offerId) => (dispatch, getState, api) => {
    dispatch({type: FETCH_COMMENTS_PENDING});
    return api.get(endpoints.comments(offerId))
            .then((response) => dispatch({
              type: FETCH_COMMENTS_SUCCESS,
              payload: convertCommentsToCamelCase(response.data),
            }))
            .catch((err) => {
              toast.error(err);
              dispatch({
                type: FETCH_COMMENTS_ERROR,
              });
            });
  },
  postComment: ({offerId, rating, comment}) => (dispatch, getState, api) => {
    dispatch({type: POST_COMMENTS_PENDING});
    return api.post(endpoints.comments(offerId), {rating, comment})
            .then((response) => dispatch({
              type: POST_COMMENTS_SUCCESS,
              payload: convertCommentsToCamelCase(response.data),
            }))
            .catch((err) => {
              toast.error(err);
              dispatch({
                type: POST_COMMENTS_ERROR,
              });
            });
  },
  postFavorite: ({offerId, status}) => (dispatch, getState, api) => {
    dispatch({type: POST_FAVORITE_PENDING});
    return api.post(endpoints.postFavorite({offerId, status}))
            .then((response) => {
              const offers = getState().rData.offers.map((offer) => {
                if (offer.id === response.data.id) {
                  offer.isFavorite = response.data.is_favorite;
                }
                return offer;
              });
              const postFavoriteIndex = getState().rData.favorites.map((favorite) => favorite.id).indexOf(response.data.id);
              const favorites = getState().rData.favorites;
              if (postFavoriteIndex === -1) {
                favorites.push(convertOfferToCamelCase(response.data));
              } else {
                favorites.splice(postFavoriteIndex, 1);
              }
              dispatch({
                type: POST_FAVORITE_SUCCESS,
                payload: {offers, favorites},
              });
            })
            .catch((err) => {
              toast.error(err);
              dispatch({
                type: POST_FAVORITE_ERROR,
              });
            });
  },
  getFavorite: () => (dispatch, getState, api) => {
    dispatch({type: FETCH_FAVORITE_PENDING});
    return api.get(endpoints.getFavorite)
            .then((response) => {
              dispatch({
                type: FETCH_FAVORITE_SUCCESS,
                payload: convertOffersToCamelCase(response.data),
              });
            })
            .catch((err) => {
              toast.error(err);
              dispatch({
                type: FETCH_FAVORITE_ERROR,
              });
            });
  },
});
