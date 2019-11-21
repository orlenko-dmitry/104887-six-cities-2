import React, {PureComponent} from 'react';
import {
  arrayOf,
  shape,
  string,
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
    const {offers, classNames} = this.props;

    return (
      <div className={`${classNames} places__list`}>
        {
          offers.map((offer, index) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              listIndex={index}
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
  offers: arrayOf(shape({})).isRequired,
  classNames: string,
};

OffersList.defaultProps = {
  classNames: ``,
};

export default OffersList;
