import React, {PureComponent} from 'react';
import {
  arrayOf,
  shape,
  number,
  string,
} from 'prop-types';
import leaflet from 'leaflet';

import {leafletSetView} from '../../helpers/helpers.js';

class OffersMap extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      selectedCity: {
        location: {
          latitude,
          longitude,
          zoom,
        }
      },
      offers,
    } = this.props;
    const center = [latitude, longitude];

    this.map = leaflet.map(`map`, {
      center,
      zoom,
      zoomControl: false,
      marker: true
    });
    this.icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this.map);
    leafletSetView({offers, map: this.map, city: center, zoom, icon: this.icon, leaflet});
  }

  componentDidUpdate(prevProps) {
    const {
      selectedCity: {
        location: {
          latitude,
          longitude,
          zoom,
        },
        name,
      },
      offers,
    } = this.props;
    const center = [latitude, longitude];

    if (prevProps.selectedCity.name !== name) {
      leafletSetView({offers, map: this.map, city: center, zoom, icon: this.icon, leaflet});
    }
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}}></div>
    );
  }
}

OffersMap.propTypes = {
  offers: arrayOf(shape({
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
    }).isRequired,
  })).isRequired,
  selectedCity: shape({
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
      zoom: number.isRequired,
    }).isRequired,
    name: string.isRequired,
  }).isRequired,
};

export default OffersMap;
