import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Ahiru } from './ahiru';
import { ActionDispatcher } from './module';

export default connect(
  (store: any) => ({ state: store.ahiru }),
  (dispatch: Dispatch<any>) => ({actions: new ActionDispatcher(dispatch)})
)(Ahiru);
