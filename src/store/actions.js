import {
  SELECT_CITY,
} from '../consts/actionTypes.js';
export default ({
  selectCity: (payload) => {
    return {
      type: SELECT_CITY,
      payload,
    };
  }
});
