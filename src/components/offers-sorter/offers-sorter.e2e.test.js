import React from 'react';
import {shallow} from 'enzyme';

import OffersSorter from '../offers-sorter/offers-sorter.jsx';
import {SortedBy} from '../../consts/consts.js';

describe(`e2e tests for OffersSorter`, () => {
  it(`OffersSorter dosen't open`, () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
        <OffersSorter
          isOpen={false}
          sortedBy={SortedBy.POPULAR}
          onOpenSorterClick={handleClick}
          onSortByClick={() => {}}
        />
    );
    const sorterList = wrapper.find(`[data-testid="offers-sorter-list"]`);

    expect(sorterList.hasClass(`places__options--opened`)).toEqual(false);
  });
  it(`OffersSorter is open`, () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
        <OffersSorter
          isOpen={true}
          sortedBy={SortedBy.POPULAR}
          onOpenSorterClick={handleClick}
          onSortByClick={() => {}}
        />
    );
    const sorterList = wrapper.find(`[data-testid="offers-sorter-list"]`);

    expect(sorterList.hasClass(`places__options--opened`)).toEqual(true);
  });
});
