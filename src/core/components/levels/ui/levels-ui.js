import { BaseClass, createElement } from '../../../shared/helpers';
import Btn from '../../base/btn';

export default class LevelBtn extends BaseClass {
  constructor(tag = 'div', className = 'levels mt-4') {
    super();

    this.tag = tag;
    this.className = className;

    this.items = [];
  }

  createLevel(el) {
    const radioBtn = new Btn(el.name, 'level');
    const btn = radioBtn.init();
    btn.classList.add('btn-lg');
    this.items.push(btn);
    this.el.append(btn);

    if (el.icon) {
      const icon = createElement('i', el.icon);
      btn.append(icon);
    }
  }
}
