import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import offers from './mocks/offers.js';
import nearOffers from './mocks/nearOffers.js';
import reviews from './mocks/reviews.js';
import reducer from './store/reducer.js';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const init = () => {
  render(
      <Provider store={store}>
        <App
          offers={offers}
          reviews={reviews}
          nearOffers={nearOffers}
        />
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
