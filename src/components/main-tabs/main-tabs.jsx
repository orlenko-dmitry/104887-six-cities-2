import React from 'react';
import {arrayOf, string} from 'prop-types';

const MainTabs = ({cities, selectedCity}) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={`${city}`}>
            <a className={`locations__item-link tabs__item ${city === selectedCity ? `tabs__item--active` : ``}`}>
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

MainTabs.propTypes = {
  cities: arrayOf(string),
  selectedCity: string,
};

export default MainTabs;
