import reducer, {initialState} from './reducer.js';
import actions from './actions';
import {SELECT_CITY, SORT_OFFERS_BY} from '../consts/actionTypes';
import {SELECT_CITY_PAYLOAD, SORTED_BY} from '../consts/index.js';

describe(`Action creators work correctly`, () => {
  it(`Action creator for selecting city returns action with payload`, () => {
    expect(actions.selectCity(SELECT_CITY_PAYLOAD)).toEqual({
      type: SELECT_CITY,
      payload: SELECT_CITY_PAYLOAD,
    });
  });
  it(`Action creator for selecting city returns action with payload`, () => {
    expect(actions.sortBy(SORTED_BY.POPULAR)).toEqual({
      type: SORT_OFFERS_BY,
      payload: SORTED_BY.POPULAR,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it(`Reducer should change city by a given payload`, () => {
    expect(reducer(undefined, {
      type: SELECT_CITY,
      payload: SELECT_CITY_PAYLOAD,
    })).toEqual(Object.assign({}, initialState, {
      city: SELECT_CITY_PAYLOAD,
    }));
  });
  it(`Reducer should change city by a given payload`, () => {
    expect(reducer(undefined, {
      type: SORT_OFFERS_BY,
      payload: SORTED_BY.POPULAR,
    })).toEqual(Object.assign({}, initialState, {
      sortedBy: SORTED_BY.POPULAR,
    }));
  });
});

