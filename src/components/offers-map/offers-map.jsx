import React, {PureComponent} from 'react';
import {
  arrayOf,
  shape,
  number,
  string,
  bool,
} from 'prop-types';
import leaflet from 'leaflet';

import {leafletSetView} from '../../helpers/helpers.js';
import {LeafletConst} from '../../consts/consts.js';

const {
  TILE_LAYER,
  ATTRIBUTION,
} = LeafletConst;

class OffersMap extends PureComponent {
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
      onHoverOfferId,
      selectedOfferId,
    } = this.props;

    const center = [latitude, longitude];

    this.map = leaflet.map(`map`, {
      center,
      zoom,
      zoomControl: false,
      marker: true
    });

    leaflet
        .tileLayer(TILE_LAYER, {attribution: ATTRIBUTION})
        .addTo(this.map);
    leafletSetView({offers, map: this.map, city: center, zoom, onHoverOfferId, selectedOfferId, leaflet});
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
      onHoverOfferId,
      selectedOfferId,
    } = this.props;
    const center = [latitude, longitude];

    if (prevProps.selectedCity.name !== name || prevProps.onHoverOfferId !== onHoverOfferId) {
      leafletSetView({offers, map: this.map, city: center, zoom, onHoverOfferId, selectedOfferId, leaflet});
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
    id: number.isRequired,
    images: arrayOf(string).isRequired,
    title: string.isRequired,
    isFavorite: bool.isRequired,
    isPremium: bool.isRequired,
    rating: number.isRequired,
    bedrooms: number.isRequired,
    maxAdults: number.isRequired,
    price: number.isRequired,
    goods: arrayOf(string).isRequired,
    description: string.isRequired,
    host: shape({
      id: number.isRequired,
      isPro: bool.isRequired,
      name: string.isRequired,
      avatarUrl: string.isRequired,
    }).isRequired,
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
  onHoverOfferId: number,
  selectedOfferId: number,
};

OffersMap.defaultProps = {
  onHoverOfferId: -1,
  selectedOfferId: null,
};

export default OffersMap;
