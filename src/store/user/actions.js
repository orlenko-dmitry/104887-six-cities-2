import {
  SIGN_IN_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  FETCH_FAVORITE_SUCCESS,
  FETCH_FAVORITE_ERROR,
  POST_FAVORITE_SUCCESS,
  POST_FAVORITE_ERROR,
} from '../../consts/actionTypes.js';
import {toast} from 'react-toastify';

import endpoints from '../../consts/endpoints.js';
import {
  convertOffersToCamelCase,
  convertOfferToCamelCase,
} from '../../helpers/helpers.js';
import history from '../../history.js';
import {ROUTES} from '../../consts/index.js';

export default ({
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
            .catch(() => dispatch({type: GET_USER_ERROR}));
  },
  getFavorite: () => (dispatch, getState, api) => {
    return api.get(endpoints.getFavorite)
            .then((response) => {
              dispatch({
                type: FETCH_FAVORITE_SUCCESS,
                payload: convertOffersToCamelCase(response.data),
              });
            })
            .catch((err) => {
              toast.error(err);
              dispatch({type: FETCH_FAVORITE_ERROR});
            });
  },
  postFavorite: ({offerId, status}) => (dispatch, getState, api) => {
    return api.post(endpoints.postFavorite({offerId, status}))
            .then((response) => {
              const offers = getState().rData.offers.map((offer) => {
                if (offer.id === response.data.id) {
                  offer.isFavorite = response.data.is_favorite;
                }
                return offer;
              });
              const postFavoriteIndex = getState().rUser.favorites.map((favorite) => favorite.id).indexOf(response.data.id);
              const favorites = getState().rUser.favorites;
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
              dispatch({type: POST_FAVORITE_ERROR});
            });
  },
});
