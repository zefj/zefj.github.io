import _ from 'lodash';

import * as life from './index'

const seeder = (x, y, seed, chance) => {
  const seedForTile = seed * (x + 1) * (y + 1);
  var r = Math.sin(seedForTile) * 10000;
  return (r - Math.floor(r)) < chance ? 1 : 0;
}

const defaultOptions = {
  // seed for pseudorandom number generator
  // for two identical conditions, the same seed will yield the same initial state
  seed: 6667,
  // chance for cell to become alive during seeding
  chance: 0.07,
  rows: 200,
  columns: 200,
};

class GameOfLifeController {
  constructor(drawer) {
    this.drawer = drawer;
    this.interval = null;

    this.init = this.init.bind(this);
    this.start = this.start.bind(this);
    this.__update = this.__update.bind(this);

    this.stateChangedListener = () => {};

    this.options = null;

    this.paused = false;
  }

  __notifyStateChanged() {
    this.stateChangedListener();
  }
  
  init(options) {
    return new Promise((resolve, reject) => {
      this.options = Object.assign(defaultOptions, options);
      this.__createWorld();
      this.__update();
      resolve();
    });
  }

  // This will get called after internal game state changes,
  // eg. game gets paused
  registerStateChangedListener(listener) {
    this.stateChangedListener = listener;
  }

  __createWorld() {
      const rows = this.options.rows;
      const columns = this.options.columns;
      this.world = life.createWorld(columns, rows, _.partialRight(seeder, this.options.seed, this.options.chance));
  }

  start() {
    // @TODO: variable animation speed OR variable grid cell
    // Implementation: check handler execution time, and slow it down as necessary
    this.interval = setInterval(this.__update, 20);
    this.paused = false;
    this.__notifyStateChanged();
  }

  pause() {
    clearInterval(this.interval);
    this.paused = true;
  }

  __update() {
    // console.time('updateCanvas execution time');
    this.world = life.getNextGeneration(this.world);
    this.drawer.draw(this.world);
    // console.timeEnd('updateCanvas execution time');
  }
}

export default GameOfLifeController;
