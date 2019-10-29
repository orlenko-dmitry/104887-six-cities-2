import React from 'react';
import {shallow} from 'enzyme';

import MainPage from './main-page.jsx';

it(`titleHandler have been called 1 time`, () => {
  const titleHandler = jest.fn();
  const wrapper = shallow((<MainPage titleHandler={titleHandler}/>));
  const title = wrapper.find(`.place-card__name`).first();

  title.simulate(`click`);
  expect(titleHandler).toHaveBeenCalledTimes(1);
});
