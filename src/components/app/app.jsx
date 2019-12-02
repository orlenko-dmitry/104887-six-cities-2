import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  string,
  func,
} from 'prop-types';

import MainPage from '../main-page/main-page.jsx';
import MainEmptyPage from '../main-empty-page/main-empty-page.jsx';
import withEmptyPage from '../../hocs/with-empty-page/with-empty-page.jsx';
import DetailsPage from '../details-page/details-page.jsx';
import aData from '../../store/data/actions.js';
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
  fetchStatus: string.isRequired,
  getOffers: func.isRequired,
};

const mapStateToProps = ({rData}) => ({
  fetchStatus: rData.status,
});

const mapDispatchToProps = (dispatch) => ({
  getOffers: () => dispatch(aData.fetchOffers()),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
