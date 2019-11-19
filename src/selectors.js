import {createSelector} from 'reselect';

const getOffers = (state) => state.offers;
const getCity = (state) => state.city;

export const getCityOffers = createSelector(
    [getOffers, getCity],
    (offers, city) => offers.filter((item) => item.city.name === city)
);
