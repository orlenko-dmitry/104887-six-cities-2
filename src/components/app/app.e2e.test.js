import React from 'react';
import {shallow} from 'enzyme';

import {App} from './app.jsx';
import {ASYNC_STATUSES} from '../../consts/index.js';
import offers from '../../mocks/offers.js';


it(`getOffersHandler have been called once`, () => {
  const getOffersHandler = jest.fn();
  const getUserHandler = jest.fn();
  const getFavoriteHandler = jest.fn();

  shallow(
      <App
        offers={offers}
        favorites={offers}
        offersFetchStatus={ASYNC_STATUSES.PENDING}
        getUserStatus={ASYNC_STATUSES.PENDING}
        getOffersHandler={getOffersHandler}
        getUserHandler={getUserHandler}
        getFavorite={getFavoriteHandler}
      />
  );

  expect(getOffersHandler).toHaveBeenCalledTimes(1);
  expect(getUserHandler).toHaveBeenCalledTimes(1);
  expect(getFavoriteHandler).toHaveBeenCalledTimes(0);
});
