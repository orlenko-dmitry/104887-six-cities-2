import React from 'react';
import {shallow} from 'enzyme';

import {DetailsPage} from '../details-page/details-page.jsx';
import offers from '../../mocks/offers.js';
import nearOffers from '../../mocks/nearOffers.js';
import reviews from '../../mocks/reviews.js';

const city = offers[0].city;

it(`DetailsPage renders correctly`, () => {
  const tree = shallow(
      <DetailsPage
        offer={offers[0]}
        nearOffers={nearOffers}
        reviews={reviews}
        city={city}
        onHoverOfferId={-1}
        getOnHoverOfferId={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
