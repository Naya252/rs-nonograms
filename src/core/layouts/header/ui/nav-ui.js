import { BaseClass, createElement } from '../../../shared/helpers';

export default class NavUI extends BaseClass {
  constructor(tag = 'nav', className = 'container-xxl flex-wrap flex-md-nowrap') {
    super();

    this.tag = tag;
    this.className = className;
  }

  create() {
    super.create();

    const title = createElement('h1', 'navbar-brand');
    title.setAttribute('data-bs-theme', 'dark');
    title.innerText = 'Nonograms';

    this.el.append(title);
  }
}
