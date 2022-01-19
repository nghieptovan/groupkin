import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App'
import * as serviceWorker from './serviceWorker';

import configureStore, { history } from './store'

const store = configureStore()
window.helRoot = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>
  , window.helRoot);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA


serviceWorker.unregister();
