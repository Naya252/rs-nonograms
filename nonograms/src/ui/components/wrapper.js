import createElement from '../../shared/helpers';
import Radio from './radio';
import templates from '../../shared/templates';

class Wrapper {
  constructor(tag = 'main') {
    this.tag = tag;
    this.el = null;
    this.children = { levels: { el: null, items: [] }, cards: { el: null, items: [] } };
    this.className = 'container-xxl my-md-4 bd-layout';
    this.levels = [{ name: 'Low' }, { name: 'Middle' }, { name: 'Hight' }, { name: 'Random' }];
    this.cards = null;
    this.level = null;
    this.card = null;
  }

  getEl() {
    this.el = createElement(this.tag, this.className);
  }

  createLevels() {
    this.children.levels.el = createElement('div', 'levels');

    this.levels.forEach((item) => {
      const radioBtn = new Radio(item.name, 'level');
      const btn = radioBtn.init();
      btn.label.classList.add('btn-lg');
      this.children.levels.items.push(btn);

      this.children.levels.el.append(btn.input);
      this.children.levels.el.append(btn.label);

      this.el.append(this.children.levels.el);
    });

    this.children.levels.el.addEventListener('click', (event) => {
      const category = event.target.closest('.btn-check');
      if (category) {
        if (!this.level || this.level !== event.target.closest('.btn-check').getAttribute('id').toLowerCase()) {
          this.level = event.target.closest('.btn-check').getAttribute('id').toLowerCase();
          this.createCards();
        }
      }
    });
  }

  createCards() {
    const cards = templates.filter((el) => el.level === this.level);
    if (cards.length) {
      this.cards = cards;

      this.children.cards.el = createElement('div', 'cards');
      this.el.append(this.children.cards.el);

      cards.forEach((el) => {
        const radioBtn = new Radio(el.name, 'card', 'secondary');
        const btn = radioBtn.init();
        this.children.cards.items.push(btn);

        this.children.cards.el.append(btn.input);
        this.children.cards.el.append(btn.label);

        this.el.append(this.children.cards.el);
      });

      this.children.cards.el.addEventListener('click', (event) => {
        const card = event.target.closest('.btn-check');
        if (card) {
          if (!this.card || this.card !== event.target.closest('.btn-check').getAttribute('id')) {
            this.card = event.target.closest('.btn-check').getAttribute('id');
            this.createGrig();
          }
        }
      });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (this.children.cards.el) {
        this.cards = null;
        this.children.cards.items = [];
        this.children.cards.el.remove();
      }
    }
  }

  createGrig() {
    const game = this.cards.filter((el) => el.name === this.card);
    const gridSize = game[0].figure.length;
    console.log(gridSize);
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    game[0].figure.forEach((line, i) => {
      line.forEach((cell, idx) => {
        const el = document.createElement('div');
        el.classList.add('cell');
        if (cell.name === 'cell') {
          el.addEventListener('click', () => el.classList.toggle('black'));
        }
        if (cell.name === 'hint') {
          el.innerText = cell.value;
          if (cell.border?.includes('right')) {
            el.style.borderRight = '4px solid #000';
          }
          if (cell.border?.includes('bottom')) {
            el.style.borderBottom = '4px solid #000';
          }
        }
        gridContainer.appendChild(el);
      });
    });

    this.el.append(gridContainer);
  }

  changeLevel(val) {
    this.level = val;
  }

  init() {
    this.getEl();
    this.createLevels();
    return this.el;
  }
}

const wrapper = new Wrapper();
export default wrapper;
