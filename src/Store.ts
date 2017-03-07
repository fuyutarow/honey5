import { createStore, combineReducers } from 'redux';
import honey5 from './honey5/module';

export default createStore(
  combineReducers({
    honey5: honey5
  })
);
