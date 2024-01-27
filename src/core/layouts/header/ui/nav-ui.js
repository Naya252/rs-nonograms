import createElement from '../../../shared/helpers';

export default class NavUI {
  constructor(tag = 'nav', className = 'container-xxl flex-wrap flex-md-nowrap') {
    this.tag = tag;
    this.el = null;
    this.className = className;
  }

  create() {
    this.el = createElement(this.tag, this.className);
    const title = createElement('h1', 'navbar-brand');
    title.setAttribute('data-bs-theme', 'dark');
    title.innerText = 'Nonograms';

    this.el.append(title);
  }
}
