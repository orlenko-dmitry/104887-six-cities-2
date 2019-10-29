import React from 'react';
import renderer from 'react-test-renderer';

import MainPage from './main-page.jsx';

it(`MainPage renders correctly`, () => {
  const tree = renderer.create(<MainPage/>).toJSON();
  expect(tree).toMatchSnapshot();
});
