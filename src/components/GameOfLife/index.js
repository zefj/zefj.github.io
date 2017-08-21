import React, { Component } from 'react';

import Game from './Game/controller';
import Controls from './Controls';

class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.game = null;
    this.canvas = null;

    this.state = {
      gameReady: false,
    }

    this.handlePauseResumeClick = this.handlePauseResumeClick.bind(this);
  }

  componentDidMount() {
    this.initializeGameController()
  }

  initializeGameController() {
    this.game = new Game(this.canvas);

    this.game.init()
      .then(this.game.registerStateChangedHandler(() => { this.forceUpdate() }))
      .then(this.game.start)

    this.setState({ gameReady: true })
  }

  handlePauseResumeClick() {
    this.game.paused ? this.game.start() : this.game.pause();
    this.forceUpdate();
  }

  render() {
    return (
      <span>
        <div className="game-of-life-wrapper">
          <canvas
            id="canvas"
            ref={(canvas) => {
              this.canvas = canvas;
            }}
          />
        </div>
        {
          this.state.gameReady &&
            <Controls
              isPaused={this.game.paused}
              onPauseResumeClick={this.handlePauseResumeClick}
            />
        }
      </span>
    );
  }
}

export default GameOfLife;
