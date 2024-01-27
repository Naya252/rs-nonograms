import { BaseClass } from '../../../shared/helpers';

export default class CollapseUI extends BaseClass {
  constructor(tag = 'div', className = 'collapse navbar-collapse') {
    super();

    this.tag = tag;
    this.className = className;
  }

  create() {
    super.create();

    this.el.setAttribute('id', 'bdNavbar');
    this.el.setAttribute('data-bs-theme', 'dark');
  }
}
