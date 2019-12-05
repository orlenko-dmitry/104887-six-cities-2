import React from 'react';
import {shallow} from 'enzyme';

import ReviewsItem from '../reviews-item/reviews-item.jsx';
import comments from '../../mocks/comments.js';

it(`ReviewsItem renders correctly`, () => {
  const tree = shallow(<ReviewsItem review={comments[0]} key={comments[0].id}/>);

  expect(tree).toMatchSnapshot();
});
