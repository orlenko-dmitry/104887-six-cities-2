import React from 'react';
import {shallow} from 'enzyme';

import ReviewsItem from '../reviews-item/reviews-item.jsx';
import reviews from '../../mocks/reviews.js';

it(`ReviewsItem renders correctly`, () => {
  const tree = shallow(<ReviewsItem review={reviews[0]} key={reviews[0].id}/>);

  expect(tree).toMatchSnapshot();
});
