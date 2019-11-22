import React from 'react';
import {shallow} from 'enzyme';

import OffersSorter from '../offers-sorter/offers-sorter.jsx';

it(`OffesSorter renders correctly`, () => {
  const tree = shallow(
      <OffersSorter
        isOpen={false}
        onOpenSorterClick={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
