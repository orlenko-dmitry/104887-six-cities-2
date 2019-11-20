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
        {cities.map((city) => (
          <li className="locations__item" key={`${city.name}`} onClick={() => onSelectCityClick(city)}>
            <a className={`locations__item-link tabs__item ${city.name === selectedCity.name ? `tabs__item--active` : ``}`}>
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

MainTabs.propTypes = {
  cities: arrayOf(shape({})).isRequired,
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
