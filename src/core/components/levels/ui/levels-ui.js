import { createElement } from '../../../shared/helpers';
import Radio from '../../base/radio';

export default class LevelBtn {
  constructor(tag = 'div', className = 'levels') {
    this.tag = tag;
    this.className = className;
    this.el = null;
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

  createLevels() {
    this.el = createElement(this.tag, this.className);
  }
}
