import React from 'react';
import {shallow} from 'enzyme';

import ReviewsList from '../reviews-list/reviews-list.jsx';
import reviews from '../../mocks/reviews.js';

it(`ReviewsList renders correctly`, () => {
  const tree = shallow(<ReviewsList reviews={reviews} />);

  expect(tree).toMatchSnapshot();
});
