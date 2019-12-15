import React from 'react';
import {shallow} from 'enzyme';

import {FavoritesEmptyPage} from './favorites-empty-page.jsx';
import user from '../../mocks/user.js';

it(`FavoritesEmptyPage rendres correctly`, () => {
  const tree = shallow(<FavoritesEmptyPage user={user}/>);

  expect(tree).toMatchSnapshot();
});
