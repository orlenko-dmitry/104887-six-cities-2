import reducer from './reducer.js';
import actions from './actions';
import {SELECT_CITY} from '../consts/actionTypes';
import offers from '../mocks/offers.js';
import {SELECT_CITY_PAYLOAD} from '../consts/index.js';

describe(`Action creators work correctly`, () => {
  it(`Action creator for selecting city returns action with payload`, () => {
    expect(actions.selectCity(SELECT_CITY_PAYLOAD)).toEqual({
      type: SELECT_CITY,
      payload: SELECT_CITY_PAYLOAD,
    });
  });
});

describe(`Reducer works correctly`, () => {
  const initialState = {
    city: offers[0].city,
    offers,
  };

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
});

