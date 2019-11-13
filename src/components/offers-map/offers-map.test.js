import React from 'react';
import renderer from 'react-test-renderer';

import OffersMap from '../offers-map/offers-map.jsx';
import offers from '../../mocks/offers.js';


it(`OffersMap renders correctly`, () => {
  const tree = renderer.create(
      <OffersMap offers={offers} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
