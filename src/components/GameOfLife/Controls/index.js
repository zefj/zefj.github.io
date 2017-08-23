import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BoatIcon from './BoatIcon';

import './styles.css';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
    this.controls = null;
    this.openControls = this.openControls.bind(this);
    this.closeControls = this.closeControls.bind(this);
  }

  componentDidUpdate() {
    if (this.state.open && this.controls !== document.activeElement) {
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
          // onBlur={this.closeControls}
        >
          <div className="game-of-life__panel-header">
            Sorry if it crashes your browser :)
          </div>
          <div className="game-of-life__panel-body">
            <div className="input-group">
              <label htmlFor="speed">Speed:</label>
              <div id="inline-submit" className="icon-button">
                {
                  this.pauseButton()
                }
              </div>
              <div id="input">
                <input id="speed" type="range" />
              </div>
            </div>
            <div className="game-of-life__seed-control">
              <div className="input-group">
                <label htmlFor="seed">Current generator seed:</label>
                <div id="inline-submit" className="icon-button">
                  <i className="fa fa-check"/>
                </div>
                <div id="input">
                  <input id="seed" type="number" defaultValue={this.props.seed}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  isPaused: PropTypes.bool,
  seed: PropTypes.number,
  onPauseResumeClick: PropTypes.func,
  onStartAgainClick: PropTypes.func,
}

Controls.defaultProps = {
  isPaused: false,
  onPauseResumeClick: () => {},
  onStartAgainClick: () => {},
}

export default Controls;
