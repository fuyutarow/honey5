import * as Immutable from 'immutable';

export interface Honey5State {
  num: number;
  cells: number[][];
  step: number;
  record: number[][];
}

  interface Honey5Action {
  type: string;
  amount?: number;
  position?: number[];
}

export class ActionTypes {
  static INCREMENT = 'honey5/increment';
  static RED = 'honey5/red';
  static BLUE = 'honey5/blue';
  static UNDO = 'honey5/undo';
}

const INITIAL_STATE =  {
  num: 0,
  position: [0,0],
  cells: Immutable.Range(0,20).toArray().map( () =>
    ( Immutable.Range(0,20).toArray().map( () => 0 )) ),
  step: 0,
  record: [[777,777]],
};

export default function reducer(
  state: Honey5State = INITIAL_STATE,
  action: Honey5Action
): Honey5State {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      const newNum = state.num + action.amount
      return Object.assign({}, state, { num: newNum });

    case ActionTypes.RED:
      const redCells = state.cells
        .map( (line, x) => ( line
          .map( (value, y) => {
            return (action.position[0] == x && action.position[1] == y)? 1: value;})));
      //const redRecord= Immutable.List.of(...state.record).push(action.position);
      let redRecord = state.record;
      redRecord.push(action.position);
      return Object.assign({}, state, { cells: redCells, step: state.step + 1, record: redRecord});

    case ActionTypes.BLUE:
      const blueCells = state.cells
        .map( (line, x) => ( line
          .map( (value, y) => {
            return (action.position[0] == x && action.position[1] == y)? -1: value;})));
      let blueRecord = state.record;
      blueRecord.push(action.position);
      return Object.assign({}, state, { cells: blueCells, step: state.step + 1, record: blueRecord });

    case ActionTypes.UNDO:
      if (state.step<=0){
        return Object.assign({}, state, { step: 0 });
      }
      let undoRecord = state.record;
      const lastRecord = undoRecord.pop();
      const undoCells = state.cells
        .map( (line, x) => ( line
          .map( (value, y) => {
            return (lastRecord[0] == x && lastRecord[1] == y)? 0: value;})));
      return Object.assign({}, state, { cells: undoCells, step: state.step -1 , record: undoRecord });

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
    this.dispatch({ type: ActionTypes.INCREMENT, amount: amount });
  }
  red( position: number[] ){
    this.dispatch({ type: ActionTypes.RED, position: position });
  }
  blue( position: number[] ){
    this.dispatch({ type: ActionTypes.BLUE, position: position });
  }
  undo(){
    this.dispatch({ type: ActionTypes.UNDO });
  }
}
