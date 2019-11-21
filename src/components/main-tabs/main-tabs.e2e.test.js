import React from 'react';
import {shallow} from 'enzyme';

import MainTabs from './main-tabs.jsx';
import offers from '../../mocks/offers.js';
import cities from '../../mocks/cities.js';

describe(`e2e test for MainTabs`, () => {
  const city = offers[0].city;

  it(`onSelectCityClick have been called`, () => {
    const onClickHandler = jest.fn();
    const wrapper = shallow(
        <MainTabs
          cities={cities}
          selectedCity={city}
          onSelectCityClick={onClickHandler}
        />
    );
    const title = wrapper.find(`[data-testid="city-0"]`);

    title.simulate(`click`);

    expect(onClickHandler).toHaveBeenCalled();
  });
  it(`onSelectCityClick called with valid argument`, () => {
    const onClickHandler = jest.fn();
    const wrapper = shallow(
        <MainTabs
          cities={cities}
          selectedCity={city}
          onSelectCityClick={onClickHandler}
        />
    );
    const card = wrapper.find(`[data-testid="city-0"]`);

    card.simulate(`click`);

    expect(onClickHandler).toBeCalledWith(expect.any(Object));
  });
});