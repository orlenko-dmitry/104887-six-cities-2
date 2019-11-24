import React from 'react';
import {shallow} from 'enzyme';

import {MainPage} from './main-page.jsx';
import offers from '../../mocks/offers.js';
import cities from '../../mocks/cities.js';
import {SORTED_BY} from '../../consts/index.js';

const city = offers[0].city;
const cityOffers = offers.filter((offfer) => offfer.city.name === city.name);

it(`MainPage renders correctly`, () => {
  const tree = shallow(
      <MainPage
        offers={cityOffers}
        city={city}
        cities={cities}
        sortedBy={SORTED_BY.POPULAR}
        onHoverOfferId={null}
        selectCity={() => {}}
        sortBy={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
