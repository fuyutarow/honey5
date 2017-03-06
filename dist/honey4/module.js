import * as Immutable from 'immutable';
var ActionTypes = (function () {
    function ActionTypes() {
    }
    return ActionTypes;
}());
export { ActionTypes };
ActionTypes.INCREMENT = 'honey4/increment';
ActionTypes.RED = 'honey4/red';
ActionTypes.BLUE = 'honey4/blue';
var INITIAL_STATE = {
    num: 0,
    position: [0, 0],
    cells: Immutable.Range(0, 20).toArray().map(function () {
        return (Immutable.Range(0, 20).toArray().map(function () { return 0; }));
    }),
    step: 0,
};
export default function reducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case ActionTypes.INCREMENT:
            var newNum = state.num + action.amount;
            return Object.assign({}, state, { num: newNum });
        case ActionTypes.RED:
            var redCells = state.cells
                .map(function (line, x) { return (line
                .map(function (value, y) {
                return (action.position[0] == x && action.position[1] == y) ? 1 : value;
            })); });
            return Object.assign({}, state, { cells: redCells, step: state.step + 1 });
        case ActionTypes.BLUE:
            var blueCells = state.cells
                .map(function (line, x) { return (line
                .map(function (value, y) {
                return (action.position[0] == x && action.position[1] == y) ? -1 : value;
            })); });
            return Object.assign({}, state, { cells: blueCells, step: state.step + 1 });
        default:
            return state;
    }
}
var ActionDispatcher = (function () {
    function ActionDispatcher(dispatch) {
        this.dispatch = dispatch;
    }
    ActionDispatcher.prototype.increment = function (amount) {
        this.dispatch({ type: ActionTypes.INCREMENT, amount: amount });
    };
    ActionDispatcher.prototype.red = function (position) {
        this.dispatch({ type: ActionTypes.RED, position: position });
    };
    ActionDispatcher.prototype.blue = function (position) {
        this.dispatch({ type: ActionTypes.BLUE, position: position });
    };
    return ActionDispatcher;
}());
export { ActionDispatcher };
//# sourceMappingURL=module.js.map