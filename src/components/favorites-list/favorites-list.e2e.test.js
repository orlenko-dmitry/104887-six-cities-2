import React from 'react';
import {shallow} from 'enzyme';

import FavoritesList from './favorites-list.jsx';
import {sortFavorites} from '../../helpers/helpers.js';
import offers from '../../mocks/offers.js';

describe(`e2e test for FavoritesList`, () => {
  const favorites = sortFavorites(offers);

  it(`handleSelectCity have been called`, () => {
    const handleSelectCity = jest.fn();
    const wrapper = shallow(
        <FavoritesList
          favorites={favorites}
          onSelectCity={handleSelectCity}
          onAddFavorite={() => {}}
        />
    );
    const link = wrapper.find(`[data-testid="location-item-link-0"]`);

    link.simulate(`click`);

    expect(handleSelectCity).toHaveBeenCalled();
  });

  it(`handleSelectCity called with valid argument`, () => {
    const handleSelectCity = jest.fn();
    const wrapper = shallow(
        <FavoritesList
          favorites={favorites}
          onSelectCity={handleSelectCity}
          onAddFavorite={() => {}}
        />
    );
    const link = wrapper.find(`[data-testid="location-item-link-0"]`);

    link.simulate(`click`);

    expect(handleSelectCity).toBeCalledWith(expect.any(Object));
  });
});
