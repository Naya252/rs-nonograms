import { BaseClass, createElement } from '../../../shared/helpers';
import { BASE_URL } from '../../../shared/constants';

export default class NavUI extends BaseClass {
  constructor(tag = 'nav', className = 'container-xxl flex-wrap flex-md-nowrap') {
    super();

    this.tag = tag;
    this.className = className;
  }

  create() {
    super.create();

    const logo = createElement('img', 'logo');
    logo.setAttribute('src', `${BASE_URL}logo.svg`);
    logo.setAttribute('alt', `Logo`);

    const title = createElement('h1', 'navbar-brand');
    title.setAttribute('data-bs-theme', 'dark');
    title.innerText = 'Nonograms';

    this.el.append(logo);
    this.el.append(title);
  }
}
