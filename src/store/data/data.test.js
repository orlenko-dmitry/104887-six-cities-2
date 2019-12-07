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
  FETCH_COMMENTS_SUCCESS,
  // POST_COMMENTS_PENDING,
  POST_COMMENTS_SUCCESS,
  // POST_COMMENTS_ERROR,
} from '../../consts/actionTypes';
import {ASYNC_STATUSES} from '../../consts/index.js';
import endpoints from '../../consts/endpoints.js';

describe(`Action creators work correctly`, () => {
  it(`Action creator for selecting city returns action with payload`, () => {
    expect(actions.selectCity({fake: true})).toEqual({
      type: SELECT_CITY,
      payload: {fake: true},
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
      payload: {fake: true},
    })).toEqual(Object.assign({}, initialState, {
      city: {fake: true},
    }));
  });
  it(`Reducer should change isAuthorizationRequired by a given payload`, () => {
    expect(reducer(undefined, {
      type: SIGN_IN,
    })).toEqual(Object.assign({}, initialState, {
      isAuthorizationRequired: true,
    }));
  });
  it(`Reducer should change user by a given payload`, () => {
    expect(reducer(undefined, {
      type: SIGN_IN_SUCCESS,
      payload: {fake: true},
    })).toEqual(Object.assign({}, initialState, {
      user: {fake: true},
      isAuthorizationRequired: false,
    }));
  });
  it(`Reducer should change user by a given payload`, () => {
    expect(reducer(undefined, {
      type: GET_USER_SUCCESS,
      payload: {fake: true},
    })).toEqual(Object.assign({}, initialState, {
      user: {fake: true},
    }));
  });
  it(`Reducer should change offers by a given payload`, () => {
    expect(reducer(undefined, {
      type: FETCH_OFFERS_SUCCESS,
      payload: [{fake: true}],
    })).toEqual(Object.assign({}, initialState, {
      offers: [{fake: true}],
      status: ASYNC_STATUSES.SUCCESS,
    }));
  });
  it(`Reducer should change comments by a given payload`, () => {
    expect(reducer(undefined, {
      type: FETCH_COMMENTS_SUCCESS,
      payload: [{fake: true}],
    })).toEqual(Object.assign({}, initialState, {
      comments: [{fake: true}],
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
  it(`Should make a correct API call to /comments/:offerId with get method`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const commentsLoader = actions.fetchComments(1);

    apiMock
      .onGet(endpoints.comments(1))
      .reply(200, []);

    return commentsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: FETCH_COMMENTS_SUCCESS,
          payload: [],
        });
      });
  });
  it(`Should make a correct API call to /comments/:offerId with get method`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const postComment = actions.postComment({offerId: 1, rating: 5, comment: `Comment`});

    apiMock
      .onPost(endpoints.comments(1))
      .reply(200, [{fake: true}]);

    return postComment(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: POST_COMMENTS_SUCCESS,
          payload: [{fake: true}],
        });
      });
  });
});
