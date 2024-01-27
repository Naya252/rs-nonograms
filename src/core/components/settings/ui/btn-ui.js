import { BaseClass } from '../../../shared/helpers';
import IconUI from './icon-ui';

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
      this.icon.classList.remove(this.trueIcon);
      this.icon.classList.add(this.falseIcon);
    } else {
      this.icon.classList.add(this.trueIcon);
      this.icon.classList.remove(this.falseIcon);
    }
  }

  create() {
    super.create();

    const icn = new IconUI();
    this.icon = icn.create();
    this.el.append(this.icon);
  }
}
