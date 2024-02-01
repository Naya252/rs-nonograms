import { BaseClass, createElement } from '../../../shared/helpers';

function createIcon() {
  const icon = createElement('i', 'bi bi-list');
  icon.setAttribute('width', '32');
  icon.setAttribute('height', '32');

  return icon;
}

export default class BurgerUI extends BaseClass {
  constructor(tag = 'button', className = 'navbar-toggler') {
    super();

    this.tag = tag;
    this.className = className;
  }

  create() {
    super.create();

    this.el.setAttribute('type', 'button btn-link');
    this.el.setAttribute('data-bs-toggle', 'collapse');
    this.el.setAttribute('data-bs-target', '#bdNavbar');
    this.el.setAttribute('aria-controls', 'bdNavbar');
    this.el.setAttribute('aria-expanded', 'false');
    this.el.setAttribute('aria-label', 'change nav');

    const icon = createIcon();
    this.el.append(icon);
  }
}
