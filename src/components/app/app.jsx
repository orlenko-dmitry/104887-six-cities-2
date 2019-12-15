import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  arrayOf,
  shape,
  oneOf,
  number,
  string,
  bool,
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
import {AppRoute, AsyncStatus} from '../../consts/consts.js';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = AsyncStatus;
const WithEmptyMainPage = withEmptyPage(MainPage, MainEmptyPage);
const WithAuthForm = withAuthForm(AuthPage);
const WithEmptyFavoritesPage = withEmptyPage(FavoritesPage, FavoritesEmptyPage);
const WithAuth = withAuth(WithEmptyFavoritesPage);

class App extends PureComponent {
  componentDidMount() {
    const {
      handleGetOffers,
      handleGetUser,
    } = this.props;
    handleGetOffers();
    handleGetUser();
  }

  componentDidUpdate(prevProps) {
    const {user, handleGetFavorite} = this.props;
    if (prevProps.user === null && user !== null) {
      handleGetFavorite();
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
          <Route exact path={AppRoute.ROOT} render={(props) => (
            <WithEmptyMainPage
              {...props}
              dataLength={offers.length}
              fetchStatus={offersFetchStatus}
            />
          )} />
          <Route path={AppRoute.AUTH} component={WithAuthForm} />
          <Route path={`${AppRoute.OFFER}/:offerId`} component={DetailsPage} />
          <Route path={AppRoute.FAVORITE} render={(props) => (
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
  offers: arrayOf(shape({
    id: number.isRequired,
    images: arrayOf(string).isRequired,
    title: string.isRequired,
    isFavorite: bool.isRequired,
    isPremium: bool.isRequired,
    rating: number.isRequired,
    bedrooms: number.isRequired,
    maxAdults: number.isRequired,
    price: number.isRequired,
    goods: arrayOf(string).isRequired,
    description: string.isRequired,
    host: shape({
      id: number.isRequired,
      isPro: bool.isRequired,
      name: string.isRequired,
      avatarUrl: string.isRequired,
    }).isRequired,
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
    }).isRequired,
  })).isRequired,
  favorites: arrayOf(shape({
    id: number.isRequired,
    images: arrayOf(string).isRequired,
    title: string.isRequired,
    isFavorite: bool.isRequired,
    isPremium: bool.isRequired,
    rating: number.isRequired,
    bedrooms: number.isRequired,
    maxAdults: number.isRequired,
    price: number.isRequired,
    goods: arrayOf(string).isRequired,
    description: string.isRequired,
    host: shape({
      id: number.isRequired,
      isPro: bool.isRequired,
      name: string.isRequired,
      avatarUrl: string.isRequired,
    }).isRequired,
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
    }).isRequired,
  })).isRequired,
  user: shape({
    avatarUrl: string.isRequired,
    email: string.isRequired,
    id: number.isRequired,
    isPro: bool.isRequired,
    name: string.isRequired,
  }),
  offersFetchStatus: oneOf([PENDING, SUCCESS, ERROR]).isRequired,
  userGetStatus: oneOf([PENDING, SUCCESS, ERROR]).isRequired,
  favoritesFetchStatus: oneOf([PENDING, SUCCESS, ERROR]).isRequired,
  handleGetOffers: func.isRequired,
  handleGetUser: func.isRequired,
  handleGetFavorite: func.isRequired,
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
  handleGetOffers: () => dispatch(aData.fetchOffers()),
  handleGetUser: () => dispatch(aUser.getUser()),
  handleGetFavorite: () => dispatch(aUser.getFavorite()),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
