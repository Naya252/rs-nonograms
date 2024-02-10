import { BaseClass } from '../../shared/helpers';

import BurgerUI from './ui/burger-ui';
import CollapseUI from './ui/collapse-ui';
import NavUI from './ui/nav-ui';

export default class Header {
  constructor() {
    this.header = new BaseClass('header', 'navbar navbar-expand-md bd-navbar pb-0 bg-primary sticky-top');
    this.burger = new BurgerUI('nav-collapse');
    this.collapse = new CollapseUI('nav-collapse');
    this.nav = new NavUI();
  }

  initNav() {
    this.header.create();
    this.nav.create();
    this.burger.create();
    this.collapse.create();

    this.nav.el.append(this.burger.el);
    this.nav.el.append(this.collapse.el);
    this.header.el.append(this.nav.el);
  }
}
