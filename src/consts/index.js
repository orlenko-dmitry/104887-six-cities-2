export const LEAFLET_CONSTS = {
  ICON_URL: `img/pin.svg`,
  ICON_SIZE: [30, 30],
  TILE_LAYER: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
  ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
};

export const SELECT_CITY_PAYLOAD = {
  name: `Amsterdam`,
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  },
};

export const SORTED_BY = {
  POPULAR: `Popular`,
  PRICE_TO_HIGH: `Price: low to high`,
  PRICE_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};

export const SORT_BY_LIST = [
  {
    id: 1,
    name: `Popular`,
  },
  {
    id: 2,
    name: `Price: low to high`,
  },
  {
    id: 3,
    name: `Price: high to low`,
  },
  {
    id: 4,
    name: `Top rated first`,
  },
];
