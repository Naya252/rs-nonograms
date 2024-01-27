import { BaseClass } from '../../../shared/helpers';

export default class IconUI extends BaseClass {
  constructor() {
    super();

    this.tag = 'i';
    this.className = 'bi';
  }

  create() {
    super.create();
    return this.el;
  }
}
