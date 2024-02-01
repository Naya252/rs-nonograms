import { BaseClass, createElement } from '../../shared/helpers';

export default class Radio extends BaseClass {
  constructor(id, className, color = 'primary') {
    super();

    this.tag = 'button';
    this.className = `${className} btn btn-outline-${color}`;
    this.el = null;
    this.id = id;
  }

  getEl(icon) {
    super.create();

    this.el.setAttribute('value', this.id);
    this.el.setAttribute('id', this.id);

    if (icon) {
      const icn = createElement('i', icon);
      this.el.append(icn);
    }

    const text = createElement('span', '');
    text.innerText = this.id;
    this.el.append(text);

    return this.el;
  }

  init(icon) {
    const item = this.getEl(icon);
    return item;
  }
}
