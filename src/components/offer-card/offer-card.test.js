import React from 'react';
import {shallow} from 'enzyme';

import offers from '../../mocks/offers.js';
import OfferCard from './offer-card.jsx';

const city = offers[0].city;
const cityOffers = offers.filter((offfer) => offfer.city.name === city.name);

it(`OfferCard renders correctly`, () => {
  const tree = shallow(
      <OfferCard
        offer={cityOffers[0]}
        listIndex={0}
        onCardHoverIn={() => {}}
        onCardHoverOut={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
