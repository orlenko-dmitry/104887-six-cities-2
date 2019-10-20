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
  const titleHundler = jest.fn();
  const wrapper = shallow((<MainPage places={places} titleHundler={titleHundler}/>));

  wrapper.find(`.place-card__name`).forEach((node) => {
    node.simulate(`click`);
    expect(titleHundler).toHaveBeenCalled();
  });
});
