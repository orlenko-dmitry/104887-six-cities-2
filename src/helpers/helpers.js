export const defineRating = (rating) => {
  return `${Math.round(rating / 5 * 100)}%`;
};

export const leafletSetView = ({offers, map, city, zoom, icon, leaflet}) => {

  map.setView(city, zoom);
  offers.map(({location: {latitude: offerLatitude, longitude: offerLongitude}}) => {
    const offerCords = [offerLatitude, offerLongitude];
    leaflet
    .marker(offerCords, {icon})
    .addTo(map);
  });
};

export const flushPromises = () => new Promise((resolve) => window.setImmediate(resolve));

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
