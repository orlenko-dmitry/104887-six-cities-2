import React from 'react';
import {
  bool,
  string,
  func,
} from 'prop-types';

import {SortByList} from '../../consts/consts.js';

const OffersSorter = ({
  isOpen,
  sortedBy,
  onOpenSorterClick,
  onSortByClick,
}) => {
  const handleSortByclick = (name) => {
    onSortByClick(name);
    onOpenSorterClick();
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={() => onOpenSorterClick()}
      >
        {sortedBy}
        <svg
          className="places__sorting-arrow"
          data-testid="offers-sorter-arrow"
          style={isOpen ? {transform: `rotate(180deg)`, top: `45%`} : {}}
          width="7"
          height="4"
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`${isOpen ? `places__options--opened` : ``} places__options places__options--custom`}
        data-testid="offers-sorter-list"
      >
        {SortByList.map(({id, name}) => (
          <li
            className={`${name === sortedBy ? `places__option--active` : ``} places__option`}
            key={id}
            tabIndex="0"
            onClick={() => handleSortByclick(name)}
          >
            {name}
          </li>
        ))}
      </ul>
    </form>
  );
};

OffersSorter.propTypes = {
  isOpen: bool.isRequired,
  sortedBy: string.isRequired,
  onOpenSorterClick: func.isRequired,
  onSortByClick: func.isRequired,
};

export default OffersSorter;
