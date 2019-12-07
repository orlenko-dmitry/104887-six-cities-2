import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  bool,
  string,
  func,
} from 'prop-types';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainPage from '../main-page/main-page.jsx';
import MainEmptyPage from '../main-empty-page/main-empty-page.jsx';
import DetailsPage from '../details-page/details-page.jsx';
import AuthPage from '../auth-page/auth-page.jsx';
import withEmptyPage from '../../hocs/with-empty-page/with-empty-page.jsx';
import withAuthForm from '../../hocs/with-auth-form/with-auth-form.jsx';
import aData from '../../store/data/actions.js';
import {ASYNC_STATUSES} from '../../consts/index.js';

const WithEmptyPage = withEmptyPage(MainPage, MainEmptyPage);
const WithAuthForm = withAuthForm(AuthPage);
const getPageScreen = (isAuthorizationRequired) => {
  switch (location.pathname) {
    case `/`:
      return isAuthorizationRequired ? <WithAuthForm /> : <WithEmptyPage />;
    case `/details`:
      return (
        <DetailsPage />
      );
  }
  return null;
};

class App extends PureComponent {
  componentDidMount() {
    const {getOffers, getUser} = this.props;
    getOffers();
    getUser();
  }

  render() {
    const {fetchStatus, isAuthorizationRequired} = this.props;
    const isPending = fetchStatus === ASYNC_STATUSES.PENDING;

    return !isPending && (
      <Fragment>
        {getPageScreen(isAuthorizationRequired)}
        <ToastContainer />
      </Fragment>
    );
  }
}

App.propTypes = {
  fetchStatus: string.isRequired,
  isAuthorizationRequired: bool.isRequired,
  getOffers: func.isRequired,
  getUser: func.isRequired,
};

const mapStateToProps = ({rData}) => ({
  fetchStatus: rData.status,
  isAuthorizationRequired: rData.isAuthorizationRequired,
});

const mapDispatchToProps = (dispatch) => ({
  getOffers: () => dispatch(aData.fetchOffers()),
  getUser: () => dispatch(aData.getUser()),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
