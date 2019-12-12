import React from 'react';
import {Redirect} from 'react-router-dom';

import {ROUTES, ASYNC_STATUSES} from '../../consts/index.js';

const withAuth = (Component) => (props) => {
  const {user, userGetStatus} = props;

  if (user !== null && userGetStatus === ASYNC_STATUSES.SUCCESS) {
    return <Component {...props} />;
  } else if (user === null && userGetStatus === ASYNC_STATUSES.ERROR) {
    return <Redirect to={ROUTES.AUTH} />;
  }
  return null;
};

export default withAuth;
