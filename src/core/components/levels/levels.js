import createElement from '../../shared/helpers';
import Radio from '../base/radio';
import GameCards from '../game-cards/game-cards';

export default class Levels extends GameCards {
  constructor(tag = 'div', className = 'levels') {
    super();
    this.levels = {
      tag,
      className,
      el: null,
      names: [{ name: 'Low' }, { name: 'Middle' }, { name: 'High' }, { name: 'Random' }],
      items: [],
    };
    this.curLevel = {
      el: null,
      value: null,
      children: [],
    };
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
    this.levels.el = createElement(this.levels.tag, this.levels.className);

    this.levels.names.forEach((item) => {
      const radioBtn = new Radio(item.name, 'level');
      const btn = radioBtn.init();
      btn.label.classList.add('btn-lg');
      this.levels.items.push(btn);

      this.levels.el.append(btn.input);
      this.levels.el.append(btn.label);
    });

    this.levels.el.addEventListener('click', (event) => this.selectCurLevel(event));
  }

  changeLevel(val) {
    this.curLevel.value = val;
  }
}
