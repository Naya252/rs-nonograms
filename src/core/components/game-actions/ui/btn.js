import { BaseClass } from '../../../shared/helpers';

export default class Button extends BaseClass {
  constructor(title, className) {
    super();

    this.tag = 'button';
    this.className = className;
    this.title = title;
  }

  create() {
    super.create();
    this.el.innerText = this.title.toUpperCase();
  }
}
