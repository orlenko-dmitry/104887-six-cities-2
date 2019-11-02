export const defineRating = (rating) => {
  return `${Math.round(rating / 5 * 100)}%`;
};
