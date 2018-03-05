import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import rootReducer from './reducers';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  const {logger} = require('redux-logger');
  middleware.push(logger);
}

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
