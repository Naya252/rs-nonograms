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
    let category;

    if (event.target) {
      category = event.target.closest('.level');
    } else {
      category = event;
    }

    if (category) {
      if (!this.curLevel.value || this.curLevel.value !== category.getAttribute('id').toLowerCase()) {
        this.changeLevel(category.getAttribute('id').toLowerCase());

        this.levels.items.forEach((el) => {
          if (el.classList.contains('btn-primary')) {
            el.classList.remove('btn-primary');
            el.classList.add('btn-outline-primary');
          }
        });
        category.classList.add('btn-primary');
        category.classList.remove('btn-outline-primary');

        isSelect = true;
      }
    }

    return isSelect;
  }

  createLevels() {
    this.levels.names = [{ name: 'easy' }, { name: 'medium' }, { name: 'hard' }];
    this.levels.create();

    this.levels.names.forEach((item) => {
      this.levels.createLevel(item);
    });
  }

  changeLevel(val) {
    this.curLevel.value = val;
  }
}
