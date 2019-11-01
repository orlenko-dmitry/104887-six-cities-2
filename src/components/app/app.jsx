import React, {Fragment} from 'react';
import {
  arrayOf,
  shape,
  string,
  number,
  bool,
} from 'prop-types';

import MainPage from '../main-page/main-page.jsx';

const getPageScreen = (offers) => {
  switch (location.pathname) {
    case `/`:
      return <MainPage offers={offers} />;
    case `/details`:
      return null;
  }
  return null;
};

const App = (offers) => (
  <Fragment>{getPageScreen({offers})}</Fragment>
);

App.propTypes = {
  offers: arrayOf(shape({
    id: number,
    name: string,
    type: string,
    price: number,
    isPremiun: bool,
    inBookmarks: bool,
    rating: string,
    img: string,
  })).isRequired,
};

export default App;
