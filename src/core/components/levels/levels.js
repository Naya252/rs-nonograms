import GameCards from '../game-cards/game-cards';
import LevelBtns from './ui/levels-ui';

export default class Levels extends GameCards {
  constructor() {
    super();

    this.curLevel = {
      el: null,
      value: null,
    };

    this.levels = new LevelBtns();
  }

  selectCurLevel(event) {
    const category = event.target.closest('.btn-check');
    let isSelect = false;
    if (category) {
      if (
        !this.curLevel.value ||
        this.curLevel.value !== event.target.closest('.btn-check').getAttribute('id').toLowerCase()
      ) {
        this.changeLevel(event.target.closest('.btn-check').getAttribute('id').toLowerCase());
        isSelect = true;
      }
    }
    return isSelect;
  }

  createLevels() {
    this.levels.names = [{ name: 'Low' }, { name: 'Middle' }, { name: 'High' }, { name: 'Random' }];
    this.levels.createLevels();

    this.levels.names.forEach((item) => {
      this.levels.createLevel(item);
    });

    this.levels.el.addEventListener('click', (event) => this.selectCurLevel(event));
  }

  changeLevel(val) {
    this.curLevel.value = val;
  }
}
