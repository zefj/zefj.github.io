import React, { Component } from 'react';

import Game from './Game';
import Controls from './Controls';

class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.game = null;

    this.handlePauseResumeClick = this.handlePauseResumeClick.bind(this);
  }

  handlePauseResumeClick() {
    this.game.paused ? this.game.start() : this.game.paused();
  }

  render() {
    return (
      <span>
        <Game
          ref={(game) => { this.game = game; }}
        />
        <Controls
          onPauseResumeClick={this.handlePauseResumeClick}
         />
      </span>
    );
  }
}

export default GameOfLife;
