import {createSelector} from 'reselect';

import {sortOffeers} from '../helpers/helpers.js';

const getOffers = (state) => state.offers;
const getCity = (state) => state.city;
const getSortedBy = (state) => state.sortedBy;

export const getCityOffers = createSelector(
    [getOffers, getCity, getSortedBy],
    (offers, city, sortedBy) => sortOffeers(offers.filter((item) => item.city.name === city.name), sortedBy)
);

export const getCities = createSelector(
    [getOffers],
    (offers) => {
      let cities = [];
      offers.forEach((item) => {
        if (!cities.some((elem) => elem.name === item.city.name)) {
          cities.push(item.city);
        }
      });
      return cities;
    }
);
