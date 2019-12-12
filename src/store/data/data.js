import {
  SELECT_CITY,
  FETCH_OFFERS_PENDING,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_ERROR,
  FETCH_COMMENTS_SUCCESS,
  POST_COMMENTS_PENDING,
  POST_COMMENTS_SUCCESS,
  POST_COMMENTS_ERROR,
  POST_FAVORITE_SUCCESS,
} from '../../consts/actionTypes.js';
import {
  APP_CITIES,
  ASYNC_STATUSES,
} from '../../consts/index.js';

export const initialState = {
  city: APP_CITIES[0],
  offers: [],
  comments: [],
  offersFetchStatus: ASYNC_STATUSES.PENDING,
  messagePostStatus: ``,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SELECT_CITY:
      return Object.assign({}, state, {city: payload});
    case FETCH_OFFERS_PENDING:
      return Object.assign({}, state, {offersFetchStatus: ASYNC_STATUSES.PENDING});
    case FETCH_OFFERS_SUCCESS:
      return Object.assign({}, state, {offers: payload, offersFetchStatus: ASYNC_STATUSES.SUCCESS});
    case FETCH_OFFERS_ERROR:
      return Object.assign({}, state, {offersFetchStatus: ASYNC_STATUSES.ERROR});
    case FETCH_COMMENTS_SUCCESS:
      return Object.assign({}, state, {comments: payload});
    case POST_COMMENTS_PENDING:
      return Object.assign({}, state, {messagePostStatus: ASYNC_STATUSES.PENDING});
    case POST_COMMENTS_SUCCESS:
      return Object.assign({}, state, {comments: payload, messagePostStatus: ASYNC_STATUSES.SUCCESS});
    case POST_COMMENTS_ERROR:
      return Object.assign({}, state, {messagePostStatus: ASYNC_STATUSES.ERROR});
    case POST_FAVORITE_SUCCESS:
      return Object.assign({}, state, {offers: payload.offers});
    default: return state;
  }
};
