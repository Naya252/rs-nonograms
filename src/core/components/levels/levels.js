import LevelBtns from './ui/levels-ui';

export default class Levels {
  constructor() {
    this.curLevel = {
      el: null,
      value: null,
    };

    this.levels = new LevelBtns();
  }

  selectCurLevel(event) {
    let isSelect = false;
    if (event) {
      const category = event.target.closest('.btn-check');

      if (category) {
        if (
          !this.curLevel.value ||
          this.curLevel.value !== event.target.closest('.btn-check').getAttribute('id').toLowerCase()
        ) {
          this.changeLevel(event.target.closest('.btn-check').getAttribute('id').toLowerCase());
          isSelect = true;
        }
      }
    }
    return isSelect;
  }

  createLevels() {
    this.levels.names = [{ name: 'easy' }, { name: 'medium' }, { name: 'hard' }, { name: 'random' }];
    this.levels.create();

    this.levels.names.forEach((item) => {
      this.levels.createLevel(item);
    });
  }

  changeLevel(val) {
    this.curLevel.value = val;
  }
}
