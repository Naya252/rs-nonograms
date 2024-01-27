import Grid from '../grid/grid';
import Button from './ui/btn';

export default class Actions extends Grid {
  constructor() {
    super();

    this.save = new Button('save');
    this.solution = new Button('solution');
    this.reset = new Button('reset');
  }

  activateButtons() {
    this.save.el.removeAttribute('disabled');
    this.solution.el.removeAttribute('disabled');
    this.reset.el.removeAttribute('disabled');
  }

  resetGame() {
    this.cleanTimer();
    this.createTimer();

    this.cleanCells();
    this.addDisabled();
  }

  showSolution() {
    this.cleanTimer();
    this.createTimer();

    this.fillScheme();
    this.addDisabled();
    this.activeReset();
  }

  addDisabled() {
    this.save.el.setAttribute('disabled', true);
    this.solution.el.setAttribute('disabled', true);
    this.reset.el.setAttribute('disabled', true);
  }

  activeReset() {
    this.reset.el.removeAttribute('disabled');
  }

  removeActions() {
    if (this.save.el) {
      this.save.el.remove();
    }
    if (this.solution.el) {
      this.solution.el.remove();
    }
    if (this.reset.el) {
      this.reset.el.remove();
    }
  }

  createActions() {
    this.removeActions();

    this.save.create();

    this.solution.create();
    this.solution.el.addEventListener('click', () => this.showSolution());

    this.reset.create();
    this.reset.el.addEventListener('click', () => this.resetGame());

    this.addDisabled();
  }
}
