import {createSelector} from 'reselect';

import {sortOffeers, sortFavorites} from '../../helpers/helpers.js';

const getOffers = ({rData}) => rData.offers;
const getFavorites = ({rData}) => rData.favorites;
const getCity = ({rData}) => rData.city;
const getSortedBy = ({rFilters}) => rFilters.sortedBy;

export const getCityOffers = createSelector(
    [getOffers, getCity, getSortedBy],
    (offers, city, sortedBy) => sortOffeers(offers.filter((item) => item.city.name === city.name), sortedBy)
);

export const getFavoriteOffers = createSelector(
    [getFavorites],
    (favorites) => sortFavorites(favorites)
);
