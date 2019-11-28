import {
  SELECT_CITY,
  SORT_OFFERS_BY,
  OFFER_ON_HOVER,
  AUTH_LOGIN,
} from '../consts/actionTypes.js';
export default ({
  selectCity: (payload) => {
    return {
      type: SELECT_CITY,
      payload,
    };
  },
  sortBy: (payload) => {
    return {
      type: SORT_OFFERS_BY,
      payload,
    };
  },
  getOfferId: (payload) => {
    return {
      type: OFFER_ON_HOVER,
      payload,
    };
  },
  authLogin: () => {
    return {
      type: AUTH_LOGIN,
    };
  }
});
