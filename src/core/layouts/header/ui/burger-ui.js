import { createElement } from '../../../shared/helpers';

function createPath() {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill-rule', 'evenodd');
  path.setAttribute(
    'd',
    'M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z',
  );

  return path;
}

function createIcon() {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('width', '32');
  icon.setAttribute('height', '32');
  icon.setAttribute('fill', 'currentColor');
  icon.setAttribute('viewBox', '0 0 16 16');
  icon.setAttribute('class', 'bi');

  return icon;
}

export default class BurgerUI {
  constructor(tag = 'button', className = 'navbar-toggler') {
    this.tag = tag;
    this.el = null;
    this.className = className;
  }

  create() {
    this.el = createElement(this.tag, this.className);

    this.el.setAttribute('type', 'button');
    this.el.setAttribute('data-bs-toggle', 'collapse');
    this.el.setAttribute('data-bs-target', '#bdNavbar');
    this.el.setAttribute('aria-controls', 'bdNavbar');
    this.el.setAttribute('aria-expanded', 'false');
    this.el.setAttribute('aria-label', 'change nav');

    const path = createPath();
    const icon = createIcon();

    icon.append(path);
    this.el.append(icon);
  }
}
