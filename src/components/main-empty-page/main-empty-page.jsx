import React from 'react';
import {connect} from 'react-redux';
import {
  arrayOf,
  shape,
  number,
  string,
  func,
} from 'prop-types';

import MainTabs from '../main-tabs/main-tabs.jsx';
import actions from '../../store/actions.js';
import {getCities} from '../../store/selectors';

const MainEmptyPage = ({cities, city, selectCityHandler}) => (
  <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a
                  className="header__nav-link header__nav-link--profile"
                  href="#"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <MainTabs
        cities={cities}
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
  cities: arrayOf(shape({})).isRequired,
  selectCityHandler: func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  cities: getCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  selectCityHandler: (payload) => dispatch(actions.selectCity(payload)),
});

export {MainEmptyPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainEmptyPage);
