import React from 'react';
import {render} from 'react-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import reducer from './store/reducer.js';
import {createApi} from './api.js';

const api = createApi((...args) => store.dispatch(...args));

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

const init = () => {
  render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
