import * as React from 'react';

interface Props {
  width: number;
  height: number;
  updateCanvas: any;
}

export default class CanvasComponent extends React.Component<Props, {}> {
  cxt: any ;
  componentDidMount() {
    this.updateCanvas();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props !== nextProps) {
      this.updateCanvas();
    }
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    this.props.updateCanvas(this.cxt);
  }

  render() {
    return <canvas ref={ (c) => this.cxt = c.getContext('2d') } width={this.props.width} height={this.props.height}></canvas>;
  }
}
