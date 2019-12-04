import reducer, {initialState} from './filters.js';
import actions from './actions';
import {
  SORT_OFFERS_BY,
  OFFER_ON_HOVER,
} from '../../consts/actionTypes';
import {SORTED_BY} from '../../consts/index.js';

describe(`Action creators work correctly`, () => {
  it(`Action creator for sorting offers returns action with payload`, () => {
    expect(actions.sortBy(SORTED_BY.POPULAR)).toEqual({
      type: SORT_OFFERS_BY,
      payload: SORTED_BY.POPULAR,
    });
  });
  it(`Action creator for coloring pin returns action with payload`, () => {
    expect(actions.getOfferId(1)).toEqual({
      type: OFFER_ON_HOVER,
      payload: 1,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it(`Reducer should change sortedBy by a given payload`, () => {
    expect(reducer(undefined, {
      type: SORT_OFFERS_BY,
      payload: SORTED_BY.POPULAR,
    })).toEqual(Object.assign({}, initialState, {
      sortedBy: SORTED_BY.POPULAR,
    }));
  });
  it(`Reducer should change onHoverOfferId by a given payload`, () => {
    expect(reducer(undefined, {
      type: OFFER_ON_HOVER,
      payload: 1,
    })).toEqual(Object.assign({}, initialState, {
      onHoverOfferId: 1,
    }));
  });
});

