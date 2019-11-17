import React from 'react';
import {render} from 'react-dom';

import App from './components/app/app.jsx';
import offers from './mocks/offers.js';
import reviews from './mocks/reviews.js';

const init = () => {
  render(
      <App offers={offers} reviews={reviews} />,
      document.getElementById(`root`)
  );
};

init();
