import React from 'react';
import {shallow} from 'enzyme';

import MainTabs from './main-tabs.jsx';
import offers from '../../mocks/offers.js';
import {APP_CITIES} from '../../consts/index.js';

describe(`e2e test for MainTabs`, () => {
  const city = offers[0].city;

  it(`onSelectCityClick have been called`, () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
        <MainTabs
          cities={APP_CITIES}
          selectedCity={city}
          onSelectCityClick={handleClick}
        />
    );
    const title = wrapper.find(`[data-testid="city-0"]`);

    title.simulate(`click`);

    expect(handleClick).toHaveBeenCalled();
  });
  it(`onSelectCityClick called with valid argument`, () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
        <MainTabs
          cities={APP_CITIES}
          selectedCity={city}
          onSelectCityClick={handleClick}
        />
    );
    const title = wrapper.find(`[data-testid="city-0"]`);

    title.simulate(`click`);

    expect(handleClick).toBeCalledWith(expect.any(Object));
  });
});
