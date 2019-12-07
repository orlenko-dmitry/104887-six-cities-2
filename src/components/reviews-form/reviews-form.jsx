import React, {Fragment} from 'react';
import {
  string,
  number,
  func,
} from 'prop-types';
import {ASYNC_STATUSES} from '../../consts';

const raitings = Array.from(Array(5).keys()).reverse();

const ReviewsForm = ({
  rating,
  comment,
  postMessageStatus,
  onRatingChange,
  onCommentChange,
  onSubmitForm,
}) => (
  <form className="reviews__form form" onSubmit={(evt) => onSubmitForm(evt)}>
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      {raitings.map((raiting) => (
        <Fragment key={raiting}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={raiting + 1}
            id={`${raiting + 1}-stars`}
            type="radio"
          />
          <label
            htmlFor={`${raiting + 1}-stars`}
            className="reviews__rating-label form__rating-label"
            title="perfect"
            onClick={() => onRatingChange(raiting + 1)}
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
      disabled={postMessageStatus === ASYNC_STATUSES.PENDING}
      onChange={(evt) => onCommentChange(evt.target.value)}
    />
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button
        className="reviews__submit form__submit button"
        type="submit"
        disabled={
          postMessageStatus === ASYNC_STATUSES.PENDING
          || rating === 0
          || comment.length < 50
          || comment.length > 300
        }
      >
        Submit
      </button>
    </div>
  </form>
);

ReviewsForm.propTypes = {
  rating: number.isRequired,
  comment: string.isRequired,
  postMessageStatus: string.isRequired,
  onRatingChange: func.isRequired,
  onCommentChange: func.isRequired,
  onSubmitForm: func.isRequired,
};

export default ReviewsForm;
