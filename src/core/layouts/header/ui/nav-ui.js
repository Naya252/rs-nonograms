import { BaseClass, createElement } from '../../../shared/helpers';
import { BASE_URL } from '../../../shared/constants';

export default class NavUI extends BaseClass {
  constructor(tag = 'nav', className = 'container-fluid mb-2 flex-wrap flex-md-nowrap') {
    super();

    this.tag = tag;
    this.className = className;
  }

  create() {
    super.create();

    const logoWrap = createElement('div', 'logo-wrap');
    const logo = createElement('img', 'logo');
    logo.setAttribute('src', `${BASE_URL}logo.svg`);
    logo.setAttribute('alt', `Logo`);

    const title = createElement('h1', 'navbar-brand');
    title.setAttribute('data-bs-theme', 'dark');
    title.innerText = 'Nonograms';

    logoWrap.append(logo);
    logoWrap.append(title);

    const info = createElement('p', 'game-info mb-0 mr-0');
    logoWrap.append(info);

    const timeWrap = createElement('div', 'time-wrap');

    this.el.append(logoWrap);
    this.el.append(timeWrap);
  }
}
