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

  changeTheme() {
    const val = super.changeTheme();
    if (val) {
      this.changeDataTheme('dark');
    } else {
      this.changeDataTheme('light');
    }
  }

  changeDataTheme(theme) {
    // if (theme === 'dark') {
    //   this.theme.isDark = true;
    // } else {
    //   this.theme.isDark = false;
    // }
    this.el.setAttribute('data-bs-theme', theme);
  }

  initBody(theme = 'light') {
    this.getEl();
    this.addDataTag();
    this.changeDataTheme(theme);
  }
}
