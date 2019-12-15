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
import aUser from '../../store/user/actions.js';
import aFilters from '../../store/filters/actions.js';
import {AppCity} from '../../consts/consts.js';

const WithSorterState = withSorterState(OffersSorter);

const MainPage = ({
  offers,
  city,
  user,
  sortedBy,
  onHoverOfferId,
  handleSelectCity,
  handleSortBy,
  handleGetOfferId,
  handleFavoriteAdd,
}) => {
  const offersQuantity = offers.length;

  return (
    <div className="page page--gray page--main">
      <PageHeader user={user} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <MainTabs
          cities={AppCity}
          selectedCity={city}
          onSelectCityClick={handleSelectCity}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersQuantity} places to stay in {city.name}</b>
              <WithSorterState
                sortedBy={sortedBy}
                onSortByClick={handleSortBy}
              />
              <OffersList
                classNames={`cities__places-list tabs__content`}
                offers={offers}
                onColorPin={handleGetOfferId}
                onAddFavorite={handleFavoriteAdd}
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
  handleSelectCity: func.isRequired,
  handleSortBy: func.isRequired,
  handleGetOfferId: func.isRequired,
  handleFavoriteAdd: func.isRequired,
};

MainPage.defaultProps = {
  user: null,
};

const mapStateToProps = ({
  rData,
  rFilters,
  rUser,
}) => ({
  offers: getCityOffers({rData, rFilters}),
  city: rData.city,
  user: rUser.user,
  sortedBy: rFilters.sortedBy,
  onHoverOfferId: rFilters.onHoverOfferId,
});

const mapDispatchToProps = (dispatch) => ({
  handleSelectCity: (payload) => dispatch(aData.selectCity(payload)),
  handleSortBy: (payload) => dispatch(aFilters.sortBy(payload)),
  handleGetOfferId: (payload) => dispatch(aFilters.getOfferId(payload)),
  handleFavoriteAdd: (payload) => dispatch(aUser.postFavorite(payload)),
});

export {MainPage};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
