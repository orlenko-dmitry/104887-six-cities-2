import React from 'react';
import {shallow} from 'enzyme';

import {App} from './app.jsx';
import {AsyncStatus} from '../../consts/consts.js';
import offers from '../../mocks/offers.js';


it(`App renders correctly`, () => {
  const tree = shallow(
      <App
        offers={offers}
        favorites={offers}
        offersFetchStatus={AsyncStatus.SUCCESS}
        userGetStatus={AsyncStatus.SUCCESS}
        favoritesFetchStatus={AsyncStatus.SUCCESS}
        handleGetOffers={() => {}}
        handleGetUser={() => {}}
        handleGetFavorite={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
