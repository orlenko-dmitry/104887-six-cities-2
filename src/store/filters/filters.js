import {
  SORT_OFFERS_BY,
  OFFER_ON_HOVER,
} from '../../consts/actionTypes.js';
import {SORTED_BY} from '../../consts/index.js';

export const initialState = {
  sortedBy: SORTED_BY.POPULAR,
  onHoverOfferId: -1,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SORT_OFFERS_BY:
      return Object.assign({}, state, {sortedBy: payload});
    case OFFER_ON_HOVER:
      return Object.assign({}, state, {onHoverOfferId: payload});
    default: return state;
  }
};


