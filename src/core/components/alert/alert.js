import { BaseClass, createElement } from '../../shared/helpers';
import { INFO_ICON, ALARM_ICON, CIRCLE_ICON } from '../../shared/constants';

export default class Alert extends BaseClass {
  constructor(tag = 'div', className = 'alerts') {
    super();

    this.tag = tag;
    this.className = className;
    this.count = 0;

    this.infoIcon = INFO_ICON;
    this.warnIcon = ALARM_ICON;
    this.sucIcon = CIRCLE_ICON;
    this.savedText = 'Game saved';
    this.notSavedText = 'Game was saved earlier';
    this.tableText = 'Result added in Score table';

    this.notGameText = 'No saved game';
  }

  createAlert(type) {
    const alert = createElement('div', 'alert alert-success d-flex align-items-center alert-dismissible fade');
    let icon = this.infoIcon;
    const text = createElement('div', '');
    if (type === 'score') {
      text.innerText = this.tableText;
      alert.className = 'alert alert-info d-flex align-items-center alert-dismissible fade';
    } else if (type === 'not') {
      text.innerText = this.notSavedText;
      icon = this.warnIcon;
      alert.className = 'alert alert-danger d-flex align-items-center alert-dismissible fade';
    } else if (type === 'noGame') {
      text.innerText = this.notGameText;
      icon = this.warnIcon;
      alert.className = 'alert alert-danger d-flex align-items-center alert-dismissible fade';
    } else {
      text.innerText = this.savedText;
      icon = this.sucIcon;
    }

    alert.innerHTML = icon;
    alert.append(text);
    alert.setAttribute('id', `alert-${this.count}`);
    this.count += 1;

    return alert;
  }

  addAlert(type) {
    const alert = this.createAlert(type);
    this.el.append(alert);
    setTimeout(() => {
      alert.classList.add('show');
      this.removeAlert(alert);
    }, 200);
  }

  // eslint-disable-next-line class-methods-use-this
  removeAlert(alert) {
    setTimeout(() => {
      alert.classList.remove('show');
      setTimeout(() => {
        alert.remove();
      }, 300);
    }, 3000);
  }

  create() {
    super.create();
  }
}
