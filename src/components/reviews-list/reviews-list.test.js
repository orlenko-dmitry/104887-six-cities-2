import React from 'react';
import {shallow} from 'enzyme';

import ReviewsList from '../reviews-list/reviews-list.jsx';
import comments from '../../mocks/comments.js';

it(`ReviewsList renders correctly`, () => {
  const tree = shallow(<ReviewsList reviews={comments} />);

  expect(tree).toMatchSnapshot();
});
