import React from 'react';
import {number} from 'prop-types';

import {ASYNC_STATUSES} from '../../consts/index.js';

const withEmptyPage = (ComponentPage, ComponentEmptyPage) => (props) => {
  const {dataLength, fetchStatus} = props;

  if (fetchStatus === ASYNC_STATUSES.PENDING) {
    return null;
  } else if (fetchStatus === ASYNC_STATUSES.SUCCESS) {
    return dataLength > 0 ? <ComponentPage {...props} /> : <ComponentEmptyPage {...props} />;
  }
  return null;
};

withEmptyPage.propTypes = {
  dataLength: number.isRequired,
};

export default withEmptyPage;
