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
var Gomoku = (function (_super) {
    __extends(Gomoku, _super);
    function Gomoku() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Gomoku.prototype.render = function () {
        this.cells = this.props.state.cells;
        this.step = this.props.state.step;
        var table = this.props.state.cells.map(function (a) { return React.createElement("tr", null, a); });
        return (React.createElement("div", null,
            React.createElement("table", null, table),
            React.createElement("p", null,
                React.createElement("h3", null,
                    "STEP: ",
                    this.props.state.step)),
            React.createElement("canvas", { ref: "myCanvas" })));
    };
    Gomoku.prototype.componentDidMount = function () {
        var _this = this;
        var TPI = 2 * Math.PI;
        var INTERVAL = 30;
        var WIDTH = INTERVAL * 21;
        var HEIGHT = INTERVAL * 21;
        var canvas = this.refs.myCanvas;
        var ctx = canvas.getContext('2d');
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        ctx.fillStyle = '#ffff33';
        var Hex = function (x, y, r) {
            ctx.beginPath();
            ctx.moveTo(x + r * Math.cos(TPI / 4), y + r * Math.sin(TPI / 4));
            Immutable.Range(1, 6).toArray().map(function (i) {
                ctx.lineTo(x + r * Math.cos(i * TPI / 6 + TPI / 4), y + r * Math.sin(i * TPI / 6 + TPI / 4));
            });
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        };
        var honeyComb = function (w, h, INTERVAL) {
            Immutable.Range(1, w / INTERVAL).toArray().map(function (x) {
                Immutable.Range(1, h / INTERVAL).toArray().map(function (y) {
                    var r = INTERVAL / (Math.cos(TPI / 12) * 2);
                    if (y % 2 == 1)
                        Hex(x * INTERVAL, y * r * 3 / 2, r);
                    else
                        Hex(x * INTERVAL + INTERVAL / 2, y * r * 3 / 2, r);
                });
            });
        };
        honeyComb(WIDTH, HEIGHT, INTERVAL);
        canvas.onmousedown = function (e) {
            var honeyX = Math.floor(e.offsetX / INTERVAL);
            var honeyY = Math.floor(e.offsetY / INTERVAL);
            if (_this.props.state.step, _this.props.state.step % 2 == 1) {
                _this.props.actions.red([honeyX, honeyY]);
            }
            else {
                _this.props.actions.blue([honeyX, honeyY]);
            }
        };
    };
    Gomoku.prototype.componentDidUpdate = function () {
        var _this = this;
        var TPI = 2 * Math.PI;
        var INTERVAL = 30;
        var WIDTH = INTERVAL * 21;
        var HEIGHT = INTERVAL * 21;
        var canvas = this.refs.myCanvas;
        var ctx = canvas.getContext('2d');
        var Hex = function (x, y, r) {
            ctx.beginPath();
            ctx.moveTo(x + r * Math.cos(TPI / 4), y + r * Math.sin(TPI / 4));
            Immutable.Range(1, 6).toArray().map(function (i) {
                ctx.lineTo(x + r * Math.cos(i * TPI / 6 + TPI / 4), y + r * Math.sin(i * TPI / 6 + TPI / 4));
            });
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        };
        var honeyComb = function (w, h, INTERVAL) {
            Immutable.Range(1, w / INTERVAL).toArray().map(function (x) {
                Immutable.Range(1, h / INTERVAL).toArray().map(function (y) {
                    switch (_this.props.state.cells[x - 1][y - 1]) {
                        case 0:
                            ctx.fillStyle = '#ffff22';
                            break;
                        case 1:
                            ctx.fillStyle = '#2222ff';
                            break;
                        case -1:
                            ctx.fillStyle = '#ff2222';
                            break;
                        default: ctx.fillStyle = '#ffffff';
                    }
                    ;
                    var r = INTERVAL / (Math.cos(TPI / 12) * 2);
                    if (y % 2 == 1)
                        Hex(x * INTERVAL, y * r * 3 / 2, r);
                    else
                        Hex(x * INTERVAL + INTERVAL / 2, y * r * 3 / 2, r);
                });
            });
        };
        honeyComb(WIDTH, HEIGHT, INTERVAL);
    };
    return Gomoku;
}(React.Component));
export { Gomoku };
//# sourceMappingURL=gomoku.js.map