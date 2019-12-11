import React from 'react';
import {shallow} from 'enzyme';

import {App} from './app.jsx';
import {ASYNC_STATUSES} from '../../consts/index.js';
import offers from '../../mocks/offers.js';


it(`getOffers have been called once`, () => {
  const getOffersHandler = jest.fn();
  const getUserHandler = jest.fn();

  shallow(
      <App
        offers={offers}
        user={null}
        offersFetchStatus={ASYNC_STATUSES.PENDING}
        getOffers={getOffersHandler}
        getUser={getUserHandler}
        getFavorite={() => {}}
      />
  );

  expect(getOffersHandler).toHaveBeenCalledTimes(1);
  expect(getUserHandler).toHaveBeenCalledTimes(1);
});
