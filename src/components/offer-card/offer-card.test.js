import React from 'react';
import renderer from 'react-test-renderer';

import offers from '../../mocks/offers.js';
import OfferCard from './offer-card.jsx';

const city = offers[0].city;
const cityOffers = offers.filter((offfer) => offfer.city.name === city.name);

it(`OfferCard renders correctly`, () => {
  const tree = renderer.create(
      <OfferCard
        offer={cityOffers[0]}
        onTitleClick={() => {}}
        onCardHoverIn={() => {}}
        onCardHoverOut={() => {}}
      />
  ).toJSON;

  expect(tree).toMatchSnapshot();
});
