import React from 'react';
import {shallow} from 'enzyme';

import AuthPage from './auth-page.jsx';
import offers from '../../mocks/offers.js';
import {AsyncStatus} from '../../consts/consts.js';

const city = offers[0].city;

it(`AuthPage renders correctly`, () => {
  const tree = shallow(
      <AuthPage
        city={city}
        userEmail=""
        userPassword=""
        user={null}
        userGetStatus={AsyncStatus.ERROR}
        onFormSubmit={() => {}}
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
