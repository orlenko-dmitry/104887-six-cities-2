import React from 'react';
import {shallow} from 'enzyme';

import AuthPage from './auth-page.jsx';
import offers from '../../mocks/offers.js';
import {ASYNC_STATUSES} from '../../consts/index.js';

const city = offers[0].city;

it(`AuthPage renders correctly`, () => {
  const tree = shallow(
      <AuthPage
        city={city}
        userEmail=""
        userPassword=""
        user={null}
        userGetStatus={ASYNC_STATUSES.ERROR}
        onFormSubmit={() => {}}
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
