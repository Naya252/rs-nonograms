import { BaseClass, createElement } from '../../../shared/helpers';

export default class Button extends BaseClass {
  constructor(title, className, icon) {
    super();

    this.tag = 'button';
    this.className = className;
    this.title = title;
    this.icon = icon;
  }

  create() {
    super.create();

    const text = createElement('span', '');
    text.innerText = this.title[0].toUpperCase() + this.title.slice(1);
    this.el.innerHTML = this.icon;
    this.el.append(text);
  }
}
