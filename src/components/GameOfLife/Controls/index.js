import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BoatIcon from './BoatIcon';

import './styles.scss';

// TODO rewrite this with hooks PLEASE I CANNOT LOOK AT THIS
class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.controls = null;
    this.seedInput = null;
    this.openControls = this.openControls.bind(this);
    this.closeControls = this.closeControls.bind(this);
  }

  // Ensure we don't leak memory in case this unmounts
  componentWillUnmount() {
      document.removeEventListener('touchstart', this.maybeClose.bind(this), false);
      document.removeEventListener('mousedown', this.maybeClose.bind(this), false);
  }

  openControls() {
    document.addEventListener('touchstart', this.maybeClose.bind(this), false);
    document.addEventListener('mousedown', this.maybeClose.bind(this), false);

    this.setState({ open: true });
  }

  closeControls() {
    document.removeEventListener('touchstart', this.maybeClose.bind(this), false);
    document.removeEventListener('mousedown', this.maybeClose.bind(this), false);

    this.setState({ open: false });

    // Trigger a blur event on seedInput to hide the mobile keyboard. Even if it isn't currently focused, this doesn't
    // seem to cause any issues and I did not find a more elegant solution.
    this.seedInput.blur();
  }

  maybeClose = (event) => {
    if (!this.state.open) {
      return;
    }

    if (!this.controls) {
      return;
    }

    if (this.controls.contains(event.target)) {
      return;
    }

    this.closeControls();
  };

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
          ref={(controls) => { this.controls = controls; }}
          className={`game-of-life__panel ${this.state.open ? 'active' : ''}`}
        >
          <div className="game-of-life__panel-body">
            <div className="input-group">
              <label htmlFor="speed">Speed:</label>
              <div className="game-of-life__speed-control">
                <input
                  id="speed"
                  type="range"
                  min="1" // just max speed, this is essentially as fast as your computer can handle
                  max="100"
                  step="5"
                  value={100 - this.props.speed}
                  onChange={(event) => { event.target.value && this.props.onSpeedChanged(100 - parseInt(event.target.value)) }}
                />
                <button onClick={this.props.onPauseResumeClick}>
                  <i className={`fa fa-${this.props.isPaused ? 'play' : 'pause' }`} />
                </button>
              </div>
            </div>
            <div className="game-of-life__seed-control">
              <div className="input-group">
                <label htmlFor="seed">Initial state generator seed:</label>
                <input
                  ref={(seedInput) => this.seedInput = seedInput }
                  id="seed"
                  type="number"
                  defaultValue={this.props.seed}
                  // TOOD: debounce this
                  onChange={() => this.props.onSeedChanged(parseInt(this.seedInput.value) || 0)}
                />
              </div>
            </div>
          </div>

          <span className="game-of-life__apology">
              Does it crash your browser? Let me know on <a href="https://github.com/zefj/zefj.github.io/issues">GitHub</a>.
          </span>
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
};

Controls.defaultProps = {
  isPaused: false,
  onPauseResumeClick: () => {},
  onSpeedChanged: () => {},
  onSeedChanged: () => {},
};

export default Controls;
