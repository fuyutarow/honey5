import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AhiruState, ActionDispatcher } from './module';
import * as Immutable from 'immutable';


interface Props {
  state: AhiruState;
  actions: ActionDispatcher;
}

export class Ahiru extends React.Component<Props, {}> {
  render() {
    const test = Immutable.Range(1,9).toArray().map( i => <td>{
        Immutable.Range(1,9).toArray().map( j => {
          if( i%2 == 1) return <tr>-tds!!-</tr>;
          else return <tr>-tds??-</tr>;
        } )
      }</td>);
      console.log(this.props.state.num);

    return (
      <div>
        <canvas ref="myCanvas" />
        <p>score: { this.props.state.num }</p>
        <button onClick={ () => this.props.actions.increment(3) }>Increment 3</button>
        <table>
          { test }
        </table>
      </div>
    );
  }

  componentDidMount() {
      const canvas = this.refs.myCanvas as HTMLCanvasElement;
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

      ctx.fillStyle = 'rgb(200,0,0)';
      ctx.fillRect(10, 10, 55, 50);
      console.log(this.props.state.num);
  }
  
  componentWillReceiveProps() {
      const canvas = this.refs.myCanvas as HTMLCanvasElement;
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

      ctx.fillStyle = 'rgb(200,0,0)';
      ctx.fillRect(10, this.props.state.num, 55, 50);
      console.log(this.props.state.num);
  }

}
