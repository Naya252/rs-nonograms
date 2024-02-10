import { BaseClass } from '../../../shared/helpers';
import { COG_ICON } from '../../../shared/constants';

export default class BurgerUI extends BaseClass {
  constructor(target, tag = 'button', className = 'navbar-toggler') {
    super();

    this.tag = tag;
    this.className = className;
    this.target = target;
  }

  create() {
    super.create();

    this.el.setAttribute('type', 'button btn-link');
    this.el.setAttribute('data-bs-toggle', 'collapse');
    this.el.setAttribute('data-bs-target', `#${this.target}`);
    this.el.setAttribute('aria-controls', this.target);
    this.el.setAttribute('aria-expanded', 'false');
    this.el.setAttribute('aria-label', 'change nav');

    const icon = COG_ICON;
    this.el.innerHTML = icon;
  }
}
