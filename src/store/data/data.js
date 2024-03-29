import {
  SELECT_CITY,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_ERROR,
  FETCH_COMMENTS_SUCCESS,
  POST_COMMENTS_PENDING,
  POST_COMMENTS_SUCCESS,
  POST_COMMENTS_ERROR,
  POST_FAVORITE_SUCCESS,
} from '../../consts/actionTypes.js';
import {
  AppCity,
  AsyncStatus,
} from '../../consts/consts.js';
import {randomInteger} from '../../helpers/helpers.js';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = AsyncStatus;
const initCityIndex = randomInteger(0, AppCity.length);

export const initialState = {
  city: AppCity[initCityIndex],
  offers: [],
  comments: [],
  offersFetchStatus: PENDING,
  messagePostStatus: ``,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SELECT_CITY:
      return Object.assign({}, state, {city: payload});
    case FETCH_OFFERS_SUCCESS:
      return Object.assign({}, state, {offers: payload, offersFetchStatus: SUCCESS});
    case FETCH_OFFERS_ERROR:
      return Object.assign({}, state, {offersFetchStatus: ERROR});
    case FETCH_COMMENTS_SUCCESS:
      return Object.assign({}, state, {comments: payload});
    case POST_COMMENTS_PENDING:
      return Object.assign({}, state, {messagePostStatus: PENDING});
    case POST_COMMENTS_SUCCESS:
      return Object.assign({}, state, {comments: payload, messagePostStatus: ``});
    case POST_COMMENTS_ERROR:
      return Object.assign({}, state, {messagePostStatus: ERROR});
    case POST_FAVORITE_SUCCESS:
      return Object.assign({}, state, {offers: payload.offers});
    default: return state;
  }
};
