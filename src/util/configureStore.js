import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import reducers from '../reducers';

export default function configureStore() {
  let middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares = [...middlewares, logger];
  }

  const persistConfig = {
    key: 'crawler',
    version: 1,
    storage: AsyncStorage,
    blacklist: ['nav', 'user'],
    debug: process.env.NODE_ENV !== 'production',
  };

  const reducer = persistCombineReducers(persistConfig, reducers);

  return createStore(
    reducer,
    undefined,
    compose(applyMiddleware(...middlewares)),
  );
}
