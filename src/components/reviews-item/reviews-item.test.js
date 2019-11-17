import React from 'react';
import renderer from 'react-test-renderer';

import ReviewsItem from '../reviews-item/reviews-item.jsx';
import reviews from '../../mocks/reviews.js';

it(`ReviewsItem renders correctly`, () => {
  const tree = renderer.create(<ReviewsItem review={reviews[0]} key={reviews[0].id}/>);

  expect(tree).toMatchSnapshot();
});
