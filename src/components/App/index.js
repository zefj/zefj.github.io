import React, { Component } from 'react';

import GameOfLife from '../GameOfLifeCanvas';

import './styles.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameOfLife />
      </div>
    );
  }
}

export default App;
