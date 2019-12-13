import React from 'react';
import {shallow} from 'enzyme';

import {FavoritesPage} from './favorites-page.jsx';
import {sortFavorites} from '../../helpers/helpers.js';
import offers from '../../mocks/offers.js';

const favorites = sortFavorites(offers);

it(`FavoritesPage rendres correctly`, () => {
  const tree = shallow(
      <FavoritesPage
        favorites={favorites}
        selectCityHandler={() => {}}
        favoriteAddHandler={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
