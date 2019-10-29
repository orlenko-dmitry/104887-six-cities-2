import React from 'react';
import {
  arrayOf,
  shape,
  string,
  number,
  bool,
} from 'prop-types';

import MainPage from '../main-page/main-page.jsx';

const App = ({offers}) => <MainPage offers={offers}/>;

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
