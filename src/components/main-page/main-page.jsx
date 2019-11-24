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
import OffersSorter from '../offers-sorter/offers-sorter.jsx';
import MainTabs from '../main-tabs/main-tabs.jsx';
import {getCityOffers, getCities} from '../../store/selectors.js';
import actions from '../../store/actions.js';

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSortingOpen: false,
    };
    this.selectCityHandler = this.selectCityHandler.bind(this);
    this.openSorterHandler = this.openSorterHandler.bind(this);
    this.sortByHandler = this.sortByHandler.bind(this);
    this.colorPinHandler = this.colorPinHandler.bind(this);
  }

  selectCityHandler(city) {
    const {selectCity} = this.props;
    selectCity(city);
  }

  openSorterHandler() {
    const {isSortingOpen} = this.state;
    this.setState({isSortingOpen: !isSortingOpen});
  }

  sortByHandler(tag) {
    const {sortBy} = this.props;
    sortBy(tag);
    this.openSorterHandler();
  }

  colorPinHandler(id) {
    const {getOnHoverOfferId} = this.props;
    getOnHoverOfferId(id);
  }

  render() {
    const {
      offers,
      city,
      cities,
      sortedBy,
      onHoverOfferId,
    } = this.props;
    const {isSortingOpen} = this.state;
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
                <OffersSorter
                  isOpen={isSortingOpen}
                  sortedBy={sortedBy}
                  onOpenSorterClick={this.openSorterHandler}
                  onSortByClick={this.sortByHandler}
                />
                <OffersList
                  classNames={`cities__places-list tabs__content`}
                  offers={offers}
                  onColorPin={this.colorPinHandler}
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
  sortedBy: string.isRequired,
  onHoverOfferId: number.isRequired,
  selectCity: func.isRequired,
  sortBy: func.isRequired,
  getOnHoverOfferId: func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getCityOffers(state),
  city: state.city,
  cities: getCities(state),
  sortedBy: state.sortedBy,
  onHoverOfferId: state.onHoverOfferId,
});

const mapDispatchToProps = (dispatch) => ({
  selectCity: (payload) => dispatch(actions.selectCity(payload)),
  sortBy: (payload) => dispatch(actions.sortBy(payload)),
  getOnHoverOfferId: (payload) => dispatch(actions.getOnHoverOfferId(payload)),
});
export {MainPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
