import React from 'react';
import {
  arrayOf,
  shape,
  number,
  string,
  func,
} from 'prop-types';

const MainTabs = ({cities, selectedCity, onSelectCityClick}) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city, index) => (
          <li
            className="locations__item"
            data-testid={`city-${index}`}
            key={`${city.name}`}
            onClick={() => onSelectCityClick(city)}
          >
            <a className={`${city.name === selectedCity.name ? `tabs__item--active` : ``} locations__item-link tabs__item`}>
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

MainTabs.propTypes = {
  cities: arrayOf(shape({
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
      zoom: number.isRequired,
    }).isRequired,
    name: string.isRequired,
  })).isRequired,
  selectedCity: shape({
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
      zoom: number.isRequired,
    }).isRequired,
    name: string.isRequired,
  }).isRequired,
  onSelectCityClick: func.isRequired,
};

export default MainTabs;
