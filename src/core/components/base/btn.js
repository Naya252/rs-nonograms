import { BaseClass } from '../../shared/helpers';

export default class Radio extends BaseClass {
  constructor(id, className, color = 'primary') {
    super();

    this.tag = 'button';
    this.className = `${className} btn btn-outline-${color}`;
    this.el = null;
    this.id = id;
  }

  getEl() {
    super.create();

    this.el.setAttribute('value', this.id);
    this.el.setAttribute('id', this.id);
    this.el.innerText = this.id;

    return this.el;
  }

  init() {
    const item = this.getEl();
    return item;
  }
}
