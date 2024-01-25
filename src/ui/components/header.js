import createElement from '../../shared/helpers';
import Settings from './content/settings';

export default class Header extends Settings {
  constructor(tag = 'header') {
    super();
    this.header = {
      tag,
      el: null,
      className: 'navbar navbar-expand-md bd-navbar bg-primary',
    };
    this.burger = null;
    this.collapse = null;
  }

  createBurgerBtn() {
    this.burger = createElement('button', 'navbar-toggler');
    this.burger.setAttribute('type', 'button');
    this.burger.setAttribute('data-bs-toggle', 'collapse');
    this.burger.setAttribute('data-bs-target', '#bdNavbar');
    this.burger.setAttribute('aria-controls', 'bdNavbar');
    this.burger.setAttribute('aria-expanded', 'false');
    this.burger.setAttribute('aria-label', 'change nav');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute(
      'd',
      'M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z',
    );

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('width', '32');
    icon.setAttribute('height', '32');
    icon.setAttribute('fill', 'currentColor');
    icon.setAttribute('viewBox', '0 0 16 16');
    icon.setAttribute('class', 'bi');

    icon.append(path);
    this.burger.append(icon);
  }

  createCollapse() {
    this.collapse = createElement('div', 'collapse navbar-collapse');
    this.collapse.setAttribute('id', 'bdNavbar');
    this.collapse.setAttribute('data-bs-theme', 'dark');

    this.createSettings();

    this.collapse.append(this.theme.el);
    this.collapse.append(this.volume.el);
  }

  createChild() {
    const nav = createElement('nav', 'container-xxl flex-wrap flex-md-nowrap', this.header.el);
    const title = createElement('h1', 'navbar-brand');
    title.setAttribute('data-bs-theme', 'dark');

    title.innerText = 'Nonograms';
    nav.append(title);
    nav.append(this.burger);
    nav.append(this.collapse);
  }

  initNav() {
    this.header.el = createElement(this.header.tag, this.header.className);
    this.createBurgerBtn();
    this.createCollapse();
    this.createChild();
  }
}
