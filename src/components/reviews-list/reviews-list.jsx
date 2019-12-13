import React from 'react';
import {arrayOf, shape} from 'prop-types';

import ReviewsItem from '../reviews-item/reviews-item.jsx';
import {defineMaxReviews} from '../../helpers/helpers.js';

const ReviewsList = ({reviews}) => (
  <ul className="reviews__list">
    {defineMaxReviews(reviews).map((review) => (
      <ReviewsItem review={review} key={review.id} />
    ))}
  </ul>
);

ReviewsList.propTypes = {
  reviews: arrayOf(shape({})).isRequired,
};

export default ReviewsList;
