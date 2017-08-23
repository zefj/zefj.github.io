import React, { Component } from 'react';

import _ from 'lodash';

import Game from '../../lib/game-of-life/controller';
import CanvasDrawer from '../../lib/game-of-life/canvasDrawer';
import Controls from './Controls';

import './styles.css';

const gridSize = 5;

class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.game = null;
    this.canvas = null;

    this.state = {
      gameReady: false,
    }

    this.handlePauseResumeClick = this.handlePauseResumeClick.bind(this);
    this.registerResizeEventListener = this.registerResizeEventListener.bind(this);
  }

  componentDidMount() {
    this.initializeGame()
  }

  registerResizeEventListener() {
    let resizeTimer;
    let wasPaused;

    window.addEventListener("resize", () => {
      // Save the state
      if (wasPaused === undefined) wasPaused = this.game.paused;

      this.game.pause();
      // Debounce game of life reinitialization on window resize
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.canvasDrawer.init({
          ...this.getCanvasDimensions(),
          gridSize,
        });

        this.game.init({
          ...this.getWorldDimensions(),
          gridSize,
        })
          .then(() => {
            if (!wasPaused) {
              this.game.start();
            }
            wasPaused = undefined;
          });
      }, 250);
    });
  }

  initializeGame() {
    this.canvasDrawer = new CanvasDrawer(this.canvas);
    this.game = new Game(this.canvasDrawer);

    this.canvasDrawer.init({
      ...this.getCanvasDimensions(),
      gridSize,
    });

    return this.game.init({
      ...this.getWorldDimensions(),
      gridSize,
    })
      .then(this.game.registerStateChangedListener(() => { this.forceUpdate() }))
      .then(() => { this.setState({ gameReady: true }) })
      .then(this.registerResizeEventListener)
      .then(this.game.start);
  }

  getWorldDimensions() {
    const rows = _.floor(document.body.clientHeight / gridSize);
    const columns = _.floor(document.body.clientWidth / gridSize);

    return {
      rows,
      columns,
    }
  }

  getCanvasDimensions() {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
console.info('width', width, 'height', height);
    return {
      width,
      height,
    }
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
              seed={this.game.options.seed}
              onPauseResumeClick={this.handlePauseResumeClick}
            />
        }
      </span>
    );
  }
}

export default GameOfLife;
