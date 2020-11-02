import React, { Component } from 'react';

import GameOfLife from '../GameOfLife';
import './styles.scss';

class IndexLayout extends Component {
  render() {
    return (
      <div className="index">
        <div className="index__game-of-life">
          <GameOfLife />
          <div className="index__header">

            <div className="greeting">
              My name is Filip, I like to build stuff.
              <br />
              <br />
              Play with the game of life, see my <a href="/resume">résumé</a>, or visit my profiles:
              <div className="social">
                <a href="https://www.linkedin.com/in/FilipRec"><i className="fab fa-linkedin fa-2x" /></a>
                <a href="https://github.com/zefj"><i className="fab fa-github fa-2x" /></a>
              </div>
            </div>

          </div>
        </div>

        <div className="index__content">
          { this.props.children }
          <i className="heart far fa-smile"></i>
        </div>
      </div>
    );
  }
}

export default IndexLayout;
