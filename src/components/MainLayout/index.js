import React, { Component } from 'react';

import GameOfLife from '../GameOfLife';
import './styles.css';

class MainLayout extends Component {
  render() {
    return (
      <div className="Index">
        <GameOfLife />
        
        <div className="main--content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default MainLayout;
