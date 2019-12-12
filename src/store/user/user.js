import {
  SIGN_IN_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  POST_FAVORITE_SUCCESS,
  FETCH_FAVORITE_SUCCESS,
} from '../../consts/actionTypes.js';
import {ASYNC_STATUSES} from '../../consts/index.js';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = ASYNC_STATUSES;

export const initialState = {
  favorites: [],
  user: null,
  getUserStatus: PENDING,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {user: payload});
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {user: payload, getUserStatus: SUCCESS});
    case GET_USER_ERROR:
      return Object.assign({}, state, {getUserStatus: ERROR});
    case POST_FAVORITE_SUCCESS:
      return Object.assign({}, state, {favorites: payload.favorites});
    case FETCH_FAVORITE_SUCCESS:
      return Object.assign({}, state, {favorites: payload});
    default: return state;
  }
};
