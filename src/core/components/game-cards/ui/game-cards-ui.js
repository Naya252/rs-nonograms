import { BaseClass } from '../../../shared/helpers';
import Btn from '../../base/btn';

export default class Cards extends BaseClass {
  constructor(tag = 'div', className = 'cards') {
    super();

    this.tag = tag;
    this.className = className;

    this.items = [];
  }

  createCard(el) {
    const radioBtn = new Btn(el.name, 'scheme', 'secondary');
    const btn = radioBtn.init();
    this.items.push(btn);
    this.el.append(btn);
  }
}
