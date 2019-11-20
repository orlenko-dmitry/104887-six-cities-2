export const defineRating = (rating) => {
  return `${Math.round(rating / 5 * 100)}%`;
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
    host,
    description,
    location,
    id,
  }));
};
