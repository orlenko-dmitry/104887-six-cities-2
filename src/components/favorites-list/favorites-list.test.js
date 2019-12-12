import React from 'react';
import {shallow} from 'enzyme';

import FavoritesList from './favorites-list';
import {sortFavorites} from '../../helpers/helpers.js';
import offers from '../../mocks/offers.js';

const favorites = sortFavorites(offers);

it(`FavoritesList renders correctly`, () => {
  const tree = shallow(
      <FavoritesList
        favorites={favorites}
        onSelectCity={() => {}}
        onAddFavorite={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
