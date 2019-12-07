import React from 'react';
import {shallow} from 'enzyme';

import ReviewsForm from '../reviews-form/reviews-form.jsx';

it(`ReviewsForm renders correctly`, () => {
  const tree = shallow(
      <ReviewsForm
        rating={0}
        comment=""
        postMessageStatus=""
        onRatingChange={() => {}}
        onCommentChange={() => {}}
        onSubmitForm={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
