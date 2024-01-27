import { createElement } from '../../../shared/helpers';

export default class CollapseUI {
  constructor(tag = 'div', className = 'collapse navbar-collapse') {
    this.tag = tag;
    this.el = null;
    this.className = className;
  }

  create() {
    this.el = createElement(this.tag, this.className);

    this.el.setAttribute('id', 'bdNavbar');
    this.el.setAttribute('data-bs-theme', 'dark');
  }
}
