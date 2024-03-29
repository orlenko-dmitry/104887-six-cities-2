import React from 'react';
import {shallow} from 'enzyme';

import {DetailsPage} from '../details-page/details-page.jsx';
import offers from '../../mocks/offers.js';
import comments from '../../mocks/comments.js';
import {AsyncStatus} from '../../consts/consts.js';
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
        offersFetchStatus={AsyncStatus.SUCCESS}
        match={match}
        handleGetOfferId={() => {}}
        handleFetchComments={() => {}}
        handleFavoriteAdd={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
