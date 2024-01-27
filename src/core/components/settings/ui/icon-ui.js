import createElement from '../../../shared/helpers';

export default class IconUI {
  constructor() {
    this.iconTag = 'i';
    this.iconClass = 'bi';
  }

  createIcon() {
    const icon = createElement(this.iconTag, this.iconClass);
    return icon;
  }
}
