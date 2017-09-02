import React, { Component } from 'react';

import GameOfLife from '../GameOfLife';
import Well from '../Well';
import './styles.css';

class Index extends Component {
  render() {
    return (
      <div className="Index">
        <GameOfLife />
        
        <div className="content">
          <Well>
            { this.props.children }
          </Well>
        </div>
      </div>
    );
  }
}

export default Index;
