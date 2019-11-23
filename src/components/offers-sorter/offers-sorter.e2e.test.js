import React from 'react';
import {shallow} from 'enzyme';

import OffersSorter from '../offers-sorter/offers-sorter.jsx';
import {SORTED_BY} from '../../consts/index.js';

describe(`e2e tests for OffersSorter`, () => {
  it(`onOpenSorterClick have been called`, () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(
        <OffersSorter
          isOpen={false}
          sortedBy={SORTED_BY.POPULAR}
          onOpenSorterClick={clickHandler}
          onSortByClick={() => {}}
        />
    );
    const sorterArrow = wrapper.find(`[data-testid="offers-sorter-arrow"]`);

    sorterArrow.simulate(`click`);

    expect(clickHandler).toHaveBeenCalled();
  });
  // it(`calling onOpenSorterClick open the sorter list`, () => {
  //   const clickHandler = jest.fn();
  //   const wrapper = shallow(
  //       <OffersSorter
  //         isOpen={false}
  //         sortedBy={SORTED_BY.POPULAR}
  //         onOpenSorterClick={clickHandler}
  //         onSortByClick={() => {}}
  //       />
  //   );
  //   const sorterArrow = wrapper.find(`[data-testid="offers-sorter-arrow"]`);

  //   sorterArrow.simulate(`click`);
  //   wrapper.update();

  //   expect(wrapper.find(`[data-testid="offers-sorter-list"]`).hasClass(`places__options--opened`)).toEqual(true);
  // });
});
