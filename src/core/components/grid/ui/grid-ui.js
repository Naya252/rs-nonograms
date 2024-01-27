/* eslint-disable prefer-destructuring */
import { BaseClass, createElement } from '../../../shared/helpers';

export default class GridUI extends BaseClass {
  constructor(tag = 'div', className = 'grid-container') {
    super();
    this.tag = tag;
    this.className = className;
    this.items = [];
  }

  create(matrix) {
    if (this.el) {
      let length = this.items.length;

      while (length > 0) {
        length -= 1;
        this.items[length].remove();
      }
    } else {
      super.create();
    }

    const gridWidth = matrix[0].length;
    this.el.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;

    const scheme = [];

    matrix.forEach((line, idx) => {
      line.forEach((cell, i) => {
        const el = createElement('div', 'cell');

        if (cell.name === 'cell') {
          el.setAttribute('name', cell.name);
          el.setAttribute('id', `${idx}-${i}`);
          if (cell.value) {
            scheme.push(`${idx}-${i}`);
          }
        }

        if (cell.name === 'hint') {
          el.innerText = cell.value;
          el.classList.add('hint');
          if (!cell.value) {
            el.classList.add('spirit');
          }
        }

        if (cell.border?.includes('right')) {
          el.style.borderRight = '2px solid #000';
        }
        if (cell.border?.includes('top')) {
          el.style.borderTop = '2px solid #000';
        }

        this.items.push(el);
        this.el.appendChild(el);
      });
    });

    return scheme;
  }
}
