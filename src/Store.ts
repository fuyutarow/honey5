import { createStore, combineReducers } from 'redux';
import honey4 from './honey4/module';

export default createStore(
  combineReducers({
    honey4: honey4
  })
);
