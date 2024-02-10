import { BaseClass } from '../../shared/helpers';

export default class Main {
  constructor() {
    this.main = new BaseClass('main', 'container-xxl my-4 my-md-2 bd-layout center');
  }

  init() {
    this.main.create();
  }
}
