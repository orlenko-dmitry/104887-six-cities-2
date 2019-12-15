import React from 'react';
import {
  arrayOf,
  shape,
  number,
  string,
  bool,
  func,
} from 'prop-types';
import {connect} from 'react-redux';

import FavoritesList from '../favorites-list/favorites-list.jsx';
import aData from '../../store/data/actions.js';
import aUser from '../../store/user/actions.js';
import {sortFavorites} from '../../helpers/helpers.js';
import PageHeader from '../page-header/page-header.jsx';

const FavoritesPage = ({
  favorites,
  user,
  handleFavoriteAdd,
  handleSelectCity,
}) => (
  <div className="page">
    <PageHeader user={user}/>
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <FavoritesList
            favorites={favorites}
            onAddFavorite={handleFavoriteAdd}
            onSelectCity={handleSelectCity}
          />
        </section>
      </div>
    </main>
  </div>
);

FavoritesPage.propTypes = {
  favorites: arrayOf(shape({
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
  user: shape({
    avatarUrl: string.isRequired,
    email: string.isRequired,
    id: number.isRequired,
    isPro: bool.isRequired,
    name: string.isRequired,
  }),
  handleFavoriteAdd: func.isRequired,
  handleSelectCity: func.isRequired,
};

FavoritesPage.defaultProps = {
  user: null,
};

const mapStateToProps = ({rUser}) => ({
  favorites: sortFavorites(rUser.favorites),
  user: rUser.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleFavoriteAdd: (payload) => dispatch(aUser.postFavorite(payload)),
  handleSelectCity: (payload) => dispatch(aData.selectCity(payload)),
});

export {FavoritesPage};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
