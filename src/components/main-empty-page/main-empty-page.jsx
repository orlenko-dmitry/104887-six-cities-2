import React from 'react';
import {connect} from 'react-redux';
import {
  shape,
  number,
  string,
  bool,
  func,
} from 'prop-types';

import MainTabs from '../main-tabs/main-tabs.jsx';
import PageHeader from '../page-header/page-header.jsx';
import aData from '../../store/data/actions.js';
import {AppCity} from '../../consts/consts.js';

const MainEmptyPage = ({
  city,
  handleSelectCity,
  user,
}) => (
  <div className="page page--gray page--main">
    <PageHeader user={user} />
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <MainTabs
        cities={AppCity}
        selectedCity={city}
        onSelectCityClick={handleSelectCity}
      />
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property availbale at the moment in {city.name}
              </p>
            </div>
          </section>
          <div className="cities__right-section" />
        </div>
      </div>
    </main>
  </div>
);

MainEmptyPage.propTypes = {
  city: shape({
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
      zoom: number.isRequired,
    }).isRequired,
    name: string.isRequired,
  }).isRequired,
  user: shape({
    avatarUrl: string.isRequired,
    email: string.isRequired,
    id: number.isRequired,
    isPro: bool.isRequired,
    name: string.isRequired,
  }),
  handleSelectCity: func.isRequired,
};

MainEmptyPage.defaultProps = {
  user: null,
};

const mapStateToProps = ({rData, rUser}) => ({
  city: rData.city,
  user: rUser.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleSelectCity: (payload) => dispatch(aData.selectCity(payload)),
});

export {MainEmptyPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainEmptyPage);
