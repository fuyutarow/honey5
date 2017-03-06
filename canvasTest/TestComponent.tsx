/*
import * as React from 'react';
import CanvasComponent from './CanvasComponent';

const CANVAS_WIDTH = 140;
const CANVAS_HEIGHT = 30;

export default class TestComponent extends React.Component<Props, {}> {
  constructor() {
    this.state = {
      text: 'text',
    };
  }

  render() {
    const canvasProps = {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      updateCanvas: (context) => {
        context.fillStyle = 'red';
        context.font = '24px Arial';
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.fillText(this.state.text, 0, 0);
      },
    };

    return (
      <div>
        <input value={this.state.text} onChange={elm => this.setState({text: elm.target.value})} />
        <CanvasComponent {...canvasProps} />
      </div>
    );
  }
}
*/
