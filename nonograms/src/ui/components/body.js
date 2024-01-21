class Body {
  constructor(theme = 'light', tag = 'body') {
    this.theme = theme;
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
    this.theme = theme;
    this.el.setAttribute('data-bs-theme', this.theme);
  }

  initBody(theme = 'light') {
    this.getEl();
    this.addDataTag();
    this.changeDataTheme(theme);
  }
}

const body = new Body();
export default body;
