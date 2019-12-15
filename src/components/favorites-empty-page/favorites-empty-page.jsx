import React from 'react';
import {
  shape,
  string,
  number,
  bool,
} from 'prop-types';
import {connect} from 'react-redux';

import PageHeader from '../page-header/page-header.jsx';

const FavoritesEmptyPage = ({user}) => (
  <div className="page page--favorites-empty">
    <PageHeader user={user}/>
    <main className="page__main page__main--favorites page__main--favorites-empty">
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">
              Save properties to narrow down search or plan yor future trips.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);

FavoritesEmptyPage.propTypes = {
  user: shape({
    avatarUrl: string.isRequired,
    email: string.isRequired,
    id: number.isRequired,
    isPro: bool.isRequired,
    name: string.isRequired,
  }).isRequired,
};

const mapStateToprops = ({rUser}) => ({
  user: rUser.user,
});

export {FavoritesEmptyPage};

export default connect(mapStateToprops, null)(FavoritesEmptyPage);
