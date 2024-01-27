import { BaseClass } from '../../shared/helpers';
import Settings from '../../components/settings/settings';

import BurgerUI from './ui/burger-ui';
import CollapseUI from './ui/collapse-ui';
import NavUI from './ui/nav-ui';

export default class Header extends Settings {
  constructor() {
    super();

    this.header = new BaseClass('header', 'navbar navbar-expand-md bd-navbar bg-primary');
    this.burger = new BurgerUI();
    this.collapse = new CollapseUI();
    this.nav = new NavUI();
  }

  initNav() {
    this.header.create();
    this.nav.create();
    this.burger.create();

    this.collapse.create();
    this.createSettings();

    this.collapse.el.append(this.theme.el);
    this.collapse.el.append(this.volume.el);
    this.nav.el.append(this.burger.el);
    this.nav.el.append(this.collapse.el);
    this.header.el.append(this.nav.el);
  }
}
