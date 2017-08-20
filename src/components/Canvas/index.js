import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
  }

  componentDidMount() {
    this.init();
    this.handleAfterInit();
  }

  init()
  {

  }

  handleAfterInit() {
    this.props.onLoad();
  }

  getDrawingContext() {
    return this.canvas.getContext('2d');
  }

  getDimensions() {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }

  render() {
    return (
      <canvas
        id="canvas"
        ref={(canvas) => { this.canvas = canvas; }}
      />
    );
  }
}

Canvas.propTypes = {
  onLoad: PropTypes.func,
};
Canvas.defaultProps = {
  onLoad: () => {},
};

export default Canvas;
