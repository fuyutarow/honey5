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
import * as Immutable from 'immutable';
var Ahiru = (function (_super) {
    __extends(Ahiru, _super);
    function Ahiru() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ahiru.prototype.render = function () {
        var _this = this;
        var test = Immutable.Range(1, 9).toArray().map(function (i) { return React.createElement("td", null, Immutable.Range(1, 9).toArray().map(function (j) {
            if (i % 2 == 1)
                return React.createElement("tr", null, "-tds!!-");
            else
                return React.createElement("tr", null, "-tds??-");
        })); });
        console.log(this.props.state.num);
        return (React.createElement("div", null,
            React.createElement("canvas", { ref: "myCanvas" }),
            React.createElement("p", null,
                "score: ",
                this.props.state.num),
            React.createElement("button", { onClick: function () { return _this.props.actions.increment(3); } }, "Increment 3"),
            React.createElement("table", null, test)));
    };
    Ahiru.prototype.componentDidMount = function () {
        var canvas = this.refs.myCanvas;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(200,0,0)';
        ctx.fillRect(10, 10, 55, 50);
        console.log(this.props.state.num);
    };
    Ahiru.prototype.componentWillReceiveProps = function () {
        var canvas = this.refs.myCanvas;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(200,0,0)';
        ctx.fillRect(10, this.props.state.num, 55, 50);
        console.log(this.props.state.num);
    };
    return Ahiru;
}(React.Component));
export { Ahiru };
//# sourceMappingURL=ahiru.js.map