import React from 'react';
import {bool, func} from 'prop-types';

const OffersSorter = ({isOpen, onOpenSorterClick}) => (
  <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by </span>
    <span className="places__sorting-type" tabIndex="0">
      Popular
      <svg
        className="places__sorting-arrow"
        data-testid="offers-sorter-arrow"
        style={isOpen ? {transform: `rotate(180deg)`, top: `45%`} : {}}
        width="7"
        height="4"
        onClick={() => onOpenSorterClick()}
      >
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul
      className={`places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`}
      data-testid="offers-sorter-list"
    >
      <li className="places__option places__option--active" tabIndex="0">Popular</li>
      <li className="places__option" tabIndex="0">Price: low to high</li>
      <li className="places__option" tabIndex="0">Price: high to low</li>
      <li className="places__option" tabIndex="0">Top rated first</li>
    </ul>
  </form>
);

OffersSorter.propTypes = {
  isOpen: bool.isRequired,
  onOpenSorterClick: func.isRequired,
};

export default OffersSorter;
