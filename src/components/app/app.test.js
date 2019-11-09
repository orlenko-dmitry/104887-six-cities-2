import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';
import offers from '../../mocks/offers.js';

const div = document.createElement(`div`);
div.id = `map`;
document.body.appendChild(div);

it(`App renders correctly`, () => {
  const tree = renderer.create(<App offers={offers}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
