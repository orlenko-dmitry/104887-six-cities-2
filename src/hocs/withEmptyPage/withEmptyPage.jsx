import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';

const withEmptyPage = (ComponentPage, ComponentEmptyPage) => ({offers}) => {
  return offers.length > 0 ? <ComponentPage /> : <ComponentEmptyPage />;
};

const mapStateToProps = (state) => ({
  offers: state.offers,
});

export default compose(
    connect(mapStateToProps, null),
    (withEmptyPage)
);
