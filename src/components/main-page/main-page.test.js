import React from 'react';
import renderer from 'react-test-renderer';

import MainPage from './main-page.jsx';

it(`MainPage renders correctly`, () => {
  const places = [
    `Wood and stone place`,
    `Canal View Prinsengracht`,
    `Nice, cozy, warm big bed apartment`,
    `Wood and stone place`,
  ];
  const tree = renderer.create(<MainPage places={places}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
