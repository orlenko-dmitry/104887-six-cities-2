import MockAdapter from 'axios-mock-adapter';

import {createApi} from '../../api.js';
import reducer, {initialState} from './data.js';
import actions from './actions';
import {
  SELECT_CITY,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_ERROR,
  FETCH_COMMENTS_SUCCESS,
  POST_COMMENTS_PENDING,
  POST_COMMENTS_SUCCESS,
  POST_COMMENTS_ERROR,
  POST_FAVORITE_SUCCESS,
} from '../../consts/actionTypes';
import {ASYNC_STATUSES} from '../../consts/index.js';
import endpoints from '../../consts/endpoints.js';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = ASYNC_STATUSES;

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
  it(`Reducer should change offers by a given payload`, () => {
    expect(reducer(undefined, {
      type: FETCH_OFFERS_SUCCESS,
      payload: [{fake: true}],
    })).toEqual(Object.assign({}, initialState, {
      offers: [{fake: true}],
      offersFetchStatus: SUCCESS,
    }));
  });
  it(`Reducer should change offers by a given payload`, () => {
    expect(reducer(undefined, {
      type: FETCH_OFFERS_ERROR,
    })).toEqual(Object.assign({}, initialState, {
      offersFetchStatus: ERROR,
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
  it(`Reducer should change user by a given payload`, () => {
    expect(reducer(undefined, {
      type: POST_COMMENTS_PENDING,
    })).toEqual(Object.assign({}, initialState, {
      messagePostStatus: PENDING,
    }));
  });
  it(`Reducer should change user by a given payload`, () => {
    expect(reducer(undefined, {
      type: POST_COMMENTS_SUCCESS,
      payload: [{fake: true}],
    })).toEqual(Object.assign({}, initialState, {
      comments: [{fake: true}],
      messagePostStatus: SUCCESS,
    }));
  });
  it(`Reducer should change user by a given payload`, () => {
    expect(reducer(undefined, {
      type: POST_COMMENTS_ERROR,
    })).toEqual(Object.assign({}, initialState, {
      messagePostStatus: ERROR,
    }));
  });
  it(`Reducer should change user by a given payload`, () => {
    expect(reducer(undefined, {
      type: POST_FAVORITE_SUCCESS,
      payload: {offers: [{fake: true}], favorites: [{fake: true}]},
    })).toEqual(Object.assign({}, initialState, {
      offers: [{fake: true}],
    }));
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for selecting city returns action with payload`, () => {
    expect(actions.selectCity({fake: true})).toEqual({
      type: SELECT_CITY,
      payload: {fake: true},
    });
  });
  it(`Should make a correct API call to /hotels with get method`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = actions.fetchOffers();

    apiMock
      .onGet(endpoints.getOffers)
      .reply(200, []);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: FETCH_OFFERS_SUCCESS,
          payload: [],
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
  it(`Should make a correct API call to /comments/:offerId with post method`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const postComment = actions.postComment({
      offerId: 3,
      rating: 5,
      comment: `I stayed here for one night and it was an unpleasant experience.`,
    });

    apiMock
      .onPost(endpoints.comments(3))
      .reply(200, []);

    return postComment(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: POST_COMMENTS_PENDING,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: POST_COMMENTS_SUCCESS,
          payload: [],
        });
      });
  });
});
