import {createSelector} from 'reselect';

const getOffers = (state) => state.offers;
const getCity = (state) => state.city;

export const getCityOffers = createSelector(
    [getOffers, getCity],
    (offers, city) => offers.filter((item) => item.city.name === city.name)
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
