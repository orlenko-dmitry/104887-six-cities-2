export const LEAFLET_CONSTS = {
  iconUrl: ({onHoverOfferId, currentId}) => onHoverOfferId === currentId ? `img/pin-active.svg` : `img/pin.svg`,
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

export const AXIOS_CONFIG = {
  BASE_URL: ` https://htmlacademy-react-2.appspot.com/six-cities`,
  TIME_OUT: 5000,
  WITH_CREDENTIAL: true,
};
