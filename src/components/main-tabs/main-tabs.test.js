import React from 'react';
import {shallow} from 'enzyme';

import MainTabs from '../main-tabs/main-tabs.jsx';
import offers from '../../mocks/offers.js';
import {AppCity} from '../../consts/consts.js';

const city = offers[0].city;

it(`MainTabs rnders correctly`, () => {
  const tree = shallow(
      <MainTabs
        cities={AppCity}
        selectedCity={city}
        onSelectCityClick={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
