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
    this.seedInput = null;
    this.openControls = this.openControls.bind(this);
    this.closeControls = this.closeControls.bind(this);
    this.onBlur = this.onBlur.bind(this);
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

  // https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
  onBlur(e) {
    var currentTarget = e.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
          this.closeControls();
      }
    }, 0);
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
          onBlur={this.onBlur}
        >
          <div className="game-of-life__panel-header">
            Sorry if it crashes your browser :)
          </div>
          <div className="game-of-life__panel-body">
            <div className="input-group">
              <label htmlFor="speed">Speed:</label>
              <div
                id="inline-submit"
                className="icon-button"
                onClick={this.props.onPauseResumeClick}
              >
                <i
                  className={`fa fa-${this.props.isPaused ? 'play' : 'pause' }`}
                />
              </div>
              <div id="input">
                <input
                  id="speed"
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={this.props.speed}
                  onChange={(event) => { event.target.value && this.props.onSpeedChanged(parseInt(event.target.value)) }}
                />
              </div>
            </div>
            <div className="game-of-life__seed-control">
              <div className="input-group">
                <label htmlFor="seed">Current generator seed:</label>
                <div
                  id="inline-submit"
                  className="icon-button"
                  onClick={() => { this.seedInput.value && this.props.onSeedChanged(parseInt(this.seedInput.value)) }}
                >
                  <i className="fa fa-check"/>
                </div>
                <div id="input">
                  <input
                    ref={(seedInput) => {
                      this.seedInput = seedInput;
                    }}
                    id="seed"
                    type="number"
                    defaultValue={this.props.seed}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                          this.value && this.props.onSeedChanged(parseInt(this.value));
                      }
                    }}
                  />
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
  speed: PropTypes.number,
  onPauseResumeClick: PropTypes.func,
  onSpeedChanged: PropTypes.func,
  onSeedChanged: PropTypes.func,
  onStartAgainClick: PropTypes.func,
};

Controls.defaultProps = {
  isPaused: false,
  onPauseResumeClick: () => {},
  onSpeedChanged: () => {},
  onSeedChanged: () => {},
  onStartAgainClick: () => {},
};

export default Controls;
