import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Honey4State, ActionDispatcher } from './module';
import * as Immutable from 'immutable';


interface Props {
  state: Honey4State;
  actions: ActionDispatcher;
}

export class Honey4 extends React.Component<Props, {}> {
  cells: number[][];
  step: number;

  render() {
    this.cells = this.props.state.cells;
    this.step = this.props.state.step;

    const table = this.props.state.cells.map( a => <tr>{a}</tr> )
    return (
      <div>
        <table>{ table }</table>
        <p><h3>STEP: { this.props.state.step }</h3></p>
        <canvas ref="myCanvas"/>
      </div>
    );
  }

  componentDidMount() {
    const TPI = 2*Math.PI;
    const INTERVAL = 30;
    const WIDTH = INTERVAL*21;
    const HEIGHT = INTERVAL*21;

    const canvas = this.refs.myCanvas as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.fillStyle = '#ffff33';

    const Hex = (x:number, y:number, r:number) => {
      ctx.beginPath();
      ctx.moveTo( x + r*Math.cos(TPI/4), y + r*Math.sin(TPI/4) );
      Immutable.Range(1,6).toArray().map( (i) => {
        ctx.lineTo( x + r*Math.cos(i*TPI/6 + TPI/4), y + r*Math.sin(i*TPI/6 + TPI/4) )});
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const honeyComb = (w:number, h:number, INTERVAL:number) => {
      Immutable.Range( 1, w/INTERVAL ).toArray().map( (x) => {
        Immutable.Range( 1, h/INTERVAL ).toArray().map( (y) => {
          const r = INTERVAL/(Math.cos(TPI/12)*2);
          if (y%2==1) Hex( x*INTERVAL, y*r*3/2, r);
          else Hex( x*INTERVAL + INTERVAL/2, y*r*3/2, r );
    })})};
    honeyComb(WIDTH, HEIGHT, INTERVAL);


    canvas.onmousedown = e => {
      // mouse2honey
      const r = INTERVAL/(Math.cos(TPI/12)*2);
      let aboutX = Math.floor(e.offsetX/INTERVAL);
      let aboutY = Math.floor(e.offsetY*2/3/r);

      const candidateCells =
        [ [aboutX, aboutY],
          [aboutX, aboutY+1],
          [aboutX+1, aboutY],
          [aboutX+1, aboutY+1] ]

      const L2 = (x:number,y:number) => Math.sqrt( x*x + y*y );
      const honey = candidateCells[
          (candidateCells
            .map( a => [a[0]*INTERVAL, a[1]*r*3/2])
            .map( (a,idx) => Math.floor( L2( a[0]-e.offsetX, a[1]-e.offsetY )*1000 )*1000 +idx )
            .reduce( (a,b) => Math.min(a, b) )
          )%1000]

      if( this.props.state.step,this.props.state.step%2==1 ){
        this.props.actions.red([honey[0]-1,honey[1]-1]);
      }else{
        this.props.actions.blue([honey[0]-1,honey[1]-1]);
      }
    }
  }

  componentDidUpdate() {
    const TPI = 2*Math.PI;
    const INTERVAL = 30;
    const WIDTH = INTERVAL*21;
    const HEIGHT = INTERVAL*21;

    const canvas = this.refs.myCanvas as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    const Hex = (x:number, y:number, r:number) => {
      ctx.beginPath();
      ctx.moveTo( x + r*Math.cos(TPI/4), y + r*Math.sin(TPI/4) );
      Immutable.Range(1,6).toArray().map( i => {
        ctx.lineTo( x + r*Math.cos(i*TPI/6 + TPI/4), y + r*Math.sin(i*TPI/6 + TPI/4) )});
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const honeyComb = (w:number, h:number, INTERVAL:number) => {
      Immutable.Range( 1, w/INTERVAL ).toArray().map( (x) => {
        Immutable.Range( 1, h/INTERVAL ).toArray().map( (y) => {
          switch( this.props.state.cells[x-1][y-1] ){
            case 0: ctx.fillStyle = '#ffff22';break;
            case 1: ctx.fillStyle = '#2222ff';break;
            case -1: ctx.fillStyle = '#ff2222';break;
            default: ctx.fillStyle = '#ffffff';
          };
          const r = INTERVAL/(Math.cos(TPI/12)*2);
          if (y%2==1) Hex( x*INTERVAL, y*r*3/2, r);
          else Hex( x*INTERVAL + INTERVAL/2, y*r*3/2, r );
    })})};
    honeyComb(WIDTH, HEIGHT, INTERVAL);

  }

}
