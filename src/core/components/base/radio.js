import { createElement } from '../../shared/helpers';

export default class Radio {
  constructor(radioId, name, color = 'primary', input = 'input', label = 'label') {
    this.name = name;
    this.input = {
      tag: input,
      className: 'btn-check',
      el: null,
      id: radioId,
    };
    this.label = {
      tag: label,
      className: `btn btn-outline-${color}`,
      el: null,
    };
  }

  getEl() {
    this.input.el = createElement(this.input.tag, this.input.className);
    this.input.el.setAttribute('type', 'radio');
    this.input.el.setAttribute('name', this.name);
    this.input.el.setAttribute('autocomplete', 'off');
    this.input.el.setAttribute('id', this.input.id);

    this.label.el = createElement(this.label.tag, this.label.className);
    this.label.el.setAttribute('for', this.input.id);
    this.label.el.innerText = this.input.id;

    return { input: this.input.el, label: this.label.el };
  }

  init() {
    const item = this.getEl();
    return item;
  }
}
