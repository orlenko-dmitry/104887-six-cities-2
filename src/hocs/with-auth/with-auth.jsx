import React from 'react';
import {
  shape,
  oneOf,
  string,
  number,
  bool,
} from 'prop-types';
import {Redirect} from 'react-router-dom';

import {AppRoute, AsyncStatus} from '../../consts/consts.js';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = AsyncStatus;

const withAuth = (Component) => (props) => {
  const {user, userGetStatus} = props;

  if (user !== null && userGetStatus === SUCCESS) {
    return <Component {...props} />;
  } else if (user === null && userGetStatus === ERROR) {
    return <Redirect to={AppRoute.AUTH} />;
  }
  return null;
};

withAuth.propTypes = {
  user: shape({
    avatarUrl: string.isRequired,
    email: string.isRequired,
    id: number.isRequired,
    isPro: bool.isRequired,
    name: string.isRequired,
  }),
  userGetStatus: oneOf([PENDING, SUCCESS, ERROR]).isRequired,
};

withAuth.defaultProps = {
  user: null,
};

export default withAuth;
