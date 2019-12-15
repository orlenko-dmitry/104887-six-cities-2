import React from 'react';
import {
  arrayOf,
  shape,
  number,
  string,
  bool,
} from 'prop-types';

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
  reviews: arrayOf(shape({
    comment: string.isRequired,
    date: string.isRequired,
    id: number.isRequired,
    rating: number.isRequired,
    user: shape({
      avatarUrl: string.isRequired,
      id: number.isRequired,
      isPro: bool.isRequired,
      name: string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default ReviewsList;
