import { BaseClass, createElement } from '../../../shared/helpers';

export default class ModalUI extends BaseClass {
  constructor(tag = 'div', className = 'modal fade') {
    super();

    this.tag = tag;
    this.className = className;
    this.title = null;
    this.p = null;
    this.backdrop = null;
  }

  create() {
    super.create();

    this.el.setAttribute('data-bs-keyboard', 'false');
    this.el.setAttribute('tabindex', '-1');
    this.el.setAttribute('aria-modal', 'true');
    this.el.setAttribute('role', 'dialog');
    this.el.style.display = 'block';

    const dialog = createElement('div', 'modal-dialog modal-dialog-centered');
    const content = createElement('div', 'modal-content');

    const header = createElement('div', 'modal-header');
    const body = createElement('div', 'modal-body');
    const footer = createElement('div', 'modal-footer');

    this.title = createElement('h1', 'modal-title fs-5');
    const headerBtn = createElement('button', 'btn-close cls');
    this.el.setAttribute('data-bs-dismiss', 'modal');
    this.el.setAttribute('aria-label', 'close');
    header.append(this.title);
    header.append(headerBtn);

    this.p = createElement('p', '');
    body.append(this.p);

    const footerBtn = createElement('button', 'btn btn-secondary cls');
    footerBtn.innerText = 'OK';
    footer.append(footerBtn);

    content.append(header);
    content.append(body);
    content.append(footer);
    dialog.append(content);
    this.el.append(dialog);

    this.backdrop = createElement('button', 'modal-backdrop fade');
  }
}
