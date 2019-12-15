import React from 'react';
import {shape, oneOf} from 'prop-types';
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
  user: shape({}),
  userGetStatus: oneOf([PENDING, SUCCESS, ERROR]).isRequired,
};

withAuth.defaultProps = {
  user: null,
};

export default withAuth;
