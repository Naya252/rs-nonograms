import { BaseClass } from '../../../shared/helpers';

export default class TimerUI extends BaseClass {
  constructor(tag = 'div', className = 'timer') {
    super();

    this.tag = tag;
    this.className = className;
  }

  create() {
    if (!this.el) {
      super.create();
    }
  }
}
