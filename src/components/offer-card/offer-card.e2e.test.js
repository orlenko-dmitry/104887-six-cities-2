import React from 'react';
import {shallow} from 'enzyme';

import OfferCard from './offer-card.jsx';
import offers from '../../mocks/offers.js';

describe(`e2e test for OfferCard`, () => {
  it(`onTitleClick have been called`, () => {
    const onClickHandler = jest.fn();
    const wrapper = shallow(
        <OfferCard
          offer={offers[0]}
          onTitleClick={onClickHandler}
          onCardHoverIn={() => {}}
          onCardHoverOut={() => {}}
        />
    );
    const title = wrapper.find(`.place-card__name`);

    title.simulate(`click`);

    expect(onClickHandler).toHaveBeenCalled();
  });
  it(`onCardHoverIn called with valid argument`, () => {
    const onHoverHandler = jest.fn();
    const wrapper = shallow(
        <OfferCard
          offer={offers[0]}
          onTitleClick={() => {}}
          onCardHoverIn={onHoverHandler}
          onCardHoverOut={() => {}}
        />
    );
    const card = wrapper.find(`.place-card`);

    card.simulate(`mouseenter`);

    expect(onHoverHandler).toBeCalledWith(expect.any(Number));
  });
});
