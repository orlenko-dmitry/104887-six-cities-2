import MockAdapter from 'axios-mock-adapter';

import {createApi} from '../../api.js';
import reducer, {initialState} from './data.js';
import actions from './actions';
import {
  SELECT_CITY,
  FETCH_OFFERS_SUCCESS,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  GET_USER_SUCCESS,
} from '../../consts/actionTypes';
import {SELECT_CITY_PAYLOAD} from '../../consts/index.js';
import endpoints from '../../consts/endpoints.js';

describe(`Action creators work correctly`, () => {
  it(`Action creator for selecting city returns action with payload`, () => {
    expect(actions.selectCity(SELECT_CITY_PAYLOAD)).toEqual({
      type: SELECT_CITY,
      payload: SELECT_CITY_PAYLOAD,
    });
  });
  it(`Action creator for signIn returns action`, () => {
    expect(actions.signIn()).toEqual({
      type: SIGN_IN,
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
  it(`Reducer should change isAuthorizationRequired by a given payload`, () => {
    expect(reducer(undefined, {
      type: SIGN_IN,
    })).toEqual(Object.assign({}, initialState, {
      isAuthorizationRequired: true,
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
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: FETCH_OFFERS_SUCCESS,
          payload: [],
        });
      });
  });
  it(`Should make a correct API call to /login, with post method`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const loginUser = actions.authLogin({
      userEmail: `test@email.com`,
      userPassword: `qwerty`,
    });

    apiMock
      .onPost(endpoints.login)
      .reply(200, {fake: true});

    return loginUser(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: SIGN_IN_SUCCESS,
          payload: {fake: true},
        });
      });
  });
  it(`Should make a correct API call to /login, with get method`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const userLoader = actions.getUser();

    apiMock
      .onGet(endpoints.login)
      .reply(200, {fake: true});

    return userLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: GET_USER_SUCCESS,
          payload: {fake: true},
        });
      });
  });
});
