export default ({
  login: `/login`,
  offers: `/hotels`,
  comments: (offerId) => `/comments/${offerId}`,
});
