/* eslint-disable no-restricted-syntax */
import calculateMatrix from './service/matrix-service';
import GridUI from './ui/grid-ui';

function check(cell, cls) {
  let val = false;
  if (!cell.classList.contains(cls)) {
    cell.classList.add(cls);
    val = true;
  } else {
    cell.classList.remove(cls);
    val = false;
  }
  return val;
}

export default class Grid {
  constructor() {
    this.grid = new GridUI();

    this.points = {
      scheme: [],
      cur: [],
      x: [],
    };
  }

  checkX(cell) {
    const id = cell.getAttribute('id');
    if (this.points.x.includes(id)) {
      this.points.x = this.points.x.filter((el) => el !== id);
    } else {
      this.points.x.push(id);
    }

    if (this.points.cur.includes(id)) {
      this.points.cur = this.points.cur.filter((el) => el !== id);
    }

    return this.isWin();
  }

  checkCell(cell) {
    const id = cell.getAttribute('id');
    if (this.points.cur.includes(id)) {
      this.points.cur = this.points.cur.filter((el) => el !== id);
    } else {
      this.points.cur.push(id);
    }

    return this.isWin();
  }

  isWin() {
    return this.points.cur.sort().join('=') === this.points.scheme.sort().join('=');
  }

  cleanX() {
    for (const cell of this.grid.items) {
      if (cell.classList.contains('x')) {
        cell.classList.remove('x');
      }
    }
  }

  selectCell(event, isContext) {
    let isFill = null;
    let isX = null;
    let isWin = null;

    const cell = event.target.closest('.cell');

    if (cell && cell.hasAttribute('name')) {
      if (isContext) {
        if (cell.classList.contains('black')) {
          cell.classList.remove('black');
        }

        isX = check(cell, 'x');
        this.checkX(cell);
        isWin = this.checkX(cell);
      } else {
        if (cell.classList.contains('x')) {
          cell.classList.remove('x');
        }
        isFill = check(cell, 'black');
        isWin = this.checkCell(cell);
      }
    }
    return { isFill, isX, isWin };
  }

  fillScheme() {
    this.cleanCells();

    this.grid.items.forEach((el) => {
      if (el.hasAttribute('id') && this.points.scheme.includes(el.getAttribute('id'))) {
        el.classList.add('black');
      }
    });
  }

  fillSavedCells() {
    this.grid.items.forEach((el) => {
      if (el.hasAttribute('id') && this.points.cur.includes(el.getAttribute('id'))) {
        el.classList.add('black');
      }
    });

    this.grid.items.forEach((el) => {
      if (el.hasAttribute('id') && this.points.x.includes(el.getAttribute('id'))) {
        el.classList.add('x');
      }
    });
  }

  cleanCells() {
    this.cleanX();

    this.points.cur = [];
    this.points.x = [];

    for (const cell of this.grid.items) {
      if (cell.classList.contains('black')) {
        cell.classList.remove('black');
      }
    }
  }

  cleanGrid() {
    if (this.grid.el) {
      this.grid.el.remove();
      this.grid.el = null;
      this.grid.items = [];
      this.grid.matrix = [];
    }
  }

  lockGrid() {
    this.grid.el.classList.toggle('lock');
  }

  createGrid(game, level) {
    this.points.scheme = [];
    this.points.cur = [];
    this.points.x = [];
    this.grid.matrix = [];
    this.grid.matrix = calculateMatrix(game.figure);

    if (this.grid.el && this.grid.el.classList.contains('lock')) {
      this.lockGrid();
    }

    this.points.scheme = this.grid.create(this.grid.matrix, level);
  }
}
