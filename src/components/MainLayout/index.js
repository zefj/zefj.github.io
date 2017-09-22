import React, { Component } from 'react';

import GameOfLife from '../GameOfLife';
import Well from '../Well';
import './styles.css';

class MainLayout extends Component {
  render() {
    return (
      <div className="Index">
        <GameOfLife />
        
        <div className="content">
          <div className="content--well">
            <Well>
              { this.props.children }
            </Well>
          </div>
        
          <div className="social">
            <a href="https://www.linkedin.com/in/FilipRec"><i className="fa fa-linkedin fa-2x"></i></a>
            <a href="https://github.com/zefj"><i className="fa fa-github fa-2x"></i></a>
            <a href="https://www.facebook.com/naamioni"><i className="fa fa-facebook fa-2x"></i></a>
          </div>
          
        </div>
      </div>
    );
  }
}

export default MainLayout;
