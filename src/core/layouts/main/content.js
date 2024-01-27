import templates from '../../game-figures/templates';
import Levels from '../../components/levels/levels';
import Main from './ui/main-ui';

class Wrapper extends Levels {
  constructor() {
    super();

    this.main = new Main();
  }

  selectCurLevel(event) {
    const isSelect = super.selectCurLevel(event);
    if (isSelect) {
      this.cleanCards();
      const cards = templates.filter((el) => el.level === this.curLevel.value);
      this.createCards(cards);
      this.main.el.append(this.cards.el);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (this.grid.el) {
        this.cleanGrid();
        this.removeActions();
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
        this.main.el.append(this.grid.el);

        this.cleanTimer();
        this.createTimer();
        this.main.el.append(this.timer.el);

        this.createActions();
        this.main.el.append(this.save.el);
        this.main.el.append(this.solution.el);
        this.main.el.append(this.reset.el);
      }
    }
  }

  init() {
    this.main.create();
    this.createLevels();

    this.main.el.append(this.levels.el);
    return this.main.el;
  }
}

const content = new Wrapper();
export default content;
