import React from 'react';
import {shallow} from 'enzyme';

import MainTabs from '../main-tabs/main-tabs.jsx';
import offers from '../../mocks/offers.js';
import cities from '../../mocks/cities.js';

const city = offers[0].city;

it(`MainTabs rnders correctly`, () => {
  const tree = shallow(
      <MainTabs
        cities={cities}
        selectedCity={city}
        onSelectCityClick={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
