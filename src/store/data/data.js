import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  GET_USER_SUCCESS,
  SELECT_CITY,
  FETCH_OFFERS_PENDING,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_ERROR,
  FETCH_COMMENTS_SUCCESS,
  POST_COMMENTS_PENDING,
  POST_COMMENTS_SUCCESS,
  POST_COMMENTS_ERROR,
} from '../../consts/actionTypes.js';
import {
  APP_CITIES,
  ASYNC_STATUSES,
} from '../../consts/index.js';

export const initialState = {
  city: APP_CITIES[0],
  offers: [],
  comments: [],
  user: null,
  offersFetchStatus: ASYNC_STATUSES.PENDING,
  messagePostStatus: ``,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {user: payload});
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {user: payload});
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
    default: return state;
  }
};
