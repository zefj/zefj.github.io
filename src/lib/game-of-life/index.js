// Credit:
// https://rosettacode.org/wiki/Conway%27s_Game_of_Life#JavaScript - for the functional approach
// http://disruptive-communications.com/conwaylifejavascript/ - WAY faster, like WAAAAAY faster
import _ from 'lodash';

const isAlive = (cell, numAliveNeighbours) => {
  return (cell === 1 && _.inRange(numAliveNeighbours, 2, 4)) 
    || (cell === 0 && numAliveNeighbours === 3) ? 1 : 0;
};

// This is way faster than the functional approach.
const updateWorld = (world) => {
    // Building the mirrorGrid with clean state like below is faster than JSON.parse(JSON.stringify(world)),
    // as well as _.deepClone(cleanWorld) and couple other solutions. I wasn't able to find a solution that performs
    // better than this.
    const mirrorGrid = [];
    for (var j = 0; j < world.length; j++) { //iterate through rows
      mirrorGrid[j] = [];
      for (var k = 0; k < world[j].length; k++) { //iterate through columns
        mirrorGrid[j][k] = 0;

        var totalCells = 0;
        if (world[j - 1]) {
          totalCells += world[j - 1][k - 1]; //top left
          totalCells += world[j - 1][k]; //top center
          totalCells += world[j - 1][k + 1]; //top right
        }

        totalCells += world[j][k - 1]; //middle left
        totalCells += world[j][k + 1]; //middle right

        if (world[j + 1]) {
          totalCells += world[j + 1][k - 1]; //bottom left
          totalCells += world[j + 1][k]; //bottom center
          totalCells += world[j + 1][k + 1]; //bottom right
        }

        mirrorGrid[j][k] = isAlive(world[j][k], totalCells);
      }
    }

    return mirrorGrid;
}

const generateWorld = (columns, rows) => {
  return _.chain(_.range(1, rows + 1))
      .map(() => [])
      .map(
        (row, rowIndex) => row.concat(_.range(1, columns + 1).map((tile, columnIndex) => 0))
      ).value();
}

const seedWorld = (world, seeder) => {
  return world.map(
    (row, rowIndex) => {
      return _.map(row, (tile, columnIndex) => {
        if (typeof seeder === 'function') {
          return seeder(columnIndex, rowIndex);
        } else if (typeof seeder === 'number' && seeder >= 0 && seeder <= 1) {
          return Math.random() < seeder ? 1 : 0;
        }

        console.warn('No seeder function or chance provided, filling randomly with 0.2 chance');
        return Math.random() < 0.2 ? 1 : 0;
      })
    }
  )
}

export const createWorld = (columns, rows, seeder = null) => {
  return seedWorld(generateWorld(columns, rows), seeder);
}

export const getNextGeneration = (world) => {
    // console.time('getNextGeneration execution time');
  const nextGeneration = updateWorld(world);
    // console.timeEnd('getNextGeneration execution time');
  return nextGeneration;
}
