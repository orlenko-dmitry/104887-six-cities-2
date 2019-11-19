import React, {Fragment} from 'react';
import {
  arrayOf,
  shape,
} from 'prop-types';

import MainPage from '../main-page/main-page.jsx';
import DetailsPage from '../details-page/details-page.jsx';

const getPageScreen = (offers, nearOffers, reviews) => {
  switch (location.pathname) {
    case `/`:
      return <MainPage />;
    case `/details`:
      return (
        <DetailsPage
          offer={offers[0]}
          nearOffers={nearOffers}
          reviews={reviews}
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
