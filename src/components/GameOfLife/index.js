import React, { Component } from 'react';

import Game from './Game';
import Controls from './Controls';

class GameOfLife extends Component {
  render() {
    return (
      <span>
        <Game />
        <Controls />
      </span>
    );
  }
}

export default GameOfLife;
