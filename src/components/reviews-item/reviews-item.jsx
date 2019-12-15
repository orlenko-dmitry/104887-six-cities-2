import React from 'react';
import {
  shape,
  string,
  number,
  bool,
} from 'prop-types';
import moment from 'moment';

import {defineRating} from '../../helpers/helpers.js';
import {DateFormat} from '../../consts/consts.js';

const ReviewsItem = ({
  review: {
    comment,
    date,
    rating,
    user: {
      avatarUrl,
      name,
    },
  },
}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={avatarUrl} width={54} height={54} alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">
        {name}
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
        {comment}
      </p>
      <time
        className="reviews__time"
        dateTime={moment(date).format(DateFormat.DATE_TIME)}
      >
        {moment(date).format(DateFormat.MOTH_YEAR)}
      </time>
    </div>
  </li>
);

ReviewsItem.propTypes = {
  review: shape({
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
  }).isRequired,
};

export default ReviewsItem;
