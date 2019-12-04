import React from 'react';
import {shallow} from 'enzyme';

import PageHeader from './page-header.jsx';

it(`PageHeader renders correctly`, () => {
  const tree = shallow(<PageHeader user={null} />);

  expect(tree).toMatchSnapshot();
});
