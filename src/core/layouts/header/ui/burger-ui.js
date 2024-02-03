import { BaseClass, createElement } from '../../../shared/helpers';

function createIcon(icn) {
  const icon = createElement('i', icn ?? 'bi bi-gear');
  icon.setAttribute('width', '32');
  icon.setAttribute('height', '32');

  return icon;
}

export default class BurgerUI extends BaseClass {
  constructor(target, tag = 'button', className = 'navbar-toggler') {
    super();

    this.tag = tag;
    this.className = className;
    this.target = target;
  }

  create(icn) {
    super.create();

    this.el.setAttribute('type', 'button btn-link');
    this.el.setAttribute('data-bs-toggle', 'collapse');
    this.el.setAttribute('data-bs-target', `#${this.target}`);
    this.el.setAttribute('aria-controls', this.target);
    this.el.setAttribute('aria-expanded', 'false');
    this.el.setAttribute('aria-label', 'change nav');

    const icon = createIcon(icn);
    this.el.append(icon);
  }
}
