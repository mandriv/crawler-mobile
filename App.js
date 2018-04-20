import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

import configureStore from './src/util/configureStore';
import Root from './src/containers/Root';

const store = configureStore();
persistStore(
  store,
  null,
);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }

}
