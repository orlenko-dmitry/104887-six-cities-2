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
  favoritesFetchStatus: PENDING,
  userGetStatus: PENDING,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {user: payload, userGetStatus: SUCCESS});
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {user: payload, userGetStatus: SUCCESS});
    case GET_USER_ERROR:
      return Object.assign({}, state, {userGetStatus: ERROR});
    case POST_FAVORITE_SUCCESS:
      return Object.assign({}, state, {favorites: payload.favorites});
    case FETCH_FAVORITE_SUCCESS:
      return Object.assign({}, state, {favorites: payload, favoritesFetchStatus: SUCCESS});
    default: return state;
  }
};
