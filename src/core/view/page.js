import Body from './body';
import Header from '../layouts/header/header';
import Main from '../layouts/main/content';

export default class Game {
  constructor() {
    this.body = new Body();
    this.top = new Header();
    this.content = new Main();
  }

  init() {
    this.body.initBody('dark');
    this.top.initNav();
    this.content.init();

    this.body.el.append(this.top.header.el);
    this.body.el.append(this.content.main.el);
  }
}
