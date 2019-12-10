import React from 'react';
import {number} from 'prop-types';

const withEmptyPage = (ComponentPage, ComponentEmptyPage) => ({dataLength}) => {
  return dataLength > 0 ? <ComponentPage /> : <ComponentEmptyPage />;
};

withEmptyPage.propTypes = {
  dataLength: number.isRequired,
};

export default withEmptyPage;
