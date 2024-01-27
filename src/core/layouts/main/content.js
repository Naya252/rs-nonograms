import { BaseClass } from '../../shared/helpers';

export default class Main {
  constructor() {
    this.main = new BaseClass('main', 'container-xxl my-md-4 bd-layout center');
  }

  init() {
    this.main.create();
  }
}
