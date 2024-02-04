/* eslint-disable no-param-reassign */
import { getWinSound, getFillSound, getXSound, getCleanSound } from './sound-service';
import { getCardData } from '../repository/repository';
import { createElement } from '../shared/helpers';

export function createGrid(savedCard, savedTime, data) {
  let game;

  if (savedCard) {
    game = getCardData(savedCard);
  } else {
    game = data.crd.cards.data.filter((el) => el.name === data.crd.curCard.value);
  }

  if (game.length) {
    data.grd.cleanGrid();
    data.grd.createGrid(game[0], data.lvl.curLevel.value);
    data.grd.grid.el.addEventListener('click', (event) => data.selectCell(event));
    data.grd.grid.el.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      data.selectCell(event, true);
    });
    data.grd.grid.el.addEventListener('mouseover', (event) => {
      data.grd.addHover(event);
    });
    data.grd.grid.el.addEventListener('mouseout', (event) => {
      data.grd.removeHover(event);
    });
    // data.grd.grid.el.addEventListener('pointermove', (event) => {
    //   if (event.type === 'pointermove' && event.pressure > 0) {
    //     let isContext = false;
    //     if (event.buttons === 2) {
    //       isContext = true;
    //     }
    //     data.selectCell(event, isContext);
    //   }
    // });

    // const controls = createElement('div', 'controls');

    const wrap = createElement('div', 'wrap');
    const gridWrap = createElement('div', 'grid-wrap');
    const actions = createElement('div', 'actions');

    gridWrap.append(data.grd.grid.el);
    wrap.append(gridWrap);
    wrap.append(actions);

    if (data.wrap) {
      data.wrap.remove();
    }

    data.content.main.el.append(wrap);
    data.wrap = wrap;

    data.createTimer(savedTime);
    data.createActions();
    data.changeGameinfo();
  }
}

export function fillSavedGame(cur, x, data) {
  data.grd.points.cur = cur;
  data.grd.points.x = x;
  data.grd.fillSavedCells();
}

export function selectCell(event, isContext, data) {
  if (!data.grd.grid.el.classList.contains('lock')) {
    const cell = event.target.closest('.cell.game');

    if (cell) {
      if (!data.tmr.timer.isStart) {
        data.tmr.timer.isStart = true;

        data.tmr.startTimer(true);
        data.actions.activateButtons();
      }

      if (event.type === 'pointermove' && event.pressure > 0) {
        if (!data.cellTarget) {
          data.cellTarget = cell;
        }
        if (data.cellTarget !== cell) {
          const { isFill, isX, isWin } = data.grd.selectCell(event, isContext);
          if (isFill) {
            getFillSound(data.settings.volume.isSilent);
          } else if (isX) {
            getXSound(data.settings.volume.isSilent);
          } else {
            getCleanSound(data.settings.volume.isSilent);
          }

          if (isWin) {
            data.winGame();
          }

          data.cellTarget = cell;
        }
      } else {
        const { isFill, isX, isWin } = data.grd.selectCell(event, isContext);

        if (isFill) {
          getFillSound(data.settings.volume.isSilent);
        } else if (isX) {
          getXSound(data.settings.volume.isSilent);
        } else {
          getCleanSound(data.settings.volume.isSilent);
        }

        if (isWin) {
          data.winGame();
        }
      }
    }
  }
}

export function winGame(data) {
  data.grd.lockGrid();
  data.grd.cleanX();
  data.actions.addDisabled();
  data.actions.activeReset();

  getWinSound(data.settings.volume.isSilent);

  data.openModal('win');
}
