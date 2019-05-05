import _ from 'lodash';

import { createWorld, getNextGeneration } from './world'; // TODO: rename this file

const seeder = (x, y, seed, chance) => {
  const seedForTile = seed * (x + 1) * (y + 1);
  var r = Math.sin(seedForTile) * 10000;
  return (r - Math.floor(r)) < chance ? 1 : 0;
};

const defaultOptions = {
  // seed for pseudorandom number generator
  // for two identical conditions, the same seed will yield the same initial state
  seed: _.floor(Math.random() * (1000 - 1) + 1),
  // chance for cell to become alive during seeding
  chance: 0.12,
  rows: 200,
  columns: 200,
  // attempt to update every [ms]
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

  // TODO: implement a proper event system
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

  // This listener will get called after internal game state changes,
  // eg. game gets paused
  registerStateChangedListener(listener) {
    this.stateChangedListener = listener;
  }

  __createWorld() {
      const rows = this.options.rows;
      const columns = this.options.columns;
      this.world = createWorld(
        columns,
        rows,
        _.partialRight(seeder, parseInt(this.options.seed) || 1, this.options.chance)
      );
  }

  start() {
    // @TODO: variable grid cell?
    // @TODO: measure time and slow execution down as necessary on slower PCs?
    this.paused = false;
    this.interval = window.requestAnimationFrame(this.__update);
    this.__notifyStateChanged();
  }

  pause() {
    this.paused = true;
    window.cancelAnimationFrame(this.interval);
    this.__notifyStateChanged();
  }

  changeSpeed(speed) {
    this.options = Object.assign(this.options, { speed });
    this.__notifyStateChanged();
  }

  changeSeed(seed) {
    this.options = Object.assign(this.options, { seed });
    this.__createWorld();
    this.__notifyStateChanged();
  }

  then = 0;

  __update() {
    if (this.paused) {
      return;
    }

    this.interval = window.requestAnimationFrame(this.__update);

    // calc elapsed time since last loop
    const now = performance.now();
    const elapsed = now - this.then;

    // if enough time has elapsed, calculate and draw the next frame
    if (elapsed > this.options.speed) {
        // Get ready for next frame by setting then=now, but also adjust for specified speed not being a multiple of
        // RAF's interval (16.7ms)
        this.then = now - (elapsed % this.options.speed);

        this.world = getNextGeneration(this.world);
        this.drawer.draw(this.world);
    }
  }
}

export default GameOfLifeController;
