import React from 'react';
import {shallow} from 'enzyme';

import OffersSorter from '../offers-sorter/offers-sorter.jsx';
import {SORTED_BY} from '../../consts/index.js';

it(`OffesSorter renders correctly`, () => {
  const tree = shallow(
      <OffersSorter
        isOpen={false}
        sortedBy={SORTED_BY.POPULAR}
        onOpenSorterClick={() => {}}
        onSortByClick={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
