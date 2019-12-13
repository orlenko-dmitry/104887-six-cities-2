import React from 'react';
import {shallow} from 'enzyme';

import FavoritesEmptyPage from './favorites-empty-page.jsx';

it(`FavoritesEmptyPage rendres correctly`, () => {
  const tree = shallow(<FavoritesEmptyPage />);

  expect(tree).toMatchSnapshot();
});
