import React from 'react';
import renderer from 'react-test-renderer';

import ReviewsList from '../reviews-list/reviews-list.jsx';
import reviews from '../../mocks/reviews.js';

it(`ReviewsList renders correctly`, () => {
  const tree = renderer.create(<ReviewsList reviews={reviews} />);

  expect(tree).toMatchSnapshot();
});
