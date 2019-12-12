import {
  SELECT_CITY,
  FETCH_OFFERS_PENDING,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_ERROR,
  FETCH_COMMENTS_PENDING,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_ERROR,
  POST_COMMENTS_PENDING,
  POST_COMMENTS_SUCCESS,
  POST_COMMENTS_ERROR,
} from '../../consts/actionTypes.js';
import {toast} from 'react-toastify';

import endpoints from '../../consts/endpoints.js';
import {
  convertOffersToCamelCase,
  convertCommentsToCamelCase,
} from '../../helpers/helpers.js';

export default ({
  selectCity: (payload) => {
    return {
      type: SELECT_CITY,
      payload,
    };
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
});
