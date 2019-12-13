import React from 'react';
import {shape, oneOf} from 'prop-types';
import {Redirect} from 'react-router-dom';

import {ROUTES, ASYNC_STATUSES} from '../../consts/index.js';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = ASYNC_STATUSES;

const withAuth = (Component) => (props) => {
  const {user, userGetStatus} = props;

  if (user !== null && userGetStatus === SUCCESS) {
    return <Component {...props} />;
  } else if (user === null && userGetStatus === ERROR) {
    return <Redirect to={ROUTES.AUTH} />;
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
