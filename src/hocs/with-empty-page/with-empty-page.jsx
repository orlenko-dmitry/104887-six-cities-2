import React from 'react';
import {number} from 'prop-types';

const withEmptyPage = (ComponentPage, ComponentEmptyPage) => (props) => {
  const {dataLength} = props;

  return dataLength > 0 ? <ComponentPage {...props} /> : <ComponentEmptyPage {...props} />;
};

withEmptyPage.propTypes = {
  dataLength: number.isRequired,
};

export default withEmptyPage;
