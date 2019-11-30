import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  arrayOf,
  shape,
  string,
  func,
} from 'prop-types';

import MainPage from '../main-page/main-page.jsx';
import MainEmptyPage from '../main-empty-page/main-empty-page.jsx';
import withEmptyPage from '../../hocs/with-empty-page/with-empty-page.jsx';
import DetailsPage from '../details-page/details-page.jsx';
import actions from '../../store/actions.js';
import {ASYNC_STATUSES} from '../../consts/index.js';

const WithEmptyPage = withEmptyPage(MainPage, MainEmptyPage);
const getPageScreen = () => {
  switch (location.pathname) {
    case `/`:
      return <WithEmptyPage />;
    case `/details`:
      return (
        <DetailsPage />
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
    const {fetchStatus} = this.props;
    const isPending = fetchStatus === ASYNC_STATUSES.PENDING;

    return !isPending && <Fragment>{getPageScreen()}</Fragment>;
  }
}

App.propTypes = {
  offers: arrayOf(shape({})),
  nearOffers: arrayOf(shape({})),
  reviews: arrayOf(shape({})),
  fetchStatus: string.isRequired,
  getOffers: func.isRequired,
};

App.defaultProps = {
  offers: [],
  nearOffers: [],
  reviews: [],
};

const mapStateToProps = (store) => ({
  fetchStatus: store.status,
});

const mapDispatchToProps = (dispatch) => ({
  getOffers: () => dispatch(actions.fetchOffers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
