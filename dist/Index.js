import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Store';
import Honey4 from './honey4/Root';
ReactDOM.render(React.createElement(Provider, { store: store },
    React.createElement(Honey4, null)), document.getElementById('app'));
//# sourceMappingURL=Index.js.map