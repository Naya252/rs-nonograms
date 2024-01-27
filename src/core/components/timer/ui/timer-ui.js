import createElement from '../../../shared/helpers';

export default class TimerUI {
  constructor(tag = 'div', className = 'timer') {
    this.tag = tag;
    this.className = className;
    this.el = null;
  }

  createUI() {
    if (!this.el) {
      this.el = createElement(this.tag, this.className);
    }
  }
}
