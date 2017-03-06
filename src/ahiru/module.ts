export interface AhiruState {
  num: number;
}

interface AhiruAction {
  type: string;
  amount?: number;
}

export class ActionTypes {
  static INCREMENT = 'gomoku/increment';
}

const INITIAL_STATE =  { num: 0 };
export default function reducer(
  state: AhiruState = INITIAL_STATE,
  action: AhiruAction
): AhiruState {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      const newNum = state.num + action.amount
      return Object.assign({}, state, { num: newNum });
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
}
