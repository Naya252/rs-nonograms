/* eslint-disable no-param-reassign */
import { getClickSound } from './sound-service';
import { getSavedGame, saveGameData } from '../repository/repository';

export function createActions(data) {
  data.actions.createActions();
  data.actions.solution.el.addEventListener('click', () => {
    data.showSolution();
    getClickSound(data.settings.volume.isSilent, data.isLoad);
  });
  data.actions.reset.el.addEventListener('click', () => {
    data.resetGame();
    getClickSound(data.settings.volume.isSilent, data.isLoad);
  });
  data.actions.save.el.addEventListener('click', () => {
    data.saveGame();
    getClickSound(data.settings.volume.isSilent, data.isLoad);
  });
  data.actions.random.el.addEventListener('click', () => {
    if (data.tmr.timer.isStart) {
      data.openModal('change');
    } else {
      data.changeId();
      getClickSound(data.settings.volume.isSilent, data.isLoad);
    }
  });
  data.actions.saved.el.addEventListener('click', () => {
    data.selectSaved();
    getClickSound(data.settings.volume.isSilent, data.isLoad);
  });

  data.wrap.childNodes[1].append(data.actions.save.el);
  data.wrap.childNodes[1].append(data.actions.reset.el);
  data.wrap.childNodes[1].append(data.actions.solution.el);
  data.wrap.childNodes[1].append(data.actions.random.el);
  data.wrap.childNodes[1].append(data.actions.saved.el);
}

export function resetGame(data) {
  if (data.grd.grid.el.classList.contains('lock')) {
    data.submitResetGame();
  } else {
    data.openModal('reset');
  }
}

export function submitResetGame(data) {
  data.tmr.cleanTimer();
  data.tmr.createTimer();
  data.grd.cleanCells();
  data.actions.resetGame();
  if (data.grd.grid.el.classList.contains('lock')) {
    data.grd.lockGrid();
  }
}

export function showSolution(data) {
  if (data.tmr.timer.isStart) {
    data.openModal('solution');
  } else {
    data.grd.fillScheme();
    data.actions.showSolution();
  }
}

export function submitSolution(data) {
  data.grd.lockGrid();
  data.tmr.cleanTimer();
  data.tmr.createTimer();
  data.grd.fillScheme();
  data.actions.showSolution();
}

export function cancelTimerPause(data) {
  data.tmr.timer.isStart = true;
  data.tmr.startTimer(true);
}

export function saveGame(data) {
  const lastSaved = getSavedGame();

  if (
    lastSaved === null ||
    (lastSaved && lastSaved.grid.join('=') !== data.grd.points.cur.join('=')) ||
    (lastSaved && lastSaved.x.join('=') !== data.grd.points.x.join('='))
  ) {
    const gameData = {
      lvl: data.lvl.curLevel.value,
      card: data.crd.curCard.value,
      grid: data.grd.points.cur,
      x: data.grd.points.x,
      timer: data.tmr.timer.sec,
    };
    saveGameData(gameData);

    data.alert.addAlert();
  } else {
    data.alert.addAlert('not');
  }
}
