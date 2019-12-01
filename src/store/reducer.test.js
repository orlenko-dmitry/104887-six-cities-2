import MockAdapter from 'axios-mock-adapter';

import {createApi} from '../api.js';
import reducer, {initialState} from './reducer.js';
import actions from './actions';
import {
  SELECT_CITY,
  SORT_OFFERS_BY,
  OFFER_ON_HOVER,
  FETCH_OFFERS_SUCCESS,
} from '../consts/actionTypes';
import {SELECT_CITY_PAYLOAD, SORTED_BY} from '../consts/index.js';
import endpoints from '../consts/endpoints.js';

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
  it(`Action creator for selecting city returns action with payload`, () => {
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
  it(`Reducer should change city by a given payload`, () => {
    expect(reducer(undefined, {
      type: SELECT_CITY,
      payload: SELECT_CITY_PAYLOAD,
    })).toEqual(Object.assign({}, initialState, {
      city: SELECT_CITY_PAYLOAD,
    }));
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
  it(`Should make a correct API call to /hotels`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = actions.fetchOffers();

    apiMock
      .onGet(endpoints.offers)
      .reply(200, []);

    return offersLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: FETCH_OFFERS_SUCCESS,
        payload: [],
      });
    });
  });
});

