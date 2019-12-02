import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  bool,
  string,
  func,
} from 'prop-types';

import MainPage from '../main-page/main-page.jsx';
import MainEmptyPage from '../main-empty-page/main-empty-page.jsx';
import withEmptyPage from '../../hocs/with-empty-page/with-empty-page.jsx';
import DetailsPage from '../details-page/details-page.jsx';
import AuthPage from '../auth-page/auth-page.jsx';
import aData from '../../store/data/actions.js';
import {ASYNC_STATUSES} from '../../consts/index.js';

const WithEmptyPage = withEmptyPage(MainPage, MainEmptyPage);
const getPageScreen = (isAuthorizationRequired) => {
  switch (location.pathname) {
    case `/`:
      return isAuthorizationRequired ? <AuthPage /> : <WithEmptyPage />;
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
    const {fetchStatus, isAuthorizationRequired} = this.props;
    const isPending = fetchStatus === ASYNC_STATUSES.PENDING;

    return !isPending && <Fragment>{getPageScreen(isAuthorizationRequired)}</Fragment>;
  }
}

App.propTypes = {
  fetchStatus: string.isRequired,
  isAuthorizationRequired: bool.isRequired,
  getOffers: func.isRequired,
};

const mapStateToProps = ({rData}) => ({
  fetchStatus: rData.status,
  isAuthorizationRequired: rData.isAuthorizationRequired,
});

const mapDispatchToProps = (dispatch) => ({
  getOffers: () => dispatch(aData.fetchOffers()),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
