import _ from 'lodash';

const defaultOptions = {
  backgroundColor: "#3c3e3f",
  cellColor: "#2f2f2f",
  // in pixels
  gridSize: 5,
  width: 400,
  height: 400,
};

class CanvasDrawer {
  constructor(canvas) {
    this.canvas = canvas;
  }

  init(options) {
    return new Promise((resolve, reject) => {
      this.options = Object.assign(defaultOptions, options);
      const ctx = this.canvas.getContext('2d');

      ctx.canvas.width  = this.options.width;
      ctx.canvas.height = this.options.height;

      ctx.fillStyle = this.options.backgroundColor;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      resolve();
    });
  }

  draw(world) {
    const {
      gridSize,
      backgroundColor,
      cellColor
    } = this.options;

    const ctx = this.canvas.getContext('2d');

    // Cleaning the canvas at every iteration and only paining the living cells
    // is faster than repainting each cell. Might try only painting differences later.
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    _.forEach(world, (row, yidx) => {
      const y = yidx * gridSize;
      _.forEach(row, (tile, xidx) => {
        if (!tile) return;
        const x = xidx * gridSize;
        ctx.fillStyle = cellColor;
        ctx.rect(x, y, gridSize, gridSize);
      });
    });
    ctx.fill();
  }
}

export default CanvasDrawer;
