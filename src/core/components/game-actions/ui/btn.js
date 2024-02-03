import { BaseClass, createElement } from '../../../shared/helpers';

export default class Button extends BaseClass {
  constructor(title, className, iconClass) {
    super();

    this.tag = 'button';
    this.className = className;
    this.title = title;
    this.iconClass = iconClass;
  }

  create() {
    super.create();

    const icon = createElement('i', this.iconClass);
    const text = createElement('span', '');
    text.innerText = this.title[0].toUpperCase() + this.title.slice(1);
    this.el.append(icon);
    this.el.append(text);
  }
}
