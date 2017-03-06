var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { Link } from 'react-router';
import { Paths } from './Models';
var Root = (function (_super) {
    __extends(Root, _super);
    function Root() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Root.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, "React Redux sample"),
            React.createElement("li", null,
                React.createElement(Link, { to: "/" }, "Home")),
            React.createElement("li", null,
                React.createElement(Link, { to: Paths.GOMOKU }, "Counter")),
            React.createElement("li", null,
                React.createElement(Link, { to: "/random_url" }, "Notfound")),
            this.props.children));
    };
    return Root;
}(React.Component));
export default Root;
//# sourceMappingURL=Root.js.map