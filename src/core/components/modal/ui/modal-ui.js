/* eslint-disable no-restricted-syntax */
import { BaseClass, createElement } from '../../../shared/helpers';

export default class ModalUI extends BaseClass {
  constructor(tag = 'div', className = 'modal fade') {
    super();

    this.tag = tag;
    this.className = className;
    this.title = null;
    this.p = null;
    this.backdrop = null;
    this.cancelBtn = null;
    this.scoreTable = null;
    this.scoreBody = null;
  }

  createScoreTable() {
    this.scoreTable = createElement('table', 'table table-striped');

    const head = createElement('thead', '');
    const tr = createElement('tr', '');
    head.append(tr);
    this.scoreTable.append(head);
    this.createBody();

    const heads = ['#', 'Title', 'Level', 'Time'];
    for (const el of heads) {
      const hdr = createElement('th', '');
      hdr.innerText = el;
      tr.append(hdr);
    }
  }

  createBody() {
    this.scoreBody = createElement('tbody', '');
    this.scoreTable.append(this.scoreBody);
  }

  createRow(data) {
    const tr = createElement('tr', '');

    const th = createElement('th', data.num);
    th.innerText = data.num;

    const td1 = createElement('td', data.card);
    td1.innerText = data.card;

    const td2 = createElement('td', data.lvl);
    td2.innerText = data.lvl;

    const td3 = createElement('td', data.timer);
    td3.innerText = data.timer;

    tr.append(th);
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);

    this.scoreBody.append(tr);
  }

  create() {
    super.create();
    this.createScoreTable();

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

    const submitBtn = createElement('button', 'btn btn-secondary sbmt');
    submitBtn.innerText = 'OK';
    this.cancelBtn = createElement('button', 'btn btn-outline-secondary-cancel cls invisible');
    this.cancelBtn.innerText = 'Cancel';
    footer.append(submitBtn);
    footer.append(this.cancelBtn);

    content.append(header);
    content.append(body);
    content.append(footer);
    dialog.append(content);
    this.el.append(dialog);

    this.backdrop = createElement('div', 'modal-backdrop fade');
  }
}
