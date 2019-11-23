import {
  SELECT_CITY,
  SORT_OFFERS_BY,
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
});
