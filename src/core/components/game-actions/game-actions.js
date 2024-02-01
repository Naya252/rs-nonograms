import Button from './ui/btn';

export default class Actions {
  constructor() {
    this.save = new Button('save', 'btn btn-action btn-outline-success', 'bi bi-floppy');
    this.solution = new Button('solution', 'btn btn-action btn-outline-info', 'bi bi-image');
    this.reset = new Button('reset', 'btn btn-action btn-outline-info', 'bi bi-arrow-counterclockwise');
    this.random = new Button('random', 'btn btn-action btn-primary mt-3', 'bi bi-shuffle');
    this.saved = new Button('continue game', 'btn btn-action btn-primary', 'bi bi-crosshair');
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
