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
  seed: _.floor(Math.random() * (1000 - 1) + 1),
  // chance for cell to become alive during seeding
  chance: 0.12,
  rows: 200,
  columns: 200,
  // update every [ms]
  speed: 20,
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
      this.world = life.createWorld(
        columns,
        rows,
        _.partialRight(seeder, parseInt(this.options.seed) || 1, this.options.chance)
      );
  }

  start() {
    // @TODO: variable animation speed OR variable grid cell
    // Implementation: check handler execution time, and slow it down as necessary
    // OR throttling?
    this.interval = setInterval(this.__update, this.options.speed);
    this.paused = false;
    this.__notifyStateChanged();
  }

  pause() {
    clearInterval(this.interval);
    this.paused = true;
    this.__notifyStateChanged();
  }

  changeSpeed(speed) {
    const wasPaused = this.paused;
    this.pause();
    this.options = Object.assign(this.options, { speed });
    if (!wasPaused) this.start();
  }

  changeSeed(seed) {
    const wasPaused = this.paused;
    this.pause();
    this.options = Object.assign(this.options, { seed });
    this.__createWorld();
    this.__update();
    if (!wasPaused) this.start();
  }

  __update() {
    // console.time('updateCanvas execution time');
    this.world = life.getNextGeneration(this.world);
    this.drawer.draw(this.world);
    // console.timeEnd('updateCanvas execution time');
  }
}

export default GameOfLifeController;
