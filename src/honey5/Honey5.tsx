import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Honey5State, ActionDispatcher } from './module';
import * as Immutable from 'immutable';

const TPI = 2*Math.PI;
const INTERVAL = 30;
const R = INTERVAL/(Math.cos(TPI/12)*2);
const WIDTH = INTERVAL*21;
const HEIGHT = INTERVAL*21;

interface Props {
  state: Honey5State;
  actions: ActionDispatcher;
}

export class Honey5 extends React.Component<Props, {}> {
  cells: number[]; // p == x + y*20
  step: number;
  gameState: string;

  componentWillMount(){
    this.gameState = "play";
  }

  shouldComponentUpdate(){
    return  (this.gameState == "play")? true : false;
  }

  render() {
    this.cells = this.props.state.cells;
    this.step = this.props.state.step;

    return (
      <div>
        <h3>STEP: { this.props.state.step }</h3>
        <p><button onClick={ () => this.props.actions.undo() }>UNDO</button></p>
        <canvas ref="myCanvas"/>
      </div>
    );
  }

  componentDidMount() {
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

    const honeyCombCoordinates = Immutable.Range(0,400).toArray()
      .map( n => {
        const x = n%20+1;
        const y = Math.floor(n/20)+1;
        return { x: y%2==0? (x+0.5)*INTERVAL : x*INTERVAL , y: y*R*3/2 };})

    honeyCombCoordinates
      .map( a => Hex(a.x,a.y,R) )

    // for click
    canvas.onmousedown = e => {
      const L2 = (x:number,y:number) => Math.sqrt( x*x + y*y );
      const mouse2honey = ( mouseX:number, mouseY:number) => {
        const p =
          (honeyCombCoordinates
            .map( (a,idx) => Math.floor( L2( a.x-mouseX, a.y-mouseY )*1000 )*1000 +idx )
            .reduce( (a,b) => Math.min(a, b) )
          )%1000
        return p;
      }
      const honeyP = mouse2honey( e.offsetX, e.offsetY );
      if( this.props.state.step%2 == 0 ){
        if( this.props.state.cells[honeyP] != -1 ){
          this.props.actions.red([honeyP]);
        }
      }else{
        if( this.props.state.cells[honeyP] != 1 ){
          this.props.actions.blue([honeyP]);
        }
      }
    }
  }

  componentDidUpdate() {
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

    // for click
    const honeyComb =
      Immutable.Range(0,400).toArray()
        .map( p => {
          switch( this.props.state.cells[p] ){
            case 0: ctx.fillStyle = '#ffff22';break;
            case 1: ctx.fillStyle = '#ff2222';break;
            case -1: ctx.fillStyle = '#2222ff';break;
            default: ctx.fillStyle = '#ffffff';
          };
          const x = p%20 + 1;
          const y = Math.floor(p/20) + 1;
          Hex( y%2==0? (x+0.5)*INTERVAL : x*INTERVAL, y*R*3/2, R );
        })

//*****************************************************************************
// for termial
    const nextXY = ( x:number, y:number, op:string ) => {
      switch( op ){
        case "upperleft":  return y%2? [x,y-1]   : [x-1,y-1];
        case "upperright": return y%2? [x+1,y-1] : [x,y-1];
        case "left":       return y%2? [x-1,y]   : [x-1,y];
        case "right":      return y%2? [x+1,y]   : [x+1,y];
        case "lowerleft":  return y%2? [x,y+1]   : [x-1,y+1];
        case "lowerright": return y%2? [x+1,y+1] : [x,y+1];
        default:           return [x,y];
    }}

    let opNtimes:any = ( p:number, op:string , n:number) => {
      if( n<0 ) return 0;
      const nextX = nextXY( p%20, Math.floor(p/20) ,op)[0];
      const nextY = nextXY( p%20, Math.floor(p/20) ,op)[1];
      const nextP = nextX + nextY*20;
      if( nextX<0 || nextX>19 || nextY<0|| nextY>19 ) return 0;
      return opNtimes(nextP,op,n-1) + this.props.state.cells[nextP];
    }

    const p = this.props.state.record[this.props.state.record.length-1];

    const scores = Immutable.Range(0,4).toArray()
      .map( n =>
          [ opNtimes(p,"upperleft",n)  + this.props.state.cells[p] + opNtimes(p,"lowerright",4-n),
            opNtimes(p,"upperright",n) + this.props.state.cells[p] + opNtimes(p,"lowerleft",4-n),
            opNtimes(p,"left",n)       + this.props.state.cells[p] + opNtimes(p,"right",4-n),     ])
      .reduce( (a,b) => a.concat(b) )
    const redScore = scores.reduce( (a,b) => Math.max(a,b));
    const blueScore = scores.reduce( (a,b) => Math.min(a,b));

    ctx.fillStyle = "#000000";
    ctx.font = "80pt Arial";
    ctx.textAlign = "center";
    if( redScore == 5 ){
      this.gameState = "GameOver";
      ctx.fillText("Red win!", WIDTH/2, HEIGHT/2);
      console.log(this.gameState);
    }
    if( blueScore == -5 ){
      this.gameState = "GameOver";
      ctx.fillText("Blue win", WIDTH/2, HEIGHT/2);
    }

  }

}
