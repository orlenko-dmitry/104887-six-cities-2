import React, {Fragment} from 'react';
import {
  arrayOf,
  shape,
} from 'prop-types';

import MainPage from '../main-page/main-page.jsx';
import DetailsPage from '../details-page/details-page.jsx';

const getPageScreen = (offers, reviews) => {
  switch (location.pathname) {
    case `/`:
      return <MainPage offers={offers} />;
    case `/details`:
      return <DetailsPage offer={offers[0]} reviews={reviews} />;
  }
  return null;
};

const App = ({offers, reviews}) => (
  <Fragment>{getPageScreen(offers, reviews)}</Fragment>
);

App.propTypes = {
  offers: arrayOf(shape({})).isRequired,
  reviews: arrayOf(shape({})).isRequired,
};

export default App;
