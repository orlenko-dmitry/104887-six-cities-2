import React, {PureComponent} from 'react';
import {
  arrayOf,
  shape,
  string,
  number,
  bool,
} from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

class OffersList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: null,
    };
    this.hoverInCardHandler = this.hoverInCardHandler.bind(this);
    this.hoverOutCardHandler = this.hoverOutCardHandler.bind(this);
  }

  clickTitleHandler(id) {
    return id;
  }

  hoverInCardHandler(id) {
    this.setState({currentCard: id});
  }

  hoverOutCardHandler() {
    this.setState({currentCard: null});
  }

  render() {

    const {offers} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {
          offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onTitleClick={this.clickTitleHandler}
              onCardHoverIn={this.hoverInCardHandler}
              onCardHoverOut={this.hoverOutCardHandler}
            />
          ))
        }
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: arrayOf(shape({
    id: number,
    name: string,
    type: string,
    price: number,
    isPremiun: bool,
    inBookmarks: bool,
    rating: string,
    img: string,
  })).isRequired,
};

export default OffersList;
