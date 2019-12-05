import React from 'react';
import {shallow} from 'enzyme';

import {DetailsPage} from '../details-page/details-page.jsx';
import offers from '../../mocks/offers.js';
import comments from '../../mocks/comments.js';

const city = offers[0].city;

it(`DetailsPage renders correctly`, () => {
  const tree = shallow(
      <DetailsPage
        offers={offers}
        comments={comments}
        city={city}
        onHoverOfferId={-1}
        getOfferIdHandler={() => {}}
        fetchCommentsHandler={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
