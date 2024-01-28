/* eslint-disable no-restricted-syntax */
import calculateMatrix from './service/matrix-service';
import GridUI from './ui/grid-ui';

export default class Grid {
  constructor() {
    this.grid = new GridUI();

    this.points = {
      scheme: [],
      cur: [],
    };
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

  selectCell(event) {
    let isFill = null;
    let isWin = null;

    const cell = event.target.closest('.cell');
    if (cell && cell.hasAttribute('name')) {
      if (cell.classList.contains('black')) {
        cell.classList.remove('black');
        isFill = false;
      } else {
        cell.classList.add('black');
        isFill = true;
      }

      isWin = this.checkCell(cell);
    }
    return { isFill, isWin };
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
  }

  cleanCells() {
    this.points.cur = [];

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

  createGrid(game) {
    this.points.scheme = [];
    this.points.cur = [];
    this.grid.matrix = [];
    this.grid.matrix = calculateMatrix(game.figure);

    this.points.scheme = this.grid.create(this.grid.matrix);
  }
}
