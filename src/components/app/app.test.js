import React from 'react';
import {shallow} from 'enzyme';

import {App} from './app.jsx';
import {ASYNC_STATUSES} from '../../consts/index.js';


it(`App renders correctly`, () => {
  const tree = shallow(
      <App
        offersFetchStatus={ASYNC_STATUSES.SUCCESS}
        isAuthorizationRequired={false}
        getOffers={() => {}}
        getUser={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
