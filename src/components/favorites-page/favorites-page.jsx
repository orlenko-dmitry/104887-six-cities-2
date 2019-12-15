import React from 'react';
import {
  arrayOf,
  shape,
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
  favoriteAddHandler,
  selectCityHandler,
}) => (
  <div className="page">
    <PageHeader user={user}/>
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <FavoritesList
            favorites={favorites}
            onAddFavorite={favoriteAddHandler}
            onSelectCity={selectCityHandler}
          />
        </section>
      </div>
    </main>
  </div>
);

FavoritesPage.propTypes = {
  favorites: arrayOf(arrayOf(shape({
  }))).isRequired,
  user: shape({}),
  favoriteAddHandler: func.isRequired,
  selectCityHandler: func.isRequired,
};

FavoritesPage.defaultProps = {

};

const mapStateToProps = ({rUser}) => ({
  favorites: sortFavorites(rUser.favorites),
  user: rUser.user,
});

const mapDispatchToProps = (dispatch) => ({
  favoriteAddHandler: (payload) => dispatch(aUser.postFavorite(payload)),
  selectCityHandler: (payload) => dispatch(aData.selectCity(payload)),
});

export {FavoritesPage};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
