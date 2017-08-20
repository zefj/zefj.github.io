import React, { Component } from 'react';

import _ from 'lodash';

import * as life from '../../lib/game-of-life'

import './styles.css';

const gridSize = _.floor(window.innerWidth / 400);
const seed = 6667;
const chance = 0.2;

const seeder = (x, y) => {
  const seedForTile = seed * (x + 1) * (y + 1);
  var r = Math.sin(seedForTile) * 10000;
  return (r - Math.floor(r)) < chance ? 1 : 0;
}

class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.init = this.init.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
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

    const rows = _.floor(dimensions.height / gridSize);
    const columns = _.floor(dimensions.width / gridSize);

console.info('dimensions', dimensions);
console.info('rows', rows);
console.info('columns', columns);

    this.world = life.createWorld(columns, rows, seeder);

    // this.world = this.generateWorld(ctx, gridSize, dimensions.width, dimensions.height);
    // this.draw(ctx, this.world, gridSize);
    this.start();
  }

  start() {
    // @TODO: variable animation speed OR variable grid cell
    // Implementation: check handler execution time, and slow it down as necessary
    setInterval(this.updateCanvas, 20);
  }

  updateCanvas() {
    // console.time('updateCanvas execution time');
    this.draw(this.ctx, this.world, gridSize);
    this.world = life.getNextGeneration(this.world);
    // console.timeEnd('updateCanvas execution time');
  }

  draw(ctx, world, gridSize) {
    // Cleaning the canvas at every iteration and only paining the living cells
    // is faster than repainting each cell. Might try only painting differences later.
    ctx.fillStyle = "#3c3e3f";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    _.forEach(world, (row, yidx) => {
      const y = yidx * gridSize;
      _.forEach(row, (tile, xidx) => {
        if (!tile) return;
        ctx.fillStyle = "#2f2f2f";
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

export default GameOfLife;
