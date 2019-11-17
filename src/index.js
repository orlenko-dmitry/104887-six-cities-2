import React from 'react';
import {render} from 'react-dom';

import App from './components/app/app.jsx';
import offers from './mocks/offers.js';
import nearOffers from './mocks/nearOffers.js';
import reviews from './mocks/reviews.js';

const init = () => {
  render(
      <App
        offers={offers}
        reviews={reviews}
        nearOffers={nearOffers}
      />,
      document.getElementById(`root`)
  );
};

init();
