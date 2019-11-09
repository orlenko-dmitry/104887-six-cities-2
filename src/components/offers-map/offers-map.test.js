import React from 'react';
import renderer from 'react-test-renderer';

import OffersMap from '../offers-map/offers-map.jsx';
import offers from '../../mocks/offers.js';

const div = document.createElement(`div`);
div.id = `map`;
document.body.appendChild(div);

it(`OffersMap renders correctly`, () => {
  const tree = renderer.create(
      <OffersMap offers={offers} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
