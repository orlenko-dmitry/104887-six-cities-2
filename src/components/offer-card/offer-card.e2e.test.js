import React from 'react';
import {shallow} from 'enzyme';

import OfferCard from './offer-card.jsx';
import offers from '../../mocks/offers.js';

describe(`e2e test for OfferCard`, () => {
  const city = offers[0].city;
  const cityOffers = offers.filter((offfer) => offfer.city.name === city.name);

  it(`onTitleClick have been called`, () => {
    const onClickHandler = jest.fn();
    const wrapper = shallow(
        <OfferCard
          offer={cityOffers[0]}
          listIndex={0}
          onTitleClick={onClickHandler}
          onCardHoverIn={() => {}}
          onCardHoverOut={() => {}}
        />
    );
    const title = wrapper.find(`[data-testid="place-card-title-0"]`);

    title.simulate(`click`);

    expect(onClickHandler).toHaveBeenCalled();
  });
  it(`onCardHoverIn called with valid argument`, () => {
    const onHoverHandler = jest.fn();
    const wrapper = shallow(
        <OfferCard
          offer={offers[0]}
          listIndex={0}
          onTitleClick={() => {}}
          onCardHoverIn={onHoverHandler}
          onCardHoverOut={() => {}}
        />
    );
    const card = wrapper.find(`[data-testid="place-card-0"]`);

    card.simulate(`mouseenter`);

    expect(onHoverHandler).toBeCalledWith(expect.any(Number));
  });
});
