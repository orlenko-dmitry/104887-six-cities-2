import React from 'react';
import {
  arrayOf,
  shape,
  string,
  func,
} from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

const OffersList = ({offers, classNames, onColorPin}) => (
  <div className={`${classNames} places__list`}>
    {
      offers.map((offer, index) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          listIndex={index}
          onCardHoverIn={() => onColorPin(offer.id)}
          onCardHoverOut={() => onColorPin(-1)}
        />
      ))
    }
  </div>
);

OffersList.propTypes = {
  offers: arrayOf(shape({})).isRequired,
  onColorPin: func.isRequired,
  classNames: string,
};

OffersList.defaultProps = {
  classNames: ``,
};

export default OffersList;
