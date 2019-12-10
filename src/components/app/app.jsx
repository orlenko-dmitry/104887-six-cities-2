import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  arrayOf,
  shape,
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
import {getCityOffers} from '../../store/data/selectors.js';
import {ASYNC_STATUSES, ROUTES} from '../../consts/index.js';

const WithEmptyMainPage = withEmptyPage(MainPage, MainEmptyPage);
const WithAuthForm = withAuthForm(AuthPage);

class App extends PureComponent {
  componentDidMount() {
    const {getOffers, getUser} = this.props;
    getOffers();
    getUser();
  }

  render() {
    const {offers, offersFetchStatus} = this.props;
    const isPending = offersFetchStatus === ASYNC_STATUSES.PENDING;

    return !isPending && (
      <Fragment>
        <Switch>
          <Route exact path={ROUTES.ROOT} render={(props) => (
            <WithEmptyMainPage {...props} dataLength={offers.length} />
          )} />
          <Route path={`${ROUTES.OFFER}/:offerId`} component={DetailsPage} />
          <Route path={ROUTES.AUTH} component={WithAuthForm} />
        </Switch>
        <ToastContainer />
      </Fragment>
    );
  }
}

App.propTypes = {
  offers: arrayOf(shape({})).isRequired,
  offersFetchStatus: string.isRequired,
  getOffers: func.isRequired,
  getUser: func.isRequired,
};

const mapStateToProps = ({rData, rFilters}) => ({
  offers: getCityOffers({rData, rFilters}),
  offersFetchStatus: rData.offersFetchStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getOffers: () => dispatch(aData.fetchOffers()),
  getUser: () => dispatch(aData.getUser()),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
