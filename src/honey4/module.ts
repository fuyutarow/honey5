import * as Immutable from 'immutable';

export interface Honey4State {
  num: number;
  cells: number[][];
  step: number;
}

interface Honey4Action {
  type: string;
  amount?: number;
  position?: number[];
}

export class ActionTypes {
  static INCREMENT = 'honey4/increment';
  static RED = 'honey4/red';
  static BLUE = 'honey4/blue';
}

const INITIAL_STATE =  {
  num: 0,
  position: [0,0],
  cells: Immutable.Range(0,20).toArray().map( () =>
    ( Immutable.Range(0,20).toArray().map( () => 0 )) ),
  step: 0,
};

export default function reducer(
  state: Honey4State = INITIAL_STATE,
  action: Honey4Action
): Honey4State {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      const newNum = state.num + action.amount
      return Object.assign({}, state, { num: newNum });

    case ActionTypes.RED:
      const redCells = state.cells
        .map( (line, x) => ( line
          .map( (value, y) => {
            return (action.position[0] == x && action.position[1] == y)? 1: value;})));
      return Object.assign({}, state, { cells: redCells, step: state.step + 1 });

    case ActionTypes.BLUE:
      const blueCells = state.cells
        .map( (line, x) => ( line
          .map( (value, y) => {
            return (action.position[0] == x && action.position[1] == y)? -1: value;})));
      return Object.assign({}, state, { cells: blueCells, step: state.step + 1 });

    default:
      return state;
  }
}

export class ActionDispatcher {
  dispatch: (action: any) => any;
  constructor(dispatch: (action: any) => any) {
    this.dispatch = dispatch
  }
  increment(amount: number) {
    this.dispatch({ type: ActionTypes.INCREMENT, amount: amount })
  }
  red( position: number[] ){
    this.dispatch({ type: ActionTypes.RED, position: position });
  }
  blue( position: number[] ){
    this.dispatch({ type: ActionTypes.BLUE, position: position });
  }
}
