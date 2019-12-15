import React from 'react';
import {
  arrayOf,
  shape,
  string,
  number,
  bool,
  func,
} from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

const OffersList = ({
  offers,
  classNames,
  onColorPin,
  onAddFavorite,
}) => (
  <div className={`${classNames} places__list`}>
    {
      offers.map((offer, index) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          listIndex={index}
          onCardHoverIn={() => onColorPin(offer.id)}
          onCardHoverOut={() => onColorPin(-1)}
          onAddFavorite={onAddFavorite}
        />
      ))
    }
  </div>
);

OffersList.propTypes = {
  offers: arrayOf(shape({
    id: number.isRequired,
    images: arrayOf(string).isRequired,
    title: string.isRequired,
    isFavorite: bool.isRequired,
    isPremium: bool.isRequired,
    rating: number.isRequired,
    bedrooms: number.isRequired,
    maxAdults: number.isRequired,
    price: number.isRequired,
    goods: arrayOf(string).isRequired,
    description: string.isRequired,
    host: shape({
      id: number.isRequired,
      isPro: bool.isRequired,
      name: string.isRequired,
      avatarUrl: string.isRequired,
    }).isRequired,
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
    }).isRequired,
  })).isRequired,
  onColorPin: func.isRequired,
  onAddFavorite: func.isRequired,
  classNames: string,
};

OffersList.defaultProps = {
  classNames: ``,
};

export default OffersList;
