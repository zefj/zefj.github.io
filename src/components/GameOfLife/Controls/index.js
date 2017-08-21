import React, { Component } from 'react';

import BoatIcon from './BoatIcon';

import './styles.css';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.controls = null;
    this.openControls = this.openControls.bind(this);
    this.closeControls = this.closeControls.bind(this);
  }

  componentDidUpdate() {
    if (this.state.open) {
      this.controls.focus();
    }
  }

  openControls() {
    this.setState({ open: true });
  }

  closeControls() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="game-of-life__controls">
        <div
          className="game-of-life__toggle" 
          onClick={this.openControls}
        >
          <BoatIcon />
        </div>
        <div
          tabIndex="0"
          ref={(controls) => { this.controls = controls; }} 
          className={`game-of-life__panel ${this.state.open ? 'active' : ''}`}
          onMouseLeave={this.closeControls}
          onBlur={this.closeControls}
        >
          <div className="panel-header">
            Literature adds to reality, it does not simply describe it. It enriches the necessary competencies that daily life requires and provides; and in this respect, it irrigates the deserts that our lives have already become.
          </div>
          <div className="panel-body">
            C.S. Lewis
          </div>
        </div>
      </div>
    );
  }
}

export default Controls;
