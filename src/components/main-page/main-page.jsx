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
import PageHeader from '../page-header/page-header.jsx';
import withSorterState from '../../hocs/with-sorter/with-sorter.jsx';
import {getCityOffers} from '../../store/data/selectors.js';
import aData from '../../store/data/actions.js';
import aFilters from '../../store/filters/actions.js';
import {APP_CITIES} from '../../consts/index.js';

const WithSorterState = withSorterState(OffersSorter);

const MainPage = ({
  offers,
  city,
  user,
  sortedBy,
  onHoverOfferId,
  selectCityHandler,
  sortByHandler,
  getOfferIdHandler,
  favoriteAddHandler,
}) => {
  const offersQuantity = offers.length;

  return (
    <div className="page page--gray page--main">
      <PageHeader user={user} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <MainTabs
          cities={APP_CITIES}
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
                onAddFavorite={favoriteAddHandler}
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
  user: shape({}),
  sortedBy: string.isRequired,
  onHoverOfferId: number.isRequired,
  selectCityHandler: func.isRequired,
  sortByHandler: func.isRequired,
  getOfferIdHandler: func.isRequired,
  favoriteAddHandler: func.isRequired,
};

MainPage.defaultProps = {
  user: null,
};

const mapStateToProps = ({rData, rFilters}) => ({
  offers: getCityOffers({rData, rFilters}),
  city: rData.city,
  user: rData.user,
  sortedBy: rFilters.sortedBy,
  onHoverOfferId: rFilters.onHoverOfferId,
});

const mapDispatchToProps = (dispatch) => ({
  selectCityHandler: (payload) => dispatch(aData.selectCity(payload)),
  sortByHandler: (payload) => dispatch(aFilters.sortBy(payload)),
  getOfferIdHandler: (payload) => dispatch(aFilters.getOfferId(payload)),
  favoriteAddHandler: (payload) => dispatch(aData.postFavorite(payload)),
});

export {MainPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
