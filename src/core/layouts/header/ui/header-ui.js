import { createElement } from '../../../shared/helpers';

export default class HeaderUI {
  constructor(tag = 'header', className = 'navbar navbar-expand-md bd-navbar bg-primary') {
    this.tag = tag;
    this.el = null;
    this.className = className;
  }

  create() {
    this.el = createElement(this.tag, this.className);
  }
}
