/* eslint-disable no-param-reassign */
import { getCardsData } from '../repository/repository';
import { getClickSound } from './sound-service';

export function createCards(crd, data) {
  const cards = getCardsData(data.lvl.curLevel.value);

  data.crd.createCards(cards);

  data.crd.cards.el.addEventListener('click', (event) => {
    if (data.tmr.timer.isStart) {
      data.changeGameEvt = event;
      data.openModal('change');
    }
    if (!data.tmr.timer.isStart) {
      data.selectCurCard(event);
    }
  });

  if (data.pageSize > 767) {
    data.controls.append(data.crd.cards.el);
  } else {
    data.top.nav.el.childNodes[3].childNodes[0].append(data.crd.cards.el);
  }

  if (crd) {
    const secificCard = data.crd.cards.items.filter((el) => el.value === crd);
    data.selectSpecificCard(secificCard[0]);
  } else {
    data.selectSpecificCard(data.crd.cards.el.childNodes[0]);
  }
}

export function selectSpecificCard(el, data) {
  data.crd.selectCurCard(el);
  data.createGrid();
}

export function selectCurCard(event, data) {
  const isSelect = data.crd.selectCurCard(event);

  if (isSelect) {
    getClickSound(data.settings.volume.isSilent, data.isLoad);
    data.createGrid();
  }
}
