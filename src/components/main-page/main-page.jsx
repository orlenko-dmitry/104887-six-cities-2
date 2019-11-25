import React from 'react';
import {
  arrayOf,
  shape,
  number,
  string,
  func,
} from 'prop-types';
import {connect} from 'react-redux';

import OffersList from '../offers-list/offers-list.jsx';
import OffersMap from '../offers-map/offers-map.jsx';
import OffersSorter from '../offers-sorter/offers-sorter.jsx';
import MainTabs from '../main-tabs/main-tabs.jsx';
import withSorterState from '../../hocs/withSorterState/withSorterState.jsx';
import {getCityOffers, getCities} from '../../store/selectors.js';
import actions from '../../store/actions.js';

const WithSorterState = withSorterState(OffersSorter);

const MainPage = ({
  offers,
  city,
  cities,
  sortedBy,
  onHoverOfferId,
  selectCityHandler,
  sortByHandler,
  getOfferIdHandler,
}) => {
  const offersQuantity = offers.length;


  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <MainTabs
          cities={cities}
          selectedCity={city}
          onSelectCityClick={selectCityHandler}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersQuantity} places to stay in {city.name}</b>
              <WithSorterState
                sortedBy={sortedBy}
                onSortByClick={sortByHandler}
              />
              <OffersList
                classNames={`cities__places-list tabs__content`}
                offers={offers}
                onColorPin={getOfferIdHandler}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <OffersMap
                  offers={offers}
                  selectedCity={city}
                  onHoverOfferId={onHoverOfferId}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


MainPage.propTypes = {
  offers: arrayOf(shape({})).isRequired,
  city: shape({
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
      zoom: number.isRequired,
    }).isRequired,
    name: string.isRequired,
  }).isRequired,
  cities: arrayOf(shape({})).isRequired,
  sortedBy: string.isRequired,
  onHoverOfferId: number.isRequired,
  selectCityHandler: func.isRequired,
  sortByHandler: func.isRequired,
  getOfferIdHandler: func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getCityOffers(state),
  city: state.city,
  cities: getCities(state),
  sortedBy: state.sortedBy,
  onHoverOfferId: state.onHoverOfferId,
});

const mapDispatchToProps = (dispatch) => ({
  selectCityHandler: (payload) => dispatch(actions.selectCity(payload)),
  sortByHandler: (payload) => dispatch(actions.sortBy(payload)),
  getOfferIdHandler: (payload) => dispatch(actions.getOfferId(payload)),
});

export {MainPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
