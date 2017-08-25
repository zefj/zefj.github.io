import React, { Component } from 'react';

import GameOfLife from '../GameOfLife';

import './styles.css';

class Index extends Component {
  render() {
    return (
      <div className="Index">
        <GameOfLife />
      </div>
    );
  }
}

export default Index;
