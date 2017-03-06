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
var CanvasComponent = (function (_super) {
    __extends(CanvasComponent, _super);
    function CanvasComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CanvasComponent.prototype.componentDidMount = function () {
        this.updateCanvas();
    };
    CanvasComponent.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props !== nextProps) {
            this.updateCanvas();
        }
    };
    CanvasComponent.prototype.componentDidUpdate = function () {
        this.updateCanvas();
    };
    CanvasComponent.prototype.updateCanvas = function () {
        this.props.updateCanvas(this.cxt);
    };
    CanvasComponent.prototype.render = function () {
        var _this = this;
        return React.createElement("canvas", { ref: function (c) { return _this.cxt = c.getContext('2d'); }, width: this.props.width, height: this.props.height });
    };
    return CanvasComponent;
}(React.Component));
export default CanvasComponent;
//# sourceMappingURL=CanvasComponent.js.map