import React, {PureComponent} from 'react';
import {
  arrayOf,
  shape,
  string,
  number,
  bool,
  func,
} from 'prop-types';
import {connect} from 'react-redux';

import {defineRating, getNearOffers} from '../../helpers/helpers.js';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import OffersMap from '../offers-map/offers-map.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import ReviewsFrom from '../reviews-form/reviews-form.jsx';
import withReviewsForm from '../../hocs/with-reviews-form/with-reviews-form.jsx';
import aFilters from '../../store/filters/actions.js';
import aData from '../../store/data/actions.js';
import {getCityOffers} from '../../store/data/selectors.js';

const WithReviewsForm = withReviewsForm(ReviewsFrom);

class DetailsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.colorPinHandler = this.colorPinHandler.bind(this);
  }

  componentDidMount() {
    const {fetchCommentsHandler, match: {params: {offerId}}} = this.props;
    fetchCommentsHandler(offerId);
  }

  colorPinHandler(id) {
    const {getOfferIdHandler} = this.props;
    getOfferIdHandler(id);
  }

  render() {
    const {
      offers,
      comments,
      city,
      onHoverOfferId,
      match: {
        params: {
          offerId,
        }
      }
    } = this.props;

    const offerIndex = offers.map((offer) => offer.id).indexOf(Number(offerId));

    const {
      images,
      isPremium,
      title,
      rating,
      price,
      bedrooms,
      maxAdults,
      description,
      id,
      goods,
      host: {
        isPro,
        name: hostName,
        avatarUrl,
      },
    } = offers[offerIndex];
    return offers.length && (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image, index) => (
                <div className="property__image-wrapper" key={index}>
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: defineRating(rating)}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  Entire place
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, index) => (
                    <li className="property__inside-item" key={index}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {hostName}
                  </span>
                  {isPro && (
                    <span className="property__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews <span className="reviews__amount">{comments.length}</span></h2>
                <ReviewsList reviews={comments} />
                <WithReviewsForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <OffersMap
              offers={getNearOffers(offers, id, true)}
              selectedCity={city}
              selectedOfferId={id}
              onHoverOfferId={onHoverOfferId}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              classNames={`near-places__list`}
              offers={getNearOffers(offers, id)}
              onColorPin={this.colorPinHandler}
            />
          </section>
        </div>
      </main>
    );
  }
}

DetailsPage.propTypes = {
  offers: arrayOf(shape({
    id: number.isRequired,
    images: arrayOf(string).isRequired,
    title: string.isRequired,
    isFavorite: bool.isRequired,
    isPremium: bool.isRequired,
    rating: number.isRequired,
    bedrooms: number.isRequired,
    maxAdults: number.isRequired,
    price: number.isRequired,
    goods: arrayOf(string).isRequired,
    description: string.isRequired,
    host: shape({
      id: number.isRequired,
      isPro: bool.isRequired,
      name: string.isRequired,
      avatarUrl: string.isRequired,
    }),
  })).isRequired,
  comments: arrayOf(shape({})).isRequired,
  city: shape({
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
      zoom: number.isRequired,
    }).isRequired,
    name: string.isRequired,
  }).isRequired,
  match: shape({
    params: shape({
      offerId: string.isRequired,
    }).isRequired
  }).isRequired,
  onHoverOfferId: number.isRequired,
  getOfferIdHandler: func.isRequired,
  fetchCommentsHandler: func.isRequired,
};

const mapStateToProps = ({rData, rFilters}) => ({
  offers: getCityOffers({rData, rFilters}),
  city: rData.city,
  comments: rData.comments,
  onHoverOfferId: rFilters.onHoverOfferId,
});

const mapDispatchToProps = (dispatch) => ({
  getOfferIdHandler: (payload) => dispatch(aFilters.getOfferId(payload)),
  fetchCommentsHandler: (payload) => dispatch(aData.fetchComments(payload)),
});

export {DetailsPage};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
