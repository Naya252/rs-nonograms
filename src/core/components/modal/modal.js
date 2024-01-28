import ModalUI from './ui/modal-ui';

export default class Modal extends ModalUI {
  constructor(title, text) {
    super();

    this.title = title;
    this.text = text;

    this.win = {
      title: 'Great!',
      text: `You have solved the nonogram in XXX seconds!`,
    };

    this.solution = {
      title: 'Show solution',
      text: `Once the solution is shown, the current game will be over`,
    };

    this.reset = {
      title: 'Reset game',
      text: `Everything you selected in the playing field will be erased`,
    };
  }

  close() {
    this.backdrop.classList.remove('show');
    this.el.classList.remove('show');
  }

  fillModal(type, sec) {
    this.el.setAttribute('data-type', type);

    if (type === 'win') {
      let { text } = this.win;
      text = text.replace('XXX', sec);
      this.changeTitle(this.win.title);
      this.changeText(text);

      if (!this.cancelBtn.classList.contains('invisible')) {
        this.cancelBtn.classList.add('invisible');
      }
    }
    if (type === 'solution') {
      this.changeTitle(this.solution.title);
      this.changeText(this.solution.text);
      if (this.cancelBtn.classList.contains('invisible')) {
        this.cancelBtn.classList.remove('invisible');
      }
    }
    if (type === 'reset') {
      this.changeTitle(this.reset.title);
      this.changeText(this.reset.text);
      if (this.cancelBtn.classList.contains('invisible')) {
        this.cancelBtn.classList.remove('invisible');
      }
    }
  }

  open(type, sec) {
    this.fillModal(type, sec);

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
