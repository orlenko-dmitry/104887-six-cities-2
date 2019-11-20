import {createSelector} from 'reselect';
import {convertOffersToCamelCase} from './helpers/helpers.js';

const getOffers = (state) => state.offers;
const getCity = (state) => state.city;

export const getCityOffers = createSelector(
    [getOffers, getCity],
    (offers, city) => convertOffersToCamelCase(offers.filter((item) => item.city.name === city))
);

export const getCities = createSelector(
    [getOffers],
    (offers) => {
      let cities = [];
      offers.forEach((item) => {
        if (!cities.includes(item.city.name)) {
          cities.push(item.city.name);
        }
      });
      return cities;
    }
);
