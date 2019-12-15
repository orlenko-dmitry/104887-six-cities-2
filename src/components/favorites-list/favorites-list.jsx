import React from 'react';
import {
  arrayOf,
  shape,
  number,
  string,
  bool,
  func,
} from 'prop-types';
import {Link} from 'react-router-dom';

import OfferCard from '../offer-card/offer-card.jsx';
import {AppRoute} from '../../consts/consts.js';

const FavoritesList = ({
  favorites,
  onSelectCity,
  onAddFavorite,
}) => (
  <ul className="favorites__list">
    {
      favorites.map((chunk, i) => (
        <li className="favorites__locations-items" key={chunk[0].city.name}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.ROOT}
                data-testid={`location-item-link-${i}`}
                onClick={() => onSelectCity(chunk[0].city)}
              >
                <span>{chunk[0].city.name}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {chunk.map((favorite, index) => (
              <OfferCard
                key={favorite.id}
                offer={favorite}
                listIndex={index}
                isFavoriteCard
                onAddFavorite={onAddFavorite}
              />
            ))}
          </div>
        </li>
      ))
    }
  </ul>
);

FavoritesList.propTypes = {
  favorites: arrayOf(arrayOf(shape({
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
  }))).isRequired,
  onSelectCity: func.isRequired,
  onAddFavorite: func.isRequired,
};

export default FavoritesList;
