import { BaseClass } from '../../../shared/helpers';
import Radio from '../../base/radio';

export default class Cards extends BaseClass {
  constructor(tag = 'div', className = 'cards') {
    super();

    this.tag = tag;
    this.className = className;

    this.items = [];
  }

  createCard(el) {
    const radioBtn = new Radio(el.name, 'card', 'secondary');
    const btn = radioBtn.init();
    this.items.push(btn);

    this.el.append(btn.input);
    this.el.append(btn.label);
  }
}
