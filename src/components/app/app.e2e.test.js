import React from 'react';
import {shallow} from 'enzyme';

import {App} from './app.jsx';
import {ASYNC_STATUSES} from '../../consts/index.js';

it(`getOffers have been called once`, () => {
  const actionHandler = jest.fn();

  shallow(<App fetchStatus={ASYNC_STATUSES.PENDING} getOffers={actionHandler} />);
  expect(actionHandler).toHaveBeenCalledTimes(1);
});
