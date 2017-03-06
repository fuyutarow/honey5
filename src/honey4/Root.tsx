import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Honey4 } from './honey4';
import { ActionDispatcher } from './module';

export default connect(
  (store: any) => ({ state: store.honey4 }),
  (dispatch: Dispatch<any>) => ({actions: new ActionDispatcher(dispatch)})
)(Honey4);
