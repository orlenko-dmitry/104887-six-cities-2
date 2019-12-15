import React from 'react';
import {shallow} from 'enzyme';

import {FavoritesPage} from './favorites-page.jsx';
import {sortFavorites} from '../../helpers/helpers.js';
import offers from '../../mocks/offers.js';
import user from '../../mocks/user.js';

const favorites = sortFavorites(offers);

it(`FavoritesPage rendres correctly`, () => {
  const tree = shallow(
      <FavoritesPage
        favorites={favorites}
        user={user}
        handleSelectCity={() => {}}
        handleFavoriteAdd={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
