import React, {Fragment} from 'react';
import {
  oneOf,
  string,
  number,
  func,
} from 'prop-types';
import {ASYNC_STATUSES} from '../../consts';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = ASYNC_STATUSES;
const stars = Array.from(Array(5).keys()).reverse();

const ReviewsForm = ({
  rating,
  comment,
  messagePostStatus,
  onRatingChange,
  onCommentChange,
  onSubmitForm,
}) => {
  const disabledCondition = messagePostStatus === ASYNC_STATUSES.PENDING
              || rating === 0
              || comment.length < 50
              || comment.length > 300;

  return (
    <form className="reviews__form form" onSubmit={(evt) => onSubmitForm(evt)}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {stars.map((star) => (
          <Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={star + 1}
              id={`${star + 1}-stars`}
              type="radio"
              checked={rating === star + 1}
              onChange={() => onRatingChange(star + 1)}
            />
            <label
              htmlFor={`${star + 1}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        disabled={messagePostStatus === ASYNC_STATUSES.PENDING}
        onChange={(evt) => onCommentChange(evt.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={disabledCondition}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewsForm.propTypes = {
  rating: number.isRequired,
  comment: string.isRequired,
  messagePostStatus: oneOf([``, PENDING, SUCCESS, ERROR]).isRequired,
  onRatingChange: func.isRequired,
  onCommentChange: func.isRequired,
  onSubmitForm: func.isRequired,
};

export default ReviewsForm;
