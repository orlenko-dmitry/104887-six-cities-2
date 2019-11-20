import React, {PureComponent} from 'react';
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
import MainTabs from '../main-tabs/main-tabs.jsx';
import {getCityOffers, getCities} from '../../selectors.js';
import actions from '../../actions.js';

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
    this.selectCityHandler = this.selectCityHandler.bind(this);
  }

  selectCityHandler(city) {
    const {selectCity} = this.props;
    selectCity(city);
  }

  render() {
    const {
      offers,
      city,
      cities,
    } = this.props;
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
            onSelectCityClick={this.selectCityHandler}
          />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersQuantity} places to stay in {city.name}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex="0">Popular</li>
                    <li className="places__option" tabIndex="0">Price: low to high</li>
                    <li className="places__option" tabIndex="0">Price: high to low</li>
                    <li className="places__option" tabIndex="0">Top rated first</li>
                  </ul>
                  {/*
                  <select className="places__sorting-type" id="places-sorting">
                    <option className="places__option" value="popular" selected="">Popular</option>
                    <option className="places__option" value="to-high">Price: low to high</option>
                    <option className="places__option" value="to-low">Price: high to low</option>
                    <option className="places__option" value="top-rated">Top rated first</option>
                  </select>
                  */}
                </form>
                <OffersList offers={offers} classNames={`cities__places-list tabs__content`} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <OffersMap offers={offers} />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

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
  selectCity: func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getCityOffers(state),
  city: state.city,
  cities: getCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  selectCity: (payload) => dispatch(actions.selectCity(payload)),
});
export {MainPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
