import React from 'react';
import {number} from 'prop-types';

import {AsyncStatus} from '../../consts/consts.js';

const withEmptyPage = (ComponentPage, ComponentEmptyPage) => (props) => {
  const {dataLength, fetchStatus} = props;

  if (fetchStatus === AsyncStatus.PENDING) {
    return null;
  } else if (fetchStatus === AsyncStatus.SUCCESS) {
    return dataLength > 0 ? <ComponentPage {...props} /> : <ComponentEmptyPage {...props} />;
  }
  return null;
};

withEmptyPage.propTypes = {
  dataLength: number.isRequired,
};

export default withEmptyPage;
