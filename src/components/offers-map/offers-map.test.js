import React from 'react';
import {shallow} from 'enzyme';

import OffersMap from '../offers-map/offers-map.jsx';
import offers from '../../mocks/offers.js';

const city = offers[0].city;


it(`OffersMap renders correctly`, () => {
  const tree = shallow(<OffersMap offers={offers} selectedCity={city}/>);

  expect(tree).toMatchSnapshot();
});
