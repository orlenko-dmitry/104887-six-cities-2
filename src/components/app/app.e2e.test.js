import React from 'react';
import {shallow} from 'enzyme';

import {App} from './app.jsx';
import {ASYNC_STATUSES} from '../../consts/index.js';
import offers from '../../mocks/offers.js';


it(`handleGetOffers have been called once`, () => {
  const handleGetOffers = jest.fn();
  const handleGetUser = jest.fn();
  const handleGetFavorite = jest.fn();

  shallow(
      <App
        offers={offers}
        favorites={offers}
        offersFetchStatus={ASYNC_STATUSES.SUCCESS}
        userGetStatus={ASYNC_STATUSES.SUCCESS}
        favoritesFetchStatus={ASYNC_STATUSES.SUCCESS}
        handleGetOffers={handleGetOffers}
        handleGetUser={handleGetUser}
        handleGetFavorite={handleGetFavorite}
      />
  );

  expect(handleGetOffers).toHaveBeenCalledTimes(1);
  expect(handleGetUser).toHaveBeenCalledTimes(1);
  expect(handleGetFavorite).toHaveBeenCalledTimes(0);
});
