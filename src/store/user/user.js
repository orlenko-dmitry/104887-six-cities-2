import {
  SIGN_IN_SUCCESS,
  GET_USER_SUCCESS,
  POST_FAVORITE_SUCCESS,
  FETCH_FAVORITE_SUCCESS,
} from '../../consts/actionTypes.js';

export const initialState = {
  favorites: [],
  user: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {user: payload});
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {user: payload});
    case POST_FAVORITE_SUCCESS:
      return Object.assign({}, state, {favorites: payload.favorites});
    case FETCH_FAVORITE_SUCCESS:
      return Object.assign({}, state, {favorites: payload});
    default: return state;
  }
};
