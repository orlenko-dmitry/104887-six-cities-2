import React from 'react';
import {arrayOf, shape} from 'prop-types';

import ReviewsItem from '../reviews-item/reviews-item.jsx';

const ReviewsList = ({reviews}) => (
  <ul className="reviews__list">
    {reviews.map((review) => (
      <ReviewsItem review={review} key={review.id} />
    ))}
  </ul>
);

ReviewsList.propTypes = {
  reviews: arrayOf(shape({})).isRequired,
};

export default ReviewsList;
