import React from 'react';
import renderer from 'react-test-renderer';

import OfferList from './offers-list.jsx';
import offers from '../../mocks/offers.js';

it(`OfferList renders correctly`, () => {
  const tree = renderer.create(<OfferList offers={offers}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
