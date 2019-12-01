import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {arrayOf, shape} from 'prop-types';

import {getCityOffers} from '../../store/data/selectors.js';

const withEmptyPage = (ComponentPage, ComponentEmptyPage) => ({offers}) => {
  return offers.length > 0 ? <ComponentPage /> : <ComponentEmptyPage />;
};

const mapStateToProps = ({rData, rFilters}) => ({
  offers: getCityOffers({rData, rFilters}),
});

withEmptyPage.propTypes = {
  offers: arrayOf(shape({})).isRequired,
};

export {withEmptyPage};

export default compose(
    connect(mapStateToProps, null),
    withEmptyPage
);
