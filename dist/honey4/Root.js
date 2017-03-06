import { connect } from 'react-redux';
import { Honey4 } from './honey4';
import { ActionDispatcher } from './module';
export default connect(function (store) { return ({ state: store.honey4 }); }, function (dispatch) { return ({ actions: new ActionDispatcher(dispatch) }); })(Honey4);
//# sourceMappingURL=Root.js.map