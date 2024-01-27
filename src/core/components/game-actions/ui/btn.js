import { createElement } from '../../../shared/helpers';

export default class Button {
  constructor(className) {
    this.tag = 'button';
    this.className = className;
    this.el = null;
  }

  createBtn() {
    this.el = createElement(this.tag, this.className);
    this.el.innerText = this.className.toUpperCase();
  }
}
