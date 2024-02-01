import { createElement } from '../shared/helpers';

export default class Body {
  constructor(tag = 'body') {
    this.tag = tag;
    this.el = null;
  }

  getEl() {
    this.el = document.body;
  }

  addDataTag() {
    this.el.setAttribute('data-tag', 'body');
  }

  changeDataTheme(theme) {
    this.el.setAttribute('data-bs-theme', theme);
  }

  initBody(theme = 'light') {
    this.getEl();
    this.addDataTag();
    this.changeDataTheme(theme);

    const bg = createElement('div', 'game-bg');
    this.el.append(bg);
    const bg2 = createElement('div', 'game-bg2');
    this.el.append(bg2);
  }
}
