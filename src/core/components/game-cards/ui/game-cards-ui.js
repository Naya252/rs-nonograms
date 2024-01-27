import { createElement } from '../../../shared/helpers';
import Radio from '../../base/radio';

export default class Cards {
  constructor(tag = 'div', className = 'cards') {
    this.tag = tag;
    this.className = className;
    this.el = null;
    this.items = [];
  }

  createCard(el) {
    const radioBtn = new Radio(el.name, 'card', 'secondary');
    const btn = radioBtn.init();
    this.items.push(btn);

    this.el.append(btn.input);
    this.el.append(btn.label);
  }

  createCards() {
    this.el = createElement(this.tag, this.className);
  }
}
