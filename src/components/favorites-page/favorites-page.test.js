import React from 'react';
import {shallow} from 'enzyme';

import {FavoritesPage} from './favorites-page.jsx';
import offers from '../../mocks/offers.js';

it(`FavoritesPage rendres correctly`, () => {
  const tree = shallow(<FavoritesPage favorites={offers} favoriteAddHandler={() => {}}/>);

  expect(tree).toMatchSnapshot();
});
