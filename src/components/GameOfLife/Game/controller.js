import _ from 'lodash';

import * as life from '../../../lib/game-of-life'

// const gridSize = _.floor(window.innerWidth / 400);

const seeder = (x, y, seed, chance) => {
  const seedForTile = seed * (x + 1) * (y + 1);
  var r = Math.sin(seedForTile) * 10000;
  return (r - Math.floor(r)) < chance ? 1 : 0;
}

const defaultOptions = {
  backgroundColor: "#3c3e3f",
  cellColor: "#2f2f2f",
  // in pixels
  gridSize: 4,
  // seed for pseudorandom number generator
  // for two identical conditions, the same seed will yield the same initial state
  seed: 6667,
  // chance for cell to become alive during seeding
  chance: 0.07,
};

class GameOfLifeController {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.interval = null;
    this.init = this.init.bind(this);
    this.start = this.start.bind(this);
    this.__updateCanvas = this.__updateCanvas.bind(this);

    this.stateChangedHandler = () => {};

    this.options = Object.assign(defaultOptions, options);

    this.paused = false;
  }

  __registerEventListener() {
    let resizeTimer;
    let wasPaused;

    window.addEventListener("resize", () => {
      // Save the state
      if (wasPaused === undefined) wasPaused = this.paused;

      this.pause();
      // Debounce game of life reinitialization on window resize
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.__createWorld(this.__initializeCanvas());
        if (wasPaused) {
          wasPaused = undefined;
          return;
        }
        wasPaused = undefined;
        this.start();
      }, 250);
    });
  }

  __notifyStateChanged() {
    this.stateChangedHandler();
  }
  
  init() {
    return new Promise((resolve, reject) => {
      this.pause();
      this.__registerEventListener();
      this.__createWorld(this.__initializeCanvas());
      resolve();
    });
  }

  registerStateChangedHandler(handler) {
    this.stateChangedHandler = handler;
  }

  __initializeCanvas() {
      this.ctx = this.canvas.getContext('2d');
      
      this.ctx.canvas.width  = window.innerWidth;
      this.ctx.canvas.height = window.innerHeight;

      this.ctx.fillStyle = "#3c3e3f";
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      return {
        width: this.canvas.width,
        height: this.canvas.height,
      };
  }

  __createWorld(dimensions) {
      const rows = _.floor(dimensions.height / this.options.gridSize);
      const columns = _.floor(dimensions.width / this.options.gridSize);
      this.world = life.createWorld(columns, rows, _.partialRight(seeder, this.options.seed, this.options.chance));
  }

  start() {
    // @TODO: variable animation speed OR variable grid cell
    // Implementation: check handler execution time, and slow it down as necessary
    this.interval = setInterval(this.__updateCanvas, 20);
    this.paused = false;
    this.__notifyStateChanged();
  }

  pause() {
    clearInterval(this.interval);
    this.paused = true;
  }

  __updateCanvas() {
    // console.time('updateCanvas execution time');
    this.world = life.getNextGeneration(this.world);
    this.__draw(
      this.ctx,
      this.world,
      {
        ...this.options
      }
    );
    // console.timeEnd('updateCanvas execution time');
  }

  __draw(ctx, world, options) {
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
}

export default GameOfLifeController;
