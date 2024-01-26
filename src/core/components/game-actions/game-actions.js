import createElement from '../../shared/helpers';
import Grid from '../grid/grid';

export default class Actions extends Grid {
  constructor() {
    super();
    this.save = {
      tag: 'button',
      className: 'save',
      el: null,
    };
    this.solution = {
      tag: 'button',
      className: 'solution',
      el: null,
    };
    this.reset = {
      tag: 'button',
      className: 'reset',
      el: null,
    };
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

    this.save.el = createElement(this.save.tag, this.save.className);
    this.save.el.innerText = this.save.className.toUpperCase();

    this.solution.el = createElement(this.solution.tag, this.solution.className);
    this.solution.el.innerText = this.solution.className.toUpperCase();
    this.solution.el.addEventListener('click', () => this.showSolution());

    this.reset.el = createElement(this.reset.tag, this.reset.className);
    this.reset.el.innerText = this.reset.className.toUpperCase();
    this.reset.el.addEventListener('click', () => this.resetGame());

    this.addDisabled();
  }
}
