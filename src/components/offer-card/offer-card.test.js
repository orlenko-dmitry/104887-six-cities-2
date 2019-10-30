import React from 'react';
import renderer from 'react-test-renderer';

import offers from '../../mocks/offers.js';
import OfferCard from './offer-card.jsx';

it(`OfferCard renders correctly`, () => {
  const tree = renderer.create(
      <OfferCard
        offer={offers[0]}
        onTitleClick={() => {}}
        onCardHoverIn={() => {}}
        onCardHoverOut={() => {}}
      />
  ).toJSON;

  expect(tree).toMatchSnapshot();
});
