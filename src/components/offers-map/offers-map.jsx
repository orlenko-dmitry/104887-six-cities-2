import React, {PureComponent} from 'react';
import leaflet from 'leaflet';
import {
  arrayOf,
  shape,
  number,
} from 'prop-types';

const city = [52.38333, 4.9];
const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});
const zoom = 12;

class OffersMap extends PureComponent {
  componentDidMount() {
    const {offers} = this.props;
    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    map.setView(city, zoom);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);
    offers.map(({location: {latitude, longitude}}) => {
      const offerCords = [latitude, longitude];
      leaflet
      .marker(offerCords, {icon})
      .addTo(map);
    });
  }

  render() {
    return (
      <section className="cities__map map">
        <div id="map" style={{height: `100%`}}></div>
      </section>
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
