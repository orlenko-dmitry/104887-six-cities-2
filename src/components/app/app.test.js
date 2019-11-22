import React from 'react';
import {shallow} from 'enzyme';

import App from './app.jsx';
import offers from '../../mocks/offers.js';


it(`App renders correctly`, () => {
  const tree = shallow(<App offers={offers}/>);

  expect(tree).toMatchSnapshot();
});
