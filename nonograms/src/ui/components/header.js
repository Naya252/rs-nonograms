import createElement from '../../shared/helpers';

class Header {
  constructor(tag = 'header') {
    this.tag = tag;
    this.el = null;
    this.className = 'navbar navbar-expand-md bd-navbar bg-primary';
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

    const ul = createElement('ul', 'navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0');
    const li = createElement('li', 'nav-item col-6 col-md-auto');
    const mute = createElement('i', 'bi bi-volume-mute');
    const volume = createElement('i', 'bi bi-volume-up');
    const star = createElement('i', 'bi bi-bookmark-star');
    const sun = createElement('i', 'bi bi-brightness-high');
    const moon = createElement('i', 'bi bi-moon');
    li.append(star);
    li.append(mute);
    li.append(volume);
    li.append(sun);
    li.append(moon);
    ul.append(li);

    this.collapse.append(ul);
  }

  createChild() {
    const nav = createElement('nav', 'container-xxl flex-wrap flex-md-nowrap', this.el);
    const title = createElement('h1', 'navbar-brand');
    title.innerText = 'Nanograms';
    nav.append(title);
    nav.append(this.burger);
    nav.append(this.collapse);
  }

  initNav() {
    this.el = createElement(this.tag, this.className);
    this.createBurgerBtn();
    this.createCollapse();
    this.createChild();
  }
}

const header = new Header();
export default header;
