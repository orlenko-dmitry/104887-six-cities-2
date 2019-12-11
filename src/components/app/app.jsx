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
import FavoritesPage from '../favorites-page/favorites-page.jsx';
import FavoritesEmptyPage from '../favorites-empty-page/favorites-empty-page.jsx';
import withEmptyPage from '../../hocs/with-empty-page/with-empty-page.jsx';
import withAuthForm from '../../hocs/with-auth-form/with-auth-form.jsx';
import aData from '../../store/data/actions.js';
import {getCityOffers} from '../../store/data/selectors.js';
import {ASYNC_STATUSES, ROUTES} from '../../consts/index.js';

const WithEmptyMainPage = withEmptyPage(MainPage, MainEmptyPage);
const WithAuthForm = withAuthForm(AuthPage);
const WithEmptyFavoritesPage = withEmptyPage(FavoritesPage, FavoritesEmptyPage);

class App extends PureComponent {
  componentDidMount() {
    const {
      getOffersHandler,
      getUserHandler,
    } = this.props;
    getOffersHandler();
    getUserHandler();
  }

  componentDidUpdate(prevProps) {
    const {user, getFavorite} = this.props;
    if (prevProps.user === null && user !== null) {
      getFavorite();
    }
  }

  render() {
    const {
      offers,
      favorites,
      offersFetchStatus,
    } = this.props;
    const isPending = offersFetchStatus === ASYNC_STATUSES.PENDING;

    return !isPending && (
      <Fragment>
        <Switch>
          <Route exact path={ROUTES.ROOT} render={(props) => (
            <WithEmptyMainPage {...props} dataLength={offers.length} />
          )} />
          <Route path={ROUTES.AUTH} component={WithAuthForm} />
          <Route path={`${ROUTES.OFFER}/:offerId`} component={DetailsPage} />
          <Route path={ROUTES.FAVORITE} render={(props) => (
            <WithEmptyFavoritesPage {...props} dataLength={favorites.length}/>
          )}/>
        </Switch>
        <ToastContainer />
      </Fragment>
    );
  }
}

App.propTypes = {
  offers: arrayOf(shape({})).isRequired,
  favorites: arrayOf(shape({})).isRequired,
  user: shape({}),
  offersFetchStatus: string.isRequired,
  getOffersHandler: func.isRequired,
  getUserHandler: func.isRequired,
  getFavorite: func.isRequired,
};

App.defaultProps = {
  user: null,
};

const mapStateToProps = ({rData, rFilters}) => ({
  offers: getCityOffers({rData, rFilters}),
  favorites: rData.favorites,
  user: rData.user,
  offersFetchStatus: rData.offersFetchStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getOffersHandler: () => dispatch(aData.fetchOffers()),
  getUserHandler: () => dispatch(aData.getUser()),
  getFavorite: () => dispatch(aData.getFavorite()),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
