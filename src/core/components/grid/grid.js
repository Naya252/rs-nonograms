/* eslint-disable no-restricted-syntax */
import calculateMatrix from './service/matrix-service';
import { FILL_SOUND, CLEAN_SOUND, X_SOUND } from '../../shared/constants';
import GridUI from './ui/grid-ui';

export default class Grid {
  constructor() {
    this.grid = new GridUI();

    this.points = {
      scheme: [],
      cur: [],
    };

    this.audioFill = new Audio(FILL_SOUND);
    this.audioClean = new Audio(CLEAN_SOUND);
    this.audioX = new Audio(X_SOUND);
  }

  checkCell(cell) {
    const id = cell.getAttribute('id');
    if (this.points.cur.includes(id)) {
      this.points.cur = this.points.cur.filter((el) => el !== id);
    } else {
      this.points.cur.push(id);
    }

    if (this.points.cur.sort().join('=') === this.points.scheme.sort().join('=')) {
      console.log('ПОБЕДАААААААААААА');
    }
  }

  selectCell(event) {
    const cell = event.target.closest('.cell');
    if (cell && cell.hasAttribute('name')) {
      if (cell.classList.contains('black')) {
        cell.classList.remove('black');
        this.audioClean.play();
      } else {
        cell.classList.add('black');
        this.audioFill.play();
      }

      this.checkCell(cell);
    }
  }

  fillScheme() {
    this.cleanCells();

    this.grid.items.forEach((el) => {
      if (el.hasAttribute('id') && this.points.scheme.includes(el.getAttribute('id'))) {
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
