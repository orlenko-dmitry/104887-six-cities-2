import {createSelector} from 'reselect';

import {sortOffeers} from '../../helpers/helpers.js';

const getOffers = ({rData}) => rData.offers;
const getCity = ({rData}) => rData.city;
const getSortedBy = ({rFilters}) => rFilters.sortedBy;

export const getCityOffers = createSelector(
    [getOffers, getCity, getSortedBy],
    (offers, city, sortedBy) => sortOffeers(offers.filter((item) => item.city.name === city.name), sortedBy)
);
