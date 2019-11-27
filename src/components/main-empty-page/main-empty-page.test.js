import React from 'react';
import {shallow} from 'enzyme';

import {MainEmptyPage} from './main-empty-page.jsx';
import offers from '../../mocks/offers.js';
import cities from '../../mocks/cities.js';

const city = offers[0].city;

it(`MainPage renders correctly`, () => {
  const tree = shallow(
      <MainEmptyPage
        city={city}
        cities={cities}
        selectCityHandler={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
