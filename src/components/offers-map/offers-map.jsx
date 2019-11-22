import React, {PureComponent} from 'react';
import {
  arrayOf,
  shape,
  number,
  string,
} from 'prop-types';
import leaflet from 'leaflet';

import {leafletSetView} from '../../helpers/helpers.js';
import {LEAFLET_CONSTS} from '../../consts/index.js';

const {
  ICON_URL,
  ICON_SIZE,
  TILE_LAYER,
  ATTRIBUTION,
} = LEAFLET_CONSTS;

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
      iconUrl: ICON_URL,
      iconSize: ICON_SIZE,
    });

    leaflet
        .tileLayer(TILE_LAYER, {attribution: ATTRIBUTION})
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
