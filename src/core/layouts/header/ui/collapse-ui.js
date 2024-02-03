import { BaseClass, createElement } from '../../../shared/helpers';

export default class CollapseUI extends BaseClass {
  constructor(id, tag = 'div', className = 'collapse navbar-collapse') {
    super();

    this.tag = tag;
    this.className = className;
    this.id = id;
  }

  create() {
    super.create();

    this.el.setAttribute('id', this.id);
    this.el.setAttribute('data-bs-theme', 'dark');
    const info = createElement('container', 'd-flex container-fluid top-controls flex-wrap');
    this.el.append(info);
  }
}
