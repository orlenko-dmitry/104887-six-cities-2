import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  bool,
  string,
  func,
} from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import MainPage from '../main-page/main-page.jsx';
import MainEmptyPage from '../main-empty-page/main-empty-page.jsx';
import DetailsPage from '../details-page/details-page.jsx';
import AuthPage from '../auth-page/auth-page.jsx';
import withEmptyPage from '../../hocs/with-empty-page/with-empty-page.jsx';
import withAuthForm from '../../hocs/with-auth-form/with-auth-form.jsx';
import aData from '../../store/data/actions.js';
import {ASYNC_STATUSES, ROUTES} from '../../consts/index.js';

const WithEmptyPage = withEmptyPage(MainPage, MainEmptyPage);
const WithAuthForm = withAuthForm(AuthPage);

class App extends PureComponent {
  componentDidMount() {
    const {getOffers, getUser} = this.props;
    getOffers();
    getUser();
  }

  render() {
    const {offersFetchStatus} = this.props;
    const isPending = offersFetchStatus === ASYNC_STATUSES.PENDING;

    return !isPending && (
      <Switch>
        <Route exact path={ROUTES.ROOT}>
          <WithEmptyPage />
        </Route>
        <Route path={`${ROUTES.OFFER}/:id`}>
          <DetailsPage />
        </Route>
        <Route path={ROUTES.AUTH}>
          <WithAuthForm />
        </Route>
        <ToastContainer />
      </Switch>
    );
  }
}

App.propTypes = {
  offersFetchStatus: string.isRequired,
  isAuthorizationRequired: bool.isRequired,
  getOffers: func.isRequired,
  getUser: func.isRequired,
};

const mapStateToProps = ({rData}) => ({
  offersFetchStatus: rData.offersFetchStatus,
  isAuthorizationRequired: rData.isAuthorizationRequired,
});

const mapDispatchToProps = (dispatch) => ({
  getOffers: () => dispatch(aData.fetchOffers()),
  getUser: () => dispatch(aData.getUser()),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
