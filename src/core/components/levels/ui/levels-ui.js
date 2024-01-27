import { BaseClass } from '../../../shared/helpers';
import Radio from '../../base/radio';

export default class LevelBtn extends BaseClass {
  constructor(tag = 'div', className = 'levels') {
    super();

    this.tag = tag;
    this.className = className;

    this.items = [];
  }

  createLevel(el) {
    const radioBtn = new Radio(el.name, 'level');
    const btn = radioBtn.init();
    btn.label.classList.add('btn-lg');
    this.items.push(btn);

    this.el.append(btn.input);
    this.el.append(btn.label);
  }
}
