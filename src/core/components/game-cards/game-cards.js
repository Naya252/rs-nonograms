import Cards from './ui/game-cards-ui';

export default class GameCards {
  constructor() {
    this.curCard = {
      el: null,
      value: null,
    };

    this.cards = new Cards();
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
      this.cards.create();

      this.cards.data.forEach((el) => {
        this.cards.createCard(el);
      });
    }
  }

  changeCard(val) {
    this.curCard.value = val;
  }
}
