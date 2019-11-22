import React from 'react';
import {shallow} from 'enzyme';

import OffersSorter from '../offers-sorter/offers-sorter.jsx';

describe(`e2e tests for OffersSorter`, () => {
  it(`onOpenSorterClick have been called`, () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(
        <OffersSorter
          isOpen={false}
          onOpenSorterClick={clickHandler}
        />
    );
    const sorterArrow = wrapper.find(`[data-testid="offers-sorter-arrow"]`);

    sorterArrow.simulate(`click`);

    expect(clickHandler).toHaveBeenCalled();
  });
  it(`calling onOpenSorterClick open the sorter list`, () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(
        <OffersSorter
          isOpen={false}
          onOpenSorterClick={clickHandler}
        />
    );
    const sorterArrow = wrapper.find(`[data-testid="offers-sorter-arrow"]`);
    const sorterList = wrapper.find(`[data-testid="offers-sorter-list"]`);

    sorterArrow.simulate(`click`);

    expect(sorterList.hasClass(`places__options--opened`)).toEqual(true);
  });
});
