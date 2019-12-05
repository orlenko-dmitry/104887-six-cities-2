import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  GET_USER_SUCCESS,
  SELECT_CITY,
  FETCH_OFFERS_SUCCESS,
  FETCH_COMMENTS_SUCCESS,
} from '../../consts/actionTypes.js';
import {
  APP_CITIES,
  ASYNC_STATUSES,
} from '../../consts/index.js';

export const initialState = {
  city: APP_CITIES[0],
  offers: [],
  comments: [],
  isAuthorizationRequired: false,
  user: null,
  status: ASYNC_STATUSES.PENDING,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SIGN_IN:
      return Object.assign({}, state, {isAuthorizationRequired: !state.isAuthorizationRequired});
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {user: payload, isAuthorizationRequired: false});
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {user: payload});
    case SELECT_CITY:
      return Object.assign({}, state, {city: payload});
    case FETCH_OFFERS_SUCCESS:
      return Object.assign({}, state, {offers: payload, status: ASYNC_STATUSES.SUCCESS});
    case FETCH_COMMENTS_SUCCESS:
      return Object.assign({}, state, {comments: payload});
    default: return state;
  }
};
