import React from 'react';
import {shallow} from 'enzyme';

import MainPage from './main-page.jsx';

it(`titleHundler have been called 1 time`, () => {
  const places = [
    `Wood and stone place`,
    `Canal View Prinsengracht`,
    `Nice, cozy, warm big bed apartment`,
    `Wood and stone place`,
  ];
  const titleHandler = jest.fn();
  const wrapper = shallow((<MainPage places={places} titleHundler={titleHandler}/>));
  const title = wrapper.find(`.place-card__name`).first();

  title.simulate(`click`);
  expect(titleHandler).toHaveBeenCalledTimes(1);
});
