import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  arrayOf,
  shape,
  func,
} from 'prop-types';

import MainPage from '../main-page/main-page.jsx';
import MainEmptyPage from '../main-empty-page/main-empty-page.jsx';
import withEmptyPage from '../../hocs/with-empty-page/with-empty-page.jsx';
import DetailsPage from '../details-page/details-page.jsx';
import actions from '../../store/actions.js';

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

class App extends PureComponent {
  componentDidMount() {
    const {getOffers} = this.props;
    getOffers();
  }
  render() {
    const {
      offers,
      nearOffers,
      reviews,
    } = this.props;

    return <Fragment>{getPageScreen(offers, nearOffers, reviews)}</Fragment>;
  }
}

App.propTypes = {
  offers: arrayOf(shape({})),
  nearOffers: arrayOf(shape({})),
  reviews: arrayOf(shape({})),
  getOffers: func.isRequired,
};

App.defaultProps = {
  offers: [],
  nearOffers: [],
  reviews: [],
};

const mapDispatchToProps = (dispatch) => ({
  getOffers: () => dispatch(actions.fetchOffers()),
});

export default connect(null, mapDispatchToProps)(App);
