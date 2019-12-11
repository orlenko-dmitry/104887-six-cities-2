import React from 'react';
import {shallow} from 'enzyme';

import {App} from './app.jsx';
import {ASYNC_STATUSES} from '../../consts/index.js';
import offers from '../../mocks/offers.js';


it(`App renders correctly`, () => {
  const tree = shallow(
      <App
        offers={offers}
        favorites={offers}
        user={null}
        offersFetchStatus={ASYNC_STATUSES.SUCCESS}
        getOffersHandler={() => {}}
        getUserHandler={() => {}}
        getFavorite={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
