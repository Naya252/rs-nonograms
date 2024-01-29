import Button from './ui/btn';

export default class Actions {
  constructor() {
    this.save = new Button('save', 'btn  btn-outline-success');
    this.solution = new Button('solution', 'btn  btn-outline-info');
    this.reset = new Button('reset', 'btn  btn-outline-info');
    this.random = new Button('random', 'btn  btn-outline-secondary mt-3');
    this.saved = new Button('saved', 'btn  btn-outline-secondary');
  }

  activateButtons() {
    this.save.el.removeAttribute('disabled');
    this.solution.el.removeAttribute('disabled');
    this.reset.el.removeAttribute('disabled');
    this.random.el.removeAttribute('disabled');
    this.saved.el.removeAttribute('disabled');
  }

  resetGame() {
    this.addDisabled();
  }

  showSolution() {
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
    if (this.saved.el) {
      this.saved.el.remove();
    }
    if (this.random.el) {
      this.random.el.remove();
    }
  }

  createActions() {
    this.removeActions();
    this.save.create();
    this.solution.create();
    this.reset.create();
    this.random.create();
    this.saved.create();
    this.addDisabled();
  }
}
