import React, {PureComponent} from 'react';
import {
  arrayOf,
  shape,
  number,
} from 'prop-types';
import leaflet from 'leaflet';

const zoom = 12;

class OffersMap extends PureComponent {
  componentDidMount() {
    const {offers} = this.props;
    const {latitude: cityLatitude, longitude: cityLongitude} = offers[0].city.location;
    const city = [cityLatitude, cityLongitude];
    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    map.setView(city, zoom);
    leaflet
          .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
          })
          .addTo(map);
    offers.map(({location: {latitude: offerLatitude, longitude: offerLongitude}}) => {
      const offerCords = [offerLatitude, offerLongitude];
      leaflet
      .marker(offerCords, {icon})
      .addTo(map);
    });
  }

  // componentDidUpdate(prevProps) {
  //   const {}
  //   if (prevProps.)
  // }

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
};

export default OffersMap;
