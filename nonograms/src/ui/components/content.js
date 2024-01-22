import createElement from '../../shared/helpers';
import templates from '../../shared/templates';
import Levels from './content/levels';

class Wrapper extends Levels {
  constructor(tag = 'main') {
    super();
    this.tag = tag;
    this.el = null;
    this.children = { grid: { el: null } };
    this.className = 'container-xxl my-md-4 bd-layout center';
  }

  getEl() {
    this.el = createElement(this.tag, this.className);
  }

  createGrid() {
    const game = this.cards.data.filter((el) => el.name === this.curCard.value);
    const gridWidth = game[0].figure[0].length;

    if (this.children.grid.el) {
      // eslint-disable-next-line prefer-destructuring
      let length = this.children.grid.el.children.length;

      while (length > 0) {
        length -= 1;
        this.children.grid.el.children[length].remove();
      }
    } else {
      const gridContainer = document.createElement('div');
      gridContainer.classList.add('grid-container');

      this.children.grid.el = gridContainer;
    }

    this.children.grid.el.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;

    game[0].figure.forEach((line) => {
      line.forEach((cell) => {
        const el = document.createElement('div');
        el.classList.add('cell');
        if (cell.name === 'cell') {
          el.addEventListener('click', () => el.classList.toggle('black'));
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
        this.children.grid.el.appendChild(el);
      });
    });

    this.el.append(this.children.grid.el);
  }

  selectCurLevel(event) {
    const isSelect = super.selectCurLevel(event);
    if (isSelect) {
      const cards = templates.filter((el) => el.level === this.curLevel.value);
      this.createCards(cards);
      this.el.append(this.cards.el);
    }
  }

  selectCurCard(event) {
    const isSelect = super.selectCurCard(event);
    if (isSelect) {
      this.createGrid();
    }
  }

  init() {
    this.getEl();
    this.createLevels();
    this.el.append(this.levels.el);
    return this.el;
  }
}

const content = new Wrapper();
export default content;
