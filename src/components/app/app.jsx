import React, {Fragment} from 'react';
import {
  arrayOf,
  shape,
} from 'prop-types';

import MainPage from '../main-page/main-page.jsx';
import MainEmptyPage from '../main-empty-page/main-empty-page.jsx';
import withEmptyPage from '../../hocs/withEmptyPage/withEmptyPage.jsx';
import DetailsPage from '../details-page/details-page.jsx';

const WithEmptyPage = withEmptyPage(MainPage, MainEmptyPage);
const getPageScreen = (offers, nearOffers, reviews) => {
  const city = offers[0].city;

  switch (location.pathname) {
    case `/`:
      return <WithEmptyPage />;
    case `/details`:
      return (
        <DetailsPage
          offer={offers[0]}
          reviews={reviews}
          city={city}
        />
      );
  }
  return null;
};

const App = ({offers, nearOffers, reviews}) => (
  <Fragment>{getPageScreen(offers, nearOffers, reviews)}</Fragment>
);

App.propTypes = {
  offers: arrayOf(shape({})),
  nearOffers: arrayOf(shape({})),
  reviews: arrayOf(shape({})),
};

App.defaultProps = {
  offers: [],
  nearOffers: [],
  reviews: [],
};

export default App;
