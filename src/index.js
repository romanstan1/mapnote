import React from 'react';
import { render } from 'react-dom'
import App from './App';
import { ConnectedRouter } from 'react-router-redux'
import store from './store'
import {Provider} from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory()

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
