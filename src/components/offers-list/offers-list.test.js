import React from 'react';
import {shallow} from 'enzyme';

import OfferList from './offers-list.jsx';
import offers from '../../mocks/offers.js';

const city = offers[0].city;
const cityOffers = offers.filter((offfer) => offfer.city.name === city.name);

it(`OfferList renders correctly`, () => {
  const tree = shallow(
      <OfferList
        offers={cityOffers}
        onColorPin={() => {}}
      />);

  expect(tree).toMatchSnapshot();
});
