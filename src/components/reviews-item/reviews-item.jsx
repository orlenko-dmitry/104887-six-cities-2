import React from 'react';
import {shape, string, number} from 'prop-types';

import {defineRating} from '../../helpers/helpers.js';

const ReviewsItem = ({
  review: {
    avatar,
    userName,
    rating,
    message,
    dateTime,
    dateString,
  },
}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={avatar} width={54} height={54} alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">
        {userName}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: defineRating(rating)}} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {message}
      </p>
      <time className="reviews__time" dateTime={dateTime}>{dateString}</time>
    </div>
  </li>
);

ReviewsItem.propTypes = {
  review: shape({
    id: number.isRequired,
    avatar: string,
    userName: string.isRequired,
    rating: number.isRequired,
    message: string.isRequired,
    dateTime: string.isRequired,
    dateString: string.isRequired,
  }).isRequired,
};

ReviewsItem.defaultProps = {
  avatar: ``,
};

export default ReviewsItem;
