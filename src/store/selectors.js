import {createSelector} from 'reselect';

import {sortOffeers} from '../helpers/helpers.js';

const getOffers = (state) => state.offers;
const getCity = (state) => state.city;
const getSortedBy = (state) => state.sortedBy;

export const getCityOffers = createSelector(
    [getOffers, getCity, getSortedBy],
    (offers, city, sortedBy) => sortOffeers(offers.filter((item) => item.city.name === city.name), sortedBy)
);
