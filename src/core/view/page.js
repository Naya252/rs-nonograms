/* eslint-disable no-lonely-if */
import RANDOM_DATA from '../game-figures/templates';
import {
  getCardsData,
  getCardData,
  saveTheme,
  getTheme,
  saveVolume,
  getVolume,
  saveGameData,
  getSavedGame,
  setWinGame,
  savePassedGames,
  getRandomCard,
  getPassedGames,
} from '../repository/repository';
import { getBoolTheme, getBoolValue, getScore, completeScore, formateTime, createElement } from '../shared/helpers';
import { FILL_SOUND, CLEAN_SOUND, X_SOUND, CLICK_SOUND, NOTIFICATION_SOUND, WIN_SOUND } from '../shared/constants';

import Body from './body';
import Header from '../layouts/header/header';
import Main from '../layouts/main/content';

import Settings from '../components/settings/settings';
import Levels from '../components/levels/levels';
import Cards from '../components/game-cards/game-cards';
import Actions from '../components/game-actions/game-actions';
import Grid from '../components/grid/grid';
import Timer from '../components/timer/timer';

import Modal from '../components/modal/modal';
import Alert from '../components/alert/alert';

export default class Game {
  constructor() {
    this.body = new Body();
    this.top = new Header();
    this.content = new Main();

    this.settings = new Settings();
    this.lvl = new Levels();
    this.crd = new Cards();

    this.grd = new Grid();
    this.tmr = new Timer();
    this.actions = new Actions();

    this.modal = new Modal();
    this.alert = new Alert();

    this.changeGameEvt = null;
    this.passedGames = [];
    this.randomData = [...RANDOM_DATA];
    this.randomId = 0;

    this.isLoad = false;
    this.wrap = null;
    this.cellTarget = null;
  }

  // ================== Sounds =================================================

  getFillSound() {
    if (!this.settings.volume.isSilent) {
      const audio = new Audio(FILL_SOUND);
      audio.volume = 0.3;
      audio.play();
    }
  }

  getCleanSound() {
    if (!this.settings.volume.isSilent) {
      const audio = new Audio(CLEAN_SOUND);
      audio.volume = 0.3;
      audio.play();
    }
  }

  getXSound() {
    if (!this.settings.volume.isSilent) {
      const audio = new Audio(X_SOUND);
      audio.volume = 0.2;
      audio.play();
    }
  }

  getClickSound() {
    if (!this.settings.volume.isSilent && this.isLoad) {
      const audio = new Audio(CLICK_SOUND);
      audio.volume = 0.8;
      audio.play();
    }
  }

  getNotificationSound() {
    if (!this.settings.volume.isSilent) {
      const audio = new Audio(NOTIFICATION_SOUND);
      audio.volume = 0.8;
      audio.play();
    }
  }

  getWinSound() {
    if (!this.settings.volume.isSilent) {
      const audio = new Audio(WIN_SOUND);
      audio.volume = 0.3;
      audio.play();
    }
  }

  // ================== Random game ============================================

  fillPassedGames() {
    const passed = getPassedGames();
    passed.forEach((el) => this.changePassedGame(el));
  }

  changePassedGame(id) {
    this.passedGames.push(id);
    this.changeData(id);
    if (this.passedGames.length === 16) {
      this.passedGames = [];
      this.changeData(id);
      this.changePassedGame(id);
    }
  }

  saveRandomGames() {
    savePassedGames(this.passedGames);
  }

  changeId() {
    const idx = Math.floor(Math.random() * this.randomData.length);
    this.randomId = this.randomData[idx].id;

    this.changePassedGame(this.randomId);
    const scheme = getRandomCard(this.randomId);

    this.getSpecLevel(scheme.level, scheme.name);
  }

  changeData(id) {
    this.randomData = this.randomData.filter((el) => el.id !== id);
    if (this.passedGames.length === 16) {
      this.randomData = [...RANDOM_DATA];
    }
  }

  // ================== Settings ============================================

  createSettings() {
    const gameVolume = getVolume();

    if (!gameVolume) {
      this.settings.volume.isSilent = true;
    } else {
      this.settings.volume.isSilent = getBoolValue(gameVolume);
    }

    this.settings.createSettings();

    this.top.collapse.el.append(this.settings.score.el);
    this.settings.score.el.addEventListener('click', () => {
      this.showScore();
      this.getClickSound();
    });

    this.top.collapse.el.append(this.settings.theme.el);
    this.settings.theme.el.addEventListener('click', () => {
      this.changeTheme();
      this.getClickSound();
    });

    this.top.collapse.el.append(this.settings.volume.el);
    this.settings.volume.el.addEventListener('click', () => {
      this.changeVolume();
      this.getClickSound();
    });
  }

  changeTheme() {
    const val = this.settings.changeTheme();

    let textVal = 'dark';
    if (val) {
      textVal = 'dark';
    } else {
      textVal = 'light';
    }

    this.body.changeDataTheme(textVal);
    saveTheme(textVal);
  }

  changeVolume() {
    const val = this.settings.changeVolume();

    let textVal = 'silent';
    if (val) {
      textVal = 'silent';
    } else {
      textVal = 'loud';
    }
    saveVolume(textVal);
  }

  showScore() {
    const scoreData = getScore();

    this.openModal('score', scoreData);
  }

  // ================== Levels ==============================================

  createLevels() {
    this.lvl.createLevels();
    this.lvl.levels.el.addEventListener('click', (event) => {
      if (
        this.tmr.timer.isStart &&
        event.target.closest('.level').getAttribute('id').toLowerCase() !== this.lvl.curLevel.value
      ) {
        this.tmr.pauseTimer();
        this.changeGameEvt = event;
        this.openModal('change');
      } else {
        this.selectCurLevel(event);
        this.getClickSound();
      }
    });

    this.content.main.el.append(this.lvl.levels.el);

    this.selectSpecificLevel(this.lvl.levels.el.childNodes[0]);
  }

  getSpecLevel(lvl, name) {
    const level = this.lvl.levels.items.filter((el) => el.value === lvl);

    // TODO убрать дубль
    if (level[0].getAttribute('value') === this.lvl.curLevel.value) {
      const secificCard = this.crd.cards.items.filter((el) => el.value === name);
      this.selectSpecificCard(secificCard[0]);
    } else {
      this.selectSpecificLevel(level[0], name);
    }
  }

  selectSpecificLevel(lvl, card) {
    const isSelect = this.lvl.selectCurLevel(lvl);
    if (isSelect) {
      this.crd.cleanCards();

      if (card) {
        this.createCards(card);
      } else {
        this.createCards();
      }
    }
  }

  selectCurLevel(event) {
    const isSelect = this.lvl.selectCurLevel(event);

    if (isSelect) {
      this.crd.cleanCards();
      this.createCards();
    }
  }

  selectSaved() {
    const data = getSavedGame();

    this.getSpecLevel(data.lvl, data.card);
    // TODO двойное создание таблицы
    this.createGrid(data.card, data.timer);
    this.fillSavedGame(data.grid, data.x);
  }

  // ================== Cards ===============================================

  createCards(crd) {
    const cards = getCardsData(this.lvl.curLevel.value);

    this.crd.createCards(cards);

    this.crd.cards.el.addEventListener('click', (event) => {
      if (this.tmr.timer.isStart) {
        this.tmr.pauseTimer();
        this.changeGameEvt = event;
        this.openModal('change');
      }
      if (!this.tmr.timer.isStart) {
        this.selectCurCard(event);
      }
    });
    this.content.main.el.append(this.crd.cards.el);

    if (crd) {
      const secificCard = this.crd.cards.items.filter((el) => el.value === crd);
      this.selectSpecificCard(secificCard[0]);
    } else {
      this.selectSpecificCard(this.crd.cards.el.childNodes[0]);
    }
  }

  selectSpecificCard(el) {
    this.crd.selectCurCard(el);
    this.createGrid();
  }

  selectCurCard(event) {
    const isSelect = this.crd.selectCurCard(event);

    if (isSelect) {
      this.getClickSound();
      this.createGrid();
    }
  }

  // ================== Grid ================================================

  createGrid(savedCard, savedTime) {
    let game;

    if (savedCard) {
      game = getCardData(savedCard);
    } else {
      game = this.crd.cards.data.filter((el) => el.name === this.crd.curCard.value);
    }

    if (game.length) {
      this.grd.cleanGrid();
      this.grd.createGrid(game[0], this.lvl.curLevel.value);
      this.grd.grid.el.addEventListener('click', (event) => this.selectCell(event));
      this.grd.grid.el.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        this.selectCell(event, true);
      });
      this.grd.grid.el.addEventListener('mouseover', (event) => {
        this.grd.addHover(event);
      });
      this.grd.grid.el.addEventListener('mouseout', (event) => {
        this.grd.removeHover(event);
      });
      // this.grd.grid.el.addEventListener('pointermove', (event) => {
      //   if (event.type === 'pointermove' && event.pressure > 0) {
      //     let isContext = false;
      //     if (event.buttons === 2) {
      //       isContext = true;
      //     }
      //     this.selectCell(event, isContext);
      //   }
      // });

      const wrap = createElement('div', 'wrap');
      const gridWrap = createElement('div', 'grid-wrap');
      const actions = createElement('div', 'actions');

      gridWrap.append(this.grd.grid.el);
      wrap.append(gridWrap);
      wrap.append(actions);

      if (this.wrap) {
        this.wrap.remove();
      }

      this.content.main.el.append(wrap);
      this.wrap = wrap;

      this.createTimer(savedTime);
      this.createActions();
    }
  }

  fillSavedGame(data, x) {
    this.grd.points.cur = data;
    this.grd.points.x = x;
    this.grd.fillSavedCells();
  }

  selectCell(event, isContext) {
    if (!this.grd.grid.el.classList.contains('lock')) {
      const cell = event.target.closest('.cell.game');

      if (cell) {
        if (!this.tmr.timer.isStart) {
          this.tmr.timer.isStart = true;

          this.tmr.startTimer(true);
          this.actions.activateButtons();
        }

        if (event.type === 'pointermove' && event.pressure > 0) {
          if (!this.cellTarget) {
            this.cellTarget = cell;
          }
          if (this.cellTarget !== cell) {
            const { isFill, isX, isWin } = this.grd.selectCell(event, isContext);
            if (isFill) {
              this.getFillSound();
            } else if (isX) {
              this.getXSound();
            } else {
              this.getCleanSound();
            }

            if (isWin) {
              this.winGame();
            }

            this.cellTarget = cell;
          }
        } else {
          const { isFill, isX, isWin } = this.grd.selectCell(event, isContext);

          if (isFill) {
            this.getFillSound();
          } else if (isX) {
            this.getXSound();
          } else {
            this.getCleanSound();
          }

          if (isWin) {
            this.winGame();
          }
        }
      }
    }
  }

  winGame() {
    this.grd.lockGrid();
    this.grd.cleanX();
    this.tmr.pauseTimer();
    this.actions.addDisabled();
    this.actions.activeReset();

    this.getWinSound();

    this.openModal('win');
  }

  // ================== Modal ===============================================

  openModal(type, scoreData) {
    if (!this.modal.el) {
      this.modal.create();
      this.modal.el.addEventListener('click', (event) => {
        this.closeModal(event);
      });
    }

    if (type !== 'win') {
      this.getNotificationSound();
    }

    if (scoreData && type === 'score') {
      const data = completeScore(scoreData);

      data.forEach((el, i) => {
        const time = formateTime(el.timer);
        this.modal.createRow({ ...el, num: i + 1, timer: time });
      });
    }

    this.body.el.append(this.modal.backdrop);
    this.body.el.append(this.modal.el);

    setTimeout(() => {
      this.body.el.classList.add('modal-open');
      this.top.header.el.setAttribute('inert', true);
      this.content.main.el.setAttribute('inert', true);

      this.modal.open(type, this.tmr.timer.sec);
    }, 300);
  }

  closeModal(event) {
    const close = event.target.closest('.cls');
    const submit = event.target.closest('.sbmt');
    const backdrop = event.target.className === 'modal fade show';

    const hasInvisinleBtn = this.modal.cancelBtn.classList.contains('invisible');
    const type = this.modal.el.getAttribute('data-type');

    if (close || backdrop || (submit && hasInvisinleBtn) || (submit && !hasInvisinleBtn)) {
      this.getClickSound();

      if (submit && !hasInvisinleBtn) {
        this.callActions('sbmt', type);
      } else {
        this.callActions('cancel', type);
      }

      if (type === 'score') {
        this.close();

        this.modal.scoreBody.remove();
        this.modal.scoreBody = null;
        this.modal.createBody();
      }
    }
  }

  close() {
    this.modal.close();

    this.body.el.classList.remove('modal-open');
    this.top.header.el.removeAttribute('inert');
    this.content.main.el.removeAttribute('inert');

    this.body.el.lastChild.remove();
    this.body.el.lastChild.remove();
  }

  callActions(action, type) {
    if ((type === 'solution' || type === 'reset' || type === 'change') && action === 'cancel') {
      this.cancelTimerPause();
      this.close();
    }

    if (type === 'solution' && action === 'sbmt') {
      this.submitSolution();
      this.close();
    }
    if (type === 'reset' && action === 'sbmt') {
      this.submitResetGame();
      this.close();
    }
    if (type === 'change' && action === 'sbmt') {
      this.tmr.timer.isStart = false;
      this.close();

      if (this.changeGameEvt) {
        if (this.changeGameEvt.target.classList.contains('scheme')) {
          this.selectCurCard(this.changeGameEvt);
        } else if (this.changeGameEvt.target.parentNode.classList.contains('scheme')) {
          this.selectCurCard(this.changeGameEvt.target.parentNode);
        } else {
          this.selectCurLevel(this.changeGameEvt);
        }
      } else {
        this.changeId();
        this.getClickSound();
      }
    }

    if (type === 'win') {
      this.tmr.timer.isStart = false;
      this.close();
      const data = {
        lvl: this.lvl.curLevel.value,
        card: this.crd.curCard.value,
        timer: this.tmr.timer.sec,
        id: new Date(),
      };
      setWinGame(data);

      setTimeout(() => {
        this.alert.addAlert('score');
        this.getNotificationSound();
      }, 300);
    }
  }

  // ================== Timer ===============================================

  createTimer(savedTime) {
    this.tmr.cleanTimer();
    this.tmr.createTimer(savedTime);
    this.wrap.childNodes[1].append(this.tmr.timer.el);
  }

  // ================== Actions =============================================

  createActions() {
    this.actions.createActions();
    this.actions.solution.el.addEventListener('click', () => {
      this.showSolution();
      this.getClickSound();
    });
    this.actions.reset.el.addEventListener('click', () => {
      this.resetGame();
      this.getClickSound();
    });
    this.actions.save.el.addEventListener('click', () => {
      this.saveGame();
      this.getClickSound();
    });
    this.actions.random.el.addEventListener('click', () => {
      if (this.tmr.timer.isStart) {
        this.tmr.pauseTimer();
        // this.changeGameEvt = event;
        this.openModal('change');
      } else {
        this.changeId();
        this.getClickSound();
      }
    });
    this.actions.saved.el.addEventListener('click', () => {
      this.selectSaved();
      this.getClickSound();
    });

    this.wrap.childNodes[1].append(this.actions.save.el);
    this.wrap.childNodes[1].append(this.actions.solution.el);
    this.wrap.childNodes[1].append(this.actions.reset.el);
    this.wrap.childNodes[1].append(this.actions.random.el);
    this.wrap.childNodes[1].append(this.actions.saved.el);
  }

  resetGame() {
    if (this.grd.grid.el.classList.contains('lock')) {
      this.submitResetGame();
    } else {
      this.tmr.pauseTimer();
      this.openModal('reset');
    }
  }

  submitResetGame() {
    this.tmr.cleanTimer();
    this.tmr.createTimer();
    this.grd.cleanCells();
    this.actions.resetGame();
    if (this.grd.grid.el.classList.contains('lock')) {
      this.grd.lockGrid();
    }
  }

  showSolution() {
    this.tmr.pauseTimer();
    this.openModal('solution');
  }

  submitSolution() {
    this.grd.lockGrid();
    this.tmr.cleanTimer();
    this.tmr.createTimer();
    this.grd.fillScheme();
    this.actions.showSolution();
  }

  cancelTimerPause() {
    this.tmr.timer.isStart = true;
    this.tmr.startTimer(true);
  }

  saveGame() {
    const lastSaved = getSavedGame();

    if (
      lastSaved === null ||
      (lastSaved && lastSaved.grid.join('=') !== this.grd.points.cur.join('=')) ||
      (lastSaved && lastSaved.x.join('=') !== this.grd.points.x.join('='))
    ) {
      const data = {
        lvl: this.lvl.curLevel.value,
        card: this.crd.curCard.value,
        grid: this.grd.points.cur,
        x: this.grd.points.x,
        timer: this.tmr.timer.sec,
      };
      saveGameData(data);

      this.alert.addAlert();
    } else {
      this.alert.addAlert('not');
    }
  }

  // ================== HTML ================================================
  createHtml() {
    const gameTheme = getTheme();

    if (!gameTheme) {
      this.body.initBody('light');
      this.settings.theme.isDark = false;
    } else {
      this.body.initBody(gameTheme);
      this.settings.theme.isDark = getBoolTheme(gameTheme);
    }

    this.top.initNav();
    this.content.init();

    this.body.el.append(this.top.header.el);
    this.body.el.append(this.content.main.el);

    this.createSettings();
    this.createLevels();

    this.alert.create();
    this.body.el.append(this.alert.el);
  }

  init() {
    this.createHtml();
    this.fillPassedGames();
  }
}
