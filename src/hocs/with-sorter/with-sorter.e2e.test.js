import React from 'react';
import {shallow} from 'enzyme';

import withSorter from './with-sorter.jsx';

const MockComponent = () => <div />;
const MockComponentWrapped = withSorter(MockComponent);

it(`Should change isSorterOpen when call _handleOpenSorter`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().isSorterOpen).toEqual(false);

  wrapper.instance()._handleOpenSorter();

  expect(wrapper.state().isSorterOpen).toEqual(true);
});
