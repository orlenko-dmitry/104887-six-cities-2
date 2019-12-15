import React from 'react';
import {shallow} from 'enzyme';

import {DetailsPage} from '../details-page/details-page.jsx';
import offers from '../../mocks/offers.js';
import comments from '../../mocks/comments.js';
import {ASYNC_STATUSES} from '../../consts/index.js';
const city = offers[0].city;
const match = {
  params: {
    offerId: `3`,
  },
};

it(`DetailsPage renders correctly`, () => {
  const tree = shallow(
      <DetailsPage
        offers={offers}
        comments={comments}
        city={city}
        user={null}
        onHoverOfferId={-1}
        offersFetchStatus={ASYNC_STATUSES.SUCCESS}
        match={match}
        getOfferIdHandler={() => {}}
        fetchCommentsHandler={() => {}}
        favoriteAddHandler={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
