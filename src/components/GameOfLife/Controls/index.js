import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  pauseButton() {
    return (
      <i
        className={`fa fa-${this.props.isPaused ? 'play' : 'pause' }`}
        onClick={this.props.onPauseResumeClick}
      />
    );
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
          // onMouseLeave={this.closeControls}
          // onBlur={this.closeControls}
        >
          <div className="game-of-life__panel-controls">
            {
              this.pauseButton()
            }
          </div>
          <div className="panel-body">
            C.S. Lewis
          </div>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  isPaused: PropTypes.bool,
  onPauseResumeClick: PropTypes.func,
  onStartAgainClick: PropTypes.func,
}

Controls.defaultProps = {
  isPaused: false,
  onPauseResumeClick: () => {},
  onStartAgainClick: () => {},
}

export default Controls;
