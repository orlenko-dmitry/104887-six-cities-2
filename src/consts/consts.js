export const LeafletConst = {
  iconUrl: ({onHoverOfferId, selectedOfferId, currentId}) => {
    return selectedOfferId === currentId
    || onHoverOfferId === currentId ? `/img/pin-active.svg` : `/img/pin.svg`;
  },
  ICON_SIZE: [30, 30],
  TILE_LAYER: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
  ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
};

export const SortedBy = {
  POPULAR: `Popular`,
  PRICE_TO_HIGH: `Price: low to high`,
  PRICE_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};

export const AppRoute = {
  ROOT: `/`,
  AUTH: `/login`,
  OFFER: `/offer`,
  FAVORITE: `/favorites`,
};

export const ResponseStatus = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export const MAX_REVIEWS = 10;

export const SortByList = [
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

export const AxiosConfig = {
  BASE_URL: ` https://htmlacademy-react-2.appspot.com/six-cities`,
  TIME_OUT: 5000,
  WITH_CREDENTIAL: true,
};

export const AsyncStatus = {
  PENDING: `PENDING`,
  SUCCESS: `SUCCESS`,
  ERROR: `ERROR`,
};

export const DateFormat = {
  DATE_TIME: `YYYY-MM-DD`,
  MOTH_YEAR: `MMMM YYYY`,
};

export const OfferType = {
  APARTMENT: `Apartment`,
  ROOM: `Private Room`,
  HOUSE: `House`,
  HOTEL: `Hotel`,
};

export const AppCity = [
  {
    "name": `Amsterdam`,
    "location": {
      "latitude": 52.37454,
      "longitude": 4.897976,
      "zoom": 13
    }
  },
  {
    "name": `Brussels`,
    "location": {
      "latitude": 50.846557,
      "longitude": 4.351697,
      "zoom": 13
    }
  },
  {
    "name": `Cologne`,
    "location": {
      "latitude": 50.938361,
      "longitude": 6.959974,
      "zoom": 13
    }
  },
  {
    "name": `Paris`,
    "location": {
      "latitude": 48.85661,
      "longitude": 2.351499,
      "zoom": 13
    }
  },
  {
    "name": `Hamburg`,
    "location": {
      "latitude": 53.550341,
      "longitude": 10.000654,
      "zoom": 13
    }
  },
  {
    "name": `Dusseldorf`,
    "location": {
      "latitude": 51.225402,
      "longitude": 6.776314,
      "zoom": 13
    }
  }
];
