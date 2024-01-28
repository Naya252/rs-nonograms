import ModalUI from './ui/modal-ui';

export default class Modal extends ModalUI {
  constructor(title, text) {
    super();

    this.title = title;
    this.text = text;
  }

  close() {
    this.backdrop.classList.remove('show');
    this.el.classList.remove('show');
  }

  open(title, text) {
    this.changeTitle(title);
    this.changeText(text);

    this.backdrop.classList.add('show');
    this.el.classList.add('show');
  }

  changeTitle(title) {
    this.title.innerText = title;
  }

  changeText(text) {
    this.p.innerText = text;
  }
}
