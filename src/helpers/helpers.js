import {
  SORTED_BY,
  LEAFLET_CONSTS,
} from '../consts/index.js';

const {
  POPULAR,
  PRICE_TO_HIGH,
  PRICE_TO_LOW,
  TOP_RATED,
} = SORTED_BY;

export const defineRating = (rating) => {
  return `${Math.round(rating / 5 * 100)}%`;
};

export const leafletSetView = ({offers, map, city, zoom, onHoverOfferId, leaflet}) => {
  map.setView(city, zoom);
  offers.map(({
    location: {
      latitude: offerLatitude,
      longitude: offerLongitude,
    },
    id: currentId,
  }) => {
    const offerCords = [offerLatitude, offerLongitude];
    const icon = leaflet.icon({
      iconUrl: LEAFLET_CONSTS.iconUrl({onHoverOfferId, currentId}),
      iconSize: LEAFLET_CONSTS.ICON_SIZE,
    });
    leaflet
    .marker(offerCords, {icon})
    .addTo(map);
  });
};

export const flushPromises = () => new Promise((resolve) => window.setImmediate(resolve));

export const sortOffeers = (offers, sortedBy) => {
  switch (sortedBy) {
    case POPULAR: return offers;
    case PRICE_TO_HIGH:
      return offers.sort((a, b) => a.price - b.price);
    case PRICE_TO_LOW:
      return offers.sort((a, b) => b.price - a.price);
    case TOP_RATED:
      return offers.sort((a, b) => b.rating - a.rating);
    default: return offers;
  }
};

export const convertOffersToCamelCase = (offers) => {
  return offers.map(({
    city,
    preview_image: previewImage,
    images,
    title,
    is_favorite: isFavorite,
    is_premium: isPremium,
    rating,
    type,
    bedrooms,
    max_adults: maxAdults,
    price,
    goods,
    host,
    description,
    location,
    id,
  }) => ({
    city,
    previewImage,
    images,
    title,
    isFavorite,
    isPremium,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host: {
      id: host.id,
      isPro: host.is_pro,
      name: host.name,
      avatarUrl: host.avatar_url,
    },
    description,
    location,
    id,
  }));
};
