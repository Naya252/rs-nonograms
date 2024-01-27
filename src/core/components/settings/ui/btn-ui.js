import { createElement } from '../../../shared/helpers';
import IconUI from './icon-ui';

export default class BtnUI {
  constructor({ btnClass, trueIcon, falseIcon }) {
    this.tag = 'button';
    this.className = btnClass;
    this.el = null;
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

  createSettingBtn() {
    this.el = createElement(this.tag, this.className);
    const icn = new IconUI();
    this.icon = icn.createIcon();
    this.el.append(this.icon);
  }
}
