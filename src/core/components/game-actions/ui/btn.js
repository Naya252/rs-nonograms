import { BaseClass } from '../../../shared/helpers';

export default class Button extends BaseClass {
  constructor(className) {
    super();

    this.tag = 'button';
    this.className = className;
  }

  create() {
    super.create();
    this.el.innerText = this.className.toUpperCase();
  }
}
