import React from 'react';
import {
  shape,
  string,
  number,
  bool,
  func,
} from 'prop-types';

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
  onTitleClick,
  onCardHoverIn,
  onCardHoverOut,
}) => (
  <article
    className="cities__place-card place-card"
    key={id}
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
          className={
            isFavorite
              ? `place-card__bookmark-button--active button`
              : `place-card__bookmark-button button`
          }
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
          <span style={{width: rating}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name" onClick={() => onTitleClick(id)}>
        <a href="#">{title}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>
);

OfferCard.propTypes = {
  offer: shape({
    id: number.isRequired,
    title: string.isRequired,
    type: string.isRequired,
    price: number.isRequired,
    isPremium: bool.isRequired,
    isFavorite: bool.isRequired,
    rating: string.isRequired,
    previewImage: string.isRequired,
  }).isRequired,
  onTitleClick: func.isRequired,
  onCardHoverIn: func.isRequired,
  onCardHoverOut: func.isRequired,
};

export default OfferCard;
