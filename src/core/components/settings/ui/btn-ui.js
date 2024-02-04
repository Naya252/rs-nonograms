import { BaseClass, createElement } from '../../../shared/helpers';

export default class BtnUI extends BaseClass {
  constructor({ btnClass, trueIcon, falseIcon }) {
    super();

    this.tag = 'button';
    this.className = btnClass;

    this.icon = null;
    this.trueIcon = trueIcon;
    this.falseIcon = falseIcon;
  }

  changeIcon(val) {
    if (val) {
      this.icon.innerHTML = this.falseIcon;
    } else {
      this.icon.innerHTML = this.trueIcon;
    }
  }

  create() {
    super.create();

    this.icon = createElement('div', 'icon');
    this.el.append(this.icon);
  }
}
