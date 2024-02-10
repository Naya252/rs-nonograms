/* eslint-disable no-param-reassign */
import { getClickSound } from './sound-service';
import { getSavedGame } from '../repository/repository';

export function createLevels(data) {
  data.lvl.createLevels();
  data.lvl.levels.el.addEventListener('click', (event) => {
    if (
      data.tmr.timer.isStart &&
      event.target.closest('.level')?.getAttribute('id').toLowerCase() !== data.lvl.curLevel.value
    ) {
      data.changeGameEvt = event;
      data.openModal('change');
    } else {
      data.selectCurLevel(event);
      getClickSound(data.settings.volume.isSilent, data.isLoad);
    }
  });

  if (data.pageSize > 767) {
    data.controls.append(data.lvl.levels.el);
  } else {
    data.top.nav.el.childNodes[3].childNodes[0].append(data.lvl.levels.el);
  }

  data.selectSpecificLevel(data.lvl.levels.el.childNodes[0]);
}

export function getSpecLevel(lvl, name, data) {
  const level = data.lvl.levels.items.filter((el) => el.value === lvl);

  // TODO убрать дубль
  if (level[0].getAttribute('value') === data.lvl.curLevel.value) {
    const secificCard = data.crd.cards.items.filter((el) => el.value === name);
    data.selectSpecificCard(secificCard[0]);
  } else {
    data.selectSpecificLevel(level[0], name);
  }
}

export function selectSpecificLevel(lvl, card, data) {
  const isSelect = data.lvl.selectCurLevel(lvl);
  if (isSelect) {
    data.crd.cleanCards();

    if (card) {
      data.createCards(card);
    } else {
      data.createCards();
    }
  }
}

export function selectCurLevel(event, data) {
  const isSelect = data.lvl.selectCurLevel(event);

  if (isSelect) {
    data.crd.cleanCards();
    data.createCards();
  }
}

export function selectSaved(data) {
  const gameData = getSavedGame();

  if (gameData) {
    data.getSpecLevel(gameData.lvl, gameData.card);
    // TODO двойное создание таблицы
    data.createGrid(gameData.card, gameData.timer);
    data.fillSavedGame(gameData.grid, gameData.x);
  } else {
    data.alert.addAlert('noGame');
  }
}
