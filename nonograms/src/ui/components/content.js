import createElement from '../../shared/helpers';
import templates from '../../shared/templates';
import Levels from './content/levels';

class Wrapper extends Levels {
  constructor(tag = 'main') {
    super();
    this.tag = tag;
    this.el = null;
    this.className = 'container-xxl my-md-4 bd-layout center';
  }

  getEl() {
    this.el = createElement(this.tag, this.className);
  }

  selectCurLevel(event) {
    const isSelect = super.selectCurLevel(event);
    if (isSelect) {
      this.cleanCards();
      const cards = templates.filter((el) => el.level === this.curLevel.value);
      this.createCards(cards);
      this.el.append(this.cards.el);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (this.grid.el) {
        this.cleanGrid();
      }
    }
  }

  selectCurCard(event) {
    const isSelect = super.selectCurCard(event);
    if (isSelect) {
      const game = this.cards.data.filter((el) => el.name === this.curCard.value);
      if (game.length) {
        this.cleanGrid();
        this.createGrid(game[0]);
        this.el.append(this.grid.el);

        this.cleanTimer();
        this.createTimer();
        this.el.append(this.timer.el);
      }
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
