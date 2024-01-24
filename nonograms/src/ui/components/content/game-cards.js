import createElement from '../../../shared/helpers';
import Radio from '../radio';
import Actions from './game-actions';

export default class GameCards extends Actions {
  constructor(tag = 'div', className = 'cards') {
    super();
    this.cards = {
      tag,
      className,
      el: null,
      data: null,
      items: [],
    };
    this.curCard = {
      el: null,
      value: null,
      children: [],
    };
  }

  selectCurCard(event) {
    const card = event.target.closest('.btn-check');
    let isSelect = false;
    if (card) {
      if (!this.curCard.value || this.curCard.value !== event.target.closest('.btn-check').getAttribute('id')) {
        this.changeCard(event.target.closest('.btn-check').getAttribute('id'));
        isSelect = true;
      }
    }
    return isSelect;
  }

  cleanCards() {
    if (this.cards.el) {
      this.cards.el.remove();
      this.cards.data = null;
      this.cards.items = [];
      this.cards.el = ``;
    }
  }

  createCards(cards) {
    if (cards.length && this.cards.data !== cards) {
      this.cards.data = cards;
      this.cards.el = createElement(this.cards.tag, this.cards.className);

      this.cards.data.forEach((el) => {
        const radioBtn = new Radio(el.name, 'card', 'secondary');
        const btn = radioBtn.init();
        this.cards.items.push(btn);

        this.cards.el.append(btn.input);
        this.cards.el.append(btn.label);
      });

      this.cards.el.addEventListener('click', (event) => this.selectCurCard(event));
    }
  }

  changeCard(val) {
    this.curCard.value = val;
  }
}
