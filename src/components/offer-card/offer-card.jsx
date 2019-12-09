import React from 'react';
import {
  shape,
  oneOf,
  string,
  number,
  bool,
  func,
} from 'prop-types';
import {Link} from 'react-router-dom';

import {defineRating} from '../../helpers/helpers.js';
import {OFFER_TYPE, ROUTES} from '../../consts/index.js';

const OfferCard = ({
  offer: {
    id,
    title,
    type,
    price,
    isPremium,
    isFavorite,
    rating,
    previewImage,
  },
  listIndex,
  onCardHoverIn,
  onCardHoverOut,
}) => (
  <article
    className="cities__place-card place-card"
    key={id}
    data-testid={`place-card-${listIndex}`}
    onMouseEnter={() => onCardHoverIn(id)}
    onMouseLeave={onCardHoverOut}
  >
    {isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          className={`place-card__bookmark-button${isFavorite ? `--active` : ``} button`}
          type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">
            {isFavorite ? `In bookmarks` : `To bookmarks`}
          </span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: defineRating(rating)}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2
        className="place-card__name"
        data-testid={`place-card-title-${listIndex}`}
      >
        <Link to={`${ROUTES.OFFER}/${id}`}>{title}</Link>
      </h2>
      <p className="place-card__type">{OFFER_TYPE[type]}</p>
    </div>
  </article>
);

OfferCard.propTypes = {
  offer: shape({
    id: number.isRequired,
    title: string.isRequired,
    type: oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
    price: number.isRequired,
    isPremium: bool.isRequired,
    isFavorite: bool.isRequired,
    rating: number.isRequired,
    previewImage: string.isRequired,
  }).isRequired,
  listIndex: number.isRequired,
  onCardHoverIn: func.isRequired,
  onCardHoverOut: func.isRequired,
};

export default OfferCard;
