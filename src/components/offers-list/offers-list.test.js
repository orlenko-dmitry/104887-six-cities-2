import React from 'react';
import renderer from 'react-test-renderer';

import OfferList from './offers-list.jsx';
import offers from '../../mocks/offers.js';

const city = offers[0].city;
const cityOffers = offers.filter((offfer) => offfer.city.name === city.name);

it(`OfferList renders correctly`, () => {
  const tree = renderer.create(<OfferList offers={cityOffers}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
