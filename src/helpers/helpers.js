import {
  SORTED_BY,
  LEAFLET_CONSTS,
  APP_CITIES,
  MAX_REVIEWS,
} from '../consts/index.js';

const {
  POPULAR,
  PRICE_TO_HIGH,
  PRICE_TO_LOW,
  TOP_RATED,
} = SORTED_BY;

export const defineRating = (rating) => {
  return `${Math.round(rating) / 5 * 100}%`;
};

export const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const defineMaxReviews = (reviews) => reviews.length <= MAX_REVIEWS
  ? reviews.reverse()
  : reviews.reverse().splice(0, reviews.length - MAX_REVIEWS);

export const leafletSetView = ({offers, map, city, zoom, onHoverOfferId, selectedOfferId, leaflet}) => {
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
      iconUrl: LEAFLET_CONSTS.iconUrl({onHoverOfferId, selectedOfferId, currentId}),
      iconSize: LEAFLET_CONSTS.ICON_SIZE,
    });
    leaflet
    .marker(offerCords, {icon})
    .addTo(map);
  });
};

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

export const sortFavorites = (favorites) => {
  const result = [];
  for (let i = 0; i < APP_CITIES.length; i++) {
    const chunk = favorites.filter((favorite) => favorite.city.name === APP_CITIES[i].name);
    if (chunk.length > 0) {
      result.push(chunk);
    }
  }
  return result;
};

export const getNearOffers = (offers, selectedOfferId, withSelectedOffer = false) => {
  const result = [];
  const selectedOfferIndex = offers.map((offer) => offer.id).indexOf(selectedOfferId);
  let index = 0;
  while (result.length < 3) {
    if (index !== selectedOfferIndex) {
      result.push(offers[index]);
      ++index;
    } else {
      ++index;
    }
  }
  if (withSelectedOffer) {
    return [...result, offers[selectedOfferIndex]];
  } else {
    return result;
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

export const convertOfferToCamelCase = ({
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
});

export const convertCommentsToCamelCase = (comments) => {
  return comments.map(({
    comment,
    date,
    id,
    rating,
    user,
  }) => ({
    comment,
    date,
    id,
    rating,
    user: {
      avatarUrl: user.avatar_url,
      id: user.id,
      isPro: user.is_pro,
      name: user.name,
    },
  }));
};
