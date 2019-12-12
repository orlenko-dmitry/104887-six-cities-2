import MockAdapter from 'axios-mock-adapter';

import {createApi} from '../../api.js';
import reducer, {initialState} from './user.js';
import actions from './actions';
import {
  SIGN_IN_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  FETCH_FAVORITE_SUCCESS,
  POST_FAVORITE_SUCCESS,
} from '../../consts/actionTypes';
import endpoints from '../../consts/endpoints.js';
import {ASYNC_STATUSES} from '../../consts/index.js';

const {
  SUCCESS,
  ERROR,
} = ASYNC_STATUSES;

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it(`Reducer should change user by a given payload`, () => {
    expect(reducer(undefined, {
      type: SIGN_IN_SUCCESS,
      payload: {fake: true},
    })).toEqual(Object.assign({}, initialState, {
      user: {fake: true},
      userGetStatus: SUCCESS,
    }));
  });
  it(`Reducer should change user by a given payload`, () => {
    expect(reducer(undefined, {
      type: GET_USER_SUCCESS,
      payload: {fake: true},
    })).toEqual(Object.assign({}, initialState, {
      user: {fake: true},
      userGetStatus: SUCCESS,
    }));
  });
  it(`Reducer should change user by a given payload`, () => {
    expect(reducer(undefined, {
      type: GET_USER_ERROR,
    })).toEqual(Object.assign({}, initialState, {
      userGetStatus: ERROR,
    }));
  });
  it(`Reducer should change user by a given payload`, () => {
    expect(reducer(undefined, {
      type: POST_FAVORITE_SUCCESS,
      payload: {offers: [{fake: true}], favorites: [{fake: true}]},
    })).toEqual(Object.assign({}, initialState, {
      favorites: [{fake: true}],
    }));
  });
});

describe(`Action creators work correctly`, () => {
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
  it(`Should make a correct API call to /favorite with get method`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const postFavorite = actions.getFavorite();

    apiMock
      .onGet(endpoints.getFavorite)
      .reply(200, []);

    return postFavorite(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: FETCH_FAVORITE_SUCCESS,
          payload: [],
        });
      });
  });
});
