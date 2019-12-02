import {
  SORT_OFFERS_BY,
  OFFER_ON_HOVER,
} from '../../consts/actionTypes.js';


export default ({
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
});
