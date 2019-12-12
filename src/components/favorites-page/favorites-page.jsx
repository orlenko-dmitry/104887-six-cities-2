import React from 'react';
import {
  arrayOf,
  shape,
  func,
} from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import OfferCard from '../offer-card/offer-card.jsx';
import aData from '../../store/data/actions.js';
import {getFavoriteOffers} from '../../store/data/selectors';
import {ROUTES} from '../../consts/index.js';

const FavoritesPage = ({
  favorites,
  favoriteAddHandler,
  selectCityHandler,
}) => (
  <main className="page__main page__main--favorites">
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {
            favorites.map((chunk, i) => (
              <li className="favorites__locations-items" key={chunk[0].city.name}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link
                      className="locations__item-link"
                      to={ROUTES.ROOT}
                      data-testid={`location-item-link-${i}`}
                      onClick={() => selectCityHandler(chunk[0].city)}
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
  selectCityHandler: func.isRequired,
};

const mapStateToProps = ({rData}) => ({
  favorites: getFavoriteOffers({rData}),
});

const mapDispatchToProps = (dispatch) => ({
  favoriteAddHandler: (payload) => dispatch(aData.postFavorite(payload)),
  selectCityHandler: (payload) => dispatch(aData.selectCity(payload)),
});

export {FavoritesPage};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
