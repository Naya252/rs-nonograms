import createElement from '../../../shared/helpers';
import Timer from './timer';

export default class Actions extends Timer {
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

  createActions() {
    this.save.el = createElement(this.save.tag, this.save.className);
    this.save.el.innerText = this.save.className.toUpperCase();
    this.save.el.setAttribute('disabled', true);

    this.solution.el = createElement(this.solution.tag, this.solution.className);
    this.solution.el.innerText = this.solution.className.toUpperCase();
    this.solution.el.setAttribute('disabled', true);

    this.reset.el = createElement(this.reset.tag, this.reset.className);
    this.reset.el.innerText = this.reset.className.toUpperCase();
    this.reset.el.setAttribute('disabled', true);
  }
}
