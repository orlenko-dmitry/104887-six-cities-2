import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  arrayOf,
  shape,
  oneOf,
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
import withAuth from '../../hocs/with-auth/with-auth.jsx';
import aData from '../../store/data/actions.js';
import aUser from '../../store/user/actions.js';
import {getCityOffers} from '../../store/data/selectors.js';
import {ROUTES, ASYNC_STATUSES} from '../../consts/index.js';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = ASYNC_STATUSES;

const WithEmptyMainPage = withEmptyPage(MainPage, MainEmptyPage);
const WithAuthForm = withAuthForm(AuthPage);
const WithEmptyFavoritesPage = withEmptyPage(FavoritesPage, FavoritesEmptyPage);
const WithAuth = withAuth(WithEmptyFavoritesPage);

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
      user,
      offersFetchStatus,
      userGetStatus,
      favoritesFetchStatus,
    } = this.props;

    return (
      <Fragment>
        <Switch>
          <Route exact path={ROUTES.ROOT} render={(props) => (
            <WithEmptyMainPage
              {...props}
              dataLength={offers.length}
              fetchStatus={offersFetchStatus}
            />
          )} />
          <Route path={ROUTES.AUTH} component={WithAuthForm} />
          <Route path={`${ROUTES.OFFER}/:offerId`} component={DetailsPage} />
          <Route path={ROUTES.FAVORITE} render={(props) => (
            <WithAuth
              {...props}
              user={user}
              userGetStatus={userGetStatus}
              dataLength={favorites.length}
              fetchStatus={favoritesFetchStatus}
            />
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
  offersFetchStatus: oneOf([PENDING, SUCCESS, ERROR]).isRequired,
  userGetStatus: oneOf([PENDING, SUCCESS, ERROR]).isRequired,
  favoritesFetchStatus: oneOf([PENDING, SUCCESS, ERROR]).isRequired,
  getOffersHandler: func.isRequired,
  getUserHandler: func.isRequired,
  getFavorite: func.isRequired,
};

App.defaultProps = {
  user: null,
};

const mapStateToProps = ({
  rData,
  rFilters,
  rUser,
}) => ({
  offers: getCityOffers({rData, rFilters}),
  favorites: rUser.favorites,
  user: rUser.user,
  offersFetchStatus: rData.offersFetchStatus,
  userGetStatus: rUser.userGetStatus,
  favoritesFetchStatus: rUser.favoritesFetchStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getOffersHandler: () => dispatch(aData.fetchOffers()),
  getUserHandler: () => dispatch(aUser.getUser()),
  getFavorite: () => dispatch(aUser.getFavorite()),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
