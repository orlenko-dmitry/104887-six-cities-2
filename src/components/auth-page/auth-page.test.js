import React from 'react';
import {shallow} from 'enzyme';

import AuthPage from './auth-page.jsx';
import offers from '../../mocks/offers.js';

const city = offers[0].city;

it(`AuthPage renders correctly`, () => {
  const tree = shallow(
      <AuthPage
        city={city}
        userEmail=""
        userPassword=""
        user={null}
        onFormSubmit={() => {}}
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
