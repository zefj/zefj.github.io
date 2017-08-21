import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as life from '../../../lib/game-of-life'

import './styles.css';

// const gridSize = _.floor(window.innerWidth / 400);

const seeder = (x, y, seed, chance) => {
  const seedForTile = seed * (x + 1) * (y + 1);
  var r = Math.sin(seedForTile) * 10000;
  return (r - Math.floor(r)) < chance ? 1 : 0;
}

class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.interval = null;
    this.init = this.init.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);

    this.paused = false;
  }

  componentDidMount() {
    let resizeTimer;
    window.addEventListener("resize", () => {
      this.pause();
      // Debounce game of life reinitialization on window resize
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(this.init, 250);
    });

    this.init();
  }

  init() {
    this.pause();
    this.ctx = this.canvas.getContext('2d');
    
    // @TODO: resize listener
    this.ctx.canvas.width  = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;

    this.ctx.fillStyle = "#3c3e3f";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    const dimensions = {
      width: this.canvas.width,
      height: this.canvas.height,
    }

    const rows = _.floor(dimensions.height / this.props.gridSize);
    const columns = _.floor(dimensions.width / this.props.gridSize);

console.info('dimensions', dimensions);
console.info('rows', rows);
console.info('columns', columns);

    this.world = life.createWorld(columns, rows, _.partialRight(seeder, this.props.seed, this.props.chance));
    this.start();
  }

  start() {
    // @TODO: variable animation speed OR variable grid cell
    // Implementation: check handler execution time, and slow it down as necessary
    this.interval = setInterval(this.updateCanvas, 20);
    this.paused = false;
  }

  pause() {
    clearInterval(this.interval);
    this.paused = true;
  }

  updateCanvas() {
    // console.time('updateCanvas execution time');
    this.world = life.getNextGeneration(this.world);
    this.draw(
      this.ctx,
      this.world,
      {
        ...this.props
      }
    );
    // console.timeEnd('updateCanvas execution time');
  }

  draw(ctx, world, options) {
    const {
      gridSize,
      backgroundColor,
      cellColor
    } = options;

    // Cleaning the canvas at every iteration and only paining the living cells
    // is faster than repainting each cell. Might try only painting differences later.
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    _.forEach(world, (row, yidx) => {
      const y = yidx * gridSize;
      _.forEach(row, (tile, xidx) => {
        if (!tile) return;
        ctx.fillStyle = cellColor;
        const x = xidx * gridSize;
        ctx.rect(x, y, gridSize, gridSize);
      });
    });
    ctx.fill();
  }

  render() {
    return (
      <div className="game-of-life-wrapper">
        <canvas
          id="canvas"
          ref={(canvas) => {
            this.canvas = canvas;
          }}
        />
      </div>
    );
  }
}

GameOfLife.propTypes = {
  backgroundColor: PropTypes.string,
  cellColor: PropTypes.string,
  // in pixels
  gridSize: PropTypes.number,
  // seed for pseudorandom number generator
  // for two identical conditions, the same seed will yield the same initial state
  seed: PropTypes.number,
  // chance for cell to become alive during seeding
  chance: PropTypes.number,
}

GameOfLife.defaultProps = {
  backgroundColor: "#3c3e3f",
  cellColor: "#2f2f2f",
  // in pixels
  gridSize: 4,
  // seed for pseudorandom number generator
  // for two identical conditions, the same seed will yield the same initial state
  seed: 6667,
  // chance for cell to become alive during seeding
  chance: 0.07,
}

export default GameOfLife;
