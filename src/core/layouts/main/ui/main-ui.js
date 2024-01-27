import createElement from '../../../shared/helpers';

export default class MainUI {
  constructor(tag = 'main', className = 'container-xxl my-md-4 bd-layout center') {
    this.tag = tag;
    this.el = null;
    this.className = className;
  }

  create() {
    this.el = createElement(this.tag, this.className);
  }
}
