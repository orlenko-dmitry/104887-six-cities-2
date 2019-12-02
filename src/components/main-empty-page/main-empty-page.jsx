import React from 'react';
import {connect} from 'react-redux';
import {
  shape,
  number,
  string,
  func,
} from 'prop-types';

import MainTabs from '../main-tabs/main-tabs.jsx';
import PageHeader from '../page-header/page-header.jsx';
import aData from '../../store/data/actions.js';
import {APP_CITIES} from '../../consts/index.js';

const MainEmptyPage = ({
  city,
  selectCityHandler,
  signInHandler,
}) => (
  <div className="page page--gray page--main">
    <PageHeader onSignInClick={signInHandler} />
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <MainTabs
        cities={APP_CITIES}
        selectedCity={city}
        onSelectCityClick={selectCityHandler}
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
  selectCityHandler: func.isRequired,
  signInHandler: func.isRequired,
};

const mapStateToProps = ({rData}) => ({
  city: rData.city,
});

const mapDispatchToProps = (dispatch) => ({
  selectCityHandler: (payload) => dispatch(aData.selectCity(payload)),
  signInHandler: () => dispatch(aData.signIn()),
});

export {MainEmptyPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainEmptyPage);
