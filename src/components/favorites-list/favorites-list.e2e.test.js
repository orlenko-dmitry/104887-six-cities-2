import React from 'react';
import {shallow} from 'enzyme';

import FavoritesList from './favorites-list.jsx';
import {sortFavorites} from '../../helpers/helpers.js';
import offers from '../../mocks/offers.js';

describe(`e2e test for FavoritesList`, () => {
  const favorites = sortFavorites(offers);

  it(`selectCityHandler have been called`, () => {
    const selectCityHandler = jest.fn();
    const wrapper = shallow(
        <FavoritesList
          favorites={favorites}
          onSelectCity={selectCityHandler}
          onAddFavorite={() => {}}
        />
    );
    const link = wrapper.find(`[data-testid="location-item-link-0"]`);

    link.simulate(`click`);

    expect(selectCityHandler).toHaveBeenCalled();
  });

  it(`selectCityHandler called with valid argument`, () => {
    const selectCityHandler = jest.fn();
    const wrapper = shallow(
        <FavoritesList
          favorites={favorites}
          onSelectCity={selectCityHandler}
          onAddFavorite={() => {}}
        />
    );
    const link = wrapper.find(`[data-testid="location-item-link-0"]`);

    link.simulate(`click`);

    expect(selectCityHandler).toBeCalledWith(expect.any(Object));
  });
});
