import React from 'react';
import {
  arrayOf,
  shape,
  func,
} from 'prop-types';
import {connect} from 'react-redux';

import OfferCard from '../offer-card/offer-card.jsx';
import aData from '../../store/data/actions.js';
import {getFavoriteOffers} from '../../store/data/selectors';

const FavoritesPage = ({favorites, favoriteAddHandler}) => (
  <main className="page__main page__main--favorites">
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {
            favorites.map((chunk) => (
              <li className="favorites__locations-items" key={chunk[0].city.name}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{chunk[0].city.name}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {chunk.map((favorite, index) => (
                    <OfferCard
                      key={favorite.id}
                      offer={favorite}
                      listIndex={index}
                      isFavoriteCard
                      onAddFavorite={favoriteAddHandler}
                    />
                  ))}
                </div>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  </main>
);

FavoritesPage.propTypes = {
  favorites: arrayOf(arrayOf(shape({
  }))).isRequired,
  favoriteAddHandler: func.isRequired,
};

const mapStateToProps = ({rData}) => ({
  favorites: getFavoriteOffers({rData}),
});

const mapDispatchToProps = (dispatch) => ({
  favoriteAddHandler: (payload) => dispatch(aData.postFavorite(payload)),
});

export {FavoritesPage};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
