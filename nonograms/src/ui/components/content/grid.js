/* eslint-disable no-lonely-if */
import calculateMatrix from '../../../services/matrixService';

export default class Grid {
  constructor(tag = 'div', className = 'grid-container') {
    this.grid = {
      tag,
      className,
      el: null,
      game: [],
      items: [],
    };
    this.points = {
      scheme: [],
      cur: [],
      figure: [],
    };
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
      cell.classList.toggle('black');

      this.checkCell(cell);
    }
  }

  cleanGrid() {
    if (this.grid.el) {
      this.grid.el.remove();
      this.grid.el = null;
      this.grid.items = [];
      this.grid.game = [];
    }
  }

  createGrid(game) {
    this.points.scheme = [];
    this.points.cur = [];
    this.grid.game = [];

    this.grid.game = calculateMatrix(game.figure);

    const gridWidth = this.grid.game[0].length;

    if (this.grid.el) {
      // eslint-disable-next-line prefer-destructuring
      let length = this.grid.items.length;

      while (length > 0) {
        length -= 1;
        this.grid.items[length].remove();
      }
    } else {
      this.grid.el = document.createElement('div');
      this.grid.el.classList.add('grid-container');
    }

    this.grid.el.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;

    this.grid.game.forEach((line, idx) => {
      line.forEach((cell, i) => {
        const el = document.createElement('div');
        el.classList.add('cell');
        if (cell.name === 'cell') {
          el.setAttribute('value', cell.value);
          el.setAttribute('name', cell.name);
          el.setAttribute('id', `${idx}-${i}`);
          if (cell.value) {
            this.points.scheme.push(`${idx}-${i}`);
          }
        }

        if (cell.name === 'hint') {
          el.innerText = cell.value;
          el.classList.add('hint');
          if (!cell.value) {
            el.classList.add('spirit');
          }

          if (cell.border?.includes('right')) {
            el.style.borderRight = '4px solid #000';
          }
          if (cell.border?.includes('bottom')) {
            el.style.borderBottom = '4px solid #000';
          }
        }
        this.grid.items.push(el);
        this.grid.el.appendChild(el);
      });
    });

    this.grid.el.addEventListener('click', (event) => this.selectCell(event));
  }
}
