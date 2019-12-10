export default ({
  login: `/login`,
  getOffers: `/hotels`,
  comments: (offerId) => `/comments/${offerId}`,
  getFavorite: `/favorite`,
  postFavorite: ({offerId, status}) => `/favorite/${offerId}/${status}`,
});
