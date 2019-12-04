import React from 'react';
import {shallow} from 'enzyme';

import {App} from './app.jsx';
import {ASYNC_STATUSES} from '../../consts/index.js';

it(`getOffers have been called once`, () => {
  const getOffersHandler = jest.fn();
  const getUserHandler = jest.fn();

  shallow(
      <App
        fetchStatus={ASYNC_STATUSES.PENDING}
        isAuthorizationRequired={false}
        getOffers={getOffersHandler}
        getUser={getUserHandler}
      />
  );

  expect(getOffersHandler).toHaveBeenCalledTimes(1);
  expect(getUserHandler).toHaveBeenCalledTimes(1);
});
