// store
import honey4 from './honey4/module';
import ahiru from './ahiru/module';
import { createStore, combineReducers } from 'redux';

export default createStore(
  combineReducers({
    honey4: honey4
  })
);
