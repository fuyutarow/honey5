import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import store from './Store';
//import Ahiru from './ahiru/Ahiru';
import Honey4 from './honey4/Root';

ReactDOM.render(
  <Provider store={ store }>
    <Honey4 />
  </Provider>
  , document.getElementById('app')
);
