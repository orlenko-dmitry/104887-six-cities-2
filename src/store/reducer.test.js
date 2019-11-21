import reducer from './reducer.js';
import actions from './actions';
import {SELECT_CITY} from '../consts/actionTypes';
import offers from '../mocks/offers.js';

describe(`Action creators work correctly`, () => {
  it(`Action creator for selecting city returns action with payload`, () => {
    expect(actions.selectCity({
      name: `Amsterdam`,
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }})).toEqual({
      type: SELECT_CITY,
      payload: {
        name: `Amsterdam`,
        location: {
          latitude: 52.37454,
          longitude: 4.897976,
          zoom: 13
        },
      },
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
      payload: {
        name: `Amsterdam`,
        location: {
          latitude: 52.37454,
          longitude: 4.897976,
          zoom: 13
        },
      },
    })).toEqual(Object.assign({}, initialState, {
      city: {
        name: `Amsterdam`,
        location: {
          latitude: 52.37454,
          longitude: 4.897976,
          zoom: 13
        },
      }
    }));
  });
});

