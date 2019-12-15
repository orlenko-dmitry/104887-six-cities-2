import React from 'react';
import {shallow} from 'enzyme';

import OffersSorter from '../offers-sorter/offers-sorter.jsx';
import {SortedBy} from '../../consts/consts.js';

it(`OffesSorter renders correctly`, () => {
  const tree = shallow(
      <OffersSorter
        isOpen={false}
        sortedBy={SortedBy.POPULAR}
        onOpenSorterClick={() => {}}
        onSortByClick={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
