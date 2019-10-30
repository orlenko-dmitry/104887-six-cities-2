import React from 'react';
import {render} from 'react-dom';

import App from './components/app/app.jsx';
import offers from './mocks/offers.js';

const init = () => {
  render(
      <App offers={offers}/>,
      document.getElementById(`root`)
  );
};

init();
