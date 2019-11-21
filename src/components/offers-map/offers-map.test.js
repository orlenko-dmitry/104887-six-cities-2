import React from 'react';
import renderer from 'react-test-renderer';

import OffersMap from '../offers-map/offers-map.jsx';
import offers from '../../mocks/offers.js';

const city = offers[0].city;


it(`OffersMap renders correctly`, () => {
  const tree = renderer.create(
      <OffersMap offers={offers} selectedCity={city}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
