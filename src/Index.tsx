import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import store from './Store';
import Honey4 from './honey4/Root';

ReactDOM.render(
  <Provider store={ store }>
    <Honey4 />
  </Provider>
  , document.getElementById('app')
);
